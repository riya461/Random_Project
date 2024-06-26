package main

import (
	"fmt"
	"slices"
)

type Pair[K,V any] struct {
	Key K
	Value V
}

func (p Pair[K,V]) Describe() string {
	return fmt.Sprintf("%v: %v", p.Key, p.Value)
}

func main() {
	bodyTypes := []string{"Ectomorph", "Endomorph", "Mesomorph"}
	fmt.Println(bodyTypes)

	indexToRemove := 2

	bodyTypes = append(bodyTypes[:indexToRemove], bodyTypes[indexToRemove+1:]...)
	fmt.Println(bodyTypes)

	bodyTypes = slices.DeleteFunc(bodyTypes, func(s string) bool {
		return s == "Endomorph"
	})
	fmt.Println(bodyTypes)

	intStringPair := Pair[int, string]{1, "One"}
	fmt.Println(intStringPair)

	stringFloatPair := Pair[string, float64]{"Pi", 3.14159}
	fmt.Println(stringFloatPair.Describe())

	intStringPair.Key = 2
	intStringPair.Value = "Two"

	fmt.Println(intStringPair)



}