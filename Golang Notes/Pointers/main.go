package main 

import (
	"fmt"
)

func sayHello(name string) {
	name = "None"
	fmt.Println("in sayHello, ", name)

	// The function gets a copy of name
	// updates the copy 
	// name remains the same

}

func sayHelloTo(name *string) {
	*name = "None"
	fmt.Println("In sayHelloTo, ", *name)

	// The function gets the memory location
	// updates the value at that memory location
	// name changes

}

func main() {
	fmt.Println("What is your age?")
	var age int
	fmt.Scanln(&age)

	var myStringPointer *string
	var myString string
	myStringPointer = &myString
	fmt.Println(myStringPointer)

	name := "Riya"
	sayHello(name)
	fmt.Println("In main Your name is: ", name)

	sayHelloTo(&name)
	fmt.Println("In main Your name is: ", name)
	fmt.Println("Your age is: ", age)
}