/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
import { IAddressDetails } from "../../models/IAddressDetails";
import "./ViewSelectedAddressDetails.css";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  deleteAddressDetails,
  getAddressDetails,
  getAllItems,
} from "../../spServices/SPAddressDetailsServices";
import styles from "./ViewSelectedAddressDetails.module.scss";

const initialData: IAddressDetails = {
  id: "0",
  name: "naveen",
  email: "n@gmail.com",
  mobile: "7674903993",
  landline: "0403404045",
  website:
    "https://www.office365notes.com/2021/03/spfx-crud-operations-using-sphttpclient.html",
  address: "HYD",
};

type props = {
  setInputsFieldsShow: React.Dispatch<React.SetStateAction<boolean>>;
  inputsFieldsShow: boolean;
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressDetailsListView: React.Dispatch<
    React.SetStateAction<IAddressDetails[]>
  >;
};

const SelectedAddressDetails: React.FC<props> = ({
  setInputsFieldsShow,
  inputsFieldsShow,
  showEdit,
  setShowEdit,
  setAddressDetailsListView,
}) => {
  const navigate = useNavigate();
  const { addressId } = useParams();
  const [viewAddressDetails, setViewAddressDetails] = useState(initialData);

  const getItemById = async (): Promise<void> => {
    try {
      const response = await getAddressDetails(parseInt(addressId));
      if (response) {
        setViewAddressDetails(response);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAddressDetailsItem = async (id: number) => {
    try {
      const response = await deleteAddressDetails(id);
      if (response) {
        const data = await getAllItems();
        setAddressDetailsListView(data);
        navigate("/addresses/home", { replace: true });
      }
    } catch (error) {
      console.log(error.errorMessage);
    }
  };

  useEffect(() => {
    getItemById();
  }, [addressId]);

  const { name, email, address, website, mobile, landline, Id } =
    viewAddressDetails;

  return (
    <>
      {parseInt(addressId) === Id ? (
        <>
          <div className={styles.userDetailsContainer}>
            <div className={styles.nameContainer}>
              <div className={styles.contactName}>{name}</div>
              <Link
                to={`/addresses/edit/${addressId}`}
                style={{ textDecoration: "none", color: "black" }}>
                <div
                  className={styles.editContainer}
                  onClick={() => {
                    setInputsFieldsShow(!inputsFieldsShow);
                    setShowEdit(!showEdit);
                  }}>
                  <img
                    src='https://res.cloudinary.com/naveen354/image/upload/v1677688967/edit1_w3eykq.jpg'
                    alt='editIcon'
                    className={styles.editIcon}
                  />
                  <span>EDIT</span>
                </div>
              </Link>
              <div
                className={styles.deleteContainer}
                onClick={() => {
                  if (parseInt(addressId)) {
                    deleteAddressDetailsItem(parseInt(addressId));
                  }
                }}>
                <img
                  src='https://res.cloudinary.com/naveen354/image/upload/v1677689016/delete1_mgpfwv.png'
                  alt='deleteIcon'
                  className={styles.deleteIcon}
                />
                <span>DELETE</span>
              </div>
            </div>
            <div className={styles.mobile}>
              Email:
              <span>{email}</span>
            </div>
            <div className={styles.mobileContainer}>
              <h5 className={styles.mobile}>
                Mobile:<span>{mobile}</span>
              </h5>
              <br />
              <h5 className={styles.mobile}>
                Landline:<span>{landline}</span>
              </h5>
            </div>
            <p className={styles.mobile}>
              Website:<span>{website}</span>
            </p>

            <div className={styles.addressContainer}>
              <p className={styles.mobile}>Address:</p>&nbsp;
              <pre className={styles.mobile}>{address}</pre>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SelectedAddressDetails;
