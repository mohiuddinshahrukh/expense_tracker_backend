const validateRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length == 0) {
    return res.status(400).json({
      message: "No JSON body provided in request",
    });
  }
  next();
};
export default validateRequestBody;
