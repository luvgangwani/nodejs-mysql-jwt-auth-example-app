const pool = require('../config/database')

module.exports = {
    create: (data, callBack) => {

        const {
            firstName,
            lastName,
            username,
            password,
            contact,
        } = data;
        pool.query(
            `insert into registration(firstName, lastName, username, password, contact)
             values(?, ?, ?, ?, ?)
            `,
            [
                firstName,
                lastName,
                username,
                password,
                contact,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }

                return callBack(null, results);
            }
        )
    },

    getUsers: (callBack) => {
        pool.query(
            `select firstName, lastName, username, contact from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }

                return callBack(null, results);
            }
        )
    },

    getUserById: (id, callBack) => {
        pool.query(
            `select firstName, lastName, username, contact from registration where id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getUserByUsername: (username, callBack) => {
        pool.query(
            `select firstName, lastName, username, password, contact from registration where username=?`,
            [username],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },

    update: (data, callBack) => {
        const { id, firstName, lastName, username, contact } = data;

        pool.query(
            `update registration set firstName=?, lastName=?, username=?, contact=? where id=?`,
            [
                firstName,
                lastName,
                username,
                contact,
                id,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }

                return callBack(null, results);

            }
        )
    },
    
    deleteUser: (id, callBack) => {

        pool.query(
            `delete from registration where id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }

                return callBack(null, results);

            }
        )
    }
}
