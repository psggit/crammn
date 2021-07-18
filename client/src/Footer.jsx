import React from "react"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>Crammn</h3>
              <p>
                HSR Layout <br />
                Bangalore, Karnataka - 560102
                <br />
                India <br />
                <br />
                <strong>WhatsApp:</strong> +91 9524227932
                <br />
                <strong>Email:</strong> cyano.prem@gmail.com
                <br />
              </p>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">Home</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">About us</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">Services</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Colleges</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">IIT-Bombay</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">IIT-Madras</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">IIT-Kharagpur</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="#">More coming soon</a>
                </li>
              </ul>
            </div>

            <div className="container d-md-flex py-4">
              <div className="me-md-auto text-center text-md-start">
                <div className="copyright">
                  &copy; Copyright{" "}
                  <strong>
                    <span>Crammn</span>
                  </strong>
                  . All Rights Reserved
                </div>
                <div className="credits">
                  {/**
                                         <!-- All the links in the footer should remain intact. -->
                                         <!-- You can delete the links only if you purchased the pro version. -->
                                         <!-- Licensing information: https://bootstrapmade.com/license/ -->
                                         <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/ -->
                                         <!-- Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> -->
                                         */}
                </div>
              </div>
              <div className="social-links text-center text-md-right pt-3 pt-md-0">
                <a href="#" className="twitter">
                  <i className="bx bxl-twitter"></i>
                </a>
                <a href="#" className="facebook">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#" className="instagram">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#" className="google-plus">
                  <i className="bx bxl-skype"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
