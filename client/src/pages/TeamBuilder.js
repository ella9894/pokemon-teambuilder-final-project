import { Box, Divider, Typography, Skeleton, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useState, useEffect } from "react";

import Auth from "../utils/auth";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { SAVE_TEAM } from "../utils/mutations";

import { getPokedexNameFromGame } from "../utils/API";
import { getFilteredPokedex } from "../utils/helpers";

import Pokedex from "pokedex-promise-v2";
import { useSearchParams } from "react-router-dom";
const P = new Pokedex();

const style = {
  margin: "5px",
  borderRadius: "50%",
  backgroundPosition: "center",
  height: "80px",
  width: "80px",
  border: "thick 2px black",
};

const TeamBuilder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, data } = useQuery(GET_ME);
  const [saveTeam, { error }] = useMutation(SAVE_TEAM);

  const [teamData, setTeamData] = useState({
    name: "",
    monoToggle: false,
    monotype: "",
    generation: 1,
    game: "Red",
    pokemon: [],
  });
  const [pokeList, setPokeList] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const teamId = searchParams.get("id");

  const [hiddenEls, setHiddenEls] = useState([]);

  const selectPokemon = async (event) => {
    if (teamData.pokemon.length < 6) {
      event.target.style.visibility = "hidden";
      hiddenEls.push(event.target);
      setHiddenEls(hiddenEls);
      console.log(hiddenEls);
      try {
        const pokeData = await P.getPokemonByName(event.target.name);
        const picked = (({ id, name, sprites }) => ({
          id,
          name,
          sprites,
        }))(pokeData);
        let newPokeArray = JSON.parse(JSON.stringify(teamData.pokemon));
        newPokeArray.push(picked);
        setTeamData({ ...teamData, pokemon: newPokeArray });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const returnPokemon = async (event) => {
    const elToUnhide = hiddenEls.splice(parseInt(event.target.id) - 1, 1)[0];
    console.log(elToUnhide);
    elToUnhide.style.visibility = "visible";

    console.log(hiddenEls);
    setHiddenEls(hiddenEls);
    let newPokeArray = JSON.parse(JSON.stringify(teamData.pokemon));
    newPokeArray.splice(parseInt(event.target.id) - 1, 1);

    setTeamData({ ...teamData, pokemon: newPokeArray });
  };

  const handleTeamSave = async (event) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log(teamData);

      let formattedPokemonObjs = [];

      teamData.pokemon.map((pokemon) => {
        formattedPokemonObjs.push({name: pokemon.name, id: pokemon.id, sprite: pokemon.sprites.front_default})
      });

      const data = await saveTeam({
        variables: {
          ...teamData,
          pokemon: formattedPokemonObjs,
        },
      });
      window.location.assign('/')
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const grabUserData = async () => {
      if (!loading) {
        const userData = data?.me || {};

        return userData;
      }
    };

    const grabTeamData = async (userData) => {
      console.log(userData);
      const grabbedTeamData = userData.savedTeams.find(
        (team) => team._id === teamId
      );

      //console.log(grabbedTeamData);

      setTeamData({ ...grabbedTeamData });
      return grabbedTeamData;
    };

    const filterPokemon = async (teamData) => {
      const pokedexName = getPokedexNameFromGame(teamData.game);
      try {
        let pokedex;
        if (pokedexName === "kalos") {
          const dataPromises = [];
          dataPromises.push(P.getPokedexByName("kalos-central"));
          dataPromises.push(P.getPokedexByName("kalos-mountain"));
          dataPromises.push(P.getPokedexByName("kalos-coastal"));
          Promise.allSettled(dataPromises).then((results) => {
            pokedex = results[0].concat(results[1]).concat(results[2]);
          });
        } else if (pokedexName === "galax-ex") {
          const dataPromises = [];
          dataPromises.push(P.getPokedexByName("galar"));
          dataPromises.push(P.getPokedexByName("isle-of-armor"));
          dataPromises.push(P.getPokedexByName("crown-tundra"));
          Promise.allSettled(dataPromises).then((results) => {
            pokedex = results[0].concat(results[1]).concat(results[2]);
          });
        } else {
          pokedex = await P.getPokedexByName(pokedexName);
        }

        try {
          const filteredPokedex = await getFilteredPokedex(
            pokedex.pokemon_entries,
            teamData.game,
            P
          );
          setPokeList(filteredPokedex);
          // console.log(filteredPokedex);
          return filteredPokedex;
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getPokemonData = async (pokemon) => {
      let dataPromises = [];

      // console.log(pokemon);

      pokemon.forEach((pokemon) => {
        dataPromises.push(P.getPokemonByName(pokemon));
      });

      return Promise.allSettled(dataPromises).then((results) => {
        return results.map((result) => {
          const picked = (({
            abilities,
            id,
            name,
            past_types,
            sprites,
            stats,
            types,
          }) => ({
            abilities,
            id,
            name,
            past_types,
            sprites,
            stats,
            types,
          }))(result.value);
          return picked;
        });
      });
    };

    let dummyArray = [];
    for (let i = 0; i < 100; i++) {
      dummyArray.push({ value: i });
    }
    setPokeList(dummyArray);

    if (!loading) {
      grabUserData()
        .then((userData) => {
          return grabTeamData(userData);
        })
        .then((teamData) => {
          return filterPokemon(teamData);
        })
        .then((pokemon) => {
          return getPokemonData(pokemon);
        })
        .then((data) => {
          setPokeList(data);
          setDataLoading(false);
        });
    }
  }, [teamData.game, data, loading]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Box>
      <Box>
        <Grid container columns={6} alignItems="center" justifyContent="center">
          <Grid item xs="auto">
            <Typography variant="h2" sx={{ paddingRight: "20px" }}>
              Teambuilder: {teamData.name}
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleTeamSave}
            >
              Save Team
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container columns={6} alignItems="center" justifyContent="center">
        <Grid item xs="auto" width="auto">
          {teamData.pokemon[0]?.sprites ? (
            <Button
              name={teamData.pokemon[0].id}
              id="1"
              onClick={returnPokemon}
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#CCCCCC",
                backgroundImage: `url(${teamData.pokemon[0].sprites.front_default})`,
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          ) : (
            <Box
              variant="circular"
              color="red"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#AAAAAA",
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          )}
        </Grid>
        <Grid item xs="auto" width="auto">
          {teamData.pokemon[1]?.sprites ? (
            <Button
              name={teamData.pokemon[1].id}
              id="2"
              onClick={returnPokemon}
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#CCCCCC",
                backgroundImage: `url(${teamData.pokemon[1].sprites.front_default})`,
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          ) : (
            <Box
              variant="circular"
              color="red"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#AAAAAA",
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          )}
        </Grid>
        <Grid item xs="auto" width="auto">
          {teamData.pokemon[2]?.sprites ? (
            <Button
              name={teamData.pokemon[2].id}
              onClick={returnPokemon}
              id="3"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#CCCCCC",
                backgroundImage: `url(${teamData.pokemon[2].sprites.front_default})`,
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          ) : (
            <Box
              variant="circular"
              color="red"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#AAAAAA",
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          )}
        </Grid>
        <Grid item xs="auto" width="auto">
          {teamData.pokemon[3]?.sprites ? (
            <Button
              name={teamData.pokemon[3].id}
              onClick={returnPokemon}
              id="4"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#CCCCCC",
                backgroundImage: `url(${teamData.pokemon[3].sprites.front_default})`,
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          ) : (
            <Box
              variant="circular"
              color="red"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#AAAAAA",
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          )}
        </Grid>
        <Grid item xs="auto" width="auto">
          {teamData.pokemon[4]?.sprites ? (
            <Button
              name={teamData.pokemon[4].id}
              onClick={returnPokemon}
              id="5"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#CCCCCC",
                backgroundImage: `url(${teamData.pokemon[4].sprites.front_default})`,
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          ) : (
            <Box
              variant="circular"
              color="red"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#AAAAAA",
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          )}
        </Grid>
        <Grid item xs="auto" width="auto">
          {teamData.pokemon[5]?.sprites ? (
            <Button
              name={teamData.pokemon[5].id}
              onClick={returnPokemon}
              id="6"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#CCCCCC",
                backgroundImage: `url(${teamData.pokemon[5].sprites.front_default})`,
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          ) : (
            <Box
              variant="circular"
              color="red"
              sx={{
                margin: "5px",
                borderRadius: "50%",
                background: "#AAAAAA",
                backgroundPosition: "center",
                height: "120px",
                width: "120px",
              }}
            />
          )}
        </Grid>
      </Grid>
      <Divider />
      <Grid container columns={20} alignItems="center" justifyContent="center">
        {pokeList.map((pokemon) => {
          return (
            <Grid key={pokemon.name} item xs="auto" width="auto">
              {dataLoading ? (
                <Skeleton
                  variant="circular"
                  width={80}
                  height={80}
                  sx={{ margin: "5px", border: "2px" }}
                />
              ) : (
                <Button
                  width={80}
                  height={80}
                  name={pokemon.id}
                  id={pokemon.id}
                  onClick={selectPokemon}
                  sx={{
                    ...style,
                    backgroundImage: `url(${pokemon.sprites.front_default})`,
                  }}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TeamBuilder;
