class ErrorResponse extends Error {
    constructor(title, message, statusCode) {
        super(message);
        this.title = title;
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;