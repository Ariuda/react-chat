import React from 'react';
import { connect } from 'react-redux';

const Message = ({ messages, uid }) => {
    const renderMessages = () => {
        return messages.map((message) => {
            return (
                <div className="message-container" key={message.time}>
                    <div
                        className={`message ${message.user === uid ? 'float-right' : 'float-left'}`}
                    >
                        {message.text}
                    </div>
                </div>
            );
        });
    };
    return <div>{renderMessages()}</div>;
};

const mapStateToProps = (state) => {
    return {
        uid: state.auth.userId,
    };
};

export default connect(mapStateToProps)(Message);
