const express = require("express")
const { auth } = require("../middlewares/auth.middleware")
const { me, updateMe } = require("../controllers/profile.controller")

const router = express.Router()

router.get("/", auth, me)
router.put("/", auth, updateMe)

module.exports = router