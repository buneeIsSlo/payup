const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username already eixsts"],
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.$set.password) {
        const salt = await bcrypt.genSalt();
        update.$set.password = await bcrypt.hash(update.$set.password, salt);
    }
    next();
})

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        throw Error("Password is incorrect");
    }
    else {
        throw Error("Username is incorrect");
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;