let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';


  function add(pokemon) {
      if (
          typeof pokemon=== "object" &&
          "name" in pokemon 
      ) {
      pokemonList.push(pokemon);
      } else {
      console.log("pokemon is not correct");
  }
}

  function getAll() {
      return pokemonList;
  }

  function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      listpokemon.classList.add("list-group-item")
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("poke-button");
      button.classList.add("btn", "btn-info");
      button.setAttribute("data-toggle","modal");
      button.setAttribute("data-target","#exampleModal");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener('click', function(event){
          showDetails(pokemon)
      });
  }

  function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
  }
    
  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
      return response.json();
      }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types.map((type) => type.type.name);
      }).catch(function (e) {
      console.error(e);
      });
  }

  //updated from console log to show modal
  function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
          showModal(pokemon);
      });
  }

  // below is for exercise 1.10 (bootstrap)
  function showModal (pokemon) {
    let modalBody= $(".modal-body");
    let modalTitle= $(".modal-title");
    modalTitle.empty();
    modalBody.empty();


    let nameElement = $("<h1>" + pokemon.name + "<h1>");

    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", pokemon.imageUrl);
    
    let heightElement = $("<p>" + "height: " + pokemon.height + "<p>");

    let weightElement = $("<p>" + "weight: " + pokemon.weight + "<p>");

    let typesElement = $("<p>" + "types: " + pokemon.types + "<p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  
  function searchPokemon() {
    let searchInput = document.getElementById("search-input");
    let searchText = searchInput.value.toLowerCase();
    let allPokemon = document.querySelectorAll(".list-group-item");

    allPokemon.forEach(function (pokemon) {
      let pokemonText = pokemon
        .querySelector(".poke-button")
        .innerText.toLowerCase();
      let searchList = document.querySelector(".pokemon-list");

      if (pokemonText.includes(searchText)) {
        searchList.classList.add("search-list");
        pokemon.style.display = "inline-block";
      } else {
        pokemon.style.display = "none";
      }

      if (!searchInput.value) {
        searchList.classList.remove("search-list");
      }
    });
  }

  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function () {
    searchPokemon();
  });
  
  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal,
    };
  })();


pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
});

// for gh-pages merge