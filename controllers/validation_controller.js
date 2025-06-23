const Validation = require('../models/validation_model')
const Bill = require('../models/bill_model')

const validateBill = async (req, res) => {
    try {
        const { validationId } = req.params
        const { status, comments } = req.body // 'approved' or 'rejected'
        const { id: userId, subRole } = req.user

        // Find the validation
        const validation = await Validation.findById(validationId)
            .populate('bill')
        
        if (!validation) {
            return res.status(404).json({ message: 'Validation not found' })
        }

        // Check if user has the right role for this validation level
        if (validation.requiredRole !== subRole) {
            return res.status(403).json({ 
                message: `Only ${validation.requiredRole} can perform this validation` 
            })
        }

        // Check if validation is still pending
        if (validation.status !== 'pending') {
            return res.status(400).json({ 
                message: 'This validation has already been processed' 
            })
        }

        // Update validation
        validation.validator = userId
        validation.status = status
        validation.validationDate = new Date()
        validation.comments = comments || ''
        await validation.save()

        // Update bill status based on validation result
        const bill = validation.bill
        
        if (status === 'rejected') {
            bill.status = 'rejected'
            await bill.save()
        } else if (status === 'approved') {
            // Check if this was the last required validation
            const allValidations = await Validation.find({ bill: bill._id })
            const allApproved = allValidations.every(v => v.status === 'approved')
            
            if (allApproved) {
                bill.status = 'approved'
            } else {
                bill.currentValidationLevel = validation.validationLevel + 1
            }
            await bill.save()
        }

        res.status(200).json({ 
            message: 'Validation processed successfully',
            validation,
            billStatus: bill.status
        })

    } catch (error) {
        console.error('Error processing validation:', error)
        res.status(500).json({ message: "Server error" })
    }
}

const getPendingValidations = async (req, res) => {
    try {
        const { subRole } = req.user
        
        const pendingValidations = await Validation.find({
            requiredRole: subRole,
            status: 'pending'
        })
        .populate('bill')
        .populate('validator', 'name email')
        
        res.status(200).json(pendingValidations)
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = { validateBill, getPendingValidations }