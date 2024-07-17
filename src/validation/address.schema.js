import joi from "joi"

export const addressSchema = joi.object({
  street: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  postalCode: joi.string().required(),
});
export const none  =
{}