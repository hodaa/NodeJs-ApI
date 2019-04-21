import mongoose from 'mongoose'
import validate from 'mongoose-validator';


const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 6],
        message: 'Promo should be 6 characters'
    })
];

const Schema = mongoose.Schema({
    code: {type:String,unique:true,validate: nameValidator},
    percent: Number,
    maxNumber: Number,
    expireDate: Date,
    discount:{type:Number,min:0,max: 100},

}, {
    timestamps: true
});

module.exports = mongoose.model('PromoCode', Schema);
