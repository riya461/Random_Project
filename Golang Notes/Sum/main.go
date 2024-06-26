package main

import "fmt"

func Sum(numbers ...int) int {
	sum := 0
	for _, number := range numbers {
		sum += number
	}
	return sum
}

func main() {
	fmt.Println(Sum(10, 22, 53, 64, 15))
}
