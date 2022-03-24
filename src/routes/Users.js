const express = require("express")
const router = express.Router()
const {create,resetPassword,verify,howUser} = require("../controllers/Users")
const schemas = require("../validations/Users")
const validate = require("../middlewares/validate")

router.route("/sign").post(validate(schemas.createValidation),create)
router.route("/verify/:activationCode").get(verify)
router.route("/reset-password").post(validate(schemas.resetPasswordValidation),resetPassword)
router.route("/howUser").get(howUser)

module.exports = router;