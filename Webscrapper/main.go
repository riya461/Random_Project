// Web Scraper -> http://quotes.toscrape.com/
// Colly Library -> scraping library

package main

import (
	"fmt"
	"log"
	"strings"
	"os"

	"github.com/gocolly/colly"
)

func main() {
	// Creating new collector	
	c := colly.NewCollector()

	// URL 
	url := "http://quotes.toscrape.com/"

	// handle scraping events 
	c.OnHTML("div.quote", func(e *colly.HTMLElement) {
		// get data from HTML
		quote := e.ChildText("span.text")
		author := e.ChildText("small.author")
		tags := e.ChildText("div.tags")

		// clean data 
		quote = strings.TrimSpace(quote)
		author = strings.TrimSpace(author)
		tags = strings.TrimSpace(tags)

		// print data
		fmt.Println("Quote: ", quote)
		fmt.Println("Author: ", author)
		fmt.Println("Tags: ", tags)

		fmt.Println()

		
		// add all in txt file
		file, err := os.OpenFile("quotes.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()

		_, err = file.WriteString(fmt.Sprintf("Quote: %s\nAuthor: %s\nTags: %s\n\n", quote, author, tags))
		if err != nil {
			log.Fatal(err)
		}



	})
	err := c.Visit(url)
	//visit URL and start scraping
	if err != nil {
		log.Fatal(err)
	}
}