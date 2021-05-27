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
import {
  addNewInstockItemValidation,
  checkFileSize,
  checkMimeType,
  maxSelectedFile,
} from "../../utils/formValidation";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  icon: {
    position: "fixed",
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
      <Fab
        className={classes.icon}
        color="secondary"
        size="large"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <CustomAppbar name="In stock" />
      <Box className={classes.root}>
        <AddNew open={open} setOpen={setOpen} />
        <Box className={classes.container}></Box>

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
  const [errorMessage, setErrorMessage] = useState("");
  const [imageURL, setImageURL] = useState("");

  const imageUploadHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (maxSelectedFile(e) && checkMimeType(e) && checkFileSize(e)) {
      const image = e.target.files[0];
      const data = new FormData();
      data.append("file", image);
      axios.post("/api/instock/upload", data).then((response) => {
        console.log(response.data);
        setErrorMessage("");
        setLoading(false);
        setImageURL(response.data.data);
      });
    } else {
      setLoading(false);
      setErrorMessage(
        "ဓါတ်ပုံ ၁ ပုံကိုပဲရွေးပါ ရွေးသောဓါတ်ပုံ file size ကြီးလို့မရပါ"
      );
    }
  };

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
            validationSchema={addNewInstockItemValidation}
            initialValues={{
              name: "",
              quantity: "",
              picURL: "",
            }}
            onSubmit={async (values) => {
              setLoading(true);
              const { name, quantity } = values;
              const payload = {
                name,
                quantity,
                picURL: imageURL,
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
                  setImageURL("");
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
            }}
          >
            {({
              handleSubmit,
              values,
              handleChange,
              errors,
              touched,
              handleBlur,
            }) => (
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
                  onBlur={handleBlur}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={Boolean(touched.name) && errors.name}
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
                  onBlur={handleBlur}
                  error={Boolean(touched.quantity) && Boolean(errors.quantity)}
                  helperText={Boolean(touched.quantity) && errors.quantity}
                />
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt="your pic"
                    style={{ marginBottom: "1rem", height: 150 }}
                  />
                ) : null}
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={imageUploadHandler}
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
                {errorMessage && (
                  <Typography
                    className={classes.input}
                    variant="h6"
                    color="secondary"
                    gutterBottom
                  >
                    {errorMessage}
                  </Typography>
                )}
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
