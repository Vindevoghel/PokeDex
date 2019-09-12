document.getElementById("pokeButton").addEventListener("click", function () {
    pokeID = document.getElementById("searchBox").value;

    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeID + '/')
        .then(function (response) {
            document.getElementById("targetName").innerText = response.data.name;
            document.getElementById("targetIdNr").innerText = response.data.id;
            document.getElementById("pokeImg").src = response.data.sprites.front_default;

            let fourMoves = [];
            fourRandomMoves(response.data.moves, fourMoves);


            document.getElementById("targetMoveOne").innerText = dashRemover(fourMoves[0]);
            document.getElementById("targetMoveTwo").innerText = dashRemover(fourMoves[1]);
            document.getElementById("targetMoveThree").innerText = dashRemover(fourMoves[2]);
            document.getElementById("targetMoveFour").innerText = dashRemover(fourMoves[3]);

            let evolution = response.data.species.url;

            axios.get(evolution)
                .then(function (response) {
                        console.log(response);
                        if (response.data.evolves_from_species === null) {
                            document.getElementById("targetNameTwo").innerText = "No previous evolution";
                            document.getElementById("targetIdNrTwo").innerText = "0";
                        } else {
                            let evoID = response.data.evolves_from_species.name;
                            axios.get('https://pokeapi.co/api/v2/pokemon/' + evoID + '/')
                                .then(function (response) {
                                    console.log(response);
                                    document.getElementById("targetNameTwo").innerText = response.data.name;
                                    document.getElementById("targetIdNrTwo").innerText = response.data.id;
                                    document.getElementById("evoImg").src = response.data.sprites.front_default;

                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }

                    }
                )
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });

})
;


function fourRandomMoves(array, newArray) {
    for (i = 0; i < 4; i++) {
        newArray.push(array[Math.floor(Math.random() * array.length)].move.name);
        console.log(array[Math.floor(Math.random() * array.length)].move.name);
    }
}

function capitaliser(element) {
    return element.charAt(0).toUpperCase();
}

function dashRemover(element) {
    capitaliser(element)
    return element.replace(/-/g, ' ');
}