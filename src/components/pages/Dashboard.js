import React from 'react';
import { connect } from 'react-redux';

import ContactCard from '../ContactCard';
import { fetchChats } from '../../actions';

class Dashboard extends React.Component {
    componentDidMount() {
        document.documentElement.className = '';
        document.documentElement.classList.add(`theme-${this.props.theme}`);
        this.props.fetchChats();
    }

    render() {
        if (this.props.chats) {
            if (this.props.chats.length > 0) {
                return (
                    <div className="container">
                        <h1>Hello {this.props.username}!</h1>
                        <div className="dashboard-container">
                            <div className="conversations">
                                <h2>Your conversations</h2>
                                <ContactCard contacts={this.props.chats} />
                            </div>
                            <div className="bookmarks">
                                <h2>Your bookmarks</h2>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="container">
                        <h1>Hello {this.props.username}!</h1>
                        <div className="dashboard-container">
                            <div className="conversations">
                                <h2>Your conversations</h2>
                                <p>Search friends to start your first conversation</p>
                            </div>
                            <div className="bookmarks">
                                <h2>Your bookmarks</h2>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return <div className="container">Loading...</div>;
    }
}

const mapStateToProps = (state) => {
    //console.log(Object.values(state.chats));
    return {
        chats: Object.values(state.chats),
        theme: state.auth.theme,
        username: state.auth.username,
        uid: state.auth.userId,
    };
};

export default connect(mapStateToProps, { fetchChats })(Dashboard);
