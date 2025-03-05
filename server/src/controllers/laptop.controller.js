import Laptop from '../models/laptop.model.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
import { ApiResponse } from '../helpers/responseHandler.js'
import { errorHandler } from '../helpers/errorHandler.js'

export const addLaptop = asyncHandler(async (req,res) => {
    if(!req.body){
        return errorHandler(res, 400, 'body is empty')
    }

    const {serialNo, name, brand } = req.body;

    if(!serialNo || !name || !brand){
        return errorHandler(res, 400, "All fields required")
    }

    const existingLaptop = await Laptop.findOne({ serialNo });
    if (existingLaptop) {
      return handleError(res, 400, 'Laptop with this serial number already exists');
    }

    const newLaptop = new Laptop({
        name,
        brand,
        serialNo
    })

    await newLaptop.save()
    return ApiResponse(res,200,'Laptop added successfully',newLaptop)
});


export const getLaptop = asyncHandler(async(req,res) => {
    const allLaptop = await Laptop.find({})

    if(allLaptop.length === 0){
        return errorHandler(res, 200, 'No laptop added yet')
    }

    return ApiResponse(res,200, 'Laptop sent',allLaptop)
})

export const updateLaptop = asyncHandler(async(req,res) => {
    if(!req.params || !req.body){
        return errorHandler(res, 400, ' please provide id and update value ')
    }

    const { id } = req.params
    const { updateValue } = req.body
   
    if(!id){
        return errorHandler(res,400,'laptop id is needed')
    }

    const laptop = await Laptop.findById({_id:id})

    if(!laptop){
        return errorHandler(res, 401, 'laptop not found')
    }

    const updateLaptop = await Laptop.findByIdAndUpdate({_id:id},{status: updateValue}, {runValidators:true, new:true})
    return ApiResponse(res, 200, "laptop updated", updateLaptop)
})

export const deleteLaptop = asyncHandler(async(req,res) => {
    if(!req.params){
        return errorHandler(res, 400, 'laptop id is required')
    }

    const { id } = req.params
    
    const deleteLaptop = await Laptop.findByIdAndDelete({_id:id})
    if(!deleteLaptop){
        return errorHandler(res, 400, 'laptop not found')
    }

    return ApiResponse(res, 200, 'laptop delete successfully', id)
})