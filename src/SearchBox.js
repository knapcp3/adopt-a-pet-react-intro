import React from "react";
import { ANIMALS } from "petfinder-client";

class SearchBox extends React.Component {
    handleFormSubmit = e => {
        e.preventDefault();
        this.props.search();
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
            <div className="search-params">
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="location">
                        Location
                        <input
                            id="location"
                            value={petLocation}
                            onChange={handlePetLocationChange}
                            placeholder="Location"
                        />
                    </label>
                    <label htmlFor="animal">
                        Animal
                        <select
                            id="animal"
                            value={animal}
                            onChange={handleAnimalChange}
                            onBlur={handleAnimalChange}
                        >
                            <option />
                            {ANIMALS.map(elem => (
                                <option key={elem} value={elem}>
                                    {elem}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="breed">
                        Breed
                        <select
                            id="breed"
                            value={breed}
                            onChange={handleBreedChange}
                            onBlur={handleBreedChange}
                            disabled={!breeds.length}
                        >
                            <option />
                            {breeds.map(elem => (
                                <option key={elem} value={elem}>
                                    {elem}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">submit</button>
                </form>
            </div>
        );
    }
}

export default SearchBox;
