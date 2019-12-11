const express = require('express');
const router = express.Router();

const authRouter = require('../auth/authRouter');

router.use('/auth', authRouter);

router.get('/', (req, res) => {
    console.log(`GET to apiRouter`);
    res.status(200).json({ message: 'apiRouter' });
});

module.exports = router;