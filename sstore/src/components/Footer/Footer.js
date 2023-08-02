import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h3>Customer Services</h3>
              <hr />
              <ul className="list-unstyled text-secondary">
                <li>Help Method</li>
                <li>Money Refund</li>
                <li>Terms ans Policy</li>
                <li>Open dispute</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>My Account</h3>
              <hr />
              <ul className="list-unstyled text-secondary">
                <li>User Login</li>
                <li>User Register</li>
                <li>Account Setting</li>
                <li>My Orders</li>
                <li>My Wallet</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>About</h3>
              <hr />
              <ul className="list-unstyled text-secondary">
                <li>Our History</li>
                <li>How to buy</li>
                <li>Delivery and payment</li>
                <li>Advertice</li>
                <li>Partnership</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h2 className="text-md-end">
                FOLLOW <span className="text-primary">US</span>
              </h2>
              <ul className="list-unstyled text-secondary text-md-end mt-4">
                <div>
                  <i className="fa-brands fa-2x me-2 fa-facebook"></i>
                  <i className="fa-brands fa-2x me-2 fa-google-plus"></i>
                  <i className="fa-brands fa-2x me-2 fa-pinterest"></i>
                  <i className="fa-brands fa-2x me-2 fa-twitter"></i>
                </div>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="copyright bg-primary py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-6">Developed By Group-1</div>
              <div className="col-md-6">
                <small className="text-md-end">
                  Copyright &copy; Bootstrp-ecommerce UI kit.
                </small>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
