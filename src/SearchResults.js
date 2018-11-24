import React from "react";
import Pet from "./Pet";
import pf from "petfinder-client";
import SearchBox from "./SearchBox";
import Results from "./Results";

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
});

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pets: []
        };
    }

    componentDidMount() {
        this.search();
    }

    search = () => {
        petfinder.pet
            .find({
                output: "full",
                location: this.props.petLocation,
                animal: this.props.animal,
                breed: this.props.breed
            })
            .then(data => {
                let pets;

                if (data.petfinder.pets && data.petfinder.pets.pet) {
                    if (Array.isArray(data.petfinder.pets.pet)) {
                        pets = data.petfinder.pets.pet;
                    } else {
                        pets = [data.petfinder.pets.pet];
                    }
                } else {
                    pets = [];
                }

                this.setState({
                    pets
                });
            });
    };

    render() {
        const {
            animal,
            petLocation,
            breeds,
            breed,
            handleAnimalChange,
            handleBreedChange,
            handlePetLocationChange
        } = this.props;

        return (
            <div className="search">
                <SearchBox
                    search={this.search}
                    path="/"
                    animal={animal}
                    petLocation={petLocation}
                    breed={breed}
                    breeds={breeds}
                    handleAnimalChange={handleAnimalChange}
                    handleBreedChange={handleBreedChange}
                    handlePetLocationChange={handlePetLocationChange}
                />
                <Results pets={this.state.pets} />
            </div>
        );
    }
}

export default SearchResults;
