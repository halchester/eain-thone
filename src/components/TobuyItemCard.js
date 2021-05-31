import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import axios from "../api/index";

const useStyles = makeStyles({
  root: {
    padding: "0.5rem",
    marginBottom: "0.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const TobuyItemCard = ({ item, authKey, refetch }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleTobuyDelete = async () => {
    setLoading(true);
    axios
      .delete(`/api/tobuy/${item.uniqueId}`, {
        headers: {
          Auth: authKey,
        },
      })
      .then(() => {
        setLoading(false);
        refetch();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        refetch();
      });
  };

  return (
    <Card className={classes.root}>
      <Box style={{ marginLeft: "0.5rem" }}>
        <Typography>{item.name}</Typography>
        <p className="text-sm text-gray-500">{item.note ? item.note : null}</p>
      </Box>
      <IconButton onClick={handleTobuyDelete}>
        <DeleteIcon />
      </IconButton>
      {loading ? <CircularProgress /> : null}
    </Card>
  );
};

export default TobuyItemCard;
