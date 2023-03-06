/* eslint-disable @typescript-eslint/no-explicit-any */
import pnp from "sp-pnp-js";
import { IAddressDetails } from "../models/IAddressDetails";

export const getAllItems = (): Promise<any> => {
  const response = pnp.sp.web.lists.getByTitle("addressesList").items.get();
  return response;
};

export const getAddressDetails = (id: number): Promise<any> => {
  const response = pnp.sp.web.lists
    .getByTitle("addressesList")
    .items.getById(id)
    .get();
  return response;
};

export const createAddressDetails = (
  addAddressDetails: IAddressDetails,
): Promise<any> => {
  const response = pnp.sp.web.lists.getByTitle("addressesList").items.add({
    name: addAddressDetails.name,
    email: addAddressDetails.email,
    mobile: addAddressDetails.mobile,
    landline: addAddressDetails.landline,
    website: addAddressDetails.website,
    address: addAddressDetails.address,
  });
  return response;
};

export const updateAddressDetails = (
  updateAddressDetails: IAddressDetails,
): Promise<any> => {
  const response = pnp.sp.web.lists
    .getByTitle("addressesList")
    .items.getById(updateAddressDetails.Id)
    .update({
      name: updateAddressDetails.name,
      email: updateAddressDetails.email,
      mobile: updateAddressDetails.mobile,
      landline: updateAddressDetails.landline,
      website: updateAddressDetails.website,
      address: updateAddressDetails.address,
    });
  return response;
};

export const deleteAddressDetails = (Id: number): Promise<any> => {
  const response = pnp.sp.web.lists
    .getByTitle("addressesList")
    .items.getById(Id)
    .delete();
  return response;
};
