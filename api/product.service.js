'use-strict'
const db = require('../schema/product')

const Product = db.Mongoose.model('products', db.Products, 'products')

module.exports = {
  getAll,
  getProductByID,
  checkIfProductExists,
  insertProductInDB,
  updateProductInDB,
  getUID,
  getProductInfo,
  setDeletedInDB
}

async function insertProductInDB (product) {
  // return await User.insertOne(user).then(results => results);
  const newProduct = new Product(product)

  try {
    await newProduct.save();
    return newProduct;
  } catch (err) {
    return err;
  }
}

async function setDeletedInDB (uid) {
  // Actually it's not deleted, its marked as deleted in the DB
  await Product.updateOne({ _id: uid },
    { $set: { deleted: true } })
    .then(results => results)
}

async function updateProductInDB (product, uid) {
  // UPDATE user with actual infos

  await Product.updateOne({ _id: uid },
    { $set: product })
    .then(results => results)
}

async function checkIfProductExists (uid) {
  const productExistsInDB = await Product.find({ _id: uid })
    .then(results => results.length > 0)

  return productExistsInDB
}

async function getAll (showDeleted) {
  let products = null

  if (showDeleted) {
    await Product.find()
      .then(results => { products = results })
    return products
  }

  await Product.find({ deleted: { $exists: false } })
    .then(results => { products = results })

  return products
}

async function getProductByID (uid) {
  let product = null

  await Product.find({ _id: uid })
    .then(results => { product = results })

  return product;
}

// helper functions

async function getUID (name) {
  const uid = await Product.find({ name: name })
    .then(results => results.length > 0 ? results[0]._id : false)

  return uid
}

async function getProductInfo (uid) {
  const info = await Product.find({ _id: uid })
    .then(results => results[0])

  return info
}
