export const ApiResponse = (res,statusCode,message,data=null) => {
    return res.status(statusCode).json({
        success:statusCode >=200 && statusCode < 300,
        message,
        data
    })
}