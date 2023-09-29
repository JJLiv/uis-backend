const jsonschema = require("jsonschema");
const express = require("express");

const User = require("../models/user");
const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");

const userAuthSchema = require("../schemas/userAuth.json");
const userSignupSchema = require("../schemas/userSignup.json")


const router = express.Router();

/**
 * POST /auth/token
 */
router.post("/token", async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.error.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);

        return res.json({ token });

    } catch (err) {
        return next(err)
    }
});


/**
 * POST /auth/signup
 */
router.post("/signup", async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userSignupSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newUser = await User.signup({...req.body, isAdmin: false });
        const token = createToken(newUser);
        return res.status(201).json({ token });

    } catch (err) {
        return next(err);
    }
});

module.exports = router;

