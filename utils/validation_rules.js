const getRequiredValidations = (amount) => {
    const validations = []
    
    // Always require manager approval (Level 1)
    validations.push({
        level: 1,
        requiredRole: 'manager',
        description: 'Manager approval required'
    })
    
    // Over €500 - require financial director (Level 2)
    if (amount > 500) {
        validations.push({
            level: 2,
            requiredRole: 'financial-director',
            description: 'Financial Director approval required'
        })
    }
    
    // Over €2000 - require CFO (Level 3)
    if (amount > 2000) {
        validations.push({
            level: 3,
            requiredRole: 'cfo',
            description: 'CFO approval required'
        })
    }
    
    // Over €10000 - require CEO (Level 4)
    if (amount > 10000) {
        validations.push({
            level: 4,
            requiredRole: 'ceo',
            description: 'CEO approval required'
        })
    }
    
    return validations
}

module.exports = { getRequiredValidations }