import Joi from "joi";

const defined = Joi.string().regex(/^0\d{10}$/).required();

const userSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  access_token: [Joi.string(), Joi.number()],
  mobile: defined,
  role: Joi.string().valid("admin", "user"),
  email: Joi.string().required().email({
    minDomainSegments: 2,
    tlds: { allow: ["com"] },
  }),
})
  .xor("password", "access_token")
  .with("password", "repeat_password");



  export default userSchema