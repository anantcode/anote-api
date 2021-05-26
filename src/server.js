const express = require("express");
const app = express();
app.listen(3001);

app.use(express.json());

const dbMock = {
    users: [
        {
            id: "1",
            name: "Anant",
            email: "ana@gmail.com",
            password: "test",
        },
        {
            id: "2",
            name: "Anant2",
            email: "ana2@gmail.com",
            password: "test2",
        },
    ],
};

const dbMockMessage = {
    1: {
        message: [],
    },
    2: {
        message: [],
    },
};

app.get("/", (req, res) => {
    res.send("Hello Anant");
});

app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    let found = false;
    dbMock.users.forEach((user) => {
        if (user.email === email && user.password === password) {
            found = true;
            res.json(user);
        }
    });
    if (!found) {
        res.json("Not found");
    }
});

app.get("/write/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    dbMock.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            res.json(user);
        }
    });
    if (!found) {
        res.json("Not found");
    }
});

app.post("/write/:id", (req, res) => {
    const { id, message } = req.body;
    let found = false;
    dbMock.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            write(user, message);
            res.json("Written!");
        }
    });
    if (!found) {
        res.json("Not found");
        console.log(dbMockMessage);
    }
});

const write = (user, message) => {
    dbMockMessage[user.id].message.push(message);
    console.log(dbMockMessage);
};
