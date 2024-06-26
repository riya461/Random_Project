// Admin - full access, publish, write, view
// Contributir - write, view
// Viewer - view
// Editor - publish, write, view

package main

import (
	"fmt"
)

func main() { 

	// User input 
	fmt.Println("Enter your role: ")
	var name string
	fmt.Scanln(&name)

	switch name {
	case "Admin":
		fmt.Println("Full access")
		fallthrough
	case "Editor":
		fmt.Println("Publish")
		fallthrough
	case "Contributor":
		fmt.Println("Write")
		fallthrough
	case "Viewer":
		fmt.Println("View")
	
	default:
		fmt.Println("Unknown role")
	}

}
