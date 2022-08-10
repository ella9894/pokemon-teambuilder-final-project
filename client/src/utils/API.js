const games = [
  ["Red", "Green", "Blue (JP)", "Blue", "Yellow", "FireRed", "LeafGreen"],
  ["Gold", "Silver", "Crystal"],
  ["Ruby", "Sapphire", "Emerald"],
  ["Diamond", "Pearl", "Brilliant Diamond", "Shining Pearl"],
  ["HeartGold", "SoulSilver"],
  ["Black", "White"],
  ["Black 2", "White 2"],
  ["X", "Y"],
  ["Omega Ruby", "Alpha Sapphire"],
  ["Sun", "Moon"],
  ["Ultra Sun", "Ultra Moon"],
  ["Let's Go, Pikachu!", "Let's Go, Eevee!"],
  ["Sword", "Shield"],
  ["Sword EX", "Shield EX"],
];

export const getPokedexNameFromGame = (game) => {
    let pokedexName = "kanto";
  //rgby + frlg
  if (games[0].indexOf(game) >= 0) {
    pokedexName = "kanto";
  }
  // gsc
  else if (games[1].indexOf(game) >= 0) {
    pokedexName = "original-johto";
  }
  // rse
  else if (games[2].indexOf(game) >= 0) {
    pokedexName = "hoenn";
  }
  // dp + bdsp
  else if (games[3].indexOf(game) >= 0) {
    pokedexName = "sinnoh";
  }
  // pt
  else if (game === "Platinum") {
    pokedexName = "extended-sinnoh";
  }
  // hgss
  else if (games[4].indexOf(game) >= 0) {
    pokedexName = "updated-johto";
  }
  // bw
  else if (games[5].indexOf(game) >= 0) {
    pokedexName = "original-unova";
  }
  // b2w2
  else if (games[6].indexOf(game) >= 0) {
    pokedexName = "updated-unova";
    // xy
  } else if (games[7].indexOf(game) >= 0) {
    pokedexName = "kalos";
    // oras
  } else if (games[8].indexOf(game) >= 0) {
    pokedexName = "updated-hoenn";
    // sm
  } else if (games[9].indexOf(game) >= 0) {
    pokedexName = "original-alola";
    // usum
  } else if (games[10].indexOf(game) >= 0) {
    pokedexName = "updated-alola";
    // lgpe
  } else if (games[11].indexOf(game) >= 0) {
    pokedexName = "letsgo-kanto";
    // swsh
  } else if (games[12].indexOf(game) >= 0) {
    pokedexName = "galar";
    // swsh ex
  } else if (games[12].indexOf(game) >= 0) {
    pokedexName = "galar-ex";
  }

  return pokedexName
}
