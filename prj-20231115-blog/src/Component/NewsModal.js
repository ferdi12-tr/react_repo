
import React from 'react';

const NewsModal = ({blog, onClose, showModal}) => {
    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            style={{display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{blog.baslik}</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {blog.resim && <img src={blog.resim} alt={blog.baslik} className="img-fluid"/>}
                        <p>{blog.aciklama}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsModal;
