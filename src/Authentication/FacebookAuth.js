const passport = require('passport');
const User = require('../Models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
const {facebook} = require('../Configs/keys');

passport.use('FacebookLogin', new FacebookStrategy({
    clientID: facebook.id,
    clientSecret: facebook.secret,
    callbackURL: "/facebook-login/callback",
    profileFields: ['id', 'displayName', /*'provider'*/ , 'photos']
}, function (accessToken, refreshToken, profile, done) {
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
            name: profile.displayName,
            surname: profile.displayName,
            urlImage: profile.photos[0].value,
            username: '@' + profile.displayName,
            role: 'ROLE_USER',
            fecha_nacimiento: profile.birthday,
            sobre_mi: '',
            pais: '',
            password: '',
            email: profile.emails
        });
        await user.save(function (err) {
            if (err) throw err;
            console.log('se guardó'+ user);
            done(null, user);
        });
    });
}));