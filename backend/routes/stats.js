// const express = require("express");
// const Stats = require("../models/stats");

// const router = express.Router();




// router.get("/", async function(req, res, next) {
//     try {
//         const stats = await Stats.getAll();
//         console.log("YESSIR!!");
//         return res.json({ stats });
//     } catch (err) {
//         return next(err);
//     }
// });

// router.get("/:player_team_id", async function(req, res, next) {
//     try {
//         const stats = await Stats.getAllByTeam(req.params.player_team_id);
//         return res.status(200).json({ stats });   
//     } catch (err) {
//         return next(err);
//     }
// });

// router.get("/:player_id", async function(req, res, next) {
//     try {
//         const stats = await Stats.getAllByPlayer(req.params.player_id);
//         return res.json({ stats })
//     } catch (err) {
//         return next(err);
//     }
// })


// // router.post("/", async function(req, res, next) {
// //     try {
        
// //     } catch (err) {
// //         return next(err);
// //     }
// // })

// router.delete("/:id", async function(req, res, next) {
//     try {
//         await Stats.remove(req.params.id);
//         return res.json({ deleted: req.params.id});
//     } catch (err) {
//         return next(err);
//     }
// });

// module.exports = router;