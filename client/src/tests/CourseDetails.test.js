import { render, screen } from "@testing-library/react"
import CourseDetails from "../CourseDetails"

test("renders learn react link", () => {
  render(<CourseDetails />)
  const linkElement = screen.getAllByTestId("main")
  expect(linkElement).toBeDefined()
})
