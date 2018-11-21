import React from "react";
import Pet from "./Pet";
import pf from "petfinder-client";
import SearchBox from "./SearchBox";
import { Consumer } from "./SearchContext";

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
        petfinder.pet
            .find({
                output: "full",
                location: this.props.searchParams.location,
                animal: this.props.searchParams.animal,
                breed: this.props.searchParams.breed
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
    }

    render() {
        return (
            <div className="search">
                <SearchBox search={this.search} />
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

export default function ResultsWithContext(props) {
    return (
        <Consumer>
            {context => <Results {...props} searchParams={context} />}
        </Consumer>
    );
}
