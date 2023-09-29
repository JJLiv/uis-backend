const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { BadRequestError, NotFoundError } = require("../expressError");

class Player {
    static async get(id) {
        const result = await db.query(`
        SELECT id, first_name, last_name
        FROM players 
        WHERE id = $1`, 
        [id]);
        return result.rows[0];
    }

    static async getAll() {
        const result = await db.query(`
        SELECT id, firstname, lastname
        FROM players 
        ORDER BY id`);
        return result.rows;
    }
    // when hitting external server initally to get players if player exists 
    // disregard add and proceed, if not add player.
    
    static async addPlayer({ id, firstname, lastname }) {
        const duplicateCheck = await db.query(`
        SELECT id 
        FROM players 
        WHERE id = $1`, [id],);
        if(duplicateCheck.rows[0]) {
           return
            // throw new BadRequestError(`NBA team already exist in db`);
        }

        const result = await db.query(`
        INSERT INTO players (id, firstname, lastname) 
        VALUES ($1, $2, $3) 
        RETURNING id,                   
                  firstname, 
                  lastname`,
        [id, firstname, lastname]);
        
        let player = result.rows[0];
        console.log(player);
        return player;

    }

    // static async update(id, data) {
    //     const { setCols, values } = sqlForPartialUpdate(data,
    //         {
    //             teamId: "team_id"
                
    //         });
    //         const idVarIdx = "$" + (values.length + 1);

    //         const querySql = `UPDATE players
    //                           SET ${setCols}
    //                           WHERE id = ${id}
    //                           RETURNING id,
    //                                     first_name AS "firstName",
    //                                     last_name AS "lastName"`;

    //         const result = await db.query(querySql, [...values, id]);
    //         const player = result.rows[0];
    //         return player;
    // }

    static async remove(id) {
        let result  = await db.query( `
        DELETE FROM players 
        WHERE id = $1 
        RETURNING id`, [id]);
        const deletedPlayer = result.rows[0];
        return deletedPlayer;
    }
}

module.exports = Player;