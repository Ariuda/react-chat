import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ active, text, onClick }) => {
    return ReactDOM.createPortal(
        <div className={`modal-container ${active}`} onClick={(e) => onClick('not-active')}>
            <div className="modal-box">
                <p>{text}</p>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;
