import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_TEAM = gql`
    mutation saveTeam($name: String!, $monoToggle: Boolean!, $monotype: String, $generation: Int!, $game: String!, $pokemon: [InputPokemon]) {
        saveTeam(name: $name, monoToggle: $monoToggle, monotype: $monotype, generation: $generation, game: $game, pokemon: $pokemon) {
            _id
            name
        }
    }
`;

export const REMOVE_TEAM = gql`
    mutation removeTeam($_id: ID!) {
        removeTeam(_id: $_id) {
            _id
            username
        }
    }
`;