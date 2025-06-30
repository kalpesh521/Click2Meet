 
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const nameRegex = /^[A-Za-z\s]+$/;
export const countryRegex = /^[A-Za-z\s]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const areAllFieldsEmpty = (values) => {
  return (
    !values.firstName?.trim() &&
    !values.lastName?.trim() &&
    !values.email?.trim() &&
    !values.country?.trim() &&
    !values.phoneNumber?.trim() &&
    !values.message?.trim()
  );
};

 
export const validatePhoneNumber = (phone) => {
  if (!phone) return false;
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? phoneNumber.isValid() : false;
};

export const validateContactForm = (values) => {
  const errors = [];

  if (!values.firstName || !nameRegex.test(values.firstName)) {
    errors.push("Please enter a valid first name using letters only.");
  }

  if (!values.lastName || !nameRegex.test(values.lastName)) {
    errors.push("Please enter a valid last name using letters only.");
  }

  if (!values.email || !emailRegex.test(values.email)) {
    errors.push("Please enter a valid email address (e.g., user@example.com).");
  }

  if (!values.country || !countryRegex.test(values.country)) {
    errors.push("Please enter a valid country name using letters only.");
  }

  if (!values.phoneNumber || !validatePhoneNumber(values.phoneNumber)) {
    errors.push("Please enter a valid phone number, including country code if applicable.");
  }

  if (!values.message || values.message.trim() === "") {
    errors.push("Please provide a message or inquiry.");
  }

  return errors;
};
