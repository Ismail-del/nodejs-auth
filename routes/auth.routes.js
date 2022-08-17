import express from 'express';
import verifySignUp from '../middleware/verifySignUp.js';
import {signIn, signUp} from '../controllers/auth.controller.js'; 


const router = express.Router();


router.post('/tutorials/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], signUp);
router.post('/tutorials/signin', signIn)

export default router;
