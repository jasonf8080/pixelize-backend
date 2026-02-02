//Routes that do not exist
const notFound = (req, res, next) => {
   res.status(404).send({message: 'Route does not exist'})
};

module.exports = notFound;
