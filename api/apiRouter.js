const router = require('express').Router();

const authRouter = require('../auth/authRouter');
const userRouter = require('../users/userRouter');

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.get('/', (req, res) => {
    console.log(`GET to apiRouter`);
    res.status(200).json({ message: 'apiRouter' });
});

module.exports = router;