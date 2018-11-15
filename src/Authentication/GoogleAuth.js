const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/user');
const {google} = require('../Configs/keys');

passport.use('GoogleLogin', new GoogleStrategy({
    clientID: google.idG,
    clientSecret: google.secretG,
    callbackURL: "/google-login/callback",
}, function (accessToken, refreshToken, profile, done) {
    img = profile._json.image.url;
    User.findOne({
        provider_id: profile.id
    }, async function (err, user) {
        if (err) throw (err);
        if (!err && user != null) {
            console.log('error:' + user);
            return done(null, user);
        }
        var user = new User({
            provider_id: profile.id,
            provider: profile.provider,
            name: profile.name,
            surname: profile.name,
            urlImage: img,
            username: '@' + profile.name
        });
        await user.save(function (err) {
            if (err) throw err;
            console.log(user);
            done(null, user);
        });
    });
}));
