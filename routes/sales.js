'use-strict'
const express = require('express')
const router = express.Router()
const salesService = require('../api/sale.service')

/* GET products listing. */
router.get('/', function (req, res, next) {
  const showDeleted = req.body.showDeleted
  salesService.getAll(showDeleted).then(ret => { res.send(ret) })
})

router.get('/:uid', function (req, res, next) {
  const uid = req.params.uid
  salesService.getSalesByEmployee(uid).then(ret => { res.send(ret) })
})

// Sales routers
router.post('/sell', insertSale)
router.patch('/', updateSale)
router.delete('/:uid', removeSale)

async function insertSale (req, res, next) {
  try {
    const insertedInDBFlag = await salesService.insertSaleInDB(req.body)
    res.send(insertedInDBFlag)
  } catch (err) {
    res.send(err)
  }
}

async function updateSale (req, res, next) {
  const uid = req.body.uid

  // Check DB to see if user exists
  const saleExistsInDB = await salesService.checkIfSaleExists(uid)

  try {
    if (!saleExistsInDB) throw "Sale don't exist in DB"

    await salesService.updateSaleInDB(req.body.newInfo)

    res.send(await salesService.getSaleInfo(uid))
  } catch (err) {
    res.send(err)
  }
}

async function removeSale (req, res, next) {
  const uid = req.params.uid

  try {
    await salesService.setDeletedInDB(uid)
    res.send('OK')
  } catch (err) {
    res.send(err)
  }
}

module.exports = router
