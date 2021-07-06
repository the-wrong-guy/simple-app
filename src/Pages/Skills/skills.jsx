import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Button,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedSkillsToStore } from "../../Redux/Action/action";
import styles from "./skills.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 15px",
  },
  tableCellHeader: {
    backgroundColor: "#252525",
    color: "#fff",
    minWidth: "35px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));
export default function Skills() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillError, setSkillError] = useState(false);
  const [errorType, setErrorType] = useState("");
  useEffect(() => {
    fetch("https://fechallenge.dev.bhyve.io/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, item) => {
    const selectedIndex = selected.indexOf(item.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    const newSkills = newSelected.map((d) => skills[d - 1]);
    setSelectedSkills(newSkills);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, skills.length - page * rowsPerPage);

  const handleNextBtnClick = () => {
    if (selectedSkills.length < 3) {
      setErrorType("Select at least 3 skills!");
      setSkillError(true);
      return;
    } else if (selectedSkills.length > 8) {
      setErrorType("You can select only 8 skills!");
      setSkillError(true);
      return;
    } else {
      dispatch(setSelectedSkillsToStore(selectedSkills));
      localStorage.setItem("selectedSkills", JSON.stringify(selectedSkills));
      history.push("/profile");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSkillError(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>Skills List</div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={skillError}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Paper elevation={5} className={styles.snackbar}>
          {errorType}
        </Paper>
      </Snackbar>
      <Paper elevation={3} className={styles.paper}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            aria-label='enhanced table'
          >
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCellHeader} align='center'>
                  Skills
                </TableCell>
              </TableRow>
            </TableHead>

            {skills
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                const isItemSelected = isSelected(item.id);
                return (
                  <TableBody>
                    <TableRow
                      onClick={(event) => handleClick(event, item)}
                      key={item.id}
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell align='center' style={{ cursor: "pointer" }}>
                        <span>{item.skillName}</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            {skills.length === 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell align='center' colSpan={8}>
                  <img
                    src='https://s2.svgbox.net/loaders.svg?ic=elastic-spinner&color=000000'
                    width='32'
                    height='32'
                    alt='loader'
                  />
                </TableCell>
              </TableRow>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component='div'
          count={skills.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <Button
        variant='contained'
        color='secondary'
        style={{ margin: "2rem 0" }}
        onClick={() => handleNextBtnClick()}
      >
        Next
      </Button>
    </div>
  );
}
