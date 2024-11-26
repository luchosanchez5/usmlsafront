import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteCoManagerModel({ show, onClose,OnDelete ,title}) {


    return (
        <>

            <Modal
                size="md"
                show={show}
                onHide={onClose}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Delete  {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h6 className='text-nowrap fw-semibold'>Are u Sure to delete this {title} ?</h6>
                    <div className="text-end mt-4">
                        <Button variant='danger'   onClick={OnDelete}>Confirm</Button>

                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default DeleteCoManagerModel;