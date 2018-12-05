import React, { useState } from 'react';
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const GET_ONE_USER = gql`
query User($id: ID!){
  getOneUser(id: $id) {
    id
    firstName
    lastName
    userName
  }
}
`

// Hooks are the best. Cleaner react code!
const OneUser = ({ client }) => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState({});

  let counter = 0;

  function handleInput(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  async function runQuery(e) {
    e.preventDefault();
    const response = await client.query({
      query: GET_ONE_USER,
      variables: { id: input },
    });
    if (response.data.getOneUser) {
      setQuery(response.data.getOneUser);
    }
  }

  return (
    <div>
      <h1>Get one user</h1>
      <h3>Search through id</h3>
      <form>
        <input type="text" value={input} onChange={handleInput} placeholder="Search id"/>
        <input type="submit" value="Run query" onClick={runQuery} />
      </form>
      {Object.keys(query).length ?
        (
          <table>
            <thead>
              <tr>
                {Object.keys(query).map(header => <th key={header}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.keys(query).map((header) => <td key={counter++}>{query[header]}</td>)}
              </tr>
            </tbody>
          </table>) : null
      }

    </div>
  );
}

export default withApollo(OneUser);