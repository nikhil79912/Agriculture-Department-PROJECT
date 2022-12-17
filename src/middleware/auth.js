
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')

let Authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(403).send({ status: false, message: "token is required" })

        jwt.verify(token, "secreat_key for token", (error, decodedToken) => {
            if (error) {
                return res.status(401).send({ message: error.message })
            }
            else {
                req.token = decodedToken
                next()
            }
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// =============================================================================================


const Authorization = async function (req, res, next) {
    try {

        const userId = req.params.studentId
        if (!userId) return res.status(400).send({ status: false, message: "Student Id must be present" })

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Student Id is invalid" });

       
        const checkUserId = await marksModel.findOne({ "_id": userId, isDeleted: false })

        if (!checkUserId) {
            return res.status(400).send({ status: false, message: "already deleted" })
        }

        // console.log(req.token.teacherId)
        // console.log(checkUserId.teacherId)
        if (req.token.teacherId != checkUserId.teacherId) return res.status(403).send({ status: false, message: "Unauthorize Access....." });
        next()
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {Authenticate , Authorization}