import Joi from "joi";

import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);
export const schemaPost = Joi.object({
  id: Joi.string()
    .alphanum()
    .pattern(/^J\d{3}/)
    .required(),
  name: Joi.string()
    .valid("Front-End", "JAVA", "Back-End", "Node", "AWS", "C++")
    .required(),
  lecturer: Joi.string().valid("Vasya", "Olya", "Vova").required(),
  hours: Joi.number().integer().min(100).max(600).required(),
});
export const schemaPut = Joi.object({
  id: Joi.string()
    .alphanum()
    .pattern(/^J\d{3}/),
  name: Joi.string().valid(
    "Front-End",
    "JAVA",
    "Back-End",
    "Node",
    "AWS",
    "C++"
  ),
  lecturer: Joi.string().valid("Vasya", "Olya", "Vova"),
  hours: Joi.number().integer().min(100).max(600),
});
export const schemaUser = Joi.string().email().required();
const passwordSchema = joiPassword
  .string()
  .min(8)
  .minOfSpecialCharacters(1)
  .minOfLowercase(1)
  .minOfUppercase(1)
  .minOfNumeric(1)
  .noWhiteSpaces()
  .onlyLatinCharacters()
  .doesNotInclude(["password"], ["12345"])
  .messages({
    "password.minOfUppercase":
      "{#label} should contain at least {#min} uppercase character",
    "password.minOfSpecialCharacters":
      "{#label} should contain at least {#min} special character",
    "password.minOfLowercase":
      "{#label} should contain at least {#min} lowercase character",
    "password.minOfNumeric":
      "{#label} should contain at least {#min} numeric character",
    "password.noWhiteSpaces": "{#label} should not contain white spaces",
    "password.onlyLatinCharacters":
      "{#label} should contain only latin characters",
    "password.doesNotInclude": "{#label} is too common",
  });

export const schemaAccount = Joi.object({
  email: Joi.string().email().required(),
  password: passwordSchema,
});
