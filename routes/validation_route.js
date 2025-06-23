const express = require('express')
const router = express.Router()
const validationController = require('../controllers/validation_controller')
const authenticationController = require('../controllers/authentication_controller')

// Get pending validations for current user's role
router.get('/pending', authenticationController.verifyToken, validationController.getPendingValidations)

// Validate a bill (approve/reject)
router.put('/:validationId', authenticationController.verifyToken, validationController.validateBill)

module.exports = router