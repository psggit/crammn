import { render, screen } from "@testing-library/react"
import Courses from "../Courses"

test("renders learn react link", () => {
  render(<Courses />)
  const linkElement = screen.getByText(
    /These courses are created by your seniors and friends who have taken up the same course before. They are short, specific and relevant for learning in time for your exams./i
  )
  expect(linkElement).toBeInTheDocument()
})
