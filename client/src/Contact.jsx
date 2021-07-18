import React from "react"

const Contact = () => (
  <main id="main">
    <div class="breadcrumbs" data-aos="fade-in">
      <div class="container">
        <h2>Contact Us</h2>
      </div>
    </div>

    <section id="contact" class="contact">
      <div data-aos="fade-up">
        <iframe
          style={{ border: 0, width: "100%", height: "350px" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31111.684304945866!2d77.6283130122391!3d12.910257867339409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1491bfdc6ecd%3A0xf232718439fbc879!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620635589355!5m2!1sen!2sin"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>

      <div class="container" data-aos="fade-up">
        <div class="row mt-5">
          <div class="col-lg-4">
            <div class="info">
              <div class="address">
                <i class="bi bi-geo-alt"></i>
                <h4>Location:</h4>
                <p>HSR Layout, Bangalore, Karnataka 560102</p>
              </div>

              <div class="email">
                <i class="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>cyano.prem@gmail.com</p>
              </div>

              <div class="phone">
                <i class="bi bi-phone"></i>
                <h4>WhataApp Message @:</h4>
                <p>+91 9524227932</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
)

export default Contact
