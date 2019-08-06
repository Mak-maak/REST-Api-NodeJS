const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'auth_server'
})

///Crud USERS
// fetching users
app.get("/users", (req, res) => {
    const querySelect = "SELECT * FROM users"
    connection.query(querySelect, (err, rows) => {
        if (err) {
            console.log("failed to query for users" + err)
            res.end()
            return
        }
        console.log("I think we fetched users successfully!")
        res.json(rows)
    })
})

// inserting user
app.get("/user/add", (req, res) => {
    const { name, email, pass } = req.query;
    const queryInsert = "INSERT INTO users(username, password, email) VALUES('" + name + "','" + pass + "','" + email + "')"
    connection.query(queryInsert, (err, rows) => {
        if (err) {
            console.log("Failed to insert a user" + err)
            res.end()
            return
        }
        console.log("I think we inserted a user successfully!")
        res.send("User Added successfully!")
    })
})

// get candidates by id
app.get("/user/id", (req, res) => {
    const id = req.query.id;
    const querySelect = "SELECT * FROM  users where id ='" + id + "'";
    connection.query(querySelect, (err, rows) => {
        if (err) {
            console.log("failed to query for users" + err)
            res.end()
            return
        }
        console.log("I think we fetched users successfully by its Id!")
        res.json(rows)
        console.log("Fetching user with id: " + id)
    })
})


// updating user
app.get("/user/update", (req, res) => {
    const { bait, name, email, pass } = req.query;
    const queryUpdate = "UPDATE users SET username = '" + name + "', password = '" + pass + "', email = '" + email + "' where email = '" + bait + "'"
    connection.query(queryUpdate, (err, rows) => {
        if (err) {
            console.log("Failed to update an user" + err)
            res.end()
            return
        }
        console.log("I think we updated an user successfully!")
        res.send("User udpated successfully!")
    })
})

// deleting user
app.get("/user/delete", (req, res) => {
    const id = req.query.id;
    const queryDelete = "DELETE FROM users where id =" + id;
    connection.query(queryDelete, (err, rows) => {
        if (err) {
            console.log("Failed to DELETE an user" + err)
            res.end()
            return
        }
        console.log("I think we deleted an user successfully!")
        res.send("User deleted successfully!")
    })
})

///Crud CANDIDATES
// fetching candiddates
app.get("/candidates", (req, res) => {
    const querySelect = "SELECT * FROM  candidates"
    connection.query(querySelect, (err, rows) => {
        if (err) {
            console.log("failed to query for caniddates" + err)
            res.end()
            return
        }
        console.log("I think we fetched candidates successfully!")
        res.json(rows)
    })
})

// get candidates by id
app.get("/candidate/id", (req, res) => {
    const id = req.query.id;
    const querySelect = "SELECT * FROM  candidates where id ='" + id + "'";
    connection.query(querySelect, (err, rows) => {
        if (err) {
            console.log("failed to query for caniddates" + err)
            res.end()
            return
        }
        console.log("I think we fetched candidates successfully by its Id!")
        res.json(rows)
        console.log("Fetching candidate with id: "+id)
    })
})

// inserting candidate
app.get("/candidate/add", (req, res) => {
    const { name, email, desigination } = req.query;
    const queryInsert = "INSERT INTO candidates(name, email, desigination) VALUES('" + name + "','" + email + "','" + desigination + "')"
    connection.query(queryInsert, (err, rows) => {
        if (err) {
            console.log("Failed to insert a  candidate" + err)
            res.end()
            return
        }
        console.log("I think we inserted a candidate successfully!")
        res.send("Candidate Added successfully!")
    })
})

// updating candidate
app.get("/candidate/update", (req, res) => {
    const { id, name, email, desigination, address } = req.query;
    const queryUpdate = "UPDATE candidates SET name = '" + name + "', email = '" + email + "', desigination = '" + desigination + "', address = '" + address + "' where id = '" + id + "'"
    console.log(queryUpdate);
    connection.query(queryUpdate, (err, rows) => {
        if (err) {
            console.log("Failed to update an event" + err)
            res.end()
            return
        }
        console.log("I think we updated a candidate successfully!")
        res.send("Candidate udpated successfully!")
    })
})

// voting candidate
app.get("/candidate/vote", (req, res) => {
    const { id, vote } = req.query;
    const queryUpdate = "UPDATE candidates SET votes = '" + vote + "' where id = '" + id + "'"
    console.log(queryUpdate);
    connection.query(queryUpdate, (err, rows) => {
        if (err) {
            console.log("Failed to update an event" + err)
            res.end()
            return
        }
        console.log("I think we updated a candidate successfully!")
        res.send("Candidate voted successfully!")
    })
})


// deleting candidate
app.get("/candidate/delete", (req, res) => {
    const id = req.query.id;
    const queryDelete = "DELETE FROM candidates where id ='" + id + "'";
    connection.query(queryDelete, (err, rows) => {
        if (err) {
            console.log(queryDelete);

            console.log("Failed to DELETE a candidate" + err)
            res.end()
            return
        }
        console.log("I think we deleted a candidate successfully!")

        res.send("Candidate deleted successfully!")
    })
})

///Crud EVENTS
// fetching events
app.get("/events", (req, res) => {
    const querySelect = "SELECT * FROM events"
    connection.query(querySelect, (err, rows) => {
        if (err) {
            console.log("failed to query for events" + err)
            res.end()
            return
        }
        console.log("I think we fetched events successfully!")
        res.json(rows)
    })
})

// inserting event
app.get("/event/add", (req, res) => {
    const { title, description } = req.query;
    const queryInsert = "INSERT INTO events(title, description) VALUES('" + title + "','" + description + "')"
    connection.query(queryInsert, (err, rows) => {
        if (err) {
            console.log("Failed to insert a event" + err)
            res.end()
            return
        }
        console.log("I think we inserted an event successfully!")
        res.send("Event Added successfully!")
    })
})

// updating event
app.get("/event/update", (req, res) => {
    const { bait, title, description } = req.query;
    const queryUpdate = "UPDATE events SET title = '" + title + "', description = '" + description + "' where title = '" + bait + "'"
    connection.query(queryUpdate, (err, rows) => {
        if (err) {
            console.log("Failed to update an event" + err)
            res.end()
            return
        }
        console.log("I think we updated an event successfully!")
        res.send("Event udpated successfully!")
    })
})

// deleting event
app.get("/event/delete", (req, res) => {
    const bait = req.query;
    const queryDelete = "DELETE FROM events where id = 1"
    connection.query(queryDelete, (err, rows) => {
        if (err) {
            console.log("Failed to DELETE an event" + err)
            res.end()
            return
        }
        console.log("I think we deleted an event successfully!")
        res.send("Event deleted successfully!")
    })
})

app.listen(4000, () => {
    console.log("Listening on port 4000.")
})
