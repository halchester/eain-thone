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
  Typography,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import CustomAppbar from "../../components/CustomAppbar";
import AddIcon from "@material-ui/icons/Add";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import axios from "../../api/index";
import { useQuery } from "react-query";
import { getAllInstockItemsOfUser } from "../../api/query";
import InstockItemCard from "../../components/InstockItemCard";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
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
  container: {
    maxWidth: 400,
    margin: "1rem auto",
  },
}));

function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

  const { data, error, isLoading } = useQuery(
    ["getAllInstockItemsOfUser", auth.token, auth.userData.uniqueId],
    getAllInstockItemsOfUser
  );

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
        {error ? (
          <Typography align="center" style={{ color: "red" }} variant="h6">
            Cannot fetch Data :({" "}
          </Typography>
        ) : isLoading ? (
          <CircularProgress />
        ) : (
          <Box className={classes.container}>
            {data.instockItems.map((item, i) => (
              <Grid key={i} item sm={12} md={12} lg={12}>
                <InstockItemCard item={item} />
              </Grid>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home;

const AddNew = ({ open, setOpen }) => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

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
              setLoading(true);
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
                .then(() => {
                  alert("Added");
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
            }}
          >
            {({ handleSubmit, values, handleChange, errors }) => (
              <form onSubmit={handleSubmit}>
                {loading ? (
                  <CircularProgress style={{ margin: "0.5rem" }} />
                ) : null}
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
