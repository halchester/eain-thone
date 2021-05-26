import * as Yup from "yup";

export const addNewInstockItemValidation = Yup.object().shape({
  name: Yup.string()
    .max(100, "Cannot exceed more than 100 words!")

    .required("Must add name!"),
  quantity: Yup.number()
    .max(100, "Cannot exceed more than 100!")

    .required("Must add quantity!"),
});
