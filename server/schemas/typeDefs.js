const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID,
        username: String,
        email: String,
        savedTeams: [Team]
    },
    type Team {
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
        abilities: [Ability],
        types: [String],
        pastTypes: [String],
        stats: BaseStats,
        maleSprite: String,
        femaleSprite: String,
        maleShinySprite: String,
        femaleShinySprite: String,
        moves: [String]
    },
    type Ability {
        slot: Int,
        name: String,
        isHidden: Boolean
    },
    type BaseStats{
        hp: Int,
        attack: Int,
        defense: Int,
        specialAttack: Int,
        specialDefense: Int,
        speed: Int
    },
    input InputPokemon {
        id: Int,
        name: String,
        abilities: [InputAbility],
        types: [String],
        pastTypes: [String],
        stats: InputBaseStats,
        maleSprite: String,
        femaleSprite: String,
        maleShinySprite: String,
        femaleShinySprite: String,
        moves: [String]
    },
    input InputAbility {
        slot: Int,
        name: String,
        isHidden: Boolean
    },
    input InputBaseStats{
        hp: Int,
        attack: Int,
        defense: Int,
        specialAttack: Int,
        specialDefense: Int,
        speed: Int
    },
    type Auth{
        token: ID!
        user: User
    }
    type Query{
        me: User
    },
    type Mutation{
        login(email: String!, password: String!): Auth,
        addUser(username: String!, email: String!, password:String!): Auth,
        saveTeam(name: String!, monoToggle: Boolean!, monotype: String!, generation: Int!, game: String!, pokemon: [InputPokemon]): User,
        removeTeam(_id: ID): User
    }
`

module.exports = typeDefs;