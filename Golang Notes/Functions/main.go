package main

import "fmt"
// car inventory
var carInventory = map[string]int{}
// parameters: bodyType, quantity
func addToInventory(bodyType string, quantity int) {
	carInventory[bodyType] += quantity
	fmt.Println(bodyType, "added to inventory", carInventory[bodyType])
}
// single return value
func getCount(bodyType string) (int,error) {
	return carInventory[bodyType], nil
}


// car fleet
var carFleet = map[string][]string{}
// parameters: bodyType, available, total
func addTocarFleet (bodyType string, available string, total string) {
	carFleet[bodyType] = []string{available, total}
}
// multiple return values
func getStatus(bodyType string) (string,string) {
	status := carFleet[bodyType]
	return status[0], status[1]
}

func double(num int) int {
	return num * 2
}
func half(num int) int {
	return num / 2
}


func processNumber(num int, operation func(int) int) int {
	result := operation(num)
	// fmt.Println(result)
	return result
}

func sequence() func() int {
	i := 0
	return func() int {
		i++
		return i
	}
}

func main() {
	// car inventory
	addToInventory("Sedan", 10)
	addToInventory("SUV", 5)
	a,b := getCount("Sedan")
	fmt.Println("Sedan count: ", a)
	fmt.Println("Sedan count error: ", b)
	addToInventory("Sedan", 5)
	addToInventory("SUV", 10)

	// car fleet
	addTocarFleet("Sedan", "5", "10")
	addTocarFleet("SUV", "2", "5")
	available, total := getStatus("Sedan")
	fmt.Println("Sedan available: ", available)
	fmt.Println("Sedan total: ", total)

	square := func(x int) int {
		return x * x
	}
	fmt.Println(square(5))

	a1 := processNumber(10, square)
	fmt.Println(a1)

	b1 := processNumber(10, double)
	fmt.Println(b1)

	c := processNumber(10, half)
	fmt.Println(c)

	nextNumber := sequence()
	fmt.Println(nextNumber())
	fmt.Println(nextNumber())
	fmt.Println(nextNumber())

}