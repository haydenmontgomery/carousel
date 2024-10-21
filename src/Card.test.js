import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import photos from "./photos.js";
import TEST_IMAGES from "./_testCommon.js";

test('it renders without crashing', () => {
  render(<Card caption="Test"
    src={photos[0].src}
    currNum={0}
    totalNum={0}/>)
});

test("it matches snapshot", () => {
  const { asFragment } = render(<Card caption="Test"
    src={photos[0].src}
    currNum={0}
    totalNum={0}/>)
  expect(asFragment()).toMatchSnapshot();
})