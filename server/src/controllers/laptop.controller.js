import Laptop from '../models/laptop.model.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
import { ApiResponse } from '../helpers/responseHandler.js'
import { errorHandler } from '../helpers/errorHandler.js'
import {addLaptopSchema, updateLaptopSchema} from '../validators/laptop.validator.js'

export const addLaptop = asyncHandler(async (req,res) => {
    const result = addLaptopSchema.safeParse(req.body)
    if(!result.success){
        return errorHandler(res, 400, "invalid input")
    }
    const {serialNo, model, brand } = result.data;

    if(!serialNo || !model || !brand){
        return errorHandler(res, 400, "All fields required")
    }

    const existingLaptop = await Laptop.findOne({ serialNo });
    if (existingLaptop) {
      return errorHandler(res, 400, 'Laptop with this serial number already exists');
    }

    const newLaptop = new Laptop({
        model,
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

    return ApiResponse(res, 200, 'Laptop sent', allLaptop)
})

export const updateLaptop = asyncHandler(async(req,res) => {
    const { id } = req.params
    
    const result = updateLaptopSchema.safeParse(req.body)
    if(!result.success){
        return errorHandler(res, 400, "invalid input")
    }
    const { updateValue } = result.data
   
    if(!id){
        return errorHandler(res,400,'laptop id is needed')
    }

    if(!updateLaptop){
        return errorHandler(res, 400, 'updateValue field is required')
    }

    const laptop = await Laptop.findById({_id:id})

    if(!laptop){
        return errorHandler(res, 401, 'laptop not found')
    }

    const updatedLaptop = await Laptop.findByIdAndUpdate({_id:id},{status: updateValue}, {runValidators:true, new:true})
    return ApiResponse(res, 200, "laptop updated", updatedLaptop)
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