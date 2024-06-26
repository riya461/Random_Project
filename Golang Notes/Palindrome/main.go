package main

import (
	"fmt"
	"unicode"
	"strings"
)

func isPalindrome(s string) bool {
	// Convert the string to lowercase
	s = strings.ToLower(s)
	// Remove all non-alphanumeric characters
	s = removeNonAlphanumeric(s)
	// Compare the string with its reverse
	return s == reverse(s)
}

func removeNonAlphanumeric(s string) string {
	var result strings.Builder
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			result.WriteRune(r)
		}
	}
	return result.String()
}


func reverse(s string) string {
	var result strings.Builder
	for i := len(s) - 1; i >= 0; i-- {
		result.WriteByte(s[i])
	}
	return result.String()
}

func main() {
	fmt.Println(isPalindrome("riya"))
}