module.exports = {
    promo_ar: 'اوصل اى حته مرتاح وموفر فلوسك ! اكتب برومو ',
    promo_en: 'Go anywhere and relax using promoCode ',

    setMessageAr: function(code,discount) {
         return  this.promo_ar + code + 'خصم لتحصل على  ' + discount +'%';
    },
    setMessageEn: function(code,discount) {
        return this.promo_en + "'"+code + "'"+' with discount '+discount +'%';
    },
}