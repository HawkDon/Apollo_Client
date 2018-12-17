import React, { useState } from 'react';
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const UPDATE_USER = gql`
    mutation UpdateUser($input: UserUpdateInput) {
        updateUser(input: $input) {
            userName
        }
    }
`;

const UpdateUser = ({ client }) => {
    const [userInput, setUserInput] = useState({ id: "", userName: "", firstName: "", lastName: "", password: "", email: "", job: [] });
    const [queryResult, setQueryResult] = useState({});
    const [job, setJob] = useState(false);
    const [newJob, setNewJob] = useState({ type: "", company: "", companyUrl: "" })

    function handleUserInput(e) {
        const id = e.target.id;
        const value = e.target.value;
        userInput[id] = value;

        setUserInput(prevState => {
            return {
                ...prevState,
                ...userInput
            };
        })
    }

    function handleUserNewJob(e) {
        const id = e.target.id;
        const value = e.target.value;
        newJob[id] = value;

        setNewJob(prevState => {
            return {
                ...prevState,
                ...newJob
            }
        })
    }

    async function handleUserClick(e) {
        e.preventDefault();
        const response = await client.mutate({
            mutation: UPDATE_USER,
            variables: { input: userInput }
        })
        setQueryResult(response.data.createUser);
    }

    function handleAddJob(e) {
        e.preventDefault();
        userInput.job.push(newJob);
        setUserInput(prevState => {
            return {
                ...prevState,
                ...userInput
            }
        });
    }

    function handleJobAddClick(e) {
        e.preventDefault();
        setJob(!job);
    }

    return (
    <div>
        <div className="control-h2"><h2>Update a user</h2></div>
        <form>
            <div className="control-label"><label>Id:</label> <input type="text" id="id" value={userInput.id} onChange={handleUserInput} /></div>
            <div className="control-label"><label>Username:</label> <input type="text" id="userName" value={userInput.userName} onChange={handleUserInput} /></div>
            <div className="control-label"><label>First name:</label> <input type="text" id="firstName" value={userInput.firstName} onChange={handleUserInput} /></div>
            <div className="control-label"><label>Last name:</label> <input type="text" id="lastName" value={userInput.lastName} onChange={handleUserInput} /></div>
            <div className="control-label"><label>Password:</label> <input type="password" id="password" value={userInput.password} onChange={handleUserInput} /></div>
            <div className="control-label"><label>Email:</label> <input type="text" id="email" value={userInput.email} onChange={handleUserInput} /></div>
            <div className="control-label"><label>Job:</label> <button onClick={handleJobAddClick} style={{ width: "50px" }} className="btn"><i className="fas fa-plus"></i></button></div>
            {job ? (
                <React.Fragment>
                    <div className="control-label"><label>Type:</label> <input type="text" id="type" value={newJob.type} onChange={handleUserNewJob} /></div>
                    <div className="control-label"><label>Company:</label> <input type="text" id="company" value={newJob.company} onChange={handleUserNewJob} /></div>
                    <div className="control-label"><label>CompanyURL:</label> <input type="text" id="companyUrl" value={newJob.companyUrl} onChange={handleUserNewJob} /></div>
                    <div className="control-label"><input type="submit" value="Tilføj" onClick={handleAddJob} /></div>
                </React.Fragment>)
                : null}
            {userInput.job.length ? (
                <React.Fragment>
                    <p style={{fontSize: "20px", paddingLeft: "16px"}}>Jobs listed:</p>
                    <p style={{fontSize: "20px", paddingLeft: "16px"}}>{userInput.job.map(job => job.type).join(", ")}</p>
                </React.Fragment>
            )
                : null}
            <input type="submit" value="Opret" onClick={handleUserClick} />
        </form>
    </div>
    )
}

export default withApollo(UpdateUser);