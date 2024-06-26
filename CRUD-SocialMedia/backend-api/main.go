package main

import (
	"fmt"
	"log"
	"sync"
	"time"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type Post struct {
	ID       int       `json:"id"`
	User     User      `json:"user"`
	Content  string    `json:"post"`
	PostTime string    `json:"time"`
	Likes    int       `json:"likes"`
	Comments []Comment `json:"comments"`
}

type Comment struct {
	ID      int    `json:"id"`
	PostID  int    `json:"post_id"`
	UserID  int    `json:"user_id"`
	Content string `json:"content"`
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Picture  string `json:"picture"`
}

// In-memory storage
var posts = []Post{
	{
		ID:       1,
		User:     User{ID: 1, Username: "user1", Picture: "https://example.com/user1.jpg"},
		Content:  "Hello, World!",
		PostTime: time.Now().Format("2006-01-02 15:04:05"),
		Likes:    0,
		Comments: []Comment{
			{
				ID:      1,
				PostID:  1,
				UserID:  2,
				Content: "Nice post!",
			},
			{
				ID:      2,
				PostID:  1,
				UserID:  3,
				Content: "I agree!",
			},
		},
	},
	{
		ID:       2,
		User:     User{ID: 2, Username: "user2", Picture: "https://example.com/user2.jpg"},
		Content:  "This is a test post",
		PostTime: time.Now().Format("2006-01-02 15:04:05"),
		Likes:    0,
		Comments: []Comment{},
	},
}
var postIDCounter = 3
var commentIDCounter = 3

var followers = map[int][]int{
	1: {2, 3},
	2: {1, 3},
	3: {1, 2},
}

var mu sync.Mutex // mutex for thread-safe operations

func main() {
	fmt.Println("Starting server...")
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Get("/posts", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()
		return c.JSON(posts)
	})

	app.Post("/posts", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		type Request struct {
			UserID  int    `json:"user_id"`
			Content string `json:"content"`
		}
		req := new(Request)
		if err := c.BodyParser(req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
		}

		post := Post{
			ID:       postIDCounter,
			User:     getUserByID(req.UserID),
			Content:  req.Content,
			PostTime: time.Now().Format("2006-01-02 15:04:05"),
			Likes:    0,
			Comments: []Comment{},
		}
		postIDCounter++
		posts = append(posts, post)

		return c.JSON(post)
	})

	app.Post("/posts/:id/comments", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		postID := c.Params("id")
		type Request struct {
			UserID  int    `json:"user_id"`
			Content string `json:"content"`
		}
		req := new(Request)
		if err := c.BodyParser(req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
		}

		comment := Comment{
			ID:      commentIDCounter,
			PostID:  atoi(postID),
			UserID:  req.UserID,
			Content: req.Content,
		}
		commentIDCounter++

		for i := range posts {
			if posts[i].ID == comment.PostID {
				posts[i].Comments = append(posts[i].Comments, comment)
				return c.JSON(comment)
			}
		}

		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Post not found"})
	})

	app.Get("/postsfollowers/:id", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		userID := atoi(c.Params("id"))
		followersList := followers[userID]
		var postsFollowers []Post
		for _, post := range posts {
			for _, follower := range followersList {
				if post.User.ID == follower {
					postsFollowers = append(postsFollowers, post)
				}
			}
		}

		return c.JSON(postsFollowers)
	})

	app.Get("/getallpeople", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		var allPeople []User
		for _, post := range posts {
			allPeople = append(allPeople, post.User)
		}

		return c.JSON(allPeople)
	})

	app.Post("/:id/like", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		postID := atoi(c.Params("id"))
		for i := range posts {
			if posts[i].ID == postID {
				posts[i].Likes++
				return c.JSON(posts[i])
			}
		}

		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Post not found"})
	})

	app.Post("/:id/unlike", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		postID := atoi(c.Params("id"))
		for i := range posts {
			if posts[i].ID == postID {
				posts[i].Likes--
				return c.JSON(posts[i])
			}
		}

		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Post not found"})
	})

	app.Post("/:id/follow", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		userID := atoi(c.Params("id"))
		followerID := atoi(c.Params("follower_id"))
		followers[userID] = append(followers[userID], followerID)

		return c.JSON(fiber.Map{"message": "Followed successfully"})
	})

	app.Post("/:id/unfollow", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		userID := atoi(c.Params("id"))
		followerID := atoi(c.Params("follower_id"))
		for i, id := range followers[userID] {
			if id == followerID {
				followers[userID] = append(followers[userID][:i], followers[userID][i+1:]...)
				return c.JSON(fiber.Map{"message": "Unfollowed successfully"})
			}
		}

		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Follower not found"})
	})

	app.Get("/users/:id", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		userID := atoi(c.Params("id"))
		user := getUserByID(userID)
		return c.JSON(user)
	})

	app.Put("/users/:id", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()

		type Request struct {
			Username string `json:"username"`
			Picture  string `json:"picture"`
		}
		req := new(Request)
		if err := c.BodyParser(req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
		}

		userID := atoi(c.Params("id"))
		for i := range posts {
			if posts[i].User.ID == userID {
				posts[i].User.Username = req.Username
				posts[i].User.Picture = req.Picture
			}
		}

		return c.JSON(getUserByID(userID))
	})

	log.Fatal(app.Listen(":3000"))
}

func atoi(s string) int {
	i, _ := strconv.Atoi(s)
	return i
}

func getUserByID(id int) User {
	// In a real application, you would query the user from the database.
	// Here, we'll return a dummy user for simplicity.
	return User{
		ID:       id,
		Username: fmt.Sprintf("user%d", id),
		Picture:  fmt.Sprintf("https://example.com/user%d.jpg", id),
	}
}
