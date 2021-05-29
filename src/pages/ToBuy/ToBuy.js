import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import React, { useState } from "react";
import { useQuery } from "react-query";
import CustomAppbar from "../../components/CustomAppbar";
import TobuyItemCard from "../../components/TobuyItemCard";
import { addNewTobuyItemValidation } from "../../utils/formValidation";
import { useSelector } from "react-redux";
import { getAllTobuyItemsOfUser } from "../../api/query";
import axios from "../../api/index";

const useStyles = makeStyles({
  root: {
    margin: "1rem",
  },
  formContainer: {
    maxWidth: 400,
    margin: "1rem auto",
  },
  container: {
    maxWidth: 400,
    margin: "1rem auto",
  },
  input: {
    marginBottom: "0.75rem",
  },
});

function ToBuy() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const { data, isLoading, error } = useQuery(
    ["getAllTobuyItem", auth.token, auth.userData.uniqueId],
    getAllTobuyItemsOfUser
  );
  const [loading, setLoading] = useState(false);

  return (
    <Box>
      <CustomAppbar name="To Buy" />
      <Box className={classes.root}>
        <Formik
          initialValues={{
            name: "",
            note: "",
          }}
          validationSchema={addNewTobuyItemValidation}
          onSubmit={async ({ name, note }) => {
            setLoading(true);
            const payload = {
              name,
              note,
              userId: auth.userData.uniqueId,
            };
            await axios
              .post("/api/tobuy", payload, {
                headers: {
                  Auth: auth.token,
                },
              })
              .then(() => {
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <TextField
                variant="outlined"
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={Boolean(touched.name) && errors.name}
                id="name"
                label="To buy"
                className={classes.input}
                values={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
              <TextField
                variant="outlined"
                id="note"
                label="Note"
                size="small"
                className={classes.input}
                values={values.note}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
              {loading ? (
                <CircularProgress style={{ margin: "0.5rem" }} />
              ) : null}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                Add
              </Button>
            </form>
          )}
        </Formik>
        <Box className={classes.container}>
          {error ? (
            <Typography style={{ color: "red" }} align="center" variant="h6">
              Cannot fetch Data :(
            </Typography>
          ) : isLoading ? (
            <CircularProgress style={{ margin: "0.5rem 0" }} />
          ) : (
            data.tobuyItems.map((item, idx) => (
              <TobuyItemCard key={idx} item={item} authKey={auth.token} />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ToBuy;
