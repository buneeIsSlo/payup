const zod = require("zod");

module.exports.signup_get = ((req, res) => {
    res.send("Signup Page");
});

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

module.exports.signup_post = ((req, res) => {
    const { success, error } = signupBody.safeParse(req.body);

    if (success) {
        res.send("All inputs are valid.");
    }

    if (error) {
        res.send("One or more inputs are ivalid.")
    }

})