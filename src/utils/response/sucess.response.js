// Function to send success response
exports.sendSuccessResponse = (res, data="",statusCode,message = 'Success') => {
    res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
};
