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
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      let text = "";
      for(let i = 0; i < data.types.length; i++){
        text += data.types[i].type.name + " ";
      }
      document.getElementById("type").innerHTML = text;
      
      document.querySelector(".pokemonBox").innerHTML = `
      <div class="BG">
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
      </div>
      <div class="pokemonInfos">
        <h1>${capitalizeFirstLetter(data.name)}</h1>
        <p>Type : ${text}</p>
      </div>`;
    })
    .catch((err) => {
      document.querySelector(".pokemonBox").innerHTML = `
      <h4>Pokemon not found!!</h4>
      `;
      console.log("Pokemon not found!!", err);
    });
  e.preventDefault();
}
