const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { create, getUsers, getUserById, update, deleteUser, getUserByUsername } = require("./user.service");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const user = req.body;
        const salt = genSaltSync(10);

        user.password = hashSync(user.password, salt);

        create(user, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err,
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err,
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    getUserById: (req, res) => {
        getUserById(req.params.id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err,
                })
            }
            return res.status(200).json({
                success: 1,
                data: results[0],
            })
        })
    },

    login: (req, res) => {
        const credentials = req.body;

        getUserByUsername(credentials.username, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                })
            }

            if (!results) {
                return res.status(403).json({
                    success: 0,
                    message: "Username does not exist!",
                });
            }

            const comparisonResult = compareSync(credentials.password, results.password);

            if (comparisonResult) {
                // set this to undefined as we don't want this to be a part of the token
                results.password = undefined;

                const token = sign({result: results}, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                });

                return res.json({
                            success: 1,
                            message: 'Log in succesful!',
                            token,
                        });

            } else {
                return res.json({
                    success: 0,
                    message: 'Password incorrect.'
                });
            }
        })
    },

    updateUser: (req, res) => {
        update(req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err,
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    deleteUser: (req, res) => {
        deleteUser(req.params.id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err,
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },
}
