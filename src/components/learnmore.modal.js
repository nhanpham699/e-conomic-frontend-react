import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const LearnMore = (props) => {

  const modal = props.modal
  const toggle = props.toggle
  const type = props.type
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        { (type == 0) &&
        <ModalBody>
            <h1>READY FOR SCHOOL</h1>
            <p>With extra 30% off selected full priced articles!</p>
            <p>Discount applied at cart. Exclusions apply. Sale ends 26 Aug 2020. Terms & Conditions</p>
        </ModalBody>
        }
        { (type == 1) &&
        <ModalBody>
            <h1>EASY RETURNS</h1>
            <p>If you are not entirely satisfied with your order, you may be entitled to a refund.</p>
            <p>Check out our Return Policy for more details.</p>
        </ModalBody>
        }
      </Modal>
    </div>
  );
}

export default LearnMore