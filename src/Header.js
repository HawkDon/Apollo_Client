import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import "./css/navbar.css";

class Header extends Component {
    render() {
        return (
            <div className="wrapper">
                <ul>
                    <li>
                        <Link to="/">
                            Start
                        </Link>
                    </li>
                    <li className="dropdown">
                        <a className="dropbtn">Create</a>
                        <div className="dropdown-content">
                            <Link to="/create/user">
                                User
                        </Link>
                            <Link to="/create/locationblog">
                                LocationBlog
                        </Link>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a className="dropbtn">Read</a>
                        <div className="dropdown-content">
                            <Link to="/read/allUsers">
                                All Users
                            </Link>
                            <Link to="/read/allLocationBlogs">
                                All LocationBlogs
                            </Link>
                            <Link to="/read/allPositions">
                                All Positions
                            </Link>
                            <Link to="/read/oneUser">
                                One User
                            </Link>
                            <Link to="/read/oneLocationBlog">
                                One Location
                            </Link>
                            <Link to="/read/onePosition">
                                One Position
                            </Link>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a className="dropbtn">Update</a>
                        <div className="dropdown-content">
                            <Link to="/update/updateUser">
                                User
                            </Link>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a className="dropbtn">Delete</a>
                        <div className="dropdown-content">
                            <Link to="/delete/deleteUser">
                                One Position
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(Header);