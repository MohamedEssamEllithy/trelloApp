import Joi from "joi";
const addTaskValidationSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().required(),
  status:Joi.string(),
  assignTo:Joi.string().email().required()
});
export {
    addTaskValidationSchema
}