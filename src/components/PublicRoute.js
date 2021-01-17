import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, ...rest}) => {
    return (
        <Route {...rest} component={(props) => {
            return (
                !isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
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

export default connect(mapStateToProps)(PublicRoute);