export interface IAddressDetails {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  landline: string;
  website: string;
  address: string;
  Id?: number;
}

export interface IFormValidation {
  nameError: string;
  emailError: string;
  mobileError: string;
  landlineError: string;
  websiteError: string;
  addressError: string;
}
