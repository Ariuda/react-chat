import React from 'react';
import { Link } from 'react-router-dom';

const ContactCard = ({ contacts }) => {
    const renderContactCards = () => {
        return contacts.map((contact) => {
            return (
                <div className="contact-card row j-start a-center" key={contact.chatId}>
                    <div className="card-img"></div>
                    <Link to={`chat/${contact.chatId}`}>{contact.to}</Link>
                </div>
            );
        });
    };

    return <div className="contact-card-container">{renderContactCards()}</div>;
};

export default ContactCard;
