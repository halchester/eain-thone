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
    color: "gray",
    textDecoration: "underline",
  },
  footer: {
    position: "fixed",
    left: 0,
    bottom: 30,
    width: "100%",
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
