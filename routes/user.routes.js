import express from 'express';
import authJwt from '../middleware/authJwt.js';
import { adminBoard, allAccess, moderatorBoard, userBoard } from '../controllers/user.config.js';


const router = express.Router();


router.get('/test/all', allAccess);
router.get('/test/user', [authJwt.verifyToken], userBoard);
router.get('/test/mod', [authJwt.verifyToken, authJwt.isModerator], moderatorBoard);
router.get('/test/admin', [authJwt.verifyToken, authJwt.idAdmin], adminBoard);

export default router;