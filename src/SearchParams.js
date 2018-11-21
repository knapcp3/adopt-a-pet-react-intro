import React from "react";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";

class SearchParams extends React.Component {
    hadleSearchSubmit = () => {
        navigate("/");
    };

    render() {
        return (
            <div className="search-route">
                <SearchBox search={this.hadleSearchSubmit} />
            </div>
        );
    }
}

export default SearchParams;
