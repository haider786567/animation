function createBankAccount(initialBalance) {

    let balance = initialBalance;
    return {
        deposit: function(amount){
            balance += amount;
            console.log(`Deposited: ${amount}. New balance: ${balance}`);
        },
        withdraw: function(amount){
            if(amount <= balance){
                balance -= amount;
                console.log(`Withdrew: ${amount}. New balance: ${balance}`);
            } else {
                console.log(`Insufficient funds. Current balance: ${balance}`);
            }
        },
        getBalance: function(){
            return balance;
        }

    }

}
const account1 = createBankAccount(1000);
const account2 = createBankAccount(500);
account1.deposit(500);
account1.withdraw(200);
account2.deposit(300);
account2.withdraw(100);
console.log(`final balcne is ${account2.getBalance()}`)
console.log(`Final balance: ${account1.getBalance()}`);