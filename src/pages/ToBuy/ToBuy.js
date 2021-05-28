import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import CustomAppbar from "../../components/CustomAppbar";
import TobuyItemCard from "../../components/TobuyItemCard";

const useStyles = makeStyles({
  root: {
    margin: "1rem",
  },
  formContainer: {
    maxWidth: 400,
    margin: "1rem auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  container: {
    maxWidth: 400,
    margin: "1rem auto",
  },
});

const item = [{ name: "name" }, { name: "name" }, { name: "name" }];

function ToBuy() {
  const classes = useStyles();
  return (
    <Box>
      <CustomAppbar name="To Buy" />
      <Box className={classes.root}>
        <Formik
          initialValues={{
            name: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <TextField
                variant="outlined"
                id="name"
                label="To buy"
                style={{ width: 250 }}
                values={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </form>
          )}
        </Formik>
        <Box className={classes.container}>
          {item.map((item, idx) => (
            <TobuyItemCard key={idx} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ToBuy;
