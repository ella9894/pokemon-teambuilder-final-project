const exclusives = {
  Red: [27, 28, 37, 38, 52, 53, 69, 70, 71, 126, 127, 151],
  Green: [23, 24, 43, 44, 45, 56, 57, 58, 59, 123, 125, 151],
  Blue: [23, 24, 43, 44, 45, 56, 57, 58, 59, 123, 125, 151],
  "Blue (JP)": [23, 24, 37, 38, 56, 57, 69, 70, 71, 125, 126, 151],
  Yellow: [13, 14, 15, 23, 24, 26, 52, 53, 109, 110, 124, 125, 151],
  Gold: [37, 38, 52, 53, 165, 166, 225, 227, 231, 232, 251],
  Silver: [56, 57, 58, 59, 167, 168, 207, 216, 217, 226, 251],
  Crystal: [37, 38, 56, 57, 179, 180, 181, 203, 223, 224],
  Ruby: [270, 271, 272, 302, 336, 337, 380, 382],
  Sapphire: [273, 274, 275, 303, 335, 338, 380, 381, 383],
  FireRed: [],
  LeafGreen: [],
  Emerald: [283, 284, 307, 308, 315, 335, 337],
  Diamond: [],
  Pearl: [],
  HeartGold: [],
  SoulSilver: [],
  Platinum: [],
  Black: [],
  White: [],
  "Black 2": [],
  "White 2": [],
  X: [],
  Y: [],
  "Omega Ruby": [],
  "Alpha Sapphire": [],
  Sun: [],
  Moon: [],
  "Ultra Sun": [],
  "Ultra Moon": [],
  "Let's Go, Pikachu!": [],
  "Let's Go, Eevee!": [],
  Sword: [],
  Shield: [],
  "Sword EX": [],
  "Shield EX": [],
  "Brilliant Diamond": [],
  "Shining Pearl": [],
};

export const getFilteredPokedex = (pokedex, game, P) => {
  //console.log(pokedex);
  let filteredPokedex = [];
  const exclusivesArr = exclusives[game];
  let dataPromises = [];

  pokedex.forEach((pokemon) => {
    if (pokemon.pokemon_species.name === "deoxys") {
      dataPromises.push(P.getPokemonByName("deoxys-normal"));
    } else if (pokemon.pokemon_species.name === "basculin") {
      dataPromises.push(P.getPokemonByName("basculin-red-striped"));
    } else if (pokemon.pokemon_species.name === "darmanitan") {
      dataPromises.push(P.getPokemonByName("darmanitan-standard"));
    } else if (pokemon.pokemon_species.name === "pumpkaboo") {
      dataPromises.push(P.getPokemonByName("pumpkaboo-average"));
    } else if (pokemon.pokemon_species.name === "gourgeist") {
      dataPromises.push(P.getPokemonByName("gourgeist-average"));
    } else if (pokemon.pokemon_species.name === "meowstic") {
      dataPromises.push(P.getPokemonByName("meowstic-male"));
    } else if (pokemon.pokemon_species.name === "aegislash") {
      dataPromises.push(P.getPokemonByName("aegislash-shield"));
    } else if (pokemon.pokemon_species.name === "indeedee") {
      dataPromises.push(P.getPokemonByName("indeedee-female"));
    } else if (pokemon.pokemon_species.name === "morpeko") {
      dataPromises.push(P.getPokemonByName("morpeko-full-belly"));
    } else if (pokemon.pokemon_species.name === "toxtricity") {
      dataPromises.push(P.getPokemonByName("toxtricity-amped"));
    } else if (pokemon.pokemon_species.name === "eiscue") {
      dataPromises.push(P.getPokemonByName("eiscue-ice"));
    } else if (pokemon.pokemon_species.name === "oricorio") {
      dataPromises.push(P.getPokemonByName("oricorio-baile"));
    } else if (pokemon.pokemon_species.name === "lycanroc") {
      dataPromises.push(P.getPokemonByName("lycanroc-midday"));
    } else if (pokemon.pokemon_species.name === "zygarde") {
      dataPromises.push(P.getPokemonByName("zygarde-50"));
    } else if (pokemon.pokemon_species.name === "minior") {
      dataPromises.push(P.getPokemonByName("minior-red-meteor"));
    } else if (pokemon.pokemon_species.name === "mimikyu") {
      dataPromises.push(P.getPokemonByName("mimikyu-disguised"));
    } else if (pokemon.pokemon_species.name === "wishiwashi") {
      dataPromises.push(P.getPokemonByName("wishiwashi-school"));
    } else {
      dataPromises.push(P.getPokemonByName(pokemon.pokemon_species.name));
    }
  });

  return Promise.allSettled(dataPromises)
    .then((results) => {
      const PokedexIds = [];
      results.forEach((result) => {
        PokedexIds.push(result.value.id);
      });
      return PokedexIds;
    })
    .then((pokedex) => {
      return (filteredPokedex = pokedex.filter((pokeId) => {
        if (exclusivesArr.indexOf(pokeId) >= 0) {
          return false;
        }
        return true;
      }));
    })
    .then((filteredPokedex) => {
      //console.log(filteredPokedex);
      return filteredPokedex;
    });
};
