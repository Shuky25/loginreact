let express = require('express');
let db = require('mysql');
let cors = require('cors');

let bcrypt = require('bcrypt');
const saltRounds = 10;

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

app.post('/register', (req, res) => {
    let usernameReg = req.body.usernameReg;
    let passwordReg = req.body.passwordReg;

    bcrypt.hash(passwordReg, saltRounds, (err, hash) => {

        if (err)
            console.log(err);

        con.query(
            "INSERT INTO users VALUES (?, ?)",
            [usernameReg, hash],
            (err, result) => {
                console.log(err);
            }
        );
    });
});

// app.post('/login', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;

//     con.query(
//         "SELECT * FROM users WHERE username = ?", 
//         [username],
//         (err, result) => {
//             if (err)
//                 res.send({err: err});

//             if (result.length > 0){
//                 res.send(result);
//             }
//             else
//                 res.send({message: "Pogresan username/password, pokusaj ponovo!"});
//         }
//     )
// });

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    con.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        //req.session.user = result;
                        //console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({ message: "Pogresan username/password!" });
                    }
                });
            } else {
                res.send({ message: "Korisnik ne postoji!" });
            }
        }
    );
});

app.listen(port, () => {
    console.log("Slusa se port: " + port);
});