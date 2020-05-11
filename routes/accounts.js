const express = require('express')
const db = require('../data/dbConfig')
const router = express.Router()

// Test Route
/*
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      API: 'working'
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "Couldn't fulfill request"
    })
  }
})
*/

// POST: add new account to table
router.post('/', async (req, res) => {
  try {
    const {
      name,
      budget
    } = req.body
    const accountToAdd = {
      name,
      budget
    }
    const addAccount = await db('accounts').insert(accountToAdd)
    res.status(201).json({
      success: `added id: ${addAccount}`
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "couldn't fulfill request"
    })
  }
})

// GET: gets all accounts
router.get('/', async (req, res) => {
  try {
    const getAccounts = await db.select('*').from('accounts')
    res.status(200).json(getAccounts)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "couldn't fulfill request"
    })
  }
})

// GET: get account by id
router.get('/:id', async (req, res) => {
  try {
    const getAccount = await db.select('*').from('accounts').where({
      id: req.params.id
    })
    res.status(200).json(getAccount)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "couldn't fulfill request"
    })
  }
})

// PUT: updates account by id
router.put('/:id', async (req, res) => {
  try {
    const updateAccount = await db('accounts').where({
      id: req.params.id
    }).update(req.body)
    if (updateAccount) {
      res.status(200).json({
        success: "successfully updated"
      })
    } else {
      res.status(400).json({
        error: "error updating"
      })
    }
    console.log(updateAccount)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "couldn't fulfill request"
    })
  }
})

// DELETE: deletes account by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteAccount = await db('accounts').where({
      id: req.params.id
    }).del()
    if (deleteAccount) {
      res.status(200).json({
        success: "successfully deleted account"
      })
    } else {
      res.status(400).json({
        error: "error deleting account"
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "couldn't fulfill request"
    })
  }
})

module.exports = router