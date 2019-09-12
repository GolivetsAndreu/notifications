const router = require('express').Router();
const notificationController = require('../controllers/notificationController');

router.post('/create', notificationController.new);
router.get('/all', notificationController.get);
router.get('/', notificationController.findById);
router.put('/update', notificationController.updateById);
router.delete('/delete', notificationController.deleteById);

module.exports = router;