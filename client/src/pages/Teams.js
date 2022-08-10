import { Typography, CircularProgress, Grid, Box, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_TEAM } from "../utils/mutations";
import Auth from "../utils/auth";

const Teams = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeTeam, { error }] = useMutation(REMOVE_TEAM);

  const userData = data?.me || {};

  const teamsData = userData.savedTeams;

  console.log(teamsData);

  const handleDeleteButton = async (teamId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { teamData } = await removeTeam({
        variables: {
          _id: teamId,
        },
      });
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h2">My Teams:</Typography>
      {userData.savedTeams?.length > 0 ? (
        loading ? (
          <CircularProgress />
        ) : (
          <Grid container alignItems="center" justifyContent="center">
            {teamsData.map((team) => {
              return (
                <Grid
                  item
                  sx={{
                    width: "30%",
                    backgroundColor: "#EEEEEE",
                    margin: "15px",
                    padding: "5px",
                  }}
                >
                  <Grid container columns={2}>
                    <Grid item>
                      <Typography variant="h4">{team.name}</Typography>
                      <Typography vetiant="h2">
                        Gen: <b>{team.generation}</b>
                      </Typography>
                      <Typography vetiant="h2">
                        Game: <b>{team.game}</b>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        columns={6}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Stack sx={{paddingLeft: "20px"}}>
                        {team.pokemon.map((pokemon) => {
                          return (
                            <Grid item xs="auto" width="auto">
                              <Typography variant="h6">
                                {pokemon.name}
                              </Typography>
                            </Grid>
                          );
                        })}
                        </Stack>
                        {/* <Grid item xs="auto" width="auto">
                          {team.pokemon[0]?.sprites ? (
                            <Box
                              name={team.pokemon[0].id}
                              id="1"
                              sx={{
                                margin: "5px",
                                borderRadius: "50%",
                                background: "#CCCCCC",
                                backgroundImage: `url(${team.pokemon[0].sprite})`,
                                backgroundPosition: "center",
                                height: "60px",
                                width: "60px",
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
                                height: "60px",
                                width: "60px",
                              }}
                            />
                          )}
                        </Grid>
                        <Grid item xs="auto" width="auto">
                          {team.pokemon[1]?.sprites ? (
                            <Box
                              name={team.pokemon[1].id}
                              id="2"
                              sx={{
                                margin: "5px",
                                borderRadius: "50%",
                                background: "#CCCCCC",
                                backgroundImage: `url(${team.pokemon[1].sprite})`,
                                backgroundPosition: "center",
                                height: "60px",
                                width: "60px",
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
                                height: "60px",
                                width: "60px",
                              }}
                            />
                          )}
                        </Grid>
                        <Grid item xs="auto" width="auto">
                          {team.pokemon[2]?.sprites ? (
                            <Box
                              name={team.pokemon[2].id}
                              id="3"
                              sx={{
                                margin: "5px",
                                borderRadius: "50%",
                                background: "#CCCCCC",
                                backgroundImage: `url(${team.pokemon[2].sprite})`,
                                backgroundPosition: "center",
                                height: "60px",
                                width: "60px",
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
                                height: "60px",
                                width: "60px",
                              }}
                            />
                          )}
                        </Grid>
                        <Grid item xs="auto" width="auto">
                          {team.pokemon[3]?.sprites ? (
                            <Box
                              name={team.pokemon[3].id}
                              id="4"
                              sx={{
                                margin: "5px",
                                borderRadius: "50%",
                                background: "#CCCCCC",
                                backgroundImage: `url(${team.pokemon[3].sprite})`,
                                backgroundPosition: "center",
                                height: "60px",
                                width: "60px",
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
                                height: "60px",
                                width: "60px",
                              }}
                            />
                          )}
                        </Grid>
                        <Grid item xs="auto" width="auto">
                          {team.pokemon[4]?.sprites ? (
                            <Box
                              name={team.pokemon[4].id}
                              id="5"
                              sx={{
                                margin: "5px",
                                borderRadius: "50%",
                                background: "#CCCCCC",
                                backgroundImage: `url(${team.pokemon[4].sprite})`,
                                backgroundPosition: "center",
                                height: "60px",
                                width: "60px",
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
                                height: "60px",
                                width: "60px",
                              }}
                            />
                          )}
                        </Grid>
                        <Grid item xs="auto" width="auto">
                          {team.pokemon[5]?.sprites ? (
                            <Box
                              name={team.pokemon[5].id}
                              id="6"
                              sx={{
                                margin: "5px",
                                borderRadius: "50%",
                                background: "#CCCCCC",
                                backgroundImage: `url(${team.pokemon[5].sprite})`,
                                backgroundPosition: "center",
                                height: "60px",
                                width: "60px",
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
                                height: "60px",
                                width: "60px",
                              }}
                            />
                          )}
                        </Grid>*/}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    color="warning"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    sx={{ marginLeft: "35%" }}
                    onClick={() => {
                      handleDeleteButton(team._id);
                    }}
                  >
                    Delete Team
                  </Button>
                  <Button
                    color="info"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    sx={{ marginLeft: "35%" }}
                    disabled
                    onClick={() => {
                      window.location.assign(`/teambuilder?id=${team._id}`);
                    }}
                  >
                    Edit Team
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        )
      ) : (
        <h1>You have no teams!</h1>
      )}
    </>
  );
};

export default Teams;
