import React from "react";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
    return (
        <div>
            <h1>This is the button component</h1>
            <Link to="/user">
                <button>Tài khoản User</button>
            </Link>
            <Link to="/provider">
                <button>Tài khoản Provider</button>
            </Link>
        </div>
    );
};

export default HomeAdmin;