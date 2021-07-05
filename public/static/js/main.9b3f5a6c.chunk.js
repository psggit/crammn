(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{10:function(e,t,c){"use strict";c.r(t);var s=c(1),i=c.n(s),n=c(4),a=c.n(n),r=c(2),l=c(0);function d(){var e=i.a.useState(null),t=Object(r.a)(e,2),c=t[0],s=t[1];i.a.useEffect((function(){fetch("/api/courses").then((function(e){return e.json()})).then((function(e){return s(e)}))}),[]);var n=[{title:"IIT Bombay Courses",category:"IIT Bombay",id:"iitBombay"},{title:"IIT Madras Courses",category:"IIT Madras",id:"iitMadras"},{title:"JEE Concepts",category:"IIT JEE",id:"iitJeeConcepts"}];return Object(l.jsxs)("main",{id:"main","data-aos":"fade-in",className:"aos-init aos-animate",children:[Object(l.jsx)("div",{className:"breadcrumbs",children:Object(l.jsxs)("div",{className:"container",children:[Object(l.jsx)("h2",{children:"Courses"}),Object(l.jsx)("p",{children:"These courses are created by your seniors and friends who have taken up the same course before. They are short, specific and relevant for learning in time for your exams."})]})}),Object(l.jsx)("section",{id:"allColleges",className:"courses",children:Object(l.jsx)("div",{className:"container aos-init aos-animate","data-aos":"fade-up",children:Object(l.jsxs)("div",{className:"courses","data-aos":"fade-up",children:[Object(l.jsx)("div",{className:"row",children:n.map((function(e,t){return Object(l.jsx)("div",{id:"".concat(e.category,"_").concat(t),className:"col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0",children:Object(l.jsx)("a",{href:"#".concat(e.id),children:Object(l.jsx)("div",{className:"d-flex justify-content-between align-items-center mb-3 get-started-btn",children:Object(l.jsx)("h5",{children:e.title})})})})}))}),c?n.map((function(e){var t=c.filter((function(t){return t.category===e.category}));return 0===t.length?null:Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"container aos-init aos-animate","data-aos":"fade-up",children:Object(l.jsxs)("div",{className:"col-lg-8",children:[Object(l.jsx)("br",{}),Object(l.jsx)("h3",{children:Object(l.jsx)("u",{children:e.title})})]})}),Object(l.jsx)("section",{id:e.id,className:"courses",children:Object(l.jsx)("div",{className:"row aos-init aos-animate","data-aos":"zoom-in","data-aos-delay":"100",children:t.map((function(e,t){return function(e,t){return Object(l.jsx)("div",{id:"".concat(e.category,"_").concat(t),className:"col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0",children:Object(l.jsx)("a",{href:e.detailsLink,children:Object(l.jsxs)("div",{className:"course-item",children:[Object(l.jsx)("img",{src:e.detailThumbnail,className:"img-fluid",alt:"..."}),Object(l.jsxs)("div",{className:"course-content",children:[Object(l.jsxs)("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[Object(l.jsx)("h4",{children:e.category}),Object(l.jsx)("p",{className:"price",children:e.price})]}),Object(l.jsx)("h3",{children:Object(l.jsx)("a",{href:e.detailLink,children:e.title})}),Object(l.jsx)("p",{children:e.information}),Object(l.jsx)("div",{className:"trainer d-flex justify-content-between align-items-center",children:Object(l.jsxs)("div",{className:"trainer-profile d-flex align-items-center",children:[Object(l.jsx)("img",{src:e.mentorProfilePic,className:"img-fluid",alt:""}),Object(l.jsx)("span",{children:e.mentorName})]})})]})]})})})}(e,t)}))})})]})})):Object(l.jsx)("p",{children:"Loading..."})]})})})]})}var j=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,11)).then((function(t){var c=t.getCLS,s=t.getFID,i=t.getFCP,n=t.getLCP,a=t.getTTFB;c(e),s(e),i(e),n(e),a(e)}))};function o(){var e=i.a.useState(null),t=Object(r.a)(e,2),c=t[0],s=t[1];i.a.useEffect((function(){console.log("LOADING DATA"),console.log("/api/course/details/".concat(window.location.search)),fetch("/api/course/details/".concat(window.location.search)).then((function(e){return e.json()})).then((function(e){return s(e)}))}),[]);var n=function(){return c.auth?null:Object(l.jsx)("div",{children:Object(l.jsx)("a",{href:c.detailsLink,className:"get-started-btn",target:"blank",children:"Get the Full Course"})})};return c?Object(l.jsxs)("main",{"data-testid":"main",children:[Object(l.jsx)("div",{className:"breadcrumbs","data-aos":"fade-in",children:Object(l.jsxs)("div",{className:"container",children:[Object(l.jsx)("h2",{children:c.title}),Object(l.jsx)("p",{children:c.information})]})}),Object(l.jsx)("section",{id:"course-details",className:"course-details",children:Object(l.jsx)("div",{className:"container","data-aos":"fade-up",children:Object(l.jsxs)("div",{className:"row",children:[c.details.mainContent.map((function(e,t){return 1===c.details.mainContent.length&&!1===c.auth?Object(l.jsxs)("div",{className:"col-lg-8",children:[Object(l.jsx)("iframe",{style:{border:0,width:"100%",height:"350px"},title:e.subtitle,src:e.videoLink,frameBorder:"0",allowFullScreen:!0}),Object(l.jsx)("h3",{children:e.title})," ",Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsx)("h5",{children:e.highlights}),Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsx)("hr",{}),Object(l.jsx)("br",{})]}):Object(l.jsxs)("div",{className:"col-lg-8",children:[Object(l.jsx)("h3",{children:e.title})," ",Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsx)("iframe",{style:{border:0,width:"100%",height:"350px"},title:e.subtitle,src:e.videoLink,frameBorder:"0",allowFullScreen:!0}),Object(l.jsx)("h5",{children:e.highlights}),Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsx)("hr",{}),Object(l.jsx)("br",{})]})})),Object(l.jsx)("div",{className:"col-lg-4",children:c.details.sideContent.map((function(e,t){return 0===t?Object(l.jsx)("div",{className:"course-info d-flex justify-content-between align-items-center",children:Object(l.jsx)("h5",{children:Object(l.jsx)("u",{children:e})})}):Object(l.jsx)("div",{className:"course-info d-flex justify-content-between align-items-center",children:Object(l.jsx)("h5",{children:e})})}))}),n()]})})}),c.auth?null:Object(l.jsx)("section",{id:"trainers",className:"trainers",children:Object(l.jsx)("div",{className:"container aos-init aos-animate","data-aos":"fade-up",children:Object(l.jsx)("div",{className:"col-lg-4 col-md-6 d-flex align-items-stretch",children:Object(l.jsxs)("div",{className:"member",children:[Object(l.jsx)("img",{src:c.mentorProfilePic,className:"img-fluid",alt:""}),Object(l.jsxs)("div",{className:"member-content",children:[Object(l.jsx)("h4",{children:c.mentorName}),Object(l.jsx)("span",{children:"Mentor"}),Object(l.jsx)("p",{children:c.category}),n()]})]})})})})]}):"Loading"}document.getElementById("coursesRoot")&&a.a.render(Object(l.jsx)(i.a.StrictMode,{children:Object(l.jsx)(d,{})}),document.getElementById("coursesRoot")),document.getElementById("courseDetailsRoot")&&a.a.render(Object(l.jsx)(i.a.StrictMode,{children:Object(l.jsx)(o,{})}),document.getElementById("courseDetailsRoot")),j()}},[[10,1,2]]]);
//# sourceMappingURL=main.9b3f5a6c.chunk.js.map