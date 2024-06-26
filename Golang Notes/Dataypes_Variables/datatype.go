
// package declaration
package main

import (
	"fmt"
	"strings"
	"strconv"
)
func main() { // entry point of any go
	
	var tinyUInt8 uint8 = 255
	fmt.Println("Maximum value of uint8: ", tinyUInt8)
	var smallInt8 int8 = 127
	fmt.Println("Maximum value of int8: ", smallInt8)

	// uint

	fmt.Println("Hello, World!")
	var agency string = "Gophers"
	fmt.Println(agency)
	
	
	name :="Riya" //type inference
	fmt.Print("Hello, ", name)

	// multiple variable declaration
	var (
		age int = 20
		weight float64 = 65.5
	)
	height := 150 // type inference
	fmt.Print("\tAge: ", age)
	fmt.Print("\tWeight: ", weight)
	fmt.Print("\tHeight: ", height)
	
	var insuranceIncluded bool = true
	fmt.Println("\tInsurance included: ", insuranceIncluded)

	// constant declaration
	const pi float64 = 3.14159
	fmt.Println("Value of pi: ", pi)

	// Zero values 
	var a int // 0
	var b float64 // 0.0
	var c string // ""
	var d bool // false

	fmt.Println(a, b, c, d)




	// Strings 


	str := "Hello, World!"
	fmt.Println(str)
	length := len(str)
	fmt.Println("Length of the string: ", length)
	fmt.Println("First character: ", str[0])
	fmt.Println("Last character: ", str[length-1])

	// Slicing

	substr := str[0:5]
	fmt.Println("Substring: ", substr)

	// Concatenation
	str1 := "Hello"
	str2 := "World"
	result := str1 + " " + str2
	fmt.Println("Concatenated string: ", result)

	// String comparison
	if str1 == str2 {
		fmt.Println("Strings are equal")
	} else {
		fmt.Println("Strings are not equal")
	}

	// String formatting
	name = "Riya"
	age = 20
	weight = 65.5
	height = 150
	fmt.Printf("Name: %s, Age: %d, Weight: %.2f, Height: %d\n", name, age, weight, height)


	// String functions
	str = "Hello, World!"
	wIndex := strings.Index(str, "World")
	fmt.Println("Index of 'World': ", wIndex)

	contains := strings.Contains(str, "World")
	fmt.Println("Contains 'World': ", contains)

	count := strings.Count(str, "l")
	fmt.Println("Count of 'l': ", count)

	upper := strings.ToUpper(str)
	fmt.Println("Uppercase: ", upper)

	lower := strings.ToLower(str)
	fmt.Println("Lowercase: ", lower)
	
	replace := strings.Replace(str, "World", "Gophers", 1)
	fmt.Println("Replaced string: ", replace)



	// type conversions 
	
	var myString string = "95"
	var myInt, _ = strconv.Atoi(myString)
	fmt.Println("Converted integer: ", myInt)

	var myInt2 string = "Hello world മലയാളം"
	var myIntFromString = strconv.QuoteToASCII(myInt2)
	fmt.Println("Converted ASCII: ", myIntFromString)
	
	myBool, e := strconv.ParseBool("true")
	fmt.Println("Converted boolean: ", myBool)
	fmt.Println("Error: ", e)


	//  iota
	const (
		Red = iota
		Green
		Blue
	)
	fmt.Println(Red, Green, Blue)
	
	
}

