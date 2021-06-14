const express = require("express");
const cors = require("cors");

const app = express();
app.listen(3001);

app.use(express.json());
app.use(cors());

const dbMock = {
    users: [
        {
            id: "1",
            name: "Anant",
            email: "test1",
            username: "test1",
            password: "test1",
        },
        {
            id: "2",
            name: "Anant2",
            email: "test2",
            username: "test2",
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
    handleSignIn(req, res);
});

const handleSignIn = (req, res) => {
    const { username, password } = req.body;
    let found = false;
    dbMock.users.forEach((user) => {
        if (user.username === username && user.password === password) {
            found = true;
            res.json(user);
        }
    });
    if (!found) {
        res.json("Not found");
    }
};

app.get("/write/:id", (req, res) => {
    // what is done best here?

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

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    console.log(`Application to Register: ${username}, ${password}`);
    let registerSuccess = registerUser(username);
    if (registerSuccess) {
        res.json("Successfully registered! ID=" + username);
    } else {
        res.status(400).json("Error during registering");
    }
});

app.post("/messages", (req, res) => {
    const { userId, password } = req.body;
    console.log(`Messages to fetch for userId: ${userId}, ${password}`);
    let userMsgs = getUserMsgs(userId);
    if (userMsgs) {
        console.log(`Successfully retrieved msgs:\n${userMsgs}\n`);
        res.json(userMsgs);
    } else {
        res.status(400).json("Error getting msgs for user.");
    }
});

//mock
const getUserMsgs = (userId) => {
    let mockMessagesDB = {
        1: ["Hello you are wulz.", "You are my tonia"],
        2: ["Alu lelo", "Bhindi lelo"],
    };

    return mockMessagesDB[userId];
};

const write = (user, message) => {
    dbMockMessage[user.id].message.push(message);
    console.log(dbMockMessage);
};

const registerUser = (username) => {
    console.log("Registered: " + username);
    return true;
};
