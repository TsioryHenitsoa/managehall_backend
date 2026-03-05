import { Router } from 'express'
import * as salleController from '../controllers/salle.controller'

const router = Router()

router.get('/', salleController.getSalles)
router.get('/:id', salleController.getSalleById)
router.delete('/:id', salleController.deleteSalle)
router.put('/:id', salleController.updateSalle)
router.post('/', salleController.createSalle)


export default router