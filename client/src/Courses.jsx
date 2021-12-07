import React from "react"
import { Link } from "@reach/router"

export default function Courses() {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  const courseDetail = (info, index) => {
    return (
      <div id={`${info.category}_${index}`} className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
        <Link to={info.detailsLink}>
          <div className="course-item">
            <img src={info.detailThumbnail} className="img-fluid" alt="..." />
            <div className="course-content">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>{info.category}</h4>
                <p className="price">{info.price}</p>
              </div>

              <h3>
                <a href={info.detailLink}>{info.title}</a>
              </h3>
              <p>{info.information}</p>
              <div className="trainer d-flex justify-content-between align-items-center">
                <div className="trainer-profile d-flex align-items-center">
                  <img src={info.mentorProfilePic} className="img-fluid" alt="" />
                  <span>{info.mentorName}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  const sectionsList = [
    {
      title: "IIT Madras Courses",
      category: "IIT Madras",
      id: "iitMadras",
    },
    {
      title: "IIT Bombay Courses",
      category: "IIT Bombay",
      id: "iitBombay",
    },
    {
      title: "IIT Kharagpur Courses",
      category: "IIT Kharagpur",
      id: "iitkharagpur",
    },
    {
      title: "IIT Bhubaneswar Courses",
      category: "IIT Bhubaneswar",
      id: "iitbhubaneswar",
    },
    {
      title: "NIT Trichy Courses",
      category: "NIT Trichy",
      id: "nittrichy",
    },
    {
      title: "Sastra University Courses",
      category: "Sastra University",
      id: "sastrauniversity",
    },
    {
      title: "Z.H.C.E.T Courses",
      category: "Z.H.C.E.T",
      id: "zahirHusain",
    },
    {
      title: "JEE Main & Advanced",
      category: "IIT JEE",
      id: "iitJeeConcepts",
    },
  ]

  const coursesSections = () => {
    return sectionsList.map((sectionInfo) => {
      let filteredList = data.filter((value) => value.category === sectionInfo.category)
      if (filteredList.length === 0) {
        return null
      }
      return (
        <div>
          <div className="container aos-init aos-animate" data-aos="fade-up">
            <div className="col-lg-8">
              <br />
              <h3>
                <u>{sectionInfo.title}</u>
              </h3>
            </div>
          </div>
          <section id={sectionInfo.id} className="courses">
            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
              {filteredList.map((info, index) => courseDetail(info, index))}
            </div>
          </section>
        </div>
      )
    })
  }

  return (
    <main id="main" data-aos="fade-in" className="aos-init aos-animate">
      <div className="breadcrumbs">
        <div className="container">
          <h2>Courses</h2>
          <p>
            These courses are created by your seniors and friends who have taken up the same course before. They are short, specific and relevant for learning in time for your
            exams.
          </p>
        </div>
      </div>

      <section id="allColleges" className="courses">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <div className="courses" data-aos="fade-up">
            <div className="row">
              {sectionsList.map((sectionInfo, index) => (
                <div id={`${sectionInfo.category}_${index}`} className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                  <a href={`#${sectionInfo.id}`}>
                    <div className="d-flex justify-content-between align-items-center mb-3 get-started-btn">
                      <h5>{sectionInfo.title}</h5>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            {!data ? <p>Loading...</p> : coursesSections()}
          </div>
        </div>
      </section>
    </main>
  )
}
