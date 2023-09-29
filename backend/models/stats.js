// const db = require("../db");
// const { sqlForPartialUpdate } = require("../helpers/sql");
// const { BadRequestError, NotFoundError } = require("../expressError");


// class Stats {

//     static async addStats({ id, game_id, player_team_id, player_id, points, rebounds, assists, steals, blocks, turnovers, position }) {
//         try {
//             const result = await db.query(
//                 `INSERT INTO stats (id,
//                     game_id,
//                     player_id, 
//                     player_team_id, 
//                     points,
//                     rebounds,
//                     assists,
//                     steals,
//                     blocks,
//                     turnovers,
//                     position) 
//                 VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
//                 RETURNING id,
//                 game_id,
//                 player_id, 
//                 player_team_id, 
//                 points,
//                 rebounds,
//                 assists,
//                 steals,
//                 blocks,
//                 turnovers,
//                 position`,
//                 [ id, game_id, player_team_id, player_id, points, rebounds, assists, steals, blocks, turnovers, position],
//             )
//             const stats = result.rows[0];
//             return stats;
//         } catch (err) {
//             return next(err);
//         }
//     }

//     static async getAll() {
//         try {
//             const result = await db.query(
//                 `SELECT id,
//                         game_id,
//                         player_id, 
//                         player_team_id, 
//                         points,
//                         rebounds,
//                         assists,
//                         steals,
//                         blocks,
//                         turnovers,
//                         position
//                  FROM stats 
//                  ORDER BY player_team_id`
//             );
//             const stats = result.rows;
//             return stats;
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     static async getAllByTeam(player_team_id) {
//         try {
//             const result = await db.query(
//                 `SELECT id,
//                         game_id,
//                         player_id, 
//                         player_team_id, 
//                         points,
//                         rebounds,
//                         assists,
//                         steals,
//                         blocks,
//                         turnovers,
//                         position
//                 FROM stats 
//                 WHERE player_team_id = $1`,
//                 [player_team_id],
//             );
    
//             const stats = result.rows;
//             return stats;
//         } catch (err) {
//             console.log("OOPS fix this: in Stats Model, getAllByTeam().")
//         }
        
//     }

//     static async getAllByPlayer(player_id) {
//         try {
//             const result = await db.query(
//                 `SELECT id,
//                         game_id,
//                         player_id, 
//                         player_team_id, 
//                         points,
//                         rebounds,
//                         assists,
//                         steals,
//                         blocks,
//                         turnovers,
//                         position
//                 FROM stats 
//                 WHERE player_id = $1`,
//                 [player_id],
//             );
    
//             const stats = result.rows;
//             return stats;
//         } catch (err) {
//             console.log("OOPS fix this: in Stats Model, getAllByTeam().")
//         }
//     }

//     static async get(id) {
//         try {
//             const result = await db.query(
//                 `SELECT id,
//                         game_id,
//                         player_id, 
//                         player_team_id, 
//                         points,
//                         rebounds,
//                         assists,
//                         steals,
//                         blocks,
//                         turnovers,
//                         position
//                 FROM stats 
//                 WHERE id = $1`,
//                 [id],
//             );
    
//             const stats = result.rows[0];
//             return stats;
//         } catch (err) {
//             console.log("OOPS fix this: in Stats Model, getAllByTeam().")
//         }
//     }

   

//     static async remove(id) {
//         const result = await db.query(`
//         DELETE FROM stats
//         WHERE id = $1
//         RETURNING id`, 
//         [id],
//         );
//         const deletedStat = result.rows[0];
//         return deletedStat;
//     }
// }

// module.exports = Stats;