import Joi from "joi";

// Email schema for forgot password
export const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required"
  }),
});

// Schema for resetting password
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "any.required": "Token is required"
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "New password is required"
  }),
});
