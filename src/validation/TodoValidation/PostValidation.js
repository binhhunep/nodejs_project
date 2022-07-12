import Joi from "joi";

const checkPost = (post) => {
  const Schema = Joi.object({
    title: Joi.string().min(10).max(50).required(),
    description: Joi.string().min(10).max(500),
    url: Joi.string(),
    status: Joi.any().valid("TO LEARN", "LEARNING", "LEARNED"),
  });
  return Schema.validate(post);
};

module.exports = checkPost;
