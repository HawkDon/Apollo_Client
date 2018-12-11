import React, { useState } from 'react';
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const DELETE_USER_BY_ID = gql`
    mutation DeleteUser($input: ID!) {
        deleteUser(id: $input)
    }
`

const DeleteUser = ({ client }) => {
    const [id, setId] = useState("");
    const [queryResult, setQueryResult] = useState("");
    function handleIdChange(e) {
        e.preventDefault();
        setId(e.target.value)
    }

    async function handleClick(e) {
        e.preventDefault();
        const response = await client.mutate({
            mutation: DELETE_USER_BY_ID,
            variables: { input: id }
        });
        setQueryResult(response.data.deleteUser);
    }

    return (
        <div>
            <div className="control-h2"><h2>Delete a user by id</h2></div>
            {queryResult.length ? (<div className="control-h2"><h2>{queryResult}</h2></div>) : null}
            <form>
            <div className="control-label"><label>Id:</label> <input type="text" value={id} onChange={handleIdChange} /></div>
            <input type="submit" value="Slet" onClick={handleClick} />
            </form>
        </div>
    )
}

export default withApollo(DeleteUser);