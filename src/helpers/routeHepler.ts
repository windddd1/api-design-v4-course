

export const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body)
    if(validatorResult.error) {
      return res.status(400).json(validatorResult.body)
    } else {
      // if (!req.value) req.value = {}
      // if (!req.value['params']) req.value.params = {}
      // req.value.body = validatorResult.value
      next()
    }
  }
}

export const validateParam = (schema, key) => {
  return (req, res, next) => {
      const validatorResult = schema.validate({param: req.params[key]})

      if (validatorResult.error) {
          return res.status(400).json(validatorResult.error)
      } else {
          // if (!req.value) req.value = {}
          // if (!req.value['params']) req.value.params = {}

          // req.value.params[key] = req.params[key]
          next()
      }
  }
}