const User = require('../../models/users.js');
const Notification = require('../../models/notifications.js');

describe('drop tables', () => {
    it('drop', async () => {
        await Notification.deleteMany({});
        await User.deleteMany({});
    });
});
