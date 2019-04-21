import Notification from '../controllers/Notifications.js';
import User from '../controllers/User.js';
import Promo from '../controllers/Promocode.js';

module.exports = (app) => {

    const user=new User();
    const notification =new Notification();
    const promo=new Promo();

    // crud a new Note
    app.post('/notes', notification.create);
    app.get('/notes', notification.findAll);
    app.get('/notes/:noteId', notification.findOne);
    app.put('/notes/:noteId', notification.update);
    app.delete('/notes/:noteId', notification.delete);



    // Create new user
    app.get('/users', user.findAll);
    app.post('/users', user.create);
    app.delete('/users',user.deleteAll);



    //promocodes
    app.post('/promo', promo.create);
    app.get('/promo', promo.findAll);


    //
    // //group notifications
    app.post('/sendNotifications/:noteId', notification.sendGroupNotification);
    app.post('/sendPromo/:promoId', notification.sendPromo);


    //
    // single notifications
    app.post('/sendNotification/:noteId/:userId', notification.sendNotifications);
    app.post('/sendPromo/:promoId/:userId', notification.sendGroupPromo);



}