import React from "react"

const About = () => (
  <main id="main">
    <div className="breadcrumbs" data-aos="fade-in">
      <div className="container">
        <h2>About Us</h2>
        <p>
          With most students busy with extracurricular and other activities, they might have very less time and end up preparing just before the exam. Our aim is to help students
          learn from the best mentor friends in their college, transforming lives through opportunities to teach and learn.
        </p>
      </div>
    </div>

    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
            <img src="/assets/img/about.png" className="img-fluid" alt="" />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>Learn faster and explore the world out there.</h3>
            <ul>
              <li>
                <i className="bi bi-check-circle"></i>Find the course.
              </li>
              <li>
                <i className="bi bi-check-circle"></i>Get to know about the course details and mentor.
              </li>
              <li>
                <i className="bi bi-check-circle"></i>Enroll the course for ₹ 499/-.
              </li>
            </ul>
            <p>Accelerate your learning!</p>
          </div>
        </div>
      </div>
    </section>

    <section id="trainers" className="trainers">
      <div className="container" data-aos="fade-up">
        <h2>Team</h2>
        <hr />
        <div className="row" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <img src="/assets/img/trainers/Cyano.png" className="img-fluid" alt="" />
              <div className="member-content">
                <h4>Cyano </h4>
                <span>Co-Founder</span>
                <div className="social">
                  <a href="https://www.linkedin.com/in/cyanoprem/" target="_blank">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
          <div className="member">
            <img src="/assets/img/trainers/Shruti.jpg" className="img-fluid" alt="" />
            <div className="member-content">
              <h4>Shruti</h4>
              <span>Co-Founder</span>
              <div className="social">
                <a href="https://www.linkedin.com/in/shrutigadge/" target="_blank">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
)

export default About
