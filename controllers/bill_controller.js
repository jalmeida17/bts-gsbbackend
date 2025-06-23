const Bill = require('../models/bill_model')
const Validation = require('../models/validation_model')
const { uploadToS3 } = require('../utils/s3')
const { getRequiredValidations } = require('../utils/validation_rules')

const createBill = async (req, res) => {
    try {
        const { date, amount, description, status, type } = JSON.parse(req.body.metadata)
        const { id } = req.user
        
        // Handle file upload
        let proofUrl
        if (req.file) {
            proofUrl = await uploadToS3(req.file)
        } else {
            throw new Error('Proof image is required', { cause: 400 })
        }

        // Get required validations based on amount
        const requiredValidations = getRequiredValidations(amount)
        const maxLevel = Math.max(...requiredValidations.map(v => v.level))

        // Create the bill
        const bill = new Bill({ 
            date, 
            amount, 
            proof: proofUrl, 
            description, 
            status: 'pending',
            type, 
            user: id,
            maxValidationLevel: maxLevel
        })
        
        await bill.save()

        // Create validation records
        const validationPromises = requiredValidations.map(validation => {
            return new Validation({
                bill: bill._id,
                validationLevel: validation.level,
                requiredRole: validation.requiredRole
            }).save()
        })

        const validations = await Promise.all(validationPromises)
        
        // Add validation IDs to bill
        bill.validations = validations.map(v => v._id)
        await bill.save()

        res.status(201).json(bill)
    } catch (error) { 
        if (error['cause'] === 400) {
            res.status(400).json({ message: error.message })
        } else {
            console.error('Error creating bill:', error)
            res.status(500).json({ message: "Server error" })
        }
    }
}

// Get bills with validation info
const getBills = async (req, res) => {
    try {
        const { id, role, subRole } = req.user
        let bills

        if (role === 'admin') {
            bills = await Bill.find({})
                .populate('user', 'name email role subRole')
                .populate({
                    path: 'validations',
                    populate: {
                        path: 'validator',
                        select: 'name email'
                    }
                })
        } else {
            bills = await Bill.find({ user: id })
                .populate('user', 'name email role subRole')
                .populate({
                    path: 'validations',
                    populate: {
                        path: 'validator',
                        select: 'name email'
                    }
                })
        }
        
        res.status(200).json(bills)
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

const getBillById = async (req, res) => {
    try {
        const { id } = req.params
        const bill = await Bill.findById(id).populate('user', 'name email role subRole')
        if (!bill) {
            throw new Error('Bill not found', { cause: 404 })
        } else {
            res.status(200).json(bill)
        }
    } catch (error) {
        if (error['cause'] === 404) {
            res.status(404).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Server error" })
        }
    }
}

const updateBill = async (req, res) => {
    try {
        const { id } = req.params
        const { date, amount, proof, description, status, type } = req.body
        const bill = await Bill.findByIdAndUpdate(
            id,
            { date, amount, proof, description, status, type },
            { new: true }
        ).populate('user', 'name email role subRole')
        if (!bill) {
            throw new Error('Bill not found', { cause: 404 })
        } else {
            res.status(200).json(bill)
        }
    } catch (error) {
        if (error['cause'] === 404) {
            res.status(404).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Server error" })
        }
    }
}

const deleteBill = async (req, res) => {
    try {
        const { id } = req.params
        const bill = await Bill.findByIdAndDelete(id)
        if (!bill) {
            throw new Error('Bill not found', { cause: 404 })
        }
        res.status(200).json({ message: 'Bill deleted' })
    } catch (error) {
        if (error['cause'] === 404) {
            res.status(404).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Server error" })
        }
    }
}

module.exports = { createBill, getBills, getBillById, updateBill, deleteBill }