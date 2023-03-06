import React from "react";
import { Link, useParams } from "react-router-dom";
import { IAddressDetails } from "../../models/IAddressDetails";
import "./AddressDetailsList.css";
//import pnp from "sp-pnp-js";
import styles from "./AddressDetailsList.module.scss";


type props = {
  addressDetailsListView: IAddressDetails[];
};

const Home: React.FC<props> = ({ addressDetailsListView }) => {
  const { addressId } = useParams();
  // const [addressDetailsListView, setAddressDetailsListView] =
  //   useState(initialData);

  // const getAllItems = async (): Promise<void> => {
  //   try {
  //     const response = await pnp.sp.web.lists
  //       .getByTitle("addressesList")
  //       .items.get();
  //     if (response) {
  //       setAddressDetailsListView(response);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   getAllItems();
  // }, []);

  return (
    <div>
      <h1 className={styles.contactsHeading}>contacts</h1>
      <ul className={styles.detailsContainer}>
        {addressDetailsListView.map((item: IAddressDetails) => {
          const { name, email, mobile, Id } = item;
          return (
            <Link
              to={`/addresses/view/${Id}`}
              className={styles.detailsView}
              key={Id}>
              <div
                key={Id}
                className={
                  parseInt(addressId) === Id
                    ? "detailsItem active"
                    : "detailsItem"
                }>
                <h1 className={styles.nameDetails}>{name}</h1>
                <div className={styles.emailNameContainer}>
                  <span className={styles.email}>{email}</span>
                  <br />
                  <span className={styles.email}>{mobile}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
