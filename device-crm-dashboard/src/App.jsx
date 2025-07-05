import React, { useState } from "react";
import { Button, Container, Typography, Grid } from "@mui/material";
import DeviceTable from "./components/DeviceTable";
import TrainingTable from "./components/TrainingTable";
import ServiceTable from "./components/ServiceTable";
import AmcTable from "./components/AmcTable";
import TrainingFormModal from "./components/TrainingFormModal";
import ServiceFormModal from "./components/ServiceFormModal";
import DeviceFormModal from "./components/DeviceFormModal";
import AmcFormModal from "./components/AmcFormModal";
import AlertTable from "./components/AlertTable";
import AlertFormModal from "./components/AlertFormModal";

function App() {
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [amcOpen, setAmcOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Device CRM Dashboard
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddDeviceOpen(true)}
          >
            + Add Device
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setTrainingOpen(true)}
          >
            + Log Installation
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="success"
            onClick={() => setServiceOpen(true)}
          >
            + Log Service Visit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => setAmcOpen(true)}
          >
            + Add AMC/CMC
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setAlertOpen(true)}
          >
            + Report Alert
          </Button>
        </Grid>
      </Grid>

      <DeviceTable />
      <Typography variant="h5" mt={5} mb={2}>
        Installation & Training Logs
      </Typography>
      <TrainingTable />
      <Typography variant="h5" mt={5} mb={2}>
        Service Visit Logs
      </Typography>
      <ServiceTable />
      <Typography variant="h5" mt={5} mb={2}>
        AMC/CMC Tracker
      </Typography>
      <AmcTable />
      <Typography variant="h5" mt={5} mb={2}>
        Alerts & Photo Logs
      </Typography>
      <AlertTable />

      <AlertFormModal
        open={alertOpen}
        handleClose={() => setAlertOpen(false)}
      />

      <DeviceFormModal
        open={addDeviceOpen}
        handleClose={() => setAddDeviceOpen(false)}
        mode="add"
      />
      <TrainingFormModal
        open={trainingOpen}
        handleClose={() => setTrainingOpen(false)}
      />
      <ServiceFormModal
        open={serviceOpen}
        handleClose={() => setServiceOpen(false)}
      />
      <AmcFormModal open={amcOpen} handleClose={() => setAmcOpen(false)} />
    </Container>
  );
}

export default App;
