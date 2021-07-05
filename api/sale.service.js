'use-strict'
const db = require('../schema/sale')

const Sale = db.Mongoose.model('sales', db.Sales, 'sales')

module.exports = {
  getAll,
  insertSaleInDB,
  checkIfSaleExists,
  updateSaleInDB,
  getSaleInfo,
  getSalesByEmployee,
  setDeletedInDB
}

async function getSalesByEmployee (uid) {
  let sales = null
  await Sale.find({ uid_client: uid })
    .then(results => { sales = results })

  return sales
}

async function insertSaleInDB (sale) {
  // return await User.insertOne(user).then(results => results);
  const newSale = new Sale(sale)
  newSale.saleDt = new Date(newSale.saleDt)
  try {
    await newSale.save()
    return newSale;
  } catch (err) {
    return err;
  }
}

async function updateSaleInDB (sale) {
  // UPDATE sale with actual infos
  await Sale.updateOne({ _id: sale.uid },
    { $set: sale })
    .then(results => results)
}

async function getSaleInfo (uid) {
  const info = await Sale.find({ _id: uid })
    .then(results => results[0])

  return info
}

async function checkIfSaleExists (uid) {
  const saleExistsInDB = await Sale.find({ _id: uid })
    .then(results => results.length > 0)

  return saleExistsInDB
}

async function setDeletedInDB (uid) {
  // Actually it's not deleted, its marked as deleted in the DB
  await Sale.updateOne({ _id: uid },
    { $set: { deleted: true } })
    .then(results => results)
}

async function getAll (showDeleted) {
  let sales = null

  if (showDeleted) {
    await Sale.find()
      .then(results => { sales = results })
    return sales
  }

  await Sale.find({ deleted: { $exists: false } })
    .then(results => { sales = results })

  return sales
}
