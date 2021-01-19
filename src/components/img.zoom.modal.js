import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './img.zoom.modal.css';
import ReturnIcon from '../img/return.png';

require('dotenv').config()

const api = process.env.REACT_APP_API_KEY
const ModalZoom = (props) => {

  const {modal, toggle, image } = props

  return (
    <div>
      <Modal className="modal-zoom" isOpen={modal} toggle={toggle}>
        <ModalBody>
            <TransformWrapper
                defaultScale={1}
                defaultPositionX={200}
                defaultPositionY={100}
            >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                    <div className="tools">
                        <button onClick={zoomIn}>+</button>
                        <button onClick={zoomOut}>-</button>
                        <button onClick={resetTransform}>x</button>
                    </div>
                    <div onClick={toggle} className="pd-comeback">
                        <img className="return-icon" src={ReturnIcon} />
                    </div>
                    <TransformComponent>
                    <img className="zoom-img" src={api + image} alt="test" />
                    </TransformComponent>
                </React.Fragment>
                )}
            </TransformWrapper>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalZoom;