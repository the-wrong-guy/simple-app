import React, { useState } from "react";
import { Grid, Button, TextField, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDetailsToStore } from "../../Redux/Action/action";
import styles from "./login.module.scss";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  const handleSubmit = () => {
    dispatch(setDetailsToStore({ email, firstName, lastName }));
    localStorage.setItem(
      "details",
      JSON.stringify({ email, firstName, lastName })
    );
    history.push("/select-skill");
    resetForm();
  };
  return (
    <div className={styles.container}>
      <Paper className={styles.gridWrapper} elevation={3}>
        <Grid
          container
          spacing={4}
          justifyContent='center'
          className={styles.gridContainer}
        >
          <Grid item xs={12}>
            <TextField
              placeholder='Your Email'
              label='Email'
              variant='outlined'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder='Your First Name'
              label='First Name'
              variant='outlined'
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder='Your Last Name'
              label='Email'
              variant='outlined'
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => handleSubmit()}
              fullWidth
              variant='contained'
              color='secondary'
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
