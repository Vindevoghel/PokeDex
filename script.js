document.getElementById("searchContainer").addEventListener("submit", function (event) {
    event.preventDefault();
    let pokeID = document.getElementById("searchBox").value;


    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeID + '/')
        .then(function (response) {

            const nameSetter = (response) => {
                return capitalizer(response.data.name);
            };

            const idTypeSetter = (response) => {
                return response.data.id + " " + capitalizer(response.data.types[0].type.name);
            };

            const spriteSetter = (response) => {
                return (response.data.sprites.front_default ? response.data.sprites.front_default : './assets/noimage.png');
            };

            const prevoSetter = (response) => {
                document.getElementById("targetNameTwo").innerText = nameSetter(response);
                document.getElementById("targetIdNrTwo").innerText = idTypeSetter(response);
                document.getElementById("evoImg").src = spriteSetter(response);
            };

            document.getElementById("targetName").innerText = nameSetter(response);
            document.getElementById("targetIdNr").innerText = idTypeSetter(response);
            document.getElementById("pokeImg").src = spriteSetter(response);

            const randomMoves = (allMoves) => {
                let moveArray = [];
                for (let i = 0; i < allMoves.length; i++) {
                    moveArray.push(allMoves[Math.floor(Math.random() * allMoves.length)].move.name);
                    console.log(moveArray);
                }
                return moveArray;
            };

            function uniqueArray(array) {
                return array.filter(function (item, index) {
                    return array.indexOf(item) >= index;
                });
            }

            const moveArrayMaker = (response) => {
                return uniqueArray(randomMoves(response.data.moves));

            };

            let moveArray = moveArrayMaker(response);

            for (let i = 0; i < 4; i++) {
                if (moveArray[i] !== undefined) {
                    document.getElementsByClassName('moves')[i].innerText = dashRemover(capitalizer(moveArray[i]));
                } else {
                    document.getElementsByClassName('moves')[i].innerText = '';
                }
            }

            let evolution = response.data.species.url;

            axios.get(evolution)
                .then(function (response) {

                        if (response.data.evolves_from_species === null) {
                            document.getElementById("targetNameTwo").innerText = "No prev evo";
                            document.getElementById("targetIdNrTwo").innerText = "0";
                            document.getElementById("evoImg").src = "./assets/pokemonegg.jpg"
                        } else {
                            let evoID = response.data.evolves_from_species.name;
                            axios.get('https://pokeapi.co/api/v2/pokemon/' + evoID + '/')
                                .then(function (response) {
                                    prevoSetter(response);
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

const capitalizer = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const dashRemover = (move) => {
    return move.replace(/-/g, ' ');
};
