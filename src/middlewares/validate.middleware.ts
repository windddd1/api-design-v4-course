

export const validateBody = (schema) => (req, res, next) => {
  const validatorResult = schema.validate(req.body)
  if(validatorResult.error) {
    return res.status(400).json(validatorResult.body)
  }
  next()
}

export const validateParam = (schema, key) => (req, res, next) => {
  const validatorResult = schema.validate({param: req.params[key]})

  if (validatorResult.error) {
      return res.status(400).json(validatorResult.error)
  }
  next()
}