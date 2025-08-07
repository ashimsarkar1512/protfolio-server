import { Router } from 'express';
import { authControllers } from './auth.controller';
import checkSchemaValidation from '../../utils/checkSchemaValidation';
import { userValidations } from '../user/user.validation';
import auth from '../../utils/checkUserTokenIsValid';
const authRoute = Router();

// create a new user
authRoute.post("/register", checkSchemaValidation(userValidations.createUserValidation), authControllers.registerNewUser);

// login user
authRoute.post("/login", checkSchemaValidation(userValidations.loginUserValidation), authControllers.loginUser)
authRoute.get("/me", auth(), authControllers.get_me)
authRoute.get("/overview", authControllers.get_overview)




export default authRoute;