import { ClientDetails } from "./ClientDetails";
import { fireEvent, render, screen } from "@testing-library/react";

test("Render inputs when load successfully", () => {
  render(<ClientDetails />);

  expect(screen.getByLabelText("First Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Gender")).toBeInTheDocument();
  expect(screen.getByLabelText("Advisor")).toBeInTheDocument();
  expect(screen.getByLabelText("Join our mailing list")).not.toBeChecked();
  expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
});

test("Display email input after checkbox with join agreement is selected", () => {
  render(<ClientDetails />);

  fireEvent.click(screen.getByLabelText("Join our mailing list"));

  expect(screen.getByLabelText("Join our mailing list")).toBeInTheDocument();
  expect(screen.queryByLabelText("Email")).toBeInTheDocument();
});

test("Display error for each field without email", async () => {
  render(<ClientDetails />);

  fireEvent.submit(screen.getByTestId("form"));

  expect(await screen.findAllByRole("alert")).toHaveLength(5);
});

test("Display email format error when email is invalid", async () => {
  render(<ClientDetails />);

  fireEvent.click(screen.getByLabelText("Join our mailing list"));
  fireEvent.input(screen.getByLabelText("Email"), {
    target: {
      value: "test",
    },
  });

  fireEvent.submit(screen.getByTestId("form"));

  expect(await screen.findAllByRole("alert")).toHaveLength(6);
});
