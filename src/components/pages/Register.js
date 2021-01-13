import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../FormInput';
import Button from '../Button';
import { register } from '../../actions/index';

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        error: '',
    };

    onInputChange = (input, name) => {
        this.setState({ [name]: input });
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        if (this.state.email === '' || this.state.password === '' || this.state.username === '') {
            this.setState({ error: 'Please fill all fields' });
        } else {
            try {
                await this.props.register(
                    this.state.username,
                    this.state.email,
                    this.state.password
                );
            } catch(err) {
                console.error(err.message);
                this.setState({ error: err.message });
            }
        }
    };

    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.onFormSubmit}>
                    <FormInput
                        label="Username"
                        type="text"
                        value={this.state.username}
                        name="username"
                        onChange={this.onInputChange}
                        touched="untouched"
                    />
                    <FormInput
                        label="Email"
                        type="email"
                        value={this.state.email}
                        name="email"
                        onChange={this.onInputChange}
                        touched="untouched"
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        value={this.state.password}
                        name="password"
                        onChange={this.onInputChange}
                        touched="untouched"
                    />
                    <Button text="Register" />
                </form>
            </div>
        );
    }
}

export default connect(null, { register })(Register);
