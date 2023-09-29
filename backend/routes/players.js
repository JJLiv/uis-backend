const express = require("express");
const { BadRequestError } = require("../expressError");
const Player = require("../models/player");
const ExternalAPIGetter = require("../apiHelpers/externalApiToDb");

const router = express.Router();


// router.post("/", async function(req, res, next) {
   
// })

router.get("/", async function(req, res, next) {
    try {
        const players = await Player.getAll();
        return res.json({ players });
    } catch (err) {
        return next(err);
    }
});

router.get("/:id", async function(req, res, next) {
    try {
        const player = await Player.get(req.params.id);
        return res.status(200).json({ player });   
    } catch (err) {
        return next(err);
    }
});

router.patch("/:id", async function (req, res, next) {
    try {
        let player = await player.update(req.params.id, req.body);
        return res.json({ player });
    } catch (err) {
        return next(err);
    }
});

router.delete("/:id", async function(req, res, next) {
    try {
        await Player.remove(req.params.id);
        return res.json({ deleted: req.params.id});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;