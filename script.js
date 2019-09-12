document.getElementById("pokeButton").addEventListener("click", function() {
    pokeID = document.getElementById("searchBox").value;

    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeID + '/')
        .then(function (response) {
            console.log(response);
            document.getElementById("targetName").innerText = response.data.name;
            document.getElementById("targetIdNr").innerText = response.data.id;
            console.log(response.data.sprites.front_default);
            //console.log(response.data.moves[0].move.name);
            //console.log(response.data.species.url);

            let fourMoves =[];
            fourRandomMoves(response.data.moves, fourMoves);
            //console.log(fourMoves);
            //fourMoves.forEach(dashRemoverCapitaliser());
            document.getElementById("targetMoveOne").innerText = fourMoves[0];
            document.getElementById("targetMoveTwo").innerText = fourMoves[1];
            document.getElementById("targetMoveThree").innerText = fourMoves[2];
            document.getElementById("targetMoveFour").innerText = fourMoves[3];

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

});


function fourRandomMoves(array, newArray) {
    for (i=0; i<4; i++) {
        newArray.push(array[Math.floor(Math.random() * array.length)].move.name);
        console.log(array[Math.floor(Math.random() * array.length)].move.name);
    }
}

function dashRemoverCapitaliser (element) {
    element.replace(/-/g, ' ');
    element.charAt(0).toUpperCase();
}