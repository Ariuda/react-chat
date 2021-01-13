import React from 'react';
import io from 'socket.io-client';

import FormInput from '../FormInput';
import Button from '../Button';
import Message from '../Message';
import Breadcrumbs from '../Breadcrumbs';
import { connect } from 'react-redux';
import { createMessage, fetchChat } from '../../actions';

let socket;
let scrollBar;

class Chat extends React.Component {
    state = {
        message: '',
        error: '',
    };

    componentDidMount() {
        this.props.fetchChat(this.props.match.params.chatId);
        socket = io('localhost:3001');
        scrollBar = document.querySelector('.chat-wrapper');

        socket.emit(
            'join',
            {
                uid: this.props.uid,
                room: parseInt(this.props.match.params.chatId, 10),
            },
            () => {}
        );

        socket.on('message', async () => {
            try {
                await this.props.fetchChat(this.props.match.params.chatId);
                scrollBar.scrollTop = scrollBar.scrollHeight;
            } catch (err) {
                console.error(err.message);
            }
        });
        scrollBar.scrollTop = scrollBar.scrollHeight;
    }

    onInputChange = (input, name) => {
        this.setState({ [name]: input });
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.message !== '') {
            this.props.createMessage(
                {
                    text: this.state.message,
                    time: Date.now(),
                    id: Math.floor(Math.random() * 1000),
                },
                this.props.match.params.chatId
            );
            this.setState({ message: '', error: '' });
        } else {
            this.setState({ error: 'Please type a message' });
        }
        socket.emit('message', { text: this.state.message, uid: this.props.uid });
    };

    render() {
        if (this.props.chat) {
            return (
                <div>
                    <Breadcrumbs page="chat" />
                    <div className="container chat">
                        <h1>Your chat with {this.props.chat.to}</h1>
                        <div className="chat-wrapper">
                            <Message messages={this.props.chat.messages} />
                        </div>
                        <form className="message-bar" onSubmit={this.onFormSubmit}>
                            <FormInput
                                label={null}
                                type="text"
                                value={this.state.message}
                                name="message"
                                onChange={this.onInputChange}
                                touched="untouched"
                            />
                            <Button text="Send" id="send" />
                            <p>{this.state.error}</p>
                        </form>
                    </div>
                </div>
            );
        }

        return <div>Loading...</div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        chat: state.chats[ownProps.match.params.chatId],
        uid: state.auth.userId,
    };
};

export default connect(mapStateToProps, { createMessage, fetchChat })(Chat);
