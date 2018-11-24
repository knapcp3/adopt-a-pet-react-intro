import React from "react";
import Pet from "./Pet";

class Results extends React.Component {
    render() {
        //console.log(this.props);
        return (
            <div>
                {this.props.pets.map(elem => {
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
                            petLocation={`${elem.contact.city}, ${
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
