import React from 'react';
import { connect } from 'react-redux';
import { settings } from '../../actions/index';

import FormInput from '../FormInput';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Modal from '../Modal';
import Breadcrumbs from '../Breadcrumbs';

class Settings extends React.Component {
    state = {
        username: this.props.username,
        beFound: this.props.beFound,
        theme: this.props.theme,
        modal: 'not-active',
        modalText: '',
    };

    onInputChange = (input, name) => {
        this.setState({ [name]: input });

        if (name === 'theme') {
            this.onThemeInputChange(input);
        }
    };

    onModalClick = (modal) => {
        this.setState({ modal });
    };

    onThemeInputChange = (input) => {
        document.documentElement.className = '';
        document.documentElement.classList.add(`theme-${input}`);
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await this.props.settings({
                username: this.state.username,
                beFound: this.state.beFound,
                theme: this.state.theme,
            });
            this.setState({ modal: 'active', modalText: 'Your settings have been changed' });
        } catch(err) {
            console.error(err.message);
            this.setState({ modal: 'active', modalText: err.message });
        }
        setTimeout(() => {
            this.setState({ modal: 'not-active' });
        }, 1500);
    };

    render() {
        return (
            <div>
                <Breadcrumbs page="settings" />
                <div className="container settings">
                    <Modal
                        active={this.state.modal}
                        text={this.state.modalText}
                        onClick={this.onModalClick}
                    />
                    <h1>Your Settings</h1>
                    <form onSubmit={this.onFormSubmit}>
                        <FormInput
                            label="Your username"
                            type="text"
                            value={this.state.username}
                            name="username"
                            onChange={this.onInputChange}
                            touched="touched"
                        />
                        <Checkbox
                            title="Your theme"
                            name="theme"
                            defaultValue={this.state.theme}
                            values={[
                                { text: 'Light mode', value: 'light', name: 'lightMode' },
                                { text: 'Dark mode', value: 'dark', name: 'darkMode' },
                                { text: 'Sleek', value: 'sleek', name: 'sleekMode' },
                                { text: 'Colourful', value: 'colourful', name: 'colourfulModel' },
                            ]}
                            onChange={this.onInputChange}
                        />
                        <Checkbox
                            title="Would you like other users to be able to find you?"
                            name="beFound"
                            defaultValue={this.state.beFound}
                            values={[
                                { text: 'Yes', value: true, name: 'beFoundYes' },
                                { text: 'No', value: false, name: 'beFoundNo' },
                            ]}
                            onChange={this.onInputChange}
                        />
                        <Button text="Save" />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        theme: state.auth.theme,
        beFound: state.auth.beFound,
    };
};

export default connect(mapStateToProps, { settings })(Settings);
