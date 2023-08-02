import React from 'react';
import Modal from 'react-bootstrap/Modal'
import "./DescriptionModal.css"
// import { CarouselComponent } from '../Carousel/Carousel';
function DescriptionModal(props) {
 
 
    return ( 
        <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Product Description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container row'>
          <b>{props.data.title}</b>
        <div className="col-md-8 ">
        {/* <CarouselComponent id="pc-img" image={props.data?.images} /> */}
        {props.data.img}
        </div>
        <div id="p-detail" className="col-md-4" >
          <div >
            {/* Rating: <b>{props.data?.rating}</b> */}
          </div>
          <div >
            {/* In Stock: <b>{props.data?.stock}</b> */}
          </div>
          <div >
            Price: <b>${props.data.price}</b>
          </div>
        <button className="btn btn-primary my-2" onClick={() => {props.handleClick(); props.onHide()}}>Buy Now</button>
        </div>
        </div>
        <div><b>Description: </b><p>
          {props.data.description}
        </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
     );
}

export default DescriptionModal;