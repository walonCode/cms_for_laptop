import { errorHandler } from "../helpers/errorHandler.js";

export const errorMiddleware = (err,req,res,next) => {
    console.error(err)
    errorHandler(res, 500, 'Internal server error');
}