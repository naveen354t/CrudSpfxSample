/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from "react";
import { IAddressDetails, IFormValidation } from "../../models/IAddressDetails";
import "./InputFields.css";
import {
  createAddressDetails,
  updateAddressDetails,
  getAllItems,
} from "../../spServices/SPAddressDetailsServices";
import { useNavigate, useParams } from "react-router-dom";
import pnp from "sp-pnp-js";

import {
  validate,
  validationName,
  validationEmail,
  validationMobileNumber,
  validationLandline,
  validateWebsite,
} from "../../utils/Utils";
import styles from "./InputFields.module.scss";

const initialData: IAddressDetails = {
  id: "",
  name: "",
  email: "",
  mobile: "",
  landline: "",
  website: "",
  address: "",
};

type props = {
  setInputsFieldsShow: React.Dispatch<React.SetStateAction<boolean>>;
  inputsFieldsShow: boolean;
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  addressDetailsListView: IAddressDetails[];
  setAddressDetailsListView: React.Dispatch<
    React.SetStateAction<IAddressDetails[]>
  >;
};

const validation: IFormValidation = {
  nameError: "",
  emailError: "",
  mobileError: "",
  landlineError: "",
  websiteError: "",
  addressError: "",
};

const InputFields: React.FC<props> = ({
  setInputsFieldsShow,
  inputsFieldsShow,
  showEdit,
  setShowEdit,
  addressDetailsListView,
  setAddressDetailsListView,
}) => {
  const { addressId } = useParams();
  const navigate = useNavigate();
  const [addAddressDetails, setAddAddressDetails] = useState(initialData);
  const [errors, setErrors] = useState<IFormValidation>(validation);
  const [error, setError] = useState<boolean>(false);

  const updateInputs = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    validate(name, value);
    if (name === "name") {
      const message = validationName(name, value);
      if (message) {
        setErrors({
          ...errors,
          nameError: message,
        });
        setError(!error);
      }
    }

    if (name === "email") {
      const message = validationEmail(name, value);
      if (message) {
        setErrors({
          ...errors,
          emailError: message,
        });
      }
    }

    if (name === "mobile") {
      const message = validationMobileNumber(name, value);
      if (message) {
        setErrors({
          ...errors,
          mobileError: message,
        });
      }
    }

    if (name === "landline") {
      const message = validationLandline(name, value);
      if (message) {
        setErrors({
          ...errors,
          landlineError: message,
        });
      }
    }

    if (name === "website") {
      const message = validateWebsite(name, value);
      if (message) {
        setErrors({
          ...errors,
          websiteError: message,
        });
      }
    }

    setAddAddressDetails({
      ...addAddressDetails,
      [name]: value,
    });
  };

  const getItemById = async (): Promise<void> => {
    try {
      if (parseInt(addressId)) {
        const response = await pnp.sp.web.lists
          .getByTitle("addressesList")
          .items.getById(parseInt(addressId))
          .get();
        setAddAddressDetails(response);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getItemById();
  }, [addressId]);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createAddressDetails(addAddressDetails);
      if (response) {
        const data = await getAllItems();
        setAddressDetailsListView(data);
        navigate("/addresses/home", { replace: true });
      }
    } catch (error) {
      console.log(error.errorMessage);
    }
    setInputsFieldsShow(!inputsFieldsShow);
  };

  const editsubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateAddressDetails(addAddressDetails);
      if (response) {
        const data = await getAllItems();
        setAddressDetailsListView(data);
        navigate("/addresses/home", { replace: true });
      }
    } catch (error) {
      console.log(error.errorMessage);
    }

    setShowEdit(!showEdit);
    setInputsFieldsShow(!inputsFieldsShow);
  };

  return (
    <>
      {showEdit ? (
        <div className={styles.inputsFieldsContainer}>
          <form
            className={styles.inputFieldsContainer}
            onSubmit={editsubmitForm}>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor='name'>
                Name
              </label>
              <input
                required={true}
                name='name'
                value={addAddressDetails.name}
                onChange={updateInputs}
                type='text'
                className={styles.input}
              />
              {errors.nameError && (
                <span
                  className={
                    errors.nameError === "Accepted..."
                      ? styles.accepted
                      : styles.error
                  }>
                  {errors.nameError}
                </span>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor='email'>
                Email
              </label>
              <input
                required={true}
                name='email'
                value={addAddressDetails.email}
                onChange={updateInputs}
                type='email'
                className={styles.input}
              />
              {errors.emailError && (
                <span
                  className={
                    errors.emailError === "Accepted..." ? "accepted" : "error"
                  }>
                  {errors.emailError}
                </span>
              )}
            </div>

            <div className={styles.inputsContainer}>
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor='mobile'>
                  Mobile
                </label>
                <input
                  required={true}
                  name='mobile'
                  value={addAddressDetails.mobile}
                  onChange={updateInputs}
                  type='number'
                  className={styles.mobileInput}
                />
                {errors.mobileError && (
                  <span
                    className={
                      errors.mobileError === "Accepted..."
                        ? "accepted"
                        : "error"
                    }>
                    {errors.mobileError}
                  </span>
                )}
              </div>
              <div className={styles.gapMobileLanline}>
                <label className={styles.label} htmlFor='landline'>
                  Landline
                </label>
                <input
                  required={true}
                  name='landline'
                  value={addAddressDetails.landline}
                  onChange={updateInputs}
                  type='number'
                  className={styles.landlineInput}
                />
                {errors.landlineError && (
                  <span
                    className={
                      errors.landlineError === "Accepted..."
                        ? "accepted"
                        : "error"
                    }>
                    {errors.landlineError}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor='website'>
                Website
              </label>
              <input
                required={true}
                name='website'
                value={addAddressDetails.website}
                onChange={updateInputs}
                type='url'
                className={styles.input}
              />
              {errors.websiteError && (
                <span
                  className={
                    errors.websiteError === "Accepted..." ? "accepted" : "error"
                  }>
                  {errors.websiteError}
                </span>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor='address'>
                Address
              </label>
              <textarea
                required={true}
                name='address'
                value={addAddressDetails.address}
                onChange={updateInputs}
                rows={5}
                cols={45}
                className={styles.textArea}
              />
            </div>
            <div className={styles.btnContainer}>
              <button type='submit' className={styles.addBtnInputField}>
                Update
              </button>
              <button
                type='button'
                className={styles.cancelInputField}
                onClick={() => {
                  navigate("/addresses/home", { replace: true });
                  setInputsFieldsShow(!inputsFieldsShow);
                  setShowEdit(!showEdit);
                }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.inputsFieldsContainer}>
          <form className={styles.inputFieldsContainer} onSubmit={submitForm}>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor='name'>
                Name
              </label>
              <input
                required={true}
                name='name'
                value={addAddressDetails.name}
                onChange={updateInputs}
                type='text'
                className={styles.input}
                placeholder='Enter your name'
              />
              {errors.nameError && (
                <span
                  className={
                    errors.nameError === "Accepted..." ? "accepted" : "error"
                  }>
                  {errors.nameError}
                </span>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor='email'>
                Email
              </label>
              <input
                required={true}
                name='email'
                value={addAddressDetails.email}
                onChange={updateInputs}
                type='email'
                className={styles.input}
                placeholder='Enter yor email'
              />
              {errors.emailError && (
                <span
                  className={
                    errors.emailError === "Accepted..." ? "accepted" : "error"
                  }>
                  {errors.emailError}
                </span>
              )}
            </div>

            <div className={styles.inputsContainer}>
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor='mobile'>
                  Mobile
                </label>
                <input
                  required={true}
                  name='mobile'
                  value={addAddressDetails.mobile}
                  onChange={updateInputs}
                  type='number'
                  className={styles.mobileInput}
                  placeholder='Enter your mobile number'
                />
                {errors.mobileError && (
                  <span
                    className={
                      errors.mobileError === "Accepted..."
                        ? "accepted"
                        : "error"
                    }>
                    {errors.mobileError}
                  </span>
                )}
              </div>
              <div className={styles.gapMobileLanline}>
                <label className={styles.label} htmlFor='landline'>
                  Landline
                </label>
                <input
                  required={true}
                  name='landline'
                  value={addAddressDetails.landline}
                  onChange={updateInputs}
                  type='number'
                  className={styles.landlineInput}
                  placeholder='Enter your landline number'
                />
                {errors.landlineError && (
                  <span
                    className={
                      errors.landlineError === "Accepted..."
                        ? "accepted"
                        : "error"
                    }>
                    {errors.landlineError}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor='website'>
                Website
              </label>
              <input
                required={true}
                name='website'
                value={addAddressDetails.website}
                onChange={updateInputs}
                type='text'
                className={styles.input}
                placeholder='Enter your website Url'
              />
              {errors.websiteError && (
                <span
                  className={
                    errors.websiteError === "Accepted..." ? "accepted" : "error"
                  }>
                  {errors.websiteError}
                </span>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor='address'>
                Address
              </label>
              <textarea
                required={true}
                name='address'
                value={addAddressDetails.address}
                onChange={updateInputs}
                rows={5}
                cols={45}
                className={styles.textArea}
                placeholder='Enter your address'
              />
            </div>
            <div className={styles.btnContainer}>
              <button type='submit' className={styles.addBtnInputField}>
                Add
              </button>
              <button
                type='button'
                className={styles.cancelInputField}
                onClick={() => {
                  navigate("/addresses/home", { replace: true });
                  setInputsFieldsShow(!inputsFieldsShow);
                }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default InputFields;
