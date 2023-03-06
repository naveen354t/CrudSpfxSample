/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputFields from "../inputFields/InputFields";
import AddressDetailsList from "../viewAddressDetails/AddressDetailsList";
import "./Home.css";
import SelectedAddressDetails from "../viewSelectedAddressDetails/ViewSelectedAddressDetails";
import styles from "./Home.module.scss";
import { IAddressDetails } from "../../models/IAddressDetails";
import { getAllItems } from "../../spServices/SPAddressDetailsServices";
const initialData: IAddressDetails[] = [
  {
    id: "0",
    name: "naveen",
    email: "n@gmail.com",
    mobile: "7674903993",
    landline: "0403404045",
    website:
      "https://www.office365notes.com/2021/03/spfx-crud-operations-using-sphttpclient.html",
    address: "HYD",
  },
];
const Home: React.FC = () => {
  const [addressDetailsListView, setAddressDetailsListView] =
    useState(initialData);
  const [inputsFieldsShow, setInputsFieldsShow] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const getAllDetails = async () => {
    try {
      const data = await getAllItems();
      setAddressDetailsListView(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDetails();
  }, []);

  return (
    <div>
      <header className={styles.mainHeading}>
        <div style={{ marginLeft: "22px" }}>Address Book</div>
      </header>
      <nav className={styles.navigationBar}>
        <div className={styles.navcontainer}>
          <Link to={"/addresses/home"}>
            <button className={styles.addBtn}>HOME</button>
          </Link>
          <Link to={"/addresses/add"}>
            <button
              className={styles.addBtn}
              type='button'
              onClick={() => {
                setInputsFieldsShow(!inputsFieldsShow);
              }}>
              +ADD
            </button>
          </Link>
        </div>
        <img
          src='https://res.cloudinary.com/naveen354/image/upload/v1676528322/blog-icon_k4woww.png'
          alt='blog-icon'
          className={styles.blogIcon}
        />
      </nav>
      <div className={styles.detailsInputContainer}>
        <AddressDetailsList addressDetailsListView={addressDetailsListView} />
        {inputsFieldsShow ? (
          <InputFields
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            inputsFieldsShow={inputsFieldsShow}
            setInputsFieldsShow={setInputsFieldsShow}
            addressDetailsListView={addressDetailsListView}
            setAddressDetailsListView={setAddressDetailsListView}
          />
        ) : (
          <SelectedAddressDetails
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            inputsFieldsShow={inputsFieldsShow}
            setInputsFieldsShow={setInputsFieldsShow}
            setAddressDetailsListView={setAddressDetailsListView}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
