const error =  (err, req, res, next) => {
    res.status(err.status).send(err.message)
}
export default error