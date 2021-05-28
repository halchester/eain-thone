import { Card, IconButton, makeStyles, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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

const TobuyItemCard = ({ item }) => {
  console.log(item);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography style={{ marginLeft: "0.5rem" }}>Anything</Typography>
      <IconButton
        onClick={() => {
          console.log("hi");
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default TobuyItemCard;
