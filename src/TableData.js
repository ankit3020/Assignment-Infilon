import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import { DataGrid } from "@mui/x-data-grid";
const useStyles = makeStyles({
  table: {
    width: "50%",
  },
});
export default function TableData() {
  const classes = useStyles();
  const [names, setNames] = useState([]);
  const deleteHandler = (i) => {
    setNames(names.filter((ele, index) => index !== i));
  };
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setNames(data));
  }, []);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(names));
  }, [names]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: "16px", fontWeight: "900" }}>
                Names
              </TableCell>
              <TableCell
                align="right"
                style={{ fontSize: "16px", fontWeight: "900" }}
              >
                User Names
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {names.map((row, i) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <div> {row.name} </div>
                </TableCell>
                <TableCell align="right">
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <input
                      type="text"
                      value={row.username}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                    <div>
                      <EditIcon />
                    </div>
                    <div>
                      <DeleteIcon onClick={() => deleteHandler(i)} />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <button onClick={fetchHandler}>click</button> */}
    </div>
  );
}
