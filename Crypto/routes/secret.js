var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');

router.get('/', function (req, res, next) {
    MongoClient.connect('mongodb://127.0.0.1:27017/mytasklist_brad', function (err, db) {
        if (err) throw err;
        db.collection('homework7').find({}).toArray(function (err, doc) {
            if (err) throw err;

            const decipher = crypto.createDecipher('aes256', 'asaadsaad');
            const encrypted = doc[0].message;
            let decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            console.log(decrypted);
            res.render('secret',{sec:decrypted});
            db.close();
        });
    });
});

module.exports = router;