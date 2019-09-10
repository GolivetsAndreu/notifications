const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/notification/create', notificationController.new);
router.get('/notifications', notificationController.get);
router.get('/notification', notificationController.findById);
router.put('/notification/update', notificationController.updateById);
router.delete('/notification/delete', notificationController.deleteById);

module.exports = router;
