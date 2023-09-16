import express from "express";
import {
  signUp,
  logIn,
  changePass,
  updateUser,
  deleteUser,
  softDeleteUser,
  logout,
} from "./user.controller.js";
import validation from "../../middleware/validation.js";
import { changePassValidationSchema, logInSchem, signUpValidationSchema,
   updateValidationSchema } from "./user.validation.js";
import auth from "../../middleware/auth.js";


const userRoutes = express.Router();
userRoutes.post("/signup",validation(signUpValidationSchema), signUp);
userRoutes.post("/login",validation(logInSchem),logIn)
userRoutes.patch("/changepass/:id",auth,validation(changePassValidationSchema), changePass);
userRoutes.patch("/update/:id",auth,validation(updateValidationSchema), updateUser);
userRoutes.delete("/delete/:id",auth, deleteUser);
userRoutes.delete("/softdelete/:id",auth,softDeleteUser)
userRoutes.get("/logout",logout)
export default userRoutes;
