const axios = require("axios");
const Team = require("../models/team");
const Player = require("../models/player");
const Stats = require("../models/stats");


const BASE_URL = "https://api-nba-v1.p.rapidapi.com";
class ExternalAPIGetter {   
    
    static async request(endpoint, data = {}, method = "get") {
        console.debug("NBA Rapid API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {
            'X-RapidAPI-Key': 'eed78ab61dmsh11bf3a8b76f140dp15a2a1jsn61b84ff8fec4',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }



    static async getTeamsFromExternalAPI() {
        let addedTeams = [];
        let res = await this.request("teams");
        let teams = res.response;
        for (let t of teams) {
            if (t.nbaFranchise) {
                let { id, name, nickname, code, city, logo, nbaFranchise } = t;
                const result = await Team.addTeam({ id, name, nickname, code, city, logo, nbaFranchise });
                addedTeams.push(result);
            }
        }
        return addedTeams;
      }


    static async getPlayersFromExternalAPI() {
        
       let addedPlayers = [];

       const res = await this.request('players', {country: "usa"});
       let players = res.response;
      //  console.log(players);
       for(let p of players) {
        addedPlayers.push({id: p.id, firstname: p.firstname, lastname:p.lastname})
        let { id, firstname, lastname } = p;
        
        
          await Player.addPlayer({ id, firstname, lastname });
        
        
       }
        return addedPlayers;
    };


    // static async getplayerStatsFromExternalAPI(team_id) {
    //   let addedPlayerStats = [];

    //   const res = await this.request("players/statistics", {team : team_id, season : '2022'});
    //   let stats = res.response;

    //   for(let s of stats) {
    //     addedPlayerStats.push({ id, 
    //                             game_id,
    //                             player_id,
    //                             player_team_id, 
    //                             points, 
    //                             rebounds, 
    //                             assists,
    //                             steals, 
    //                             blocks, 
    //                             turnovers, 
    //                             position 
    //                             });

    //     let { id, game_id, player_id, player_team_id, points, rebounds, assists, steals, blocks, turnovers, position } = s;
    //       await Stats.addStats({ id, game_id, player_id, player_team_id, points, rebounds, assists, steals, blocks, turnovers, position });

    //   }
    //   return addedPlayerStats;
    // }


    
    

};

module.exports = ExternalAPIGetter;