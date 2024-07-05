import { Router } from 'express';
import * as peopleController from '../controllers/peopleController';

const router = Router();

router.get('/', peopleController.getAllPeople);
router.get('/:id', peopleController.getPersonById);
router.post('/', peopleController.createPerson);
router.put('/:id', peopleController.updatePerson);
router.delete('/:id', peopleController.deletePerson);

export default router;