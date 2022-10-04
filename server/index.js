let express = require('express');
let db = require('mysql');
let cors = require('cors');

let port = 3001;

let app = express();

app.use(express.json());
app.use(cors());

let con = db.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "reactlogin"
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    con.query(
        "SELECT * FROM users WHERE username = ? AND password = ?", 
        [username, password],
        (err, result) => {
            if (err)
                res.send({err: err});

            if (result.length > 0)
                res.send(result);
            else
                res.send({message: "Pogresan username/password, pokusaj ponovo!"});
        }
    )
});

app.listen(port, () => {
    console.log("Slusa se port: " + port);
});