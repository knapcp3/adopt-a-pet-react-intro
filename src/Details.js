import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
});

class Details extends React.Component {
    state = {
        loading: true
    };

    componentDidMount() {
        petfinder.pet
            .get({
                output: "full",
                id: this.props.id
            })
            .then(data => {
                let breed;
                const pet = data.petfinder.pet;
                if (Array.isArray(data.petfinder.pet.breeds.breed)) {
                    breed = data.petfinder.pet.breeds.breed.join(", ");
                } else {
                    breed = data.petfinder.pet.breeds.breed;
                }

                this.setState({
                    name: pet.name,
                    animal: pet.animal,
                    location: `${pet.contact.city}, ${pet.contact.state}`,
                    description: pet.description,
                    media: pet.media,
                    breed,
                    loading: false
                });
            })
            .catch(_ => {
                navigate("/");
            });
    }

    render() {
        const {
            name,
            animal,
            breed,
            location,
            description,
            media
        } = this.state;

        if (this.state.loading) {
            return <h1>loading...</h1>;
        }

        return (
            <div className="details">
                <Carousel media={media} />
                <h1>{name}</h1>
                <h2>
                    {animal} - {breed} - {location}
                </h2>
                <p>{description}</p>
            </div>
        );
    }
}

export default Details;
