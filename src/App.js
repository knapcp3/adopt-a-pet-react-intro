import pf from "petfinder-client";
import React from "react";
import { render } from "react-dom";
import SearchResults from "./SearchResults";
import { Router, Link } from "@reach/router";
import Details from "./Details";
import SearchParams from "./SearchParams";

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.SECRET_KEY
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            petLocation: "Seattle, WA",
            animal: "",
            breed: "",
            breeds: [],
            handleAnimalChange: this.handleAnimalChange,
            handleBreedChange: this.handleBreedChange,
            handlePetLocationChange: this.handlePetLocationChange,
            getBreeds: this.getBreeds
        };
    }

    handlePetLocationChange = event => {
        this.setState({
            petLocation: event.target.value
        });
        console.log(this.state.petLocation);
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
        return (
            <div>
                <header>
                    <Link to="/">Adopt Me!</Link>
                    <Link to="search-params">
                        <span aria-label="search">SEARCH!</span>
                    </Link>
                </header>

                <Router>
                    <SearchResults path="/" {...this.state} />
                    <Details path="/details/:id" />
                    <SearchParams path="/search-params" {...this.state} />
                </Router>
            </div>
        );
    }
}

render(<App />, document.getElementById("root"));
