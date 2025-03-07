import Allocation from "../models/allocation.model.js";
import User from "../models/user.model.js";
import Laptop from "../models/laptop.model.js";
import { asyncHandler } from '../helpers/asyncHandler.js'
import { ApiResponse } from '../helpers/responseHandler.js'
import { errorHandler } from '../helpers/errorHandler.js'

export const createAllocation = asyncHandler(async(req,res) => {
    const { laptopId, userId } = req.params
    if(!laptopId || !userId){
        return errorHandler(res, 400, "Laptop and user id's needed ")
    }
    const user = await User.findById({_id:userId})
    const laptop = await Laptop.findById({_id: laptopId})
    if(!user || !laptop){
        return errorHandler(res, 400, 'User and Laptop not found')
    }
    if(user.laptopBorrowed === 1 && laptop.status === 'ASSIGNED'){
        return errorHandler(res, 400, 'user cannot browwed and laptop is not available')
    }
    const newAllocation = new Allocation({
        laptopId,
        userId
    })

    user.laptopBorrowed = 1;
    user.laptops.push(newAllocation._id)

    laptop.status = 'ASSIGNED'
    await user.save()
    await laptop.save()

    await newAllocation.save()

    return ApiResponse(res, 201, 'Allocation created',newAllocation)
})

export const updateAllocation = asyncHandler(async(req,res) => {
    const { id, laptopId, userId } = req.params
    const { value } = req.body
    if(!id || !value || !laptopId || !userId){
        return errorHandler(res, 400, 'Ids and Value not found')
    }
    const user = await User.findById({_id:userId})
    const laptop = await Laptop.findById({_id: laptopId})
    if(!user || !laptop){
        return errorHandler(res, 400, 'User and Laptop not found')
    }
    const updateAllocation = await Allocation.findByIdAndUpdate({_id:id},{returnStatus: value},{new:true, runValidators:true})
    if(!updateAllocation){
        return errorHandler(res, 400, 'allocation not found')
    }
    user.laptopBorrowed = 0;
    user.laptops.pop()
    
    laptop.status = 'AVAILABLE'
    await user.save()
    await laptop.save()
    return ApiResponse(res, 200, 'Allocation updated', updateAllocation)
})

export const getAllocation = asyncHandler(async(req,res) => {
    const allocations = await Allocation.find({})
    if(allocations.length === 0){
        return ApiResponse(res, 200, 'Allocation is empty')
    }
    return ApiResponse(res, 200, 'All allocation',allocations)
})

export const deleteAllocation = asyncHandler(async(req,res) => {
    const { id } = req.params
    if(!id){
        return errorHandler(res, 400, 'Id not found')
    }
    const deletedAllocation = await Allocation.findByIdAndDelete({_id:id})
    if(!deletedAllocation){
        return errorHandler(res, 400, 'Allocation not found')
    }
    return ApiResponse(res, 200, 'alocation deleted', id) 
})