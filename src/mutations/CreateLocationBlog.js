import React, { useState } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

const CREATE_LOCATIONBLOG = gql`
    mutation CreateLocationBlog($input: LocationInput) {
        createLocationBlog(input: $input) {
            info
            pos {
                latitude
                longitude
            }
            author
        }
    }`;

const CreateLocationBlog = ({ client }) => {
    const [locationBlog, setLocationBlog] = useState({ info: "", pos: { longitude: "", latitude: "" }, author: "" });
    const [queryResult, setQueryResult] = useState({});

    function handleLocationBlog(e) {
        const id = e.target.id;
        const value = e.target.value;
        if (id === "latitude" || id === "longitude") {
            locationBlog["pos"][id] = value;
        } else {
            locationBlog[id] = value;
        }
        setLocationBlog(prevState => {
            return {
                ...prevState,
                ...locationBlog
            }
        })
    }

    async function handleLocationBlogClick(e) {
        e.preventDefault();
        // Parse to float
        const floats = { 
            latitude: parseFloat(locationBlog.pos.latitude),
            longitude: parseFloat(locationBlog.pos.longitude)
        }
        const locationPackage = {
            ...locationBlog,
            pos: floats
        }

        const response = await client.mutate({
            mutation: CREATE_LOCATIONBLOG,
            variables: { input: locationPackage }
        })
        setQueryResult(response.data.createLocationBlog);
    }

    return (
        <div>
            <div className="control-h2"><h2>Create a locationblog</h2></div>
            {Object.keys(queryResult).length ? (<div className="control-h2"><h2>Blog has been added</h2></div>) : null}
            <form>
                <div className="control-label"><label>Info:</label> <input type="text" id="info" value={locationBlog.info} onChange={handleLocationBlog} /></div>
                <div className="control-label"><label>Longitude:</label> <input type="text" id="latitude" value={locationBlog.pos.latitude} onChange={handleLocationBlog} /></div>
                <div className="control-label"><label>Latitude:</label> <input type="text" id="longitude" value={locationBlog.pos.longitude} onChange={handleLocationBlog} /></div>
                <div className="control-label"><label>Author:</label> <input type="text" id="author" value={locationBlog.author} onChange={handleLocationBlog} /></div>
                <input type="submit" value="Opret" onClick={handleLocationBlogClick} />
            </form>
        </div>
    )
}

export default withApollo(CreateLocationBlog);