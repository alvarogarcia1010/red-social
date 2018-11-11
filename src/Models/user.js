'use strict'
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    username: String,
    password: String,
    urlImage: String,
    role: String,
    created_at: {type: Date, default: Date.now},
});

UserSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.authenticate = function (password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
