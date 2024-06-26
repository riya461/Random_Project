package main

import (
	"fmt"
	"time"
)
type AuditInfo struct {
	CreatedAt time.Time
	LastUpdated time.Time
}
type BankAccount struct {
	AccountHolder string
	AccountNumber acc
	Balance float64
	AuditInfo

}
type acc string
func (a acc) IsValid() bool {
	return len(string(a)) == 10
}
func (account *BankAccount) Deposit(amount float64) {
	account.Balance += amount
	account.LastUpdated = time.Now()
}

func (account *BankAccount) Withdraw(amount float64) {
	account.Balance -= amount
	account.LastUpdated = time.Now()
}

func (account *BankAccount) CheckBalance() float64 {
	return account.Balance
}


func main() {
	account := BankAccount{
		AccountHolder: "Riya",
		AccountNumber: "1234056789",
		Balance: 1000.00,
		AuditInfo: AuditInfo{
			CreatedAt: time.Now(),
			LastUpdated: time.Now(),
		},
	}

	fmt.Println("Account Holder: ", account.AccountHolder)
	fmt.Println("Account Number: ", account.AccountNumber)
	fmt.Println("Account Balance: ", account.CheckBalance())
	fmt.Println("Deposit 500")
	account.Deposit(500)
	fmt.Println("Account Balance after deposit: ", account.CheckBalance())
	fmt.Println("Withdraw 200")
	account.Withdraw(200)
	fmt.Println("Account Balance after withdrawal: ", account.CheckBalance())

	fmt.Println("Account created at: ", account.CreatedAt)
	fmt.Println("Account last updated at: ", account.LastUpdated)

	fmt.Println("Is account number valid: ", account.AccountNumber.IsValid())
}

