document.querySelector("#search").addEventListener("click", getPokemon);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function getPokemon(e) {
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);
  // const typeColors = {
  //   electric: '#FFEA70',
  //   normal: '#B09398',
  //   fire: '#FF675C',
  //   water: '#0596C7',
  //   ice: '#AFEAFD',
  //   rock: '#999799',
  //   flying: '#7AE7C7',
  //   grass: '#4A9681',
  //   psychic: '#FFC6D9',
  //   ghost: '#561D25',
  //   bug: '#A2FAA3',
  //   poison: '#795663',
  //   ground: '#D2B074',
  //   dragon: '#DA627D',
  //   steel: '#1D8A99',
  //   fighting: '#2F2F2F',
  //   default: '#2A1A1F',
  // };
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      const textType = [];
      // const color = [];
      for(let i = 0; i < data.types.length; i++){
        // color[i] = typeColors[data.types[i].type.name ];
        textType.push(" "+data.types[i].type.name+" ");
        // text += data.types[i].type.name + " ";
      }
      document.getElementById("type").innerHTML = textType;

      let textStats = " ";
      textStats += "💛 "+data.stats[0].stat.name + " : "+ data.stats[0].base_stat +"<br>";
      textStats += "👊 "+data.stats[1].stat.name + " : "+ data.stats[1].base_stat +"<br>";
      textStats += "💪 "+data.stats[2].stat.name + " : "+ data.stats[2].base_stat +"<br>";
      textStats += "⚡ "+data.stats[3].stat.name + " : "+ data.stats[3].base_stat +"<br>";
      textStats += "⭐ "+data.stats[4].stat.name + " : "+ data.stats[4].base_stat +"<br>";
      textStats += "🏃‍♂️ "+data.stats[5].stat.name + " : "+ data.stats[5].base_stat +"<br>";
      
      let textAbility = [];
      for(let i=0;i<data.abilities.length;i++){
        textAbility.push(" "+data.abilities[i].ability.name+" ");
      }
      textStats += "✨ ability"+ " : "+textAbility;
      document.getElementById("stats").innerHTML = textStats;

      document.querySelector(".pokemonBox").innerHTML = `
      <div class="BG">
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
      </div>
      <div class="pokemonInfos">
        <h1>${capitalizeFirstLetter(data.name)}</h1>
        <p id="type">Pokémon type : ${textType}</p>
      </div>
      `;

      document.querySelector(".pokemonStats").innerHTML = `
      <div class="pokemonStats">
        <p id="stats">${textStats}</p>
      </div>`;
    })
    .catch((err) => {
      document.querySelector(".pokemonBox").innerHTML = `
        <h4>Pokémon not found!!</h4>
      `;
      console.log("Pokémon not found!!", err);
      document.querySelector(".pokemonStats").innerHTML = `
        <img src="https://scontent.fbkk7-3.fna.fbcdn.net/v/t39.30808-6/317554971_599606642113247_22300277896278755_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG6fuNN66rdutHLhJwdlukECEDvk8ymPkgIQO-TzKY-SCQD5F64hqrZ7uEzWeluxyz8DS3CBtQxTtbYjd8apSBk&_nc_ohc=dlHIdsEo9EsAX8hoSC8&_nc_ht=scontent.fbkk7-3.fna&_nc_e2o=s&oh=00_AfB5kUhS-EaskSJAtlADE7h5Ipo4n_edBJSEcP8uUFgrlQ&oe=653615C0" width="500px">
      `;
    });
    
  e.preventDefault();
}