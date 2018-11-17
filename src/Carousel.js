import React from "react";

class Carousel extends React.Component {
    state = {
        photos: [],
        active: 0
    };

    static getDerivedStateFromProps({ media }) {
        let photos = [];

        if (media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(elem => elem["@size"] === "pn");
        }

        return { photos };
    }

    handleIndexClick = event => {
        this.setState({
            active: +event.target.dataset.index
        });
        // console.log(this.state.active);
    }

    render() {
        const { photos, active } = this.state;
        let carouselSmaller = photos.map((photo, index) => {
            return (
                /* eslint-disable-next-line */
                <img
                    onClick={this.handleIndexClick}
                    key={photo.value}
                    src={photo.value}
                    className={index === active ? "active" : ""}
                    data-index={index}
                    alt="animal thumbnail"
                />
            );
        });
        return (
            <div className="carousel">
                <img src={photos[active].value} alt="primary animal" />
                <div className="carousel-smaller">{carouselSmaller}</div>
            </div>
        );
    }
}

export default Carousel;
