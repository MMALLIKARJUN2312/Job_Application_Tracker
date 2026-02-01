const errorHandler = async (error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        status : error.status || "error",
        message : error.message || "Internal Server Error"
    })
}

export default errorHandler;