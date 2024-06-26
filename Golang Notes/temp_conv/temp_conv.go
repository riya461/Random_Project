package main

import (
	"fmt"
	// "math"
	"strings"
)


// Temparature conversion
func main() { 
	// tempC = 100
	// var tempK float64
	// var tempF float64
	// tempK = float64(tempC) + 273.15
	// tempF = (float64(tempC) * 9/5) + 32
	// fmt.Println("Temperature in Celsius: ", tempC)
	// fmt.Println("Temperature in Kelvin: ", tempK)
	// fmt.Println("Temperature in (Rounded) Kelvin: ", math.Round(tempK))
	// fmt.Println("Temperature in Fahrenheit: ", tempF)

	var temp float64
	var fromUnit, toUnit string
	fmt.Println("Enter the temperature: ")
	fmt.Scanln(&temp)
	fmt.Println("Enter the unit of temperature (C, F, K): ")
	fmt.Scanln(&fromUnit)
	fromUnit = strings.ToUpper(fromUnit)
	fmt.Println("Enter the unit to convert to (C, F, K): ")
	fmt.Scanln(&toUnit)
	toUnit = strings.ToUpper(toUnit)
	var conversion float64 = 0.0
	switch fromUnit {
	case "C":
		if toUnit == "F" {
			conversion = (temp * 9/5) + 32
		} else if toUnit == "K" {
			conversion = temp + 273.15
		} else {
			fmt.Println("Invalid unit")
		}
	case "F":
		if toUnit == "C" {
			conversion = (temp - 32) * 5/9
		} else if toUnit == "K" {
			conversion = (temp - 32) * 5/9 + 273.15
		} else {
			fmt.Println("Invalid unit")
		}
	case "K":
		if toUnit == "C" {
			conversion = temp - 273.15
		} else if toUnit == "F" {
			conversion = (temp - 273.15) * 9/5 + 32
		} else {
			fmt.Println("Invalid unit")
		}
	default:
		fmt.Println("Invalid unit")

	}
	// fmt.Println("Temperature in ", toUnit, ": ", math.Round(conversion))
	// just 2 decimal 
	fmt.Printf("Temperature in %s: %.2f\n", toUnit, conversion)


}
