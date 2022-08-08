import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamBuilder from "./pages/TeamBuilder";
import Teams from "./pages/Teams";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Typography } from "@mui/material";

const httpLink = createHttpLink({
  url: "http://localhost:3001",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" component={Teams} />
            <Route exact path="/teambuilder" component={TeamBuilder} />
            <Route
              render={() => <Typography variant="h2">Invalid Page!</Typography>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
