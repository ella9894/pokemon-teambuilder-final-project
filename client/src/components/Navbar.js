import { AppBar, Toolbar, Typography, Button, Modal, Tab } from "@mui/material";
import { Box, Container } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import Auth from "../utils/auth";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import NewTeamForm from "./NewTeamForm";

const pages = ["Teambuilder", "My Teams"];

const signupStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const teamStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Navbar() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const [userValue, setUserValue] = useState("signup");

  const handleUserChange = (event, newValue) => {
    console.log(newValue);
    setUserValue(`${newValue}`);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="x1">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              href="/"
              sx={{
                mr: 2,
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              Pokemon Team Builder
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
              {pages.map((page) => (
                <Typography textAlign="center">{page}</Typography>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              {Auth.loggedIn() ? (
                <>
                  <Button variant="contained" color="secondary">
                    New Team
                  </Button>
                  <Button variant="contained" color="secondary">
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowUserModal(true)}
                >
                  Login/Sign Up
                </Button>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShowTeamModal(true)}
              >
                New Team
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={showTeamModal}
        onClose={() => {
          setShowTeamModal(false);
        }}
        aria-labelledby="team-modal"
      >
        <Box sx={teamStyle}>
          <NewTeamForm handleModalClose={() => setShowTeamModal(false)} />
        </Box>
      </Modal>
      <Modal
        open={showUserModal}
        onClose={() => {
          setShowUserModal(false);
        }}
        aria-labelledby="signup-modal"
      >
        <Box sx={signupStyle}>
          <TabContext value={userValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleUserChange}
                aria-label="signup login switch"
              >
                <Tab label="Sign Up" value="signup" />
                <Tab label="Login" value="login" />
              </TabList>
            </Box>
            <TabPanel value="signup">
              <SignupForm handleModalClose={() => setShowUserModal(false)} />
            </TabPanel>
            <TabPanel value="login">
              <LoginForm handleModalClose={() => setShowUserModal(false)} />
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </>
  );
}

export default Navbar;
