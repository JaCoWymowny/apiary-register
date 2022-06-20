const express = require('express');
const {
  httpAddNewApiary,
  httpAddIncrementationData,
  registryData,
  incrementationData
} = require('../controllers/apiary.controller.ts')

const router = express.Router();

router.get('/registry-list', (req, res ) => {
  res.send(registryData)
});

router.get('/numbers-list', (req, res ) => {
  res.send(incrementationData)
});

router.post('/numbers-list', httpAddIncrementationData);

router.post('/registry-list', httpAddNewApiary);

module.exports = router;
