document.getElementById("dex").addEventListener("click", function(){
    document.getElementById("dex").classList.add("open");
});

document.getElementById("searchContainer").addEventListener("submit", function (event) {
    event.preventDefault();
    pokeID = document.getElementById("searchBox").value;


    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeID + '/')
        .then(function (response) {
            console.log(response);

            document.getElementById("targetName").innerText = capitaliser(response.data.name);
            document.getElementById("targetIdNr").innerText = response.data.id + " " + capitaliser(response.data.types[0].type.name);

            if (response.data.sprites.front_default !== null) {
                document.getElementById("pokeImg").src = response.data.sprites.front_default;
            } else {
                document.getElementById("pokeImg").src = "./assets/noimage.png";
            }


            let moveArray = randomMoves(response.data.moves);

            document.getElementById("targetMoveOne").innerText = moveArray[0];
            document.getElementById("targetMoveTwo").innerText = moveArray[1];

            if (moveArray[2] !== undefined) {
                document.getElementById("targetMoveThree").innerText = moveArray[2];
                document.getElementById("targetMoveFour").innerText = moveArray[3];
            } else {
                document.getElementById("targetMoveThree").innerText = "";
                document.getElementById("targetMoveFour").innerText = "";
            }

            let evolution = response.data.species.url;

            axios.get(evolution)
                .then(function (response) {
                        console.log(response);

                        if (response.data.evolves_from_species === null) {
                            document.getElementById("targetNameTwo").innerText = "No prev evo";
                            document.getElementById("targetIdNrTwo").innerText = "0";
                            document.getElementById("evoImg").src = "./assets/pokemonegg.jpg"
                        } else {
                            let evoID = response.data.evolves_from_species.name;
                            axios.get('https://pokeapi.co/api/v2/pokemon/' + evoID + '/')
                                .then(function (response) {
                                    console.log(response.data.sprites.front_default);


                                    document.getElementById("targetNameTwo").innerText = capitaliser(response.data.name);
                                    document.getElementById("targetIdNrTwo").innerText = response.data.id + " " + capitaliser(response.data.types[0].type.name);


                                    if (response.data.sprites.front_default !== null) {
                                        document.getElementById("evoImg").src = response.data.sprites.front_default;
                                    } else {
                                        document.getElementById("evoImg").src = "./assets/noimage.png";
                                    }

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

});


function randomMoves(allMoves) {
    let moveArray = [];
    for (i = 0; i < allMoves.length; i++) {
        moveArray.push(allMoves[Math.floor(Math.random() * allMoves.length)].move.name);
        moveArray[i] = dashRemover(moveArray[i]);
        moveArray[i] = capitaliser(moveArray[i]);
    }
    return uniqueArray(moveArray);
}

function uniqueArray(array) {
    return array.filter(function (item, index) {
        return array.indexOf(item) >= index;
    });
}

function capitaliser(element) {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
}

function dashRemover(element) {
    return element.replace(/-/g, ' ');
}