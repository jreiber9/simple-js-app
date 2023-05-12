let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


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
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
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
        item.types = details.types;
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

    // added code for exercise 1.8

    function showModal(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function() {

      let modalTitle = document.querySelector(".modal-title");
      modalTitle.innerText = pokemon.name;
    
      // pokemon height
      let pokemonHeight = document.querySelector(".height");
      pokemonHeight.innerText = "Height: " + pokemon.height;      

      //pokemon images
      let imageContainer = document.querySelector(".image-container");
      let pokemonImage = document.createElement("img");
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.classList.add("pokemon-image");
      imageContainer.innerHTML="";
      imageContainer.append(pokemonImage);

      let modal = document.querySelector(".modal");
      modal.classList.add("modal-is-visible");
      modal.classList.remove("modal");

      let buttonContainer = document.querySelector(".button-container");
      let modalCloseButton = document.createElement("button");
      closeButton.classList.add("btn");
      closeButton.classList.add("modal-close");
      closeButton.innerText = "x";
      buttonContainer.innerHtml = "";
      buttonContainer.append(modalCloseButton);

      modalCloseButton.addEventListener("click", function() {
        closeModal();
      });
    });

      function closeModal() {
        let modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.remove("modal-is-visible");
        modalContainer.classList.add("modal");
        modalCloseButton.innerHTML = "";
      }
    }

    // code above for exercise 1.8
    
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
