import jwt from "jsonwebtoken";

export const isAuth = () => {
  const token = localStorage.getItem("auth");

  const { REACT_APP_SECRET } = process.env;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, REACT_APP_SECRET);
      if (decodedToken._id) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
