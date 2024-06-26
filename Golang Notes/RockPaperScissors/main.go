package main

import (
	"fmt"
	"math/rand"
	"slices"
)

func rockPaperScissors() error{
	const round = 3
	fmt.Println("Welcome to Rock, Paper, Scissors!")

	for i := 0; i < round; i++ {
		computerChoiceNum := rand.Intn(round)
		var computerChoice string
		switch computerChoiceNum {
		case 0:
			computerChoice = "Rock"
		case 1:
			computerChoice = "Paper"
		case 2:
			computerChoice = "Scissors"
		default:
			fmt.Println("Invalid choice")
		}


		var playerChoice string
		fmt.Println("Enter your choice (Rock, Paper, Scissors): ")
		fmt.Scanln(&playerChoice)
		if !slices.Contains([]string{"Rock", "Paper", "Scissors"}, playerChoice) {
			panic("Invalid choice")
		}
		// Game logic 
		fmt.Println("Computer's choice: ", computerChoice)
		switch{
		case playerChoice == computerChoice:
			fmt.Println("It's a tie!")
		case playerChoice == "Rock" && computerChoice == "Scissors", playerChoice == "Paper" && computerChoice == "Rock", playerChoice == "Scissors" && computerChoice == "Paper":
			fmt.Println("You win!")
		default:
			fmt.Println("Computer wins!")
		}



	}
	return nil
}

func main() {
	err := rockPaperScissors()
	if err != nil {
		fmt.Println(err)
	}
}