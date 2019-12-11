const router = require('express').Router();
const db = require('../users/users-model');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.pass = hash;

    db.add(user)
        .then(saved => {
            res.status(200).json({ saved })
        })
        .catch(err => {
            res.status(500).json({ err })
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log( ` Username: ${username}, Password: ${password}`);

    db.findBy({ username })
        .first()
        .then(user => {
            console.log( `User: ${user}`);
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${user.username}!`})
            } else {
                res.status(404).json({ message: `Invalid Cridentials`})
            }
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })
});

module.exports = router;