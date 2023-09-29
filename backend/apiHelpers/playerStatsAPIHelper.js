// const db = require("../db");
// const axios = require("axios");
// const Team = require("../models/team");
// const Stats = require("../models/stats");
// const ExternalAPIGetter = require("../apiHelpers/externalApiToDb")


// async function getPlayerStatsHelper() {
    
//     let res = await ExternalAPIGetter.getTeamsFromExternalAPI();
//     console.log(res.teams);

//     for (let t of res.teams) {
//         ExternalAPIGetter.getplayerStatsFromExternalAPI(t.id);
//     }

// }

// module.exports = { getPlayerStatsHelper };