import * as Yup from "yup";

export const addNewInstockItemValidation = Yup.object().shape({
  name: Yup.string()
    .max(100, "Cannot exceed more than 100 words!")

    .required("Must add name!"),
  quantity: Yup.number()
    .max(100, "Cannot exceed more than 100!")

    .required("Must add quantity!"),
});

export const addNewTobuyItemValidation = Yup.object().shape({
  name: Yup.string()
    .min("2", "Come on man!")
    .max("100", "Cannot exceed more than 100 words!")
    .required("Must add name!"),
});

export const checkMimeType = (event) => {
  // getting file object
  const { files } = event.target;
  // define message container
  let err = "";
  // list allow mime type
  const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
  // loop access array
  for (let x = 0; x < files.length; x += 1) {
    // compare file type find doesn't matach
    // eslint-disable-next-line
    if (types.every((type) => files[x].type !== type)) {
      // create error message and assign to container
      err += `${files[x].type} is not a supported format\n`;
    }
  }

  if (err !== "") {
    // if message not same old that mean has error
    event.target.value = null; // discard selected file
    console.log(err);
    return false;
  }
  return true;
};

export const maxSelectedFile = (e) => {
  const { files } = e.target;
  if (files.length > 1) {
    const msg = "Only 1 image can be uploaded at a time";
    e.target.value = null;
    console.log(msg);
    return false;
  }
  return true;
};

export const checkFileSize = (event) => {
  const files = event.target.files[0];
  const size = 2000000;
  let err = "";
  if (files.size > size) {
    err += `${files.type} is too large, please pick a smaller file\n`;
  }

  if (err !== "") {
    event.target.value = null;
    console.log(err);
    return false;
  }

  return true;
};
