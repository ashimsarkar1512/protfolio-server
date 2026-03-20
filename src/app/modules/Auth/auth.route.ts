import { Router } from 'express';



import auth from '../../utils/auth';
import { userValidations } from '../user/user.validation';
import authSchemaValidation from '../../utils/authSchemaValidation';
import { authControllers } from '../Auth/auth.controller';

const authRoute = Router();

// create a new user
authRoute.post("/register", authSchemaValidation(userValidations.createUserValidation), authControllers.registerNewUser);

// login user
authRoute.post("/login", authSchemaValidation(userValidations.loginUserValidation), authControllers.loginUser)
authRoute.get("/me", auth(), authControllers.get_me)
authRoute.get("/overview", authControllers.get_overview)




export default authRoute;