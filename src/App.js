import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Queries
import AllUsers from "./queries/AllUsers";
import AllLocationBlogs from "./queries/AllLocationBlogs";
import AllPositions from "./queries/AllPositions";
import OneLocationBlog from "./queries/OneLocationBlog";
import OnePosition from "./queries/OnePosition";
import OneUser from "./queries/OneUser";

// Mutations
import CreateUser from "./mutations/CreateUser";
import CreateLocationBlog from "./mutations/CreateLocationBlog";

// Regular components
import Welcome from "./Welcome";
import Header from "./Header";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Welcome />} />
        <Route path="/read/allUsers" render={() => <AllUsers />} />
        <Route path="/read/allLocationBlogs" render={() => <AllLocationBlogs />} />
        <Route path="/read/allPositions" render={() => <AllPositions/>} />
        <Route path="/read/OneUser" render={() => <OneUser />} />
        <Route path="/read/OneLocationBlog" render={() => <OneLocationBlog />} />
        <Route path="/read/OnePosition" render={() => <OnePosition />} />
        <Route path="/create/user" render={() => <CreateUser />} />
        <Route path="/create/locationblog" render={() => <CreateLocationBlog />} />
      </Switch>
    </ApolloProvider>
  </Router>
);

export default App;
