# Golang  
- Robert Griesemar, Rob Pike, Ken Thompson 

## Why Go 
- It is natively compiled so faster than interpreted languages
- execution speed is but similar to Java,C# due to Go runtime
- when created Python(interpreted), Java(increasingly complex type system over time) and C/C++(complex type system and compile time slow) where the only languages

- Web Development, Cloud services, Distibuted Systems 

- Apps: Docker, Kubernetes

## To Run 
`go run ./file.go`

`go run .`

## Variables 
`var name data-type = value`
- strongly typed

eg: _var agency sting = "Fast Track"_
1. Allocate memory to store string
2. Label it: agency 
3. Store "Fast Track" in that memory

## Numeric

Unsigned integers

1. uint16 - 0 65535
2. uint32 - 0 to 4294967295
3. uint64


Signed integers

1. int16 
2. int32 
3. int64 
4. int8 - -127 128

Floats 

1. float32
2. float64

Complex 

1. complex64
2. complex128



## Strings 

- https://pkg.go.dev/strings
- immutable 

## Maths 
 
- https://pkg.go.dev/math

## Iota 
- https://medium.com/swlh/iota-create-effective-constants-in-golang-b399f94aac31 


## Pointers 
- they hold memory address of a variable 

```go
var name string
fmt Scanln(&name)
```
- `nil` - zero value

## Control Structures 
- if 
- switch 
- for


## Data Structures 

### Arrays 

- The size of the array is determined by the number of elements
- The size of the array is fixed

### Slices

- Slices
- Slices are dynamic arrays
- Slices are references to arrays
- Slices are not fixed in size
- Slices are more flexible than arrays
	
### Maps 

- key value pairs


## Functions 
- functions are types 
- one within itself 

## Closure 

https://go.dev/tour/moretypes/25


## Error Handling 
- handle errors when they occur 
- use meaningful error message 
- avoid ignoring error
`myBool, _ := strconv.ParseBool("t")`

## Panic 

- program may not continue if the error is unrecoverable 
- `panic()` - creates a run time error that will stop the program 

```go
if !slices.Contains([]string{"Rock", "Paper", "Scissors"}, playerChoice) {
			panic("Invalid choice")
		}
```

## Structs 

### Basic Types 
- string 
- integer
- float
- boolean 

### Composite Types 
- arrays 
- slices 
- maps

<b> Type Declarations and Type Aliases </b>

## Interfaces
- define behaviours 
`Read(p []byte) (n int, err error)`

interface{}
- all go types satisfy empty interface 
- builtin types
- user defined struct 

## Generics 

- provide better abstraction

## Organizing Code - Packages and Modules 

- Types 
- Variables 
- Constants
- Functions 


## Encapsulation 

### Capitalized 
- publicly accessible 
- can be accessed outside 



### Non Capitalized 
- privately accessible 
- can only be accessed within 

## Go commands 

- go mod
- go run
- go get

- go build : compile the source code files and all dependencies, creates an executable binary 
`go build -o hello-go`

- go install: download the code and produce an executable 
