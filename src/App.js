import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import stratagems from './stratagems/deathGuard.json';
import { buttons } from "./buttons.js";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function MakeCardGrid(stratagems) {
  return (
    <Grid container spacing={4}>
      {stratagems.map(stratagem => (
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {stratagem.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {stratagem.cost}
              </Typography>
              <Typography variant="body2">
                {stratagem.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

function filterStratagems(stratagemType) {
  let filteredStratagems = stratagems.filter(stratagem => stratagem.phases.includes(stratagemType));
  return filteredStratagems;
}

function App() {
  const [filteredStratagems, setFilteredStratagems] = useState([]);
  useEffect(() => {
    setFilteredStratagems(stratagems);
  }, []);

  function handleStratagems(e) {
    let stratagemType = e;
    stratagemType !== "All"
      ? setFilteredStratagems(filterStratagems(stratagemType))
      : setFilteredStratagems(stratagems);
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {buttons &&
          buttons.map((type) => (
            <Button variant="outlined" onClick={() => handleStratagems(type.value)}>
              {type.name}
            </Button>
          ))}
      </Stack>
      {MakeCardGrid(Object.values(filteredStratagems))}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
