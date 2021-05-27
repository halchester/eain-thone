import React from "react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import axios from "../api/index";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { addNewInstockItemValidation } from "../utils/formValidation";

const cardStyles = makeStyles((theme) => ({
  root: {
    padding: "0.75rem",
    marginBottom: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    marginBottom: "1rem",
  },
  buttonContainer: {
    marginTop: "0.5rem",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const InstockItemCard = ({ item }) => {
  const classes = cardStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const auth = useSelector((state) => state.auth);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card elevation={3} className={classes.root}>
      <Box className={classes.container}>
        <p className="text-lg">{item.name}</p>
        <p className="text-lg text-green-700">
          Total : <strong>{item.quantity}</strong>
        </p>
      </Box>
      <p className="text-sm text-gray-400">
        {moment(item.createdAt).fromNow()}
      </p>
      <Divider style={{ margin: "0.5rem 0" }} />
      <Box className={classes.buttonContainer}>
        {item.picURL ? (
          <Button
            color="secondary"
            variant="outlined"
            size="small"
            onClick={handleOpen}
          >
            View Image
          </Button>
        ) : null}
        <Button
          style={{ marginLeft: "0.25rem" }}
          variant="contained"
          size="small"
          color="primary"
          onClick={() => setEditDialogOpen(true)}
        >
          Edit
        </Button>

        <Button
          color="secondary"
          variant="contained"
          size="small"
          style={{ marginLeft: "0.25rem" }}
          onClick={() => setDialogOpen(true)}
        >
          Delete
        </Button>

        {/* Down below dialog is for Delete action and Modal is for viewing image */}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <img
                src={item.picURL}
                alt=""
                style={{ height: "250px" }}
                className="rounded-3xl"
              />
            </div>
          </Fade>
        </Modal>

        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle id="alert-dialog-slide-title2">
            Edit for {item.name}
          </DialogTitle>
          {loading ? (
            <CircularProgress style={{ margin: "0.5rem 1rem" }} />
          ) : null}
          <DialogContent>
            <Formik
              validationSchema={addNewInstockItemValidation}
              initialValues={{
                name: item.name,
                quantity: item.quantity,
              }}
              onSubmit={async ({ name, quantity }) => {
                setLoading(true);
                const payload = {
                  name,
                  quantity,
                };
                await axios
                  .put(`/api/instock/${item.uniqueId}`, payload, {
                    headers: {
                      Auth: auth.token,
                    },
                  })
                  .then(() => {
                    setLoading(false);
                    alert("Edited!");
                  })
                  .catch((err) => {
                    setLoading(false);
                    console.log(err);
                  });
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                handleBlur,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={values.name}
                    id="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={Boolean(touched.name) && errors.name}
                    label="Name"
                    className={classes.input}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={values.quantity}
                    id="quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.quantity) && Boolean(errors.quantity)
                    }
                    helperText={Boolean(touched.quantity) && errors.quantity}
                    label="Quantity"
                    className={classes.input}
                  />
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`Delete ${item.name}?`}
          </DialogTitle>
          {loading ? (
            <CircularProgress style={{ margin: "0.5rem 1rem" }} />
          ) : null}
          <DialogActions>
            <Button
              onClick={() => setDialogOpen(false)}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setLoading(true);
                axios
                  .delete(`/api/instock/${item.uniqueId}`, {
                    headers: {
                      Auth: auth.token,
                    },
                  })
                  .then(() => {
                    setLoading(false);
                    alert("Deleted!");
                    setDialogOpen(false);
                  })
                  .catch((err) => {
                    setLoading(false);
                    console.log(err);
                    setDialogOpen(false);
                  });
              }}
              style={{ backgroundColor: "red", color: "white" }}
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  );
};

export default InstockItemCard;
