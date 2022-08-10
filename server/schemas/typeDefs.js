const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID,
        username: String,
        email: String,
        savedTeams: [Team]
    },
    type Team {
        _id: ID,
        name: String,
        monoToggle: Boolean,
        monotype: String,
        generation: Int,
        game: String,
        pokemon: [Pokemon]
    },
    type Pokemon {
        id: Int,
        name: String,
        sprite: String
    },
    input InputPokemon {
        id: Int,
        name: String,
        sprite: String,
    },
    type Auth{
        token: ID!
        user: User
    }
    type Query{
        me: User
    },
    type Mutation{
        login(username: String!, password: String!): Auth,
        addUser(username: String!, email: String!, password:String!): Auth,
        addTeam(name: String!, monoToggle: Boolean!, monotype: String, generation: Int!, game: String!, pokemon: [InputPokemon]): Team,
        saveTeam(_id: ID, name: String!, monoToggle: Boolean!, monotype: String, generation: Int!, game: String!, pokemon: [InputPokemon]): Team,
        removeTeam(_id: ID): User
    }
`

module.exports = typeDefs;