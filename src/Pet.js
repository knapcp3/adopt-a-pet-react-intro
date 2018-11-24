import React from "react";
import { Link } from "@reach/router";

class Pet extends React.Component {
    render() {
        const { name, animal, breed, media, petLocation, id } = this.props;
        let photos = [];

        if (media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(elem => elem["@size"] === "pn");
        }

        const hero = photos[0]
            ? photos[0].value
            : "http://placecorgi.com/300/300";

        return (
            <Link to={`/details/${id}`} className="pet">
                <div className="image-container">
                    <img src={hero} alt={name} />
                </div>
                <div className="info">
                    <h1>{name}</h1>
                    <h2>
                        {animal} - {breed} - {petLocation}
                    </h2>
                </div>
            </Link>
        );
    }
}

export default Pet;
