import express from 'express';
import { create, findAll, findOne, update, deleteTutorial } from '../controllers/tutorial.controller.js';


const router = express.Router();

router.post('/tutorials', create);
router.get('/tutorials', findAll);
router.get('/tutorials/:id', findOne);
router.put('/tutorials/:id', update);
router.delete('/tutorials/:id', deleteTutorial);

export default router;