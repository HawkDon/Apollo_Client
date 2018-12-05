import React, { useState } from 'react';
import gql from "graphql-tag";
import { withApollo } from 'react-apollo';

const GET_ONE_POSITION = gql`
query Position($id: ID!){
  getOnePosition(id: $id) {
    user
    created
  }
}
`

// Hooks are the best. Cleaner react code!
const OnePosition = ({ client }) => {
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
      query: GET_ONE_POSITION,
      variables: { id: input },
    });
    if (response.data.getOnePosition) {
      setQuery(response.data.getOnePosition);
    }
  }

  return (
    <div>
      <h1>Get one position</h1>
      <h3>Search through id</h3>
      <form>
        <input type="text" value={input} onChange={handleInput} placeholder="Search id" />
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

export default withApollo(OnePosition);