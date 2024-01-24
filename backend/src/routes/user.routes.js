import { Router } from "express";
import { changePassword, changeUserDetails, getCurrentUser, loginUser, logout, refreshAccessToken, registerUser } from "../controller/user.controller.js";
import { verifyJWt } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/logout').post(verifyJWt, logout)

router.route('/refresh-token').post(refreshAccessToken)

router.route('/passwordChange').post(changePassword)

router.route("/getCurrentUser").get(getCurrentUser)

router.route("/edit-details").patch(changeUserDetails)

export default router;