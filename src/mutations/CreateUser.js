import React, { useState } from 'react';
import "../css/input.css";
import gql from "graphql-tag";
import { withApollo } from 'react-apollo';

const CREATE_USER = gql`
    mutation CreateUser($input: UserInput) {
        createUser(input: $input) {
            id
            userName
        }
    }
`;

const CreateUser = ({ client }) => {
    const [userInput, setUserInput] = useState({userName: "", firstName: "", lastName: "", password: "", email: "" });
    const [queryResult, setQueryResult] = useState({});
    function handleUserInput(e) {
        const id = e.target.id;
        const value = e.target.value;
        userInput[id] = value;

        setUserInput(prevState => {
            return {...prevState,
                 ...userInput};
        })
    }

    async function handleUserClick(e) {
        e.preventDefault();
        console.log(client);
        const response = await client.mutate({
            mutation: CREATE_USER,
            variables: { input: userInput }
        })
        setQueryResult(response.data.createUser);
    }

    return (
        <div>
            <div className="control-h2"><h2>Create a user</h2></div>
            {Object.keys(queryResult).length ? (<div className="control-h2"><h2>{queryResult.userName} has been added</h2></div>) : null}
            <form>
                <div className="control-label"><label>Username:</label> <input type="text" id="userName" value={userInput.userName} onChange={handleUserInput} /></div>
                <div className="control-label"><label>First name:</label> <input type="text" id="firstName" value={userInput.firstName} onChange={handleUserInput} /></div>
                <div className="control-label"><label>Last name:</label> <input type="text" id="lastName" value={userInput.lastName} onChange={handleUserInput} /></div>
                <div className="control-label"><label>Password:</label> <input type="password" id="password" value={userInput.password} onChange={handleUserInput} /></div>
                <div className="control-label"><label>Email:</label> <input type="text" id="email" value={userInput.email} onChange={handleUserInput} /></div>
                <input type="submit" value="Opret" onClick={handleUserClick}/>
            </form>
            </div>
    )
}

export default withApollo(CreateUser);