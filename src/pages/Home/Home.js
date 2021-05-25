import {
  Box,
  Button,
  Fab,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import CustomAppbar from "../../components/CustomAppbar";
import AddIcon from "@material-ui/icons/Add";
import { Formik } from "formik";

// function getModalStyle() {
//   const top = 0;
//   const left = 0;
//   const bottom = 30;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     bottom: `${bottom}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0.5rem",
  },
  icon: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  input: {
    marginBottom: "1rem",
  },
  modalContainer: {
    // margin: "1rem",
    // marginTop: "20rem",
  },
}));

function Home() {
  const classes = useStyles();
  // const [modalState, setModalState] = useState(false);

  return (
    <Box>
      <CustomAppbar name="In stock" />
      <Box className={classes.root}>
        <AddNew />
        <Box className={classes.container}></Box>
        <Fab
          className={classes.icon}
          color="secondary"
          size="large"
          // onClick={}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default Home;

const AddNew = () => {
  const classes = useStyles();

  return (
    <Box className={classes.modalContainer}>
      <Formik
        initialValues={{
          name: "",
          quantity: "",
          picURL: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, values, handleChange, errors }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              id="name"
              onChange={handleChange}
              value={values.name}
              label="Name"
              fullWidth
              className={classes.input}
            />
            <TextField
              variant="outlined"
              id="quantity"
              onChange={handleChange}
              value={values.quantity}
              label="Quantity"
              type="number"
              fullWidth
              className={classes.input}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => {
                console.log(e);
              }}
            />
            <label htmlFor="contained-button-file">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component="span"
                className={classes.input}
              >
                Upload photo?
              </Button>
            </label>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="outlined"
              className={classes.input}
            >
              Add to my basket
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
