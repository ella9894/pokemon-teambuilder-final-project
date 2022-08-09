import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

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
`

export const SAVE_TEAM = gql`
    mutation saveBook($name: String!, $monoToggle: Boolean!, $monotype: String, $generation: Number!, $game: String!, $pokemon: [Pokemon]) {
        saveBook(name: $name, monoToggle: $monoToggle, monotype: $monotype, generation: $generation, game: $game, pokemon: $pokemon) {
            _id
            username
        }
    }
`

export const REMOVE_TEAM = gql`
    mutation removeBook($_id: ID!) {
        removeBook(_id: $_id) {
            _id
            username
        }
    }
`