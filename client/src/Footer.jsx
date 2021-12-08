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
                CollectiveBloom Technologies Pvt Ltd <br />
                IndiQube Orion <br />
                24th Main Road <br />
                HSR Layout <br />
                Bangalore, Karnataka - 560102
                <br />
                India <br />
                <br />
                <strong>WhatsApp:</strong> +91 9524227932
                <br />
                <strong>Email:</strong> office@crammn.com
                <br />
              </p>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="https://crammn.com/">Home</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="https://crammn.com/about">About us</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="https://crammn.com/courses">Courses</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="https://crammn.notion.site/Frequenlty-Asked-Questions_Mentor-Internship-304a173344214931856f4ad569d9c263">FAQs for Mentors</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="https://forms.gle/7uHkqid9KGBJK1N19 ">Become a Mentor!</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Colleges</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="https://crammn.com/courses">IIT-Bombay</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="https://crammn.com/courses">IIT-Madras</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="https://crammn.com/courses">IIT-Kharagpur</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <a href="https://crammn.com/courses">More Colleges</a>
                </li>
              </ul>
            </div>

            <div className="container d-md-flex py-4">
              <div className="me-md-auto text-center text-md-start">
                <div className="copyright">
                  &copy;{" "}
                  <strong>
                    <span>CollectiveBloom Technologies Pvt Ltd</span>
                  </strong>
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
                <a href="https://twitter.com/crammn_learning" className="twitter">
                  <i className="bx bxl-twitter"></i>
                </a>
                <a href="https://www.facebook.com/Crammn/" className="facebook">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="https://www.instagram.com/crammn_learning/" className="instagram">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/crammn" className="linkedin">
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
