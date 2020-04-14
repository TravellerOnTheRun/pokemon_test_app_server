const express = require('express');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/favourite', isAuth, userController.postFavourite);

router.patch('/favourites', isAuth, userController.patchFavourites);

module.exports = router;