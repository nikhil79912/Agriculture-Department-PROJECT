const isValidName = (name) => {
    if (/^[A-Za-z]{1,35}/.test(name)) return true
    return false
}

const isValidPassword = (password) => {
    if (/^.(?=.{6,})(?=.[a-zA-Z])(?=.\d)(?=.[!&$%&? "]).*$/.test(password)) return true
    return false
}

const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
}

module.exports = { isValidName, isValidPassword, isValidObjectId }