const express = require('express');
const app = express();
const port = 3000;

const users = [
    {
        fname: "Kyle",
        lname: "Wright",
        email: "example1@gmail.com",
        age: 22,
        password: "kittens123"
    },
    {
        fname: "Skeeter",
        lname: "Alabama",
        email: "example2@gmail.com",
        age: 25,
        password: "kittens456"
    },
    {
        fname: "Bob",
        lname: "Marley",
        email: "example3@gmail.com",
        age: 30,
        password: "kittens789"
    }
]
app.use(express.json());
// Login
app.get('/', (req, res) => res.send(`Look up http://localhost:${port}/users`));
app.get('/users', (req, res) => res.send(users));
app.post('/users', (req, res) => {    
    // pick up the stuff in the body
    let authorized = false;
    const body = req.body;
    users.forEach(user => {
        if (user.email === body.email && user.password === body.password) {
            authorized = true;
        }
    })
    authorized ? res.send("Authorization verified") : res.send("Access denied");
});
// Create user
app.post('/users', (req, res) => {
    const body = req.body;
    users.push(body);
    res.send(users[users.length - 1]);
});

// Update password
app.patch('/users/:email', (req, res) => {
    const body = req.body;
    const userEmail = req.params.email;
    let user;
    let emailExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === userEmail) {emailExists = true; user = i; break;}
    }
    if (emailExists) {
        users[user].password = body.password;
    }
    emailExists ? res.send(`Password was updated successfully on ${users[user].fname}'s account.`) : res.send("Email does not match");
});

app.listen(port, console.log(`Listening on http://localhost:${port}`));