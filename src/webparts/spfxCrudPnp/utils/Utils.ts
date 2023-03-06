/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const validate = (name: string, value: string) => {};

export const validationName = (name: string, value: string) => {
  const validname = /^[a-zA-Z\s]{4,256}$/;
  if (value.length <= 0) {
    const message: string = "*name can't be Empty";
  
    return message;
  } else if (value.length <= 4 && value.match(validname)) {
    const message: string = "*name atleast have 5 letters";
    return message;
  } else if (value.length >= 5 && value.match(validname)) {
    const message = "Accepted...";
    return message;
  } else if (value.match(validname)) {
    const message: string = "Numbers are not allowed";
    return message;
  }
};

export const validationEmail = (name: string, value: string) => {
  const emailValdate = !new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ).test(value);
  const acceptedEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ).test(value);

  if (value.length <= 0) {
    const message: string = "*email can't be Empty";
    return message;
  } else if (emailValdate) {
    const message: string = "*Enter valid email";
    return message;
  } else if (acceptedEmail) {
    const message = "Accepted...";
    return message;
  }
};

export const validationMobileNumber = (name: string, value: string) => {
  const phoneno = /^[\+]+[0-9]{2,3}[\s]?[0-9]{3}[\s]?[0-9]{5,7}$/;
  if (value.length <= 0) {
    const message: string = "*mobile number can't be Empty";
    return message;
  } else if (!value.match(phoneno)) {
    const message: string = "*Enter valid mobile number";
    return message;
  } else if (value.match(phoneno)) {
    const message: string = "Accepted...";
    return message;
  }
};

export const validationLandline = (name: string, value: string) => {
  const re = /^[0][0-9]{2,3}[\s]?[0-9]{3,4}[\s]?[0-9]{4}$/;
  if (value.length <= 0) {
    const message: string = "*landline number can't be Empty";
    return message;
  } else if (!re.test(value)) {
    const message: string = "*Enter valid landline number";
    return message;
  } else if (re.test(value)) {
    const message: string = "Accepted...";
    return message;
  }
};

export const validateWebsite = (name: string, value: string) => {
  const re =
    /^([https|http]:)?\/?\/?(www.)+[a-zA-Z0-9#!:?+=&%!.\-\/]+\.([a-zA-Z]+){2,}$/;
  if (value.length <= 0) {
    const message: string = "*website Url can't be Empty";
    return message;
  } else if (!re.test(value)) {
    const message: string = "*Enter valid Website Url";
    return message;
  } else if (re.test(value)) {
    const message: string = "Accepted...";
    return message;
  }
};
