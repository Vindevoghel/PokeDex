document.getElementById("pokeButton").addEventListener("submit", function () {
    pokeID = document.getElementById("searchBox").value;


    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeID + '/')
        .then(function (response) {
            console.log(response.data.sprites.front_default);
            document.getElementById("targetName").innerText = response.data.name;
            document.getElementById("targetIdNr").innerText = response.data.id;
            if (response.data.sprites.front_default !== null) {
                document.getElementById("pokeImg").src = response.data.sprites.front_default;
            } else {
                document.getElementById("pokeImg").src = "./assets/noimage.png";
            }

            let moveArray = fourRandomMoves(response.data.moves);
            console.log(moveArray);


            document.getElementById("targetMoveOne").innerText = dashRemover(moveArray[0]);
            document.getElementById("targetMoveTwo").innerText = dashRemover(moveArray[1]);
            document.getElementById("targetMoveThree").innerText = dashRemover(moveArray[2]);
            document.getElementById("targetMoveFour").innerText = dashRemover(moveArray[3]);


            let evolution = response.data.species.url;

            axios.get(evolution)
                .then(function (response) {
                        console.log(response);
                        if (response.data.evolves_from_species === null) {
                            document.getElementById("targetNameTwo").innerText = "No prev evo";
                            document.getElementById("targetIdNrTwo").innerText = "0";
                        } else {
                            let evoID = response.data.evolves_from_species.name;
                            axios.get('https://pokeapi.co/api/v2/pokemon/' + evoID + '/')
                                .then(function (response) {
                                    console.log(response.data.sprites.front_default);
                                    document.getElementById("targetNameTwo").innerText = response.data.name;
                                    document.getElementById("targetIdNrTwo").innerText = response.data.id;
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

})
;


function fourRandomMoves(allMoves) {
    let moveArray = new Array();
    for (i = 0; i < allMoves.length; i++) {
        moveArray.push(allMoves[Math.floor(Math.random() * allMoves.length)].move.name);
        moveArray[i] = dashRemover(moveArray[i]);
        moveArray[i] = capitaliser(moveArray[i]);
        console.log(moveArray[i]);
    }
    return uniqueArray(moveArray);
}

function uniqueArray(array) {
    return array.filter(function (item, index) {
        return array.indexOf(item) >= index;
    });
    }

    function capitaliser(element) {
        return element.charAt(0).toUpperCase();
    }

    function dashRemover(element) {
        capitaliser(element);
        return element.replace(/-/g, ' ');
    }