import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import stratagems from './stratagems/deathGuard.json';
import units from './armyList/theBlessedHost.json';
import { buttons } from "./buttons.js";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './App.css';

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

function filterStratagems(selectedPhases, unitTagsFilter) {
  const areInSelectedPhases = (stratagemPhase) => selectedPhases.includes(stratagemPhase);
  const tagPresentInUnitFilter = (stratagemTag) => unitTagsFilter.includes(stratagemTag);

  let filteredStratagems = stratagems
    .filter(stratagem => stratagem.phases.some(areInSelectedPhases))
    .filter(stratagem => stratagem.tags.every(tagPresentInUnitFilter));
  return filteredStratagems;
}

function App() {
  const [filteredStratagems, setFilteredStratagems] = useState([]);
  useEffect(() => {
    setFilteredStratagems(stratagems);
  }, []);

  const [phaseFilter, setPhaseFilter] = useState([]);
  useEffect(() => {
    setPhaseFilter(["Shooting", "Fight"]);
  }, [])

  let allUnitTags = Array.from(new Set(units.flatMap(unit => unit.tags)));

  const [unitTagsFilter, setUnitTagsFilter] = useState([]);
  useEffect(() => {
    setUnitTagsFilter(allUnitTags);
  }, [])

  function handlePhase(selectedPhase) {
    setPhaseFilter(selectedPhase);
    setFilteredStratagems(filterStratagems(selectedPhase, unitTagsFilter))
  }

  function handleUnit(selectedUnitTags) {
    setUnitTagsFilter(selectedUnitTags);
    setFilteredStratagems(filterStratagems(phaseFilter, selectedUnitTags));
  }

  return (
    <div className="app-ui">
      <div className="units">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Button variant="outlined" onClick={() => handleUnit(allUnitTags)}>
            ALL<br />
            NO UNIT SELECTION
          </Button>
          {units &&
            units.map((unit) => (
              <Button variant="outlined" onClick={() => handleUnit(unit.tags)}>
                {unit.customName}<br />
                {unit.name}
              </Button>
            ))}
        </Stack>
      </div>
      <div className="phases">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {buttons &&
            buttons.map((type) => (
              <Button variant="outlined" onClick={() => handlePhase(type.value)}>
                {type.name}
              </Button>
            ))}
        </Stack>
      </div>
      <div className="stratagems">
        {MakeCardGrid(Object.values(filteredStratagems))}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
