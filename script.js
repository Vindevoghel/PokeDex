pokeID = "charizard";


axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeID + '/')
    .then(function (response) {
        console.log(response);
        console.log(response.data.name);
        console.log(response.data.sprites.front_default);
        //console.log(response.data.moves[0].move.name);
        //console.log(response.data.species.url);
        fourRandomMoves(response.data.moves);
        let evolution = response.data.species.url;

        axios.get(evolution)
            .then(function (response) {
                console.log(response.data.evolves_from_species.name);
            })
            .catch(function (error) {
                console.log(error);
            });
    })
    .catch(function (error) {
        console.log(error);
    });


function fourRandomMoves(array) {
    for (i = 0; i < 4; i++) {
        console.log(array[Math.floor(Math.random() * array.length)].move.name);
    }
}