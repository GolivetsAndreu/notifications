const router = require('express').Router();
const auth = require('../config/passport');
const UserController = require('../controllers/usersController');

router.post('/create', auth.optional, UserController.registration);
router.post('/login', auth.optional, UserController.login);
router.get('/current', auth.required, UserController.getCurrent);

module.exports = router;
