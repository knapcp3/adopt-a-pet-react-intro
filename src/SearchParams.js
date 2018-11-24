import React from "react";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";

class SearchParams extends React.Component {
    hadleSearchSubmit = () => {
        navigate("/");
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
            <div className="search-route">
                <SearchBox
                    search={this.hadleSearchSubmit}
                    path="/"
                    animal={animal}
                    petLocation={petLocation}
                    breed={breed}
                    breeds={breeds}
                    handleAnimalChange={handleAnimalChange}
                    handleBreedChange={handleBreedChange}
                    handlePetLocationChange={handlePetLocationChange}
                />
            </div>
        );
    }
}

export default SearchParams;
