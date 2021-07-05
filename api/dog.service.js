'use-strict'
const db = require('../schema/dog')

const Dog = db.Mongoose.model('dogs', db.Dogs, 'dogs')

module.exports = {
  getAll,
  checkIfDogExists,
  insertDogInDB,
  updateDogInDB,
  getUID,
  getDogInfo,
  getDogsByClient,
  setDeletedInDB
}

async function getDogsByClient (uid) {
  let dogs = null

  await Dog.find({ uid_client: uid })
    .then(results => { dogs = results })

  return dogs
}

async function setDeletedInDB (uid) {
  // Actually it's not deleted, its marked as deleted in the DB
  await Dog.updateOne({ _id: uid },
    { $set: { deleted: true } })
    .then(results => results)
}

async function insertDogInDB (dog) {
  const newDog = new Dog(dog)
  try {
    await newDog.save()
    return newDog;
  } catch (err) {
    return err
  }
}

async function updateDogInDB (dog, uid) {
  // UPDATE user with actual infos
  await Dog.updateOne({ _id: uid },
    { $set: dog })
    .then(results => results)
}

async function checkIfDogExists (dog, uid_client) {
  const dogExistsInDB = await Dog.find({ name: dog.name, uid_client: uid_client })
    .then(results => results.length > 0)
  return dogExistsInDB
}

async function getAll (showDeleted) {
  let dogs = null

  if (showDeleted) {
    await User.find()
      .then(results => { dogs = results })
    return dogs
  }

  await Dog.find({ deleted: { $exists: false } })
    .then(results => { dogs = results })

  return dogs
}

// helper functions

async function getUID (uid_client, dogName) {
  const uid = await Dog.find({ uid_client: uid_client, name: dogName })
    .then(results => results[0]._id)
  return uid
}

async function getDogInfo (uid) {
  const info = await Dog.find({ _id: uid })
    .then(results => results[0])

  return info
}
