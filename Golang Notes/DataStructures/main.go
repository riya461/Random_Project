package main

import "fmt"

func main() {
	var books [3]string
	books[0] = "The Alchemist"
	books[1] = "The Little Prince"
	books[2] = "The Da Vinci Code"
	
	fmt.Println(books)

	// Array with values
	authors := [3]string{"Paulo Coelho", "Antoine de Saint-Exupéry", "Dan Brown"}
	fmt.Println(authors)

	for i, book := range books {
		fmt.Println(i, book)
	}

	// Array with ellipsis
	
	
	var movies  = [3]string{"Inception", "Interstellar", "The Prestige"}
	fmt.Println(movies)

	// 2D
	var matrix [2][2]int
	matrix[0] = [2]int{1, 2}
	matrix[1] = [2]int{3, 4}
	fmt.Println(matrix)

	var cars = [2][2]string{{"Toyota", "Honda"}, {"Ford", "Chevrolet"}}
	fmt.Println(cars)

	for i := 0; i < len(cars); i++ {
		row := cars[i]
		for j := 0; j < len(row); j++ {
			fmt.Println(cars[i][j])
		}
		fmt.Println(row)

	}

	// Slices

	var fruits []string
	fruits = append(fruits, "Apple")
	fruits = append(fruits, "Banana")
	fruits = append(fruits, "Cherry")
	fmt.Println(fruits)

	// Slice with values
	veggies := []string{"Carrot", "Broccoli", "Spinach"}
	fmt.Println(veggies)

	// Slice with ellipsis
	var drinks  = []string{"Water", "Milk", "Juice"}
	fmt.Println(drinks)


	// 2D
	var table = [][]int{{1, 2}, {3, 4}}
	fmt.Println(table)

	var seats  = [][]string{{"A1", "A2"}, {"B1", "B2"}}
	fmt.Println(seats)

	for i := 0; i < len(seats); i++ {
		row := seats[i]
		for j := 0; j < len(row); j++ {
			fmt.Println(seats[i][j])
		}
		fmt.Println(row)

	}

	// Slicing
	fuelTypes := []string{"Petrol", "Diesel", "Electric", "Hybrid"}
	popular := fuelTypes[:2]
	fmt.Println(popular)
	clean := fuelTypes[2:]
	fmt.Println(clean)
	electrical := fuelTypes[2:3]
	fmt.Println(electrical)

	carInventory := make((map[string]int))
	carInventory["Toyota"] = 100
	carInventory["Honda"] = 50
	carInventory["Ford"] = 75
	fmt.Println(carInventory)

	fmt.Println("Toyota: ", carInventory["Toyota"])
	fmt.Println("Lenght: ", len(carInventory))
	carInventory["Toyota"] = 200
	fmt.Println("Toyota: ", carInventory["Toyota"])

	delete(carInventory, "Toyota")
	fmt.Println("Toyota: ", carInventory["Toyota"])

	// Nested maps
	var carModels  = make(map[string]map[string]int)
	carModels["Toyota"] = map[string]int{
		"Camry": 100, 
		"Corolla": 200,
		"RAV4": 150,
	}
	carModels["Honda"] = map[string]int{
		"Civic": 150, 
		"Accord": 250,
	}
	fmt.Println(carModels)

	for make, models := range carModels {
		fmt.Println(make)
		for model, count := range models {
			fmt.Println("\t", model, count)
		}
	}
	if count, ok := carModels["Toyota"]["Camry"]; ok {
		fmt.Println("Camry count: ", count)
		
	}

	totalCars := 0
	for _, models := range carModels {
		for _, count := range models {
			totalCars += count
		}
	}
	fmt.Println("Total cars: ", totalCars)

}