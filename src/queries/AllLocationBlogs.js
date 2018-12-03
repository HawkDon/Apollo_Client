import React, { Component } from 'react'

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_ALL_LOCATIONBLOGS = gql`
{
  getAllLocationBlogs {
    id
    info
  }
}
`;

class AllLocationBlogs extends Component {

    mapChildren = (data) => {
        let counter = 0;
        return data.getAllLocationBlogs.map(user => {
            let children = [];
            const keys = Object.keys(user);
            keys.forEach(element => {
                children.push(<td key={counter++}>{user[element]}</td>);
            });
            return (<tr key={user.id}>{children}</tr>);
        })
    }

    render() {
        return (
            <Query
                query={GET_ALL_LOCATIONBLOGS}
            >
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return (
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(data.getAllLocationBlogs[0]).map(header => <th key={header}>{header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {this.mapChildren(data)}
                            </tbody>
                        </table>
                    )
                }}
            </Query>
        )
    }
}

export default AllLocationBlogs;