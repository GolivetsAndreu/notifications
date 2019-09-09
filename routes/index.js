const express = require('express');
const router = express.Router();
const notification_controller = require('../controllers/notification_controller');

router.post('/notification/create', notification_controller.new);
router.get('/notifications', notification_controller.get);
router.get('/notification', notification_controller.find_by_id);
router.put('/notification/update', notification_controller.update_by_id);
router.delete('/notification/delete', notification_controller.delete_by_id);

module.exports = router;
