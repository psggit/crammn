import React from "react"
import { Link } from "@reach/router"

export default function CourseDetails(props) {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    console.log(`/api/course/details?id=${props.courseId}`)
    fetch(`/api/course/details?id=${props.courseId}`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  const rightSidePanel = () => {
    return data.details.mainContent.map((info, index) => {
      if (data.details.mainContent.length === 1 && data.auth === false) {
        return (
          <div className="col-lg-8">
            <iframe style={{ border: 0, width: "100%", height: "350px" }} title={info.subtitle} src={info.videoLink} frameBorder="0" allowFullScreen />
            <h3>{info.title}</h3> <br />
            <br />
            <h5>{info.highlights}</h5>
            <br />
            <br />
            <hr />
            <br />
          </div>
        )
      }
      return (
        <div className="col-lg-8">
          <h3>{info.title}</h3> <br />
          <br />
          <iframe style={{ border: 0, width: "100%", height: "350px" }} title={info.subtitle} src={info.videoLink} frameBorder="0" allowFullScreen />
          <h5>{info.highlights}</h5>
          <br />
          <br />
          <hr />
          <br />
        </div>
      )
    })
  }

  const leftSidePanel = () => (
    <div className="col-lg-4">
      {data.details.sideContent.map((info, index) => {
        if (index === 0) {
          return (
            <div className="course-info d-flex justify-content-between align-items-center">
              <h5>
                <u>{info}</u>
              </h5>
            </div>
          )
        }
        return (
          <div className="course-info d-flex justify-content-between align-items-center">
            <h5>{info}</h5>
          </div>
        )
      })}
    </div>
  )

  const getCompleteCourse = () => {
    if (data.auth) {
      return null
    }

    return (
      <div>
        <a href="/signin" className="get-started-btn">
          Get the Full Course
        </a>
      </div>
    )
  }

  const trainersPanel = () => {
    if (data.auth) {
      return null
    }
    return (
      <section id="trainers" className="trainers">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <img src={data.mentorProfilePic} className="img-fluid" alt="" />
              <div className="member-content">
                <h4>{data.mentorName}</h4>
                <span>Mentor</span>
                <p>{data.category}</p>
                {getCompleteCourse()}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return !data ? (
    "Loading"
  ) : (
    <main data-testid="main">
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>{data.title}</h2>
          <p>{data.information}</p>
        </div>
      </div>

      <section id="course-details" className="course-details">
        <div className="container" data-aos="fade-up">
          <div className="row">
            {rightSidePanel()}
            {leftSidePanel()}
            {getCompleteCourse()}
          </div>
        </div>
      </section>

      {trainersPanel()}
    </main>
  )
}
