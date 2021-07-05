'use-strict'
const db = require('../schema/client')
const Client = db.Mongoose.model('clients', db.Clients, 'clients')

module.exports = {
  getAll,
  checkIfClientExists,
  insertClientInDB,
  updateClientInDB,
  getUID,
  getClientInfo,
  getClientByID,
  setDeletedInDB
}

async function insertClientInDB (client) {
  // return await User.insertOne(user).then(results => results);
  const newClient = new Client(client)

  try {
    await newClient.save()
    return newClient
  } catch (err) {
    return err;
  }
}

async function updateClientInDB (client, uid) {
  // UPDATE user with actual infos

  await Client.updateOne({ _id: uid },
    { $set: client })
    .then(results => results)
}

async function checkIfClientExists (cpf) {
  const clientExistsInDB = await Client.find({ cpf: cpf })
    .then(results => results.length > 0)

  return clientExistsInDB
}

async function getAll () {
  let clients = null
  await Client.find()
    .then(results => { clients = results })

  return clients
}

async function getClientByID (uid) {
  let client = null
  await Client.find({ _id: uid })
    .then(results => { client = results })

  return client;
}

async function setDeletedInDB (uid) {
  // Actually it's not deleted, its marked as deleted in the DB
  await Client.updateOne({ _id: uid },
    { $set: { deleted: true } })
    .then(results => results)
}
// helper functions

async function getUID (cpf) {
  const uid = await Client.find({ cpf: cpf })
    .then(results => results[0]._id)

  return uid
}

async function getClientInfo (uid) {
  const info = await Client.find({ _id: uid })
    .then(results => results[0])

  return info
}
