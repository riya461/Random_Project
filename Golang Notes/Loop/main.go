// for loop
package main

import "fmt"

func main() {
	for i := 0; i < 5; i++ {
		fmt.Println(i)
	}

	// infinite loop
	// for {
	// 	fmt.Println("Infinite loop")
	// }

	// for loop with break
	for i := 0; i < 5; i++ {
		if i == 3 {
			break
		}
		fmt.Println(i)
	}

	// for loop with continue
	for i := 0; i < 5; i++ {
		if i%2 == 0 {
			continue
		}
		fmt.Println(i)
	}

	// for loop with range
	numbers := []int{1, 2, 3, 4, 5}
	for i, number := range numbers {
		fmt.Println(i, number)
	}

	// for loop with range and continue
	for i, number := range numbers {
		if i == 2 {
			continue
		}
		fmt.Println(i, number)
	}

	// for loop with range and break
	for i, number := range numbers {
		if i == 2 {
			break
		}
		fmt.Println(i, number)
	}
}
