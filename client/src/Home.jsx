import React from "react";

const Home = ()=>(
    <main id="main">
    <br/>
        <br/>
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">

                <div className="row">
                    <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                        <img src="/assets/img/about.png" className="img-fluid" alt="" />
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                        <h3>Learn faster and explore the world out there.</h3>
                        <ul>
                            <li><i className="bi bi-check-circle"></i> Find the course.</li>
                            <li><i className="bi bi-check-circle"></i> Get to know about the course details and mentor.
                            </li>
                            <li><i className="bi bi-check-circle"></i> Enroll the course for free.</li>
                        </ul>
                        <p>
                            It is as simple as that and completely free.
                        </p>

                    </div>
                </div>

            </div>
        </section>

        <section id="why-us" className="why-us">
            <div className="container" data-aos="fade-up">

                <div className="row">
                    <div className="col-lg-4 d-flex align-items-stretch">
                        <div className="content">
                            <h3>Why Choose Crammn?</h3>
                            <p>
                                With most students busy with extracurricular and other activities, have very less time
                                and prepare just before the exam. Our aim is to help students learn from the best mentor
                                friends in their college, transforming lives through opportunities to teach and learn.
                            </p>
                            <div className="text-center">
                                <a href="/about" className="more-btn">Learn More <i
                                    className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                        <div className="icon-boxes d-flex flex-column justify-content-center">
                            <div className="row">
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <i className="bx bx-receipt"></i>
                                        <h4>Short 5-10 min concept videos</h4>
                                        <p>Most available online videos are lengthy</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <i className="bx bx-cube-alt"></i>
                                        <h4>Specific Concepts</h4>
                                        <p>Our Mentors have taken the courses from the same professor, so they can teach
                                            the precise concepts required for exam</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <i className="bx bx-images"></i>
                                        <h4>Relevant</h4>
                                        <p>We understand that every college is different and these courses are
                                            personalised for you</p>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                            <a href="https://www.linkedin.com/in/cyanoprem/" target="_blank"><i
                                                className="bi bi-linkedin"></i></a>
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
                                            <a href="https://www.linkedin.com/in/shrutigadge/" target="_blank"><i
                                                className="bi bi-linkedin"></i></a>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
        </section>
    </main>)

export default Home;
