'use-strict'
const express = require('express')
const router = express.Router()
const dogService = require('../api/dog.service')
const clientService = require('../api/client.service')

/* GET users listing. */
router.get('/', function (req, res, next) {
  const showDeleted = req.body.showDeleted
  dogService.getAll(showDeleted).then(ret => { res.send(ret) })
})

/* GET users listing. */
router.get('/:uid', function (req, res, next) {
  const uid = req.params.uid
  dogService.getDogsByClient(uid).then(ret => { res.send(ret) })
})

// Another routes
router.post('/insert', insertDog)
router.patch('/', updateDog)
router.delete('/:uid', removeDog)

async function removeDog (req, res, next) {
  const uid = req.params.uid
  try {
    await dogService.setDeletedInDB(uid)
    res.send('OK')
  } catch (err) {
    res.send(err)
  }
}

async function insertDog (req, res, next) {
  const cpf = req.body.cpf
  // Check DB to see if client exists
  const clientExistsInDB = await clientService.checkIfClientExists(cpf)

  try {
    if (!clientExistsInDB) throw 'Client is not in DB'
    // Get client uid
    const uid_client = await clientService.getUID(cpf)
    const dogInfo = req.body.dog
    dogInfo.uid_client = uid_client

    const dogExistsInDB = await dogService.checkIfDogExists(dogInfo, uid_client)
    if (dogExistsInDB) throw 'Dog is already inserted'

    const queryReturn = await dogService.insertDogInDB(dogInfo);
    res.send(queryReturn);
  } catch (err) {
    res.send(err);
  }
}

async function updateDog (req, res, next) {
  const clientCPF = req.body.clientCPF

  // Check DB to see if user exists
  const clientExistsInDB = await clientService.checkIfClientExists(clientCPF)

  try {
    if (!clientExistsInDB) throw "Client don't exist in DB"

    const uid_client = await clientService.getUID(clientCPF)

    // Get Dog UID ID from DB
    const uid = await dogService.getUID(uid_client, req.body.dogName)
    await dogService.updateDogInDB(req.body.newInfos, uid)

    res.send(await dogService.getDogInfo(uid))
  } catch (err) {
    res.send(err)
  }
}

module.exports = router
