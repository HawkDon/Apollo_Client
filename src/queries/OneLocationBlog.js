import React, { useState } from 'react';
import gql from "graphql-tag";
import { withApollo } from 'react-apollo';

const GET_ONE_LOCATIONBLOG = gql`
query LocationBlog($info: String!){
  getOneLocationBlog(info: $info) {
    id
    info
  }
}
`

// Hooks are the best. Cleaner react code!
const OneLocationBlog = ({ client }) => {
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
      query: GET_ONE_LOCATIONBLOG,
      variables: { info: input },
    });
    if (response.data.getOneLocationBlog) {
      setQuery(response.data.getOneLocationBlog);
    }
  }

  return (
    <div>
      <h1>Get one locationblog</h1>
      <h3>Search through info</h3>
      <form>
        <input type="text" value={input} onChange={handleInput} placeholder="Search info"/>
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

export default withApollo(OneLocationBlog);
