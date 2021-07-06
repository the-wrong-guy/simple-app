import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import styles from "./profile.module.scss";

export default function Profile() {
  const details =
    useSelector((state) => state.details) ||
    JSON.parse(localStorage.getItem("details"));
  const selectedSkills =
    useSelector((state) => state.selectedSkills) ||
    JSON.parse(localStorage.getItem("selectedSkills"));
  return (
    <div className={styles.container}>
      <span className={styles.header}>Profile</span>
      <Paper className={styles.paper} elevation={3}>
        <div
          style={{
            border: "1px solid red",
            borderRadius: "5px",
            padding: "1.5rem",
          }}
        >
          <Grid container spacing={3} className={styles.detailsDiv}>
            <Grid item xs={6}>
              <label>Email</label>
            </Grid>
            <Grid item xs={6}>
              <span>{details?.email}</span>
            </Grid>
            <Grid item xs={6}>
              <label>First Name</label>
            </Grid>
            <Grid item xs={6}>
              <span>{details?.firstName}</span>
            </Grid>
            <Grid item xs={6}>
              <label>Last Name</label>
            </Grid>
            <Grid item xs={6}>
              <span>{details?.lastName}</span>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: "700" }}>
                Skills
              </span>
            </Grid>
            {selectedSkills.map((item) => (
              <Grid item>
                <div className={styles.skills}>{item.skillName}</div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Paper>
    </div>
  );
}
