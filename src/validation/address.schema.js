import joi from "joi"

export const addressSchema = joi.object({
  street: string().required(),
  city: string().required(),
  State: string().required(),
  postalCode: string().required(),
});