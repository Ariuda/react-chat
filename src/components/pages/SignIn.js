import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../FormInput';
import Button from '../Button';
import { signIn, fetchChats } from '../../actions/index';

class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
        error: '',
    };

    onInputChange = (input, name) => {
        this.setState({ [name]: input });
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        if (this.state.email === '' || this.state.password === '') {
            this.setState({ error: 'Please fill all fields' });
        } else {
            try {
                await this.props.signIn(this.state.email, this.state.password);
            } catch (err) {
                console.error(err.message);
                this.setState({ error: err.message });
            }
        }
    };

    render() {
        return (
            <div className="container">
                <h1>Sign In</h1>
                <form onSubmit={this.onFormSubmit}>
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
                    <Button text="Sign In" />
                    <p className="error">{this.state.error}</p>
                </form>
            </div>
        );
    }
}

export default connect(null, { signIn, fetchChats })(SignIn);
