const error =  (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({error: "something went wrong internally"})
}
export default error