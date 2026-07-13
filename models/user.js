const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  // we didn't write the username and password as passport-local-mongoose automatically added in it also with SALT and stored the password in HASH.
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
