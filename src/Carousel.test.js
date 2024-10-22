import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
test('it renders without crashing', () => {
  render(<Carousel photos={TEST_IMAGES} title="Test"/>)
});


test("it matches snapshot", () => {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="Test"/>)
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow then left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  console.log(container);
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

  // move left in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("has the left arrow gone on first image, and right arrow gone on last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  //We are at the beginning of the images so left is gone.
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);


  //We are at the middle of the images so both should be here.
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).toBeInTheDocument();
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).toBeInTheDocument();

  //move forward in the carousel
  fireEvent.click(rightArrow);

  //We are at the end of the images so the right should be gone.
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).toBeInTheDocument();
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();
});  