import pf from "petfinder-client";
import React from "react";
import { render } from "react-dom";
import Results from "./Results";
import { Router, Link } from "@reach/router";
// import Details from "./Details";
// import SearchParams from "./SearchParams";

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.SECRET_KEY
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "Seattle, WA",
            animal: "",
            breed: "",
            breeds: [],
            handleAnimalChange: this.handleAnimalChange,
            handleBreedChange: this.handleBreedChange,
            handleLocationChange: this.handleLocationChange,
            getBreeds: this.getBreeds
        };
    }

    handleLocationChange = event => {
        this.setState({
            location: event.target.value
        });
    };

    handleAnimalChange = event => {
        this.setState(
            {
                animal: event.target.value,
                breed: ""
            },
            this.getBreeds
        );
    };

    handleBreedChange = event => {
        this.setState({
            breed: event.target.value
        });
    };

    getBreeds() {
        if (this.state.animal) {
            petfinder.breed.list({ animal: this.state.animal }).then(data => {
                if (
                    data.petfinder &&
                    data.petfinder.breeds &&
                    Array.isArray(data.petfinder.breeds.breed)
                ) {
                    this.setState({
                        breeds: data.petfinder.breeds.breed
                    });
                } else {
                    this.setState({
                        breeds: []
                    });
                }
            });
        } else {
            this.setState({
                breeds: []
            });
        }
    }

    render() {
        const {
            animal,
            location,
            breeds,
            breed,
            handleAnimalChange,
            handleBreedChange,
            handleLocationChange
        } = this.state;
        return (
            <div>
                <header>
                    <Link to="/">Adopt Me!</Link>
                    {/* <Link to="search-params">
                        <span aria-label="search">SEARCH!</span>
                    </Link> */}
                </header>

                <Router>
                    <Results
                        path="/"
                        animal={animal}
                        location={location}
                        breed={breed}
                        breeds={breeds}
                        handleAnimalChange={handleAnimalChange}
                        handleBreedChange={handleBreedChange}
                        handleLocationChange={handleLocationChange}
                    />
                    {/* <Details path="/details/:id" />
                    <SearchParams path="/search-params" /> */}
                </Router>
            </div>
        );
    }
}

render(<App />, document.getElementById("root"));
