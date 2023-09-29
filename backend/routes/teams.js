const express = require("express");
const Team = require("../models/team");

const router = express.Router();




router.get("/", async function(req, res, next) {
    try {
        const teams = await Team.getAll();
        console.log("YESSIR!!");
        return res.json({ teams });
    } catch (err) {
        return next(err);
    }
});

router.get("/:code", async function(req, res, next) {
    try {
        const team = await Team.get(req.params.code);
        return res.status(200).json({ team });   
    } catch (err) {
        return next(err);
    }
});

router.patch("/:id", async function (req, res, next) {
    try {
        let team = await Team.update(req.params.id, req.body);
        return res.json({ team });
    } catch (err) {
        return next(err);
    }
});

router.delete("/:id", async function(req, res, next) {
    try {
        await Team.remove(req.params.id);
        return res.json({ deleted: req.params.id});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;