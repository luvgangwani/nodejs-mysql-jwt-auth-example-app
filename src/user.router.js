const { validateToken } = require("./middleware/auth");
const { createUser, getUsers, getUserById, updateUser, deleteUser, login } = require("./user.controller");
const router = require("express").Router();

router.post('/', createUser);
router.get('/', validateToken, getUsers);
router.get('/:id', validateToken, getUserById);
router.put('/', validateToken, updateUser);
router.delete('/:id', validateToken, deleteUser);
router.post('/login', login);

module.exports = router;
