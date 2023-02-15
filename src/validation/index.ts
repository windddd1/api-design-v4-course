import Joi from 'joi';

export const schemas = {
  userSchema: Joi.object().keys({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    fullname: Joi.string().max(255).required(),
    avatar: Joi.string(),
    birthday: Joi.date()
  }),
  loginSchema: Joi.object().keys({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
  }),
  postSchema: Joi.object().keys({
    title: Joi.string().max(512).required(),
    body: Joi.string().required(),
  }),
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
}),
}