import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  makeStyles,
  TextField,
} from "@material-ui/core";
import CustomAppbar from "../../components/CustomAppbar";
import AddIcon from "@material-ui/icons/Add";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import axios from "../../api/index";

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
  formContainer: {
    maxWidth: 400,
    margin: "1rem auto",
  },
}));

function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <CustomAppbar name="In stock" />
      <Box className={classes.root}>
        <AddNew open={open} setOpen={setOpen} />
        <Box className={classes.container}></Box>
        <Fab
          className={classes.icon}
          color="secondary"
          size="large"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default Home;

const AddNew = ({ open, setOpen }) => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      onClose={() => {
        setOpen(false);
      }}
      ref={descriptionElementRef}
    >
      <DialogTitle id="scroll-dialog-title">Add new Item</DialogTitle>
      <DialogContent>
        <Box className={classes.formContainer}>
          <Formik
            initialValues={{
              name: "",
              quantity: "",
              picURL: "",
            }}
            onSubmit={async (values) => {
              const { name, quantity, picURL } = values;
              const payload = {
                name,
                quantity,
                picURL,
                userId: auth.userData.uniqueId,
              };
              axios
                .post("/api/instock", payload, {
                  headers: {
                    Auth: auth.token,
                  },
                })
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
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
      </DialogContent>
    </Dialog>
  );
};
