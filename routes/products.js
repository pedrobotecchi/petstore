'use-strict'
const express = require('express')
const router = express.Router()
const productService = require('../api/product.service')

/* GET products listing. */
router.get('/', function (req, res, next) {
  const showDeleted = req.body.showDeleted
  productService.getAll(showDeleted).then(ret => { res.send(ret) })
})

/* GET product by id. */
router.get('/:uid', function (req, res, next) {
  const uid = req.params.uid
  productService.getProductByID(uid).then(ret => { res.send(ret) })
})

// Another Routes
router.put('/insert', insertProduct)
router.patch('/', updateProduct)
router.delete('/:uid', removeProduct)

async function insertProduct (req, res, next) {
  const name = req.body.name

  const uid = await productService.getUID(name)
  // Check DB to see if product name exists

  try {
    if (uid) throw 'Product already inserted'

    const insertedInDBReturn = await productService.insertProductInDB(req.body)

    res.send(insertedInDBReturn)
  } catch (err) {
    res.send(err)
  }
}

async function updateProduct (req, res, next) {
  const uid = req.body.uid

  // Check DB to see if user exists
  const productExistsInDB = await productService.checkIfProductExists(uid)

  try {
    if (!productExistsInDB) throw "Product don't exist in DB"

    await productService.updateProductInDB(req.body.newInfos, uid)

    res.send(await productService.getProductInfo(uid))
  } catch (err) {
    res.send(err)
  }
}

async function removeProduct (req, res, next) {
  const uid = req.params.uid
  try {
    await productService.setDeletedInDB(uid)
    res.send('OK')
  } catch (err) {
    res.send(err)
  }
}

module.exports = router
