require("dotenv").config();

const zod = require("zod");
const { fromZodError } = require("zod-validation-error");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Account = require("../models/Account");

const errorMessages = {
    username: "Please enter a valid email",
    password: "Password must have more than 4 characters",
    firstName: "Please enter your first name",
    lastName: "Please enter your last name",
};
const maxAge = 3 * 24 * 60 * 60;

function handleValidationError(err, res) {
    const validationError = fromZodError(err).toString().split(';');
    const errors = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
    };

    validationError.forEach((errorMessage) => {
        Object.keys(errors).forEach((field) => {
            if (errorMessage.includes(field)) {
                errors[field] = errorMessages[field];
            }
        });
    });

    res.status(411).json({ errors });
}

function createToken(userId) {
    const SECRET = process.env.JWT_SECRET;
    return jwt.sign({ userId }, SECRET, { expiresIn: maxAge });
}

const zodSignUp = zod.object({
    username: zod.string().email(),
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    password: zod.string().min(4)
});

const zodLogin = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

const zodUpdate = zod.object({
    firstName: zod.string().min(1).optional(),
    lastName: zod.string().min(1).optional(),
    password: zod.string().min(4).optional()
});

module.exports.signup_get = ((req, res) => {
    res.send("Signup Page");
});

module.exports.signup_post = (async (req, res) => {
    try {
        zodSignUp.parse(req.body);

        const { username, password, firstName, lastName } = req.body;

        const existingUser = await User.findOne({
            username: req.body.username
        })
        if (existingUser) {
            return res.status(411).json({
                errors: {
                    username: "Email already taken/Incorrect inputs"
                }
            })
        }

        try {
            const user = User.create({ username, password, firstName, lastName });
            const token = createToken(user._id);
            res.status(200).json({ message: "Token created successfully.", token });
        }
        catch (err) {
            res.status(411).json({ error: "Oops, something went wrong." });
        }
    }
    catch (err) {
        handleValidationError(err, res);
    }
});

module.exports.login_post = (async (req, res) => {
    try {
        zodLogin.parse(req.body);

        const { username, password } = req.body;

        try {
            const user = await User.login(username, password);

            const randomBalance = Math.floor(Math.random() * 5001) + 5000; // Generates a random number btetween 5,000 and 10,000.
            await Amount.create({
                userId: user._id,
                balance: randomBalance
            })

            const token = createToken(user._id);
            res.status(200).json({ token });
        }
        catch (err) {
            res.status(411).json({ error: err.message });
        }

    }
    catch (err) {
        res.status(411).json({ error: "Invalid credentials" })
    }
});


module.exports.update_put = (async (req, res) => {
    try {
        zodUpdate.parse(req.body);

        try {
            await User.updateOne(
                { _id: req.userId },
                { $set: req.body }
            );

            res.status(200).json({ message: "Profile updated successfully" });
        }
        catch (err) {
            res.status(411).json({ error: err })
        }
    }
    catch (err) {
        handleValidationError(err, res);
    }
});

module.exports.bulk_get = (async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            "$or": [{
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
            ]
        });

        res.json({
            user: users.map((user) => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
