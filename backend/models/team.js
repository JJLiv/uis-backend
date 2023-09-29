const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { BadRequestError, NotFoundError } = require("../expressError");


class Team {

    static async getAll() {
        try {
            const result = await db.query(
                `SELECT id,
                        name, 
                        nickname, 
                        code,
                        city,
                        logo,
                        nba_franchise AS "nbaFranchise"
                FROM teams
                ORDER BY name`
            );
    
            const teams = result.rows;
            return teams;
        } catch (err) {
            console.log("OOPS fix this: in Team Model, getALL().")
        }
        
    }

    static async get(code) {
        const result = await db.query(
            `SELECT name,
                    nickname,
                    code,
                    city,
                    logo,
                    nba_franchise AS "nbaFranchise"
            FROM teams
            WHERE code = $1`,
            [code],
        );
            const team = result.rows[0];
            return team;
    }

    static async addTeam({ id, name, nickname, code, city, logo, nbaFranchise }) {
        const duplicateCheck = await db.query(`
        SELECT name 
        FROM teams 
        WHERE name = $1`, [name],);
        if(duplicateCheck.rows[0]) {
            return
           // throw new BadRequestError(`NBA team already exist in db`);
        }
        const result = await db.query(
            `INSERT INTO teams (id, 
                name,
                nickname,
                code,
                city,
                logo,
                nba_franchise) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) 
     RETURNING id, 
               name, 
               nickname, 
               code, 
               city, 
               logo, 
               nba_franchise AS nbaFranchise`,
     [id, name, nickname, code, city, logo, nbaFranchise],
    )
    let team = result.rows[0];
    return team;
    }

    static async update(id, data){
        const { setCols, values } = sqlForPartialUpdate(data,
            {
                nickname: "nickname",
                logo: "logo",
                
            });
            const idVarIdx = "$" + (values.length + 1);

            const querySql = `UPDATE teams
                              SET ${setCols}
                              WHERE id = ${id}
                              RETURNING name,
                                        nickname,
                                        code,
                                        city,
                                        logo,
                                        nba_franchise AS "nbaFranchise"`;

            const result = await db.query(querySql, [...values, id]);
            const team = result.rows[0];
            return team;
    
    }


    static async remove(id) {
        const result = await db.query(`
        DELETE FROM teams
        WHERE id = $1
        RETURNING id`, 
        [id],
        );
        const deletedTeam = result.rows[0];
        return deletedTeam;
    }
}

module.exports = Team;