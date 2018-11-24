import React from "react";
import Pet from "./Pet";
import pf from "petfinder-client";
// import SearchBox from "./SearchBox";

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
});

class Results extends React.Component {
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
        console.log(this.props.location);
        petfinder.pet
            .find({
                output: "full",
                location: this.props.location,
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
            location,
            breeds,
            breed,
            handleAnimalChange,
            handleBreedChange,
            handleLocationChange
        } = this.props;

        console.log(location);

        return (
            <div className="search">
                {/* <SearchBox
                    search={this.search}
                    path="/"
                    animal={animal}
                    location={location}
                    breed={breed}
                    breeds={breeds}
                    handleAnimalChange={handleAnimalChange}
                    handleBreedChange={handleBreedChange}
                    handleLocationChange={handleLocationChange}
                /> */}
                {this.state.pets.map(elem => {
                    let breed;
                    if (Array.isArray(elem.breeds.breed)) {
                        breed = elem.breeds.breed.join(", ");
                    } else {
                        breed = elem.breeds.breed;
                    }
                    return (
                        <Pet
                            animal={elem.animal}
                            name={elem.name}
                            breed={breed}
                            media={elem.media}
                            location={`${elem.contact.city}, ${
                                elem.contact.state
                            }`}
                            key={elem.id}
                            id={elem.id}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Results;
