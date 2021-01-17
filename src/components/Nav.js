import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import chats from '../apis/chats';
import FormInput from './FormInput';
import Modal from '../components/Modal';
import { createChat, signOut } from '../actions/index';

const Nav = ({ createChat, isAuthenticated, signOut }) => {
    const [search, updatedSearch] = useState('');
    const [query, debouncedQuery] = useState(search);
    const [responseData, setResponseData] = useState([]);
    const [modal, setModal] = useState('not-active');
    const [modalText, setModalText] = useState('');

    useEffect(() => {
        let timeoutId;
        if (search !== '') {
            timeoutId = setTimeout(() => {
                debouncedQuery(search);
            }, 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [search]);

    useEffect(() => {
        const s = async () => {
            if (query !== '') {
                try {
                    const response = await chats.get(`/users/${query}`);
                    setResponseData(response.data);
                } catch (err) {
                    console.error(err.message);
                    setResponseData([err.message]);
                }
            }
        };
        s();
    }, [query]);

    const newChat = async (user) => {
        try {
            await createChat(user);
            updatedSearch('');
        } catch (err) {
            console.error(err.message);
            setModal('active');
            setModalText(err.message);
        }
    };

    const onModalClick = () => {
        setModal('not-active');
        setModalText('');
    };

    const renderSearchResults = (res) => {
        return res.map((r) => {
            if (r.id) {
                return (
                    <li key={r.id} className="result-item row j-between a-center">
                        {r.user}
                        <div className="new-chat" onClick={(e) => newChat(r.id)}>
                            New Chat
                        </div>
                    </li>
                );
            }
            return (
                <li key={r} className="result-item row j-between a-center">
                    {r}
                </li>
            );
        });
    };

    const renderSearchResultsContainer = (res) => {
        if (res.length > 0) {
            return <ul className="results-wrapper">{renderSearchResults(res)}</ul>;
        }
        return <div className="results-wrapper">Loading...</div>;
    };

    const isAuthRenderNav = () => {
        if (isAuthenticated) {
            return (
                <nav>
                    <Modal active={modal} text={modalText} onClick={onModalClick} />
                    <div className="search-bar">
                        <FormInput
                            label={null}
                            type="text"
                            value={search}
                            name="search"
                            onChange={(value) => updatedSearch(value)}
                            touched="touched"
                        />
                        {search !== '' && renderSearchResultsContainer(responseData)}
                    </div>
                    <div>
                        <Link to="/settings">Settings</Link>
                        <p onClick={() => signOut()}>Sign out</p>
                    </div>
                </nav>
            )
        } else {
            return (
                <nav>
                    <Link to="/sign-in">Sign in</Link>
                    <Link to="/register">Register</Link>
                </nav>
            )
        }
    }

    return isAuthRenderNav();
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.userId
    }
}

export default connect(mapStateToProps, { createChat, signOut })(Nav);
