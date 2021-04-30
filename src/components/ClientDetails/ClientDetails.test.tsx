import { ClientDetails } from "./ClientDetails";
import { render, screen } from "@testing-library/react";

test("Render inputs when load successfully", () => {
  render(<ClientDetails />);
  expect(screen.getByLabelText("First Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Gender")).toBeInTheDocument();
  expect(screen.getByLabelText("Advisor")).toBeInTheDocument();
  expect(screen.getByLabelText("Join our mailing list")).not.toBeChecked();
  expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
});
