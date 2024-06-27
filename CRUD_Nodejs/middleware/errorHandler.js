const {constants} = require('../constants');
const errorHandler = (err, req, res, next) => {
    console.log(err);
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                status: statusCode,
                title : "Validation Error",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                status: statusCode,
                title : "Not Found",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
        
            break;
        case constants.UNAUTHORIZED:
            res.json({
                status: statusCode,
                title : "Unauthorized",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                status: statusCode,
                title : "Forbidden",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                status: statusCode,
                title : "Server Error",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
        default:
            console.log("All good");
            break;
    }
}

module.exports = errorHandler;