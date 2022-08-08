import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";

import { useMutation } from '@apollo/client';
import { SAVE_TEAM } from '../utils/mutations';

const types = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy",
];

const games = [
  ["Red", "Green", "Blue (JP)", "Blue", "Yellow"],
  ["Gold", "Silver", "Crystal"],
  ["Ruby", "Sapphire", "FireRed", "LeafGreen", "Emerald"],
  ["Diamond", "Pearl", "HeartGold", "SoulSilver", "Platinum"],
  ["Black", "White", "Black 2", "White 2"],
  ["X", "Y", "Omega Ruby", "Alpha Sapphire"],
  [
    "Sun",
    "Moon",
    "Ultra Sun",
    "Ultra Moon",
    "Let's Go, Pikachu!",
    "Let's Go, Eevee!",
  ],
  [
    "Sword",
    "Shield",
    "Sword EX",
    "Shield EX",
    "Brilliant Diamond",
    "Shining Pearl",
    "Legends: Arceus",
  ],
];

const generations = [1, 2, 3, 4, 5, 6, 7, 8];

const NewTeamForm = () => {
  const [teamFormData, setTeamFormData] = useState({ name: '', monoToggle: false, monotype: '', generation: 1, game: 'Red' });
  const [saveTeam, { error }] = useMutation(SAVE_TEAM);

  const monotypeToggle = (event) => {
    setTeamFormData({ ...teamFormData, monoToggle: event.target.checked});
    if (!event.target.checked) {
      setTeamFormData({ ...teamFormData, monotype: ''});
    }
  };

  const changeType = (event) => {
    setTeamFormData({ ...teamFormData, monotype: event.target.value});
  };

  const changeGen = (event) => {
    setTeamFormData({ ...teamFormData, generation: event.target.value, game: games[event.target.value - 1][0]});
  };

  const changeGame = (event) => {
    setTeamFormData({ ...teamFormData, game: event.target.value});
  };

  const createTeam = async (event) => {

  }

  return (
    <>
      <Typography variant="h4">Create a New Team</Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          maxWidth: "100%",
        }}
        onSubmit={createTeam}
      >
        <Stack>
          <TextField fullWidth required label="Team Name" />
          <br />
          <Box fullWidth>
            <FormControl>
              <InputLabel id="gen-picker">Generation</InputLabel>
              <Select
                labelId="gen-picker"
                id="gen-picker"
                value={teamFormData.generation}
                label="Generation"
                onChange={changeGen}
                fullWidth
              >
                {generations.map((gen) => (
                  <MenuItem value={gen} key={gen}>
                    {gen}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{marginLeft: '15px'}}>
              <InputLabel id="game-picker">Game</InputLabel>
              <Select
                labelId="game-picker"
                id="gane-picker"
                value={teamFormData.game}
                label="Game"
                onChange={changeGame}
                fullWidth
              >
                {games[teamFormData.generation - 1].map((game) => (
                  <MenuItem value={game} key={game}>
                    {game}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <br />
          <Divider variant="middle" />
          <br />
          <FormControlLabel
            control={<Switch onChange={monotypeToggle} />}
            label="Monotype"
          />
          <br />
          {teamFormData.monoToggle && <FormControl>
            <InputLabel id="monotype-picker">Monotype Type</InputLabel>
            <Select
              labelId="monotype-picker"
              id="monotype-picker"
              value={teamFormData.monotype}
              label="Monotype Type"
              onChange={changeType}
            >
              {types.map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>}
          <br />
          <Button variant="contained" type="submit">
            Create Team
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default NewTeamForm;
