'use-strict'
const config = require('../config')
const jwt = require('jsonwebtoken')

const db = require('../schema/employee')

const User = db.Mongoose.model('employees', db.Employees, 'employees')

module.exports = {
  authenticate,
  getAll,
  omitPassword,
  checkIfUserExists,
  insertUserInDB,
  updateUserInDB,
  getUID,
  getUserInfo,
  setDeletedInDB
}

async function authenticate ({ user, password }) {
  let loginAccepted = false
  let uid = null
  await User.find({ user: user })
    .then(results => {
      if (results.length > 0) {
        const userFound = results[0]
        uid = userFound._id
        loginAccepted = userFound.password === password
      }
    })

  if (!loginAccepted) throw 'Username or password is incorrect'

  // UPDATE lastLogin to actual Date
  await User.updateOne({ _id: uid },
    { $set: { lastLogin: new Date() } })
    .then(results => results)

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '1d' })

  return {
    user,
    token
  }
}

async function insertUserInDB (user) {
  // return await User.insertOne(user).then(results => results);
  user.lastLogin = null
  const newUser = new User(user)

  try {
    await newUser.save()
    return newUser;
  } catch (err) {
    return err;
  }
}

async function setDeletedInDB (uid) {
  // Actually it's not deleted, its marked as deleted in the DB
  await User.updateOne({ _id: uid },
    { $set: { deleted: true } })
    .then(results => results)
}

async function updateUserInDB (user, uid) {
  // UPDATE user with actual infos
  await User.updateOne({ _id: uid },
    { $set: user })
    .then(results => results)
}

async function checkIfUserExists (user) {
  const userExistsInDB = await User.find({ user: user })
    .then(results => results.length > 0)
  return userExistsInDB
}

async function getAll (showDeleted) {
  let users = null
  if (showDeleted) {
    await User.find()
      .then(results => { users = results })
    return users
  }

  await User.find({ deleted: { $exists: false } })
    .then(results => { users = results });

  return users
}

// helper functions

async function getUID (user) {
  const uid = await User.find({ user: user })
    .then(results => results[0]._id)

  return uid
}

async function getUserInfo (uid) {
  const info = await User.find({ _id: uid })
    .then(results => results[0])

  return omitPassword(info)
}

function omitPassword (userInfo) {
  // not working :
  // const { password, ...userWithoutPassword } = user;

  const { _id, user, name, lastLogin } = userInfo
  return { _id: _id, user: user, name: name, lastLogin: lastLogin }
}
