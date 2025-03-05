import { Router } from 'express'
import { deleteLaptop, getLaptop, updateLaptop,addLaptop } from '../controllers/laptop.controller.js'
import { authMiddleware, authorize } from '../middlewares/auth.middleware.js'

const laptopRouter = Router()

laptopRouter.route('/').post(authMiddleware, authorize(['ADMIN']),addLaptop).get(getLaptop)
laptopRouter.route('/:id').patch(authMiddleware, authorize(['FACILITATOR']),updateLaptop).delete(authMiddleware, authorize(['ADMIN']),deleteLaptop)

export default laptopRouter 