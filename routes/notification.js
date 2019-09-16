const router = require('express').Router();
const auth = require('../config/passport');
const notificationController = require('../controllers/notificationController');

router.post('/create', auth.required, notificationController.new);
router.get('/all', auth.required, notificationController.get);
router.get('/', auth.required, notificationController.findById);
router.put('/update', auth.required, notificationController.updateById);
router.delete('/delete', auth.required, notificationController.deleteById);

module.exports = router;