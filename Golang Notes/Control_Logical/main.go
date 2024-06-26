package main

import "fmt"

func main() {
	isFast := true

	if isFast {
		fmt.Println("Drive fast")
	} else {
		fmt.Println("Drive slow")
	}

	// if ekse if 
	speed := 100
	if speed < 40 {
		fmt.Println("Drive slow")
	} else if speed < 100 {
		fmt.Println("Drive at moderate speed")
	} else {
		fmt.Println("Drive fast")
	}

	// switch case

	vehicle := "car"
	switch vehicle {
	case "car":
		fmt.Println("Four wheeler")
	case "bike":
		fmt.Println("Two wheeler")
	default:
		fmt.Println("Unknown vehicle")
	}

	// switch case with multiple cases
	vehicle = "bike"
	switch vehicle {
	case "car", "bike":
		fmt.Println("Vehicle")
	default:
		fmt.Println("Unknown vehicle")

	}

	// switch case with expression
	speed = 100
	switch {
	case speed < 40:
		fmt.Println("Drive slow")
	case speed < 100:
		fmt.Println("Drive at moderate speed")
	default:
		fmt.Println("Drive fast")
	}

	const upperSpeedLimit, lowerSpeedLimit int = 100, 40
	switch {
	case speed < lowerSpeedLimit:
		fmt.Println("Drive slow")
	case speed < upperSpeedLimit:
		fmt.Println("Drive at moderate speed")
	default:
		fmt.Println("Drive fast")
	}

	isWeekend := true
	isHoliday := false

	if isWeekend && isHoliday {
		fmt.Println("Enjoy your day off")
	}

	if isWeekend || isHoliday {
		fmt.Println("Enjoy your day off")
	}

	if !isWeekend {
		fmt.Println("Work day")
	}

	// short circuiting

	var isTrue bool = true
	var isFalse bool = false

	isTrue = isTrue && isFalse
	if isTrue {
		fmt.Println("True")
	}


	
}