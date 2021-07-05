'use-strict'
const express = require('express')
const router = express.Router()
const userService = require('../api/user.service')

/* GET users listing. */
router.get('/', function (req, res, next) {
  const showDeleted = req.body.showDeleted
  userService.getAll(showDeleted).then(ret => {
    const usersWithoutPassword = ret.map(el => userService.omitPassword(el))
    res.send(usersWithoutPassword)
  })
})

// POST to insert users
router.post('/signup', insertUser)
router.patch('/', updateUser)
router.delete('/:uid', removeUser)

async function removeUser (req, res, next) {
  const uid = req.params.uid
  try {
    const ret = await userService.setDeletedInDB(uid)
    res.send(ret)
  } catch (err) {
    res.send(err)
  }
}

async function insertUser (req, res, next) {
  const user = req.body.user

  // Check DB to see if user exists
  const userExistsInDB = await userService.checkIfUserExists(user)

  try {
    if (userExistsInDB) throw 'User already inserted'

    const queryReturn = await userService.insertUserInDB(req.body)

    res.send(queryReturn);
  } catch (err) {
    res.send(err)
  }
}

async function updateUser (req, res, next) {
  const oldUser = req.body.oldUser;

  // Check DB to see if user exists
  const userExistsInDB = await userService.checkIfUserExists(oldUser);

  try {
    if (!userExistsInDB) throw "User don't exist in DB"

    // Get User ID from DB
    const uid = await userService.getUID(oldUser);
    await userService.updateUserInDB(req.body.newInfos, uid);

    res.send(await userService.getUserInfo(uid))
  } catch (err) {
    res.send(err)
  }
}

module.exports = router
