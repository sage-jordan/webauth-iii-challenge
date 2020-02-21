const router = require('express').Router();
const db = require('../users/users-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
    let user = req.body;
    console.log(user);
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    db.add(user)
        .then(saved => {
            res.status(200).json({ saved })
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log( ` Username: ${username}, Password: ${password}`);

    db.findBy({ username })
        .first()
        .then(user => {
            // console.log( `User: ${user}`);
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}!`, token })
            } else {
                res.status(404).json({ message: `Invalid Cridentials`})
            }
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })
});

function generateToken(user) {
    const payload = {
        subject: user.id, // sub in payload is what the token is about
        username: user.username,
        // ...otherData
    };

    const options = {
        expiresIn: '1d', // show other available options in the library's documentation
    };

    // extract the secret away so it can be required and used where needed
    return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

module.exports = router;