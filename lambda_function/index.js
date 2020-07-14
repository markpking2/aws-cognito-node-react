const { Pool } = require("pg");

exports.handler = async (event, context) => {
    const pool = new Pool({
        user: process.env.RDS_USERNAME,
        host: process.env.RDS_HOSTNAME,
        database: process.env.RDS_DB_NAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_DB_PORT,
    });
    return new Promise((resolve, reject) => {
        const email =
            event &&
            event.request &&
            event.request.userAttributes &&
            event.request.userAttributes.email;
        async () => {};
        if (email) {
            pool.query(`SELECT email, id from USERS WHERE email='${email}'`)
                .then((query) => {
                    if (query.rows.length) {
                        event.response = {
                            claimsOverrideDetails: {
                                claimsToAddOrOverride: {
                                    db_user_id: query.rows[0].id,
                                },
                            },
                        };
                        resolve(event);
                        if (!pool.ended) {
                            pool.end();
                        }
                        return;
                    } else {
                        pool.query(
                            `INSERT INTO users (email) VALUES ('${email}')`
                        )
                            .then((id) => {
                                event.response = {
                                    claimsOverrideDetails: {
                                        claimsToAddOrOverride: {
                                            db_user_id: id,
                                        },
                                    },
                                };
                                resolve(event);
                                if (!pool.ended) {
                                    pool.end();
                                }
                                return;
                            })
                            .catch((err) => {
                                console.log(err);
                                reject(err);
                                if (!pool.ended) {
                                    pool.end();
                                }
                                return;
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                    if (!pool.ended) {
                        pool.end();
                    }
                    return;
                });
        } else {
            if (!pool.ended) {
                pool.end();
            }
            resolve(event);
        }
    });
};
