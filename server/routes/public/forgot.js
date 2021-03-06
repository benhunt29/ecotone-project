const
    express = require('express'),
    router = express.Router(),
    async = require('async'),
    nodemailer = require('nodemailer'),
    crypto = require('crypto');

var Users = require('../../models/models').Users;

router.post('/', function(req, res, next) {

    req.checkBody('email','Not a valid email').notEmpty().isEmail();

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.status(409).send({message: errors[0].msg});
    }else {
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {

                var existingUserByEmail = {
                    where: {
                        email: req.body.email
                    },
                    // ensures only one user is found as fallback
                    limit: 1
                };

                Users.find(existingUserByEmail)
                    .then(function(user) {
                        if (user===null) {
                            console.log('no user');
                            throw new Error('No account with that email address exists.');
                            //return res.redirect('/forgot');
                        } else{
                            user.resetPasswordToken = token;
                            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                            user.save()
                                .then(function(user){
                                    done(null, token, user);
                                })
                                .catch(function(err){
                                    console.log(err);
                                    done(err);
                                });
                        }

                    }).catch(function(err){
                        console.log(err);
                        res.status(500).send({message: err.message});
                    });
            },
            function(token, user, done) {
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'mailgun',
                    auth: {
                        api_key: process.env.mailGunApiKey,
                        user: process.env.mailGunUser,
                        pass: process.env.mailGunPass
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'PasswordReset@ecotone-partners.com',
                    subject: 'Ecotone Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    res.send({message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
                    console.log(err);
                    done(err, 'done');
                });
            }
        ], function(err) {
            if (err) return next(err);
        });
    }

});

module.exports = router;
