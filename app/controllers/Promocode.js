import Promo from '../models/promocode.js';

class Promocode {

    create (req, res)  {
        if (!req.body.code) {
            return res.status(400).send({
                message: "Promo code can not be empty"
            });
        }

        // Create a Note
        let promo = new Promo({
            code: req.body.code,
            maxNumber: req.body.maxNumber,
            discount: req.body.discount,

        });

        // Save Promo Code in the database
        promo.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    };


    findAll(req, res) {
        Promo.find().then(promos => {
            res.send(promos);
        });
    }
}
export  default  Promocode;