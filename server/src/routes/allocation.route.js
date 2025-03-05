import { Router } from "express";

const allocationRouter = Router()

allocationRouter.route('/:laptopId/:userId').post()
allocationRouter.route('/').get()
allocationRouter.route('/:id').patch().delete()

export default allocationRouter 