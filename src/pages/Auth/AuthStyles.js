import { makeStyles } from "@material-ui/core";

const AuthStyles = makeStyles({
  root: {
    marginTop: "5rem",
  },
  formContainer: {
    width: 300,
    margin: "2rem auto",
  },
  input: {
    marginBottom: "1rem",
  },
  link: {
    color: "black",
  },
});

export default AuthStyles;

export const signinInitialValues = {
  username: "",
  password: "",
};
export const registerInitialValues = {
  username: "",
  password: "",
  repassword: "",
};
