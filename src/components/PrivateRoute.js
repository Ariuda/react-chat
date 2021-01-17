import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated,  component: Component, ...rest }) => {
    return (
        <Route {...rest} component={(props) => {
            return (
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/sign-in" />
                )   
            )
        }} />
    )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.userId
    }
}

export default connect(mapStateToProps)(PrivateRoute);