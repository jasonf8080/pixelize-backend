//General Errors
const errorHandler = (err, req, res, next) => {
    res.status(500).send({message: 'Something went wrong, Internal Server Error'})
};

module.exports = errorHandler;
