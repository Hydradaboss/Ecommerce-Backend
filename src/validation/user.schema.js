import Joi from "joi";

const defined = Joi.string()
  .regex(/^0\d{10}$/)
  .required();
const baseUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  mobile: defined,
  role: Joi.string().valid("admin", "user"),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),
});

export const signUpSchema = Joi.object({
  firstName: baseUserSchema.extract("firstName"),
  lastName: baseUserSchema.extract("lastName"),
  email: baseUserSchema.extract("email"),
  password: baseUserSchema.extract("password"),
  mobile: baseUserSchema.extract("mobile"),
}).options({ presence: "required" });

export const loginSchema = Joi.object({
  email: baseUserSchema.extract("email"),
  password: baseUserSchema.extract("password")
}).options({presence: "required"})