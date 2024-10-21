import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import photos from "./photos.js";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
test('it renders without crashing', () => {
  render(<Carousel photos={photos} title="Test"/>)
});


test("it matches snapshot", () => {
  const { asFragment } = render(<Carousel photos={photos} title="Test"/>)
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
