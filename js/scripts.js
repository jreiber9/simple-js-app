//Pokedex Array Objects (inluding name, height, and type)

let pokemonRepository = (function() {
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        { name: 'Charmander', height: 0.6, types: ['fire']},
        { name: 'Squirtle', height: 0.5, types: ['water']},
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    // console logging pokemon data

    function showDetails(pokemon){
        console.log(pokemon.name)
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

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();


//For loop that iterates pokemon names and adds sauce if height exceeds or is lower than .6 (commented out to add in foreach loop)


// for (let i = 0; i < pokemonList.length; i++){
//    if (pokemonList[i].height > .6 ){
//        document.write(pokemonList[i].name + ' (height:' +pokemonList[i].height + ')' + ' - Wow, that\'s big!'+"<br>");
//    }else if (pokemonList[i].height <.6 ){
//        document.write(pokemonList[i].name + ' (height:' +pokemonList[i].height + ')' + ' - Wow that\'s tiny!'+"<br>");
//    }else {
//        document.write(pokemonList[i].name + ' (height:' +pokemonList[i].height + ')'+"<br>");
//    }
// }

//forEach loop (replacing for loop) that iterates pokemon names and adds sauce if height exceeds or is lower than .6 (before DOM)

// pokemonRepository.getAll().forEach(function(pokemon) {
//     document.write('<p>' + pokemon.name + '<br>' + 'Type(s): ' + pokemon.types + '<br>');
//     if (pokemon.height > .6 ){
//         document.write(' Height:' +pokemon.height + ' - Wow, that\'s big!'+'<br>');
//     }else if (pokemon.height <.6 ){
//         document.write(' Height:' +pokemon.height + ' - Wow that\'s tiny!'+'<br>');
//     }else {
//         document.write(' Height:' +pokemon.height +'<br>');
//     }
// });


pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
   
});

