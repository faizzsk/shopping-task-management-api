exports.sendSuccessResponse = (res, data="",statusCode,message = 'Success') => {
    res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
};
