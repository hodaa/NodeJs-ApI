import UserModel from '../models/user.js';

class User {

    create (req, res) {
        // Create a Note
        const user = new UserModel({
            name: "hoda",
            email: "osama@gmail.com",
            phone: "201069642842",
            deviceId: "dpMhXOcJn1s:APA91bGv47ADYUxSX68rL8bYJun3fIXftGjgYI-k48WSHsF7uqb9p8tJs2hPyv9yu2nL1yUCLdp4MSjO6Ziwtww6gWQSSF3df5chs1KDGbWDBAmf1z0Et7BEyImY1DdLLaZEfpiWLwTc",
            platform: "android",
            language: "ar"
        });

        // Save Note in the database
        user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    };


    findAll (req, res) {
        UserModel.find().then(users => {
            res.send(users);
        });
    }

    deleteAll (req, res) {
        console.log("delete");
        UserModel.deleteMany().then(
            users => {
                res.send(users);
            });
    }
}
export  default User;