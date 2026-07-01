//day -3 code challange lean clousure 
// function createBankAccount(initialBalance) {

//     let balance = initialBalance;
//     return {
//         deposit: function(amount){
//             balance += amount;
//             console.log(`Deposited: ${amount}. New balance: ${balance}`);
//         },
//         withdraw: function(amount){
//             if(amount <= balance){
//                 balance -= amount;
//                 console.log(`Withdrew: ${amount}. New balance: ${balance}`);
//             } else {
//                 console.log(`Insufficient funds. Current balance: ${balance}`);
//             }
//         },
//         getBalance: function(){
//             return balance;
//         }

//     }

// }
// const account1 = createBankAccount(1000);
// const account2 = createBankAccount(500);
// account1.deposit(500);
// account1.withdraw(200);
// account2.deposit(300);
// account2.withdraw(100);
// console.log(`final balcne is ${account2.getBalance()}`)
// console.log(`Final balance: ${account1.getBalance()}`);

//day - 4 code challange learn this call apply bind and this + clousure usage 
// function createTodoList(owner) {
//     let todos = [];
//     return{
//         owner,
//         add: function(todo){
//             todos.push(todo);
//             console.log(`Added todo: "${todo}"`);
//         },
//         remove: function(){
//             todos.pop();
//             console.log(`Removed last todo. Remaining todos: ${todos}`);
//         },
//         list: function(){
//             console.log( `${this.owner}'s todos:`);
//             for (let i = 0; i < todos.length; i++){
//                 console.log(`${i + 1}. ${todos[i]}`);
//             }
//         }
//     }

// }
// haider = createTodoList('Haider');
// console.log(haider)
// haider.add('Learn JavaScript');
// haider.add('Build a project');
// haider.list();
// haider.remove();
// haider.list();

// const listFn = haider.list;

// listFn();

//day-5
 
// function myMap(array, callback) {
//     let newArray = [];
//     for (let i = 0; i < array.length; i++) {
//         newArray.push(callback(array[i]));
//     }
//     return newArray;

// }

// const result = myMap([1, 2, 3, 4], function (num) {
//     return num * 2;
// });
// console.log(result); // Output: [2, 4, 6, 8]

// const users = [
//   { name: "Haider", age: 21, active: true },
//   { name: "Ali", age: 17, active: false },
//   { name: "Ahmed", age: 25, active: true },
//   { name: "John", age: 19, active: false }
// ];

// const result = users.filter(function (user){
//     return user.age >= 18 && user.active;
    
// }).map(function (user){
//     return user.name.toUpperCase();
// })

// console.log(result); 

// // Output: ["HAIDER", "AHMED", "JOHN"]



// const users1 = [
//     { name: "Haider", age: 21 },
//     { name: "Ali", age: 17 },
//     { name: "Ahmed", age: 25 }
// ];

// const adults = users.filter(function(user) {
//     user.age >= 18;
// });

// console.log(adults);

// const numbers = [1, 2, 3];

// const result = numbers.map(function(num) {
//     if (num % 2 === 0) {
//         return num * 10;
//     }
// });

// console.log(result);