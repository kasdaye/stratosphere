import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import units from './armyList/theBlessedHost.json';
import { buttons } from "./buttons.js";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './App.css';

let loadedStratagems = [];
let loadedUnits = [];

function MakeCardGrid(stratagems) {
  return (
    <Grid container spacing={4}>
      {stratagems.map(stratagem => (
        <Grid item xs={12} sm={6} md={3}>
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

  let filteredStratagems = [];
  if (loadedStratagems.length !== 0) {
    filteredStratagems = loadedStratagems.filter(stratagem => stratagem.phases.some(areInSelectedPhases));
  }
  if (unitTagsFilter.length !== 0) {
    filteredStratagems = filteredStratagems.filter(stratagem => stratagem.tags.every(tagPresentInUnitFilter));
  }
  return filteredStratagems;
}

function App() {
  const [filteredStratagems, setFilteredStratagems] = useState([]);
  useEffect(() => {
    setFilteredStratagems(loadedStratagems);
  }, []);

  const [phaseFilter, setPhaseFilter] = useState([]);
  useEffect(() => {
    setPhaseFilter(["Command", "Psychic", "Shooting", "Charge", "Fight", "Opponent's Shooting", "Opponent's Charge"]);
  }, [])

  const [selectedPhaseButton, setSelectedPhaseButton] = useState(1);
  useEffect(() => {
    setSelectedPhaseButton(1);
  }, [])

  const [allUnitTags, setAllUnitTags] = useState([]);
  useEffect(() => {
    setAllUnitTags([]);
  }, [])

  const [unitTagsFilter, setUnitTagsFilter] = useState([]);
  useEffect(() => {
    setUnitTagsFilter([]);
  }, [])

  const [selectedUnitButton, setSelectedUnitButton] = useState(1);
  useEffect(() => {
    setSelectedUnitButton(1);
  }, [])

  function handlePhase(selectedPhase, selectedPhaseKey) {
    setPhaseFilter(selectedPhase);
    setSelectedPhaseButton(selectedPhaseKey);
    setFilteredStratagems(filterStratagems(selectedPhase, unitTagsFilter))
  }

  function handleUnit(selectedUnitTags, selectedUnitKey) {
    setUnitTagsFilter(selectedUnitTags);
    setSelectedUnitButton(selectedUnitKey);
    setFilteredStratagems(filterStratagems(phaseFilter, selectedUnitTags));
  }

  function handleStratagemUpload(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      loadedStratagems = JSON.parse(e.target.result);
      setFilteredStratagems(filterStratagems(phaseFilter, unitTagsFilter));
    };
  }

  function handleUnitUpload(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      loadedUnits = JSON.parse(e.target.result);
      setAllUnitTags(Array.from(new Set(loadedUnits.flatMap(unit => unit.tags))));
      setUnitTagsFilter(Array.from(new Set(loadedUnits.flatMap(unit => unit.tags))));
    };
  }

  return (
    <div className="app-ui">

      <div className="upload">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Button variant="contained" component="label">
            Upload Stratagems
            <input type="file" onChange={handleStratagemUpload} hidden />
          </Button>
          <Button variant="contained" component="label">
            Upload Units
            <input type="file" onChange={handleUnitUpload} hidden />
          </Button>
        </Stack>
      </div>
      <div className="units">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Button variant={1 === selectedUnitButton ? "contained" : "outlined"} onClick={() => handleUnit(allUnitTags, 1)}>
            ALL<br />
            NO UNIT SELECTION
          </Button>
          {loadedUnits &&
            loadedUnits.map((unit) => (
              <Button variant={unit.key === selectedUnitButton ? "contained" : "outlined"} onClick={() => handleUnit(unit.tags, unit.key)}>
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
              <Button variant={type.key === selectedPhaseButton ? "contained" : "outlined"} onClick={() => handlePhase(type.value, type.key)}>
                {type.name}
              </Button>
            ))}
        </Stack>
      </div>
      <div className="stratagems">
        {MakeCardGrid(Object.values(filteredStratagems))}
      </div>
    </div >
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
