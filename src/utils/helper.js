export const stripBody = (body) => {
  const { firstName, lastName, password, mobile, email } = body;
  const isValidFirstName =
    typeof firstName === "string" && firstName.trim() !== "";
  const isValidLastname =
    typeof lastName === "string" && lastName.trim() !== "";
  const isValidpassword =
    typeof password === "string" && password.trim() !== "";
  const isValidEmail = typeof email === "string" && email.trim() !== "";
  const isValidMobile = typeof mobile === "string" && mobile.trim() !== "";
  if (
    isValidEmail === false ||
    isValidFirstName === false ||
    isValidLastname === false ||
    isValidpassword === false ||
    isValidMobile === false
  ) {
    throw new Error("A field is empty");
  }

  return { firstName, lastName, password, mobile, email };
};
