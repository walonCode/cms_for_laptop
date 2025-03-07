import { Router } from "express";
import { getAllocation,deleteAllocation,updateAllocation,createAllocation } from "../controllers/allocation.controller.js";

const allocationRouter = Router()

allocationRouter.route('/:laptopId/:userId').post(createAllocation)
allocationRouter.route('/').get(getAllocation)
allocationRouter.route('/:id').delete(deleteAllocation)
allocationRouter.route('/:id/:laptopId/:userId').patch(updateAllocation)

export default allocationRouter