const users = [
    {
        id: 1,
        name: "Haider",
        age: 21
    },
    {
        id: 2,
        name: "Ali",
        age: 15
    },
    {
        id: 3,
        name: "Sara",
        age: 25
    }
];


function promoteAdults(users) {
    return users.map(user =>{
        const isAdult = user.age >= 18 
        return{
            ...user,
            isAdult: isAdult,
            role: isAdult ? "member" : "guest"


        }
    })
}

promoteAdults(users)
console.log(promoteAdults(users))