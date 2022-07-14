import express from "express";
const router = express.Router();
import {
  getAllUserAccounts,
  getCurrentUser,
  createNewUserAccount,
  loginUser,
  updateUserAccount,
  updateUserField,
  deleteUserAccount,
} from "../controllers/userAccountController.js";

router.route("/login").post(loginUser);

router
  .route("/")
  .get(getAllUserAccounts)
  .post(createNewUserAccount)
  .patch(updateUserField);

router.route("/currentUser").get(getCurrentUser);

router.route("/:id").patch(updateUserAccount).delete(deleteUserAccount);

export default router;
