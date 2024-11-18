const express = require('express');
const router = express.Router();
const {getAll, getOne , update, create , remove} = require('../controllers/users.controllers')


router.get('/',getAll)
router.get('/:id',getOne)
router.post('/',create)
router.put('/:id',update)
router.delete('/:id',remove)


module.exports = router