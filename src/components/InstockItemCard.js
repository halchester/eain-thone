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
  DialogContentText,
  DialogTitle,
  Divider,
  Fade,
  makeStyles,
  Modal,
  Slide,
} from "@material-ui/core";
import moment from "moment";
import axios from "../api/index";
import { useSelector } from "react-redux";

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
      </Box>
    </Card>
  );
};

export default InstockItemCard;
