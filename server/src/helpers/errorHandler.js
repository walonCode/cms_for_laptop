export const errorHandler = (res,statusCode,message,error=null) => {
    if(error){
        console.error(error) // for debugging purpose
    }
    return res.status(statusCode).json({
        success:false,
        message,
    })
}