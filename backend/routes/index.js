const express = require('express');
const userRouter = require('./user');
const accountsRouter = require('./accounts');

const router = express.Router();

router.use('/user', userRouter);
router.use('/accounts', accountsRouter);

module.exports = router;