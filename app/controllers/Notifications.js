import User from '../models/user.js';
import NotificationModel from '../models/notification.js';
import Promo from '../models/promocode';
import messages from'../../config/messages';
import fcm  from 'fcm-notification';
import Nexmo  from 'nexmo';
const FCM = new fcm('./privateKey.json');
const nexmo = new Nexmo({
    apiKey: "bbe55c77",
    apiSecret: "P3iDxsLISzfnts2h"
});

class Notification {

    /**
     * @param req
     * @param res
     */
    sendNotifications(req, res){
        NotificationModel.findById(req.params.noteId, (err, notification) => {
            User.find((err, devices) => {
                if (!err && devices) {
                    let devices = [];
                    devices.forEach(device => {
                        devices.push(device.deviceId);
                    });
                    sendNotification(devices, notification);
                    res.sendStatus(200);
                } else {
                    res.sendStatus(500);
                }
            });
        });
    };


    sendGroupNotification(req, res){
        Notification.findById(req.params.noteId, (err, notification) => {
            User.find((err, devices) => {
                if (!err && devices) {
                    let devices = [];
                    devices.forEach(device => {
                        devices.push(device.deviceId);
                    });
                    sendNotification(devices, notification);
                    res.sendStatus(200);
                } else {
                    res.sendStatus(500);
                }
            });
        });
    };

    sendPromo(req, res){
        Promo.findById(req.params.promoId, (err, promo) => {
            const opts = {
                "type": "unicode"
            }
            User.find((err, users) => {
                users.forEach(user => {
                    const lang = user.language;
                    const functionName = 'setMessage' + captilize(lang)
                    const text_ar = messages[functionName](promo.code, promo.discount);
                    nexmo.message.sendSms("HODA", user.phone, text_ar, opts, (err, responseData) => {
                        if (err) {
                            res.send(err);
                        } else {
                            if (responseData.messages[0]['status'] === "0") {
                                res.send("Message sent successfully.");
                            } else {
                                res.send(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                            }
                        }
                    });
                })

            });
        })
    };


    sendGroupPromo (req, res){
        Promo.findById(req.params.promoId, (err, promo) => {
            const opts = {
                "type": "unicode"
            }
            User.find((err, users) => {
                users.forEach(user => {
                    const lang = user.language;
                    const functionName = 'setMessage' + captilize(lang)
                    const text_ar = messages[functionName](promo.code, promo.discount);
                    nexmo.message.sendSms("HODA", user.phone, text_ar, opts, (err, responseData) => {
                        if (err) {
                            res.send(err);
                        } else {
                            if (responseData.messages[0]['status'] === "0") {
                                res.send("Message sent successfully.");
                            } else {
                                res.send(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                            }
                        }
                    });
                })

            });
        })
    };



    sendNotification(devices, notification) {

        let message = {
            data: {    //This is only optional, you can send any data
                score: '850',
                time: '2:45'
            },
            notification: {
                title: notification.title,
                body: notification.body
            },
            token: token

        };

        FCM.sendM(message, function (err, response) {
            if (err) {
                console.log('error found', err);
            } else {
                console.log('response here', response);
            }
        })
    }



    sendGroupNotification(devices, notification) {

        let message = {
            data: {    //This is only optional, you can send any data
                score: '850',
                time: '2:45'
            },
            notification: {
                title: notification.title,
                body: notification.body
            }
        };

        FCM.sendToMultipleToken(message, devices, function (err, response) {
            if (err) {
                console.log('err--', err);
            } else {
                console.log('response-----', response);
            }

        })
    }




    captilize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);

    }


    create (req, res)  {
        if (!req.body.content) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }

        // Create a Note
        const note = new Notification({
            title: req.body.title || "Untitled Note",
            content: req.body.content
        });

        // Save Note in the database
        note.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    };


    findAll (req, res) {
        console.log("hoda");
        Notification.find()
            .then(notes => {
                res.send(notes);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
    };

   findOne (req, res) {
        Notification.findById(req.params.noteId).then(note => {
            res.send(note);
        }).catch(err => {
            if (err.kind === 'objectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                })
            }
            res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
    };

// Update a note identified by the noteId in the request
// Update a note identified by the noteId in the request

    update (req, res) {
        // Validate Request
        if (!req.body.content) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }

        // Find note and update it with the request body
        Note.findOneAndUpdate(req.params.noteId, {
            title: req.body.title || "Untitled Note",
            content: req.body.content
        }, {new: true})
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                res.send(note);
            }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
    };
// Delete a note with the specified noteId in the request

    delete(req, res){
        Note.findByIdAndDelete(req.params.noteId).then(
            note => {
                if (!note) {
                    res.send({message: "note deson not found"});
                }
                res.send({message: "Note successfully deleted!"})
            }
        );
    };
}
export default  Notification;


