const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const body_parser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const { NotFoundError, BadRequestError } = require("./expressError");

const teamRoutes = require("./routes/teams");
const playerRoutes = require("./routes/players");

const ExternalAPIGetter = require("./apiHelpers/externalApiToDb");
// const { getPlayerStatsHelper } = require("./apiHelpers/playerStatsAPIHelper");

const app = express();

// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// app.use("/users", userRoutes);
// app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);
app.use("/players", playerRoutes);

app.get("/", function (req, res) {
 
  ExternalAPIGetter.getTeamsFromExternalAPI();
  ExternalAPIGetter.getPlayersFromExternalAPI();
  
  return res.status(200).json("SERVER STARTED!");
});


// async function loadTeamsOnMount() {
//   let teams = Team.getAll();
//   if(teams.length === 0) {
//     return ExternalAPIGetter.getTeamsFromExternalAPI();
//   }
//   return teams;
// }

// async function loadPlayersOnMount() {
//   let players = Player.getAll();
//   if(players.length === 0) {
//     return ExternalAPIGetter.getPlayersFromExternalAPI();
//   }
//   return players;
// }



app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
