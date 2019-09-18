const User = require('../../models').User;
const Notification = require('../../models').Notification;

describe('drop tables', () => {
    it('drop', async () => {
        await Notification.destroy({where: {}});
        await User.destroy({where: {}});
    });
});
