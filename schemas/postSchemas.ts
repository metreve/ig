import * as yup from "yup";

export const postSchema = yup.object({
  caption: yup.string().required().max(2200),
});