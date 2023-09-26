import { useState } from "react";
import axios from "axios";

import "./App.css";

import FormInput from "./components/FormInput";

const initialState = {
  accountNo: "",
  accountType: "ACCTS",
  customerID: "5678923",
  documentType: "IDP4 - Citizen ID",
  NRCnumber: "365767",
  personId: "3657678",
  firstName: "",
  surName: "",
  dateOfBirth: "",
  gender: "",
  typeOfPersonId: "",
  noOfPersonId: "",
  addressId: "212",
  addressType: "ADDR1 - Private",
  addressLine1: "",
  addressLine2: "",
  region: "",
  phone: "",
  email: "",
  cardNumber: "",
  embossedName: "",
  regionList: "",
};

const inputs = [
  {
    id: 1,
    name: "accountNo",
    type: "text",
    placeholder: "Account No.",
    errorMessage: "Account No. should be a valid number.",
    label: "Account No.",
    required: true,
  },

  {
    id: 2,
    name: "accountType",
    type: "text",
    placeholder: "Account Type",
    errorMessage: "Account Type should be a valid number.",
    label: "Account Type",
    readOnly: true,
  },

  {
    id: 3,
    name: "customerID",
    type: "text",
    placeholder: "enter customerId no.",
    errorMessage: "Card Number should be a valid number.",
    label: "Customer Id.",
    readOnly: true,
  },

  {
    id: 4,
    name: "documentType",
    type: "dropdown", // Specify "dropdown" type for this input
    label: "Document Type",
    options: [
      // { value: "select", label: "---Select Document Type---" },
      { value: "citizenID", label: "IDTP4 - Citizen ID" },
      { value: "other", label: "Other" },
      // Add more options as needed
    ],
    errorMessage: "Document type should be a valid number.",
    disabled: true,
  },

  {
    id: 5,
    name: "NRCnumber",
    type: "text",
    placeholder: "enter NRC no.",
    errorMessage: "NRC No. should be valid.",
    label: "Number",
    readOnly: true,
  },
  {
    id: 6,
    name: "personId",
    type: "text",
    placeholder: "enter personal id.",
    errorMessage: "Person Id. should be valid.",
    label: "Person Id.",
    readOnly: true,
  },

  {
    id: 7,
    name: "firstName",
    type: "text",
    placeholder: "enter first name",
    errorMessage: "First name should be valid",
    label: "First Name",
    required: true,
  },

  {
    id: 8,
    name: "surName",
    type: "text",
    placeholder: "enter surname",
    errorMessage: "Enter valid Surname",
    label: "SurName",
  },

  {
    id: 9,
    name: "dateOfBirth",
    type: "date",
    placeholder: "enter birthday",
    label: "Date of Birth",
  },

  {
    id: 10,
    name: "gender",
    type: "dropdown", // Specify "dropdown" type for this input
    label: "Gender",
    options: [
      { value: "select", label: "---Please Select One---" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      // Add more options as needed
    ],
  },

  {
    id: 11,
    name: "typeOfPersonId",
    type: "dropdown", // Specify "dropdown" type for this input
    label: "Type of the person's ID",
    options: [
      { value: "select", label: "---Select Type of Person ID---" },
      { value: "citizenID", label: "IDTP4 - Citizen ID" },
      { value: "other", label: "Other" },
      // Add more options as needed
    ],
  },

  {
    id: 12,
    name: "noOfPersonId",
    type: "text",
    placeholder: "enter number of person's id",
    errorMessage: "Enter valid number of the person's ID",
    label: "Number of the person's ID",
  },

  {
    id: 13,
    name: "addressId",
    type: "text",
    placeholder: "enter address ID",
    errorMessage: "Enter valid Address ID",
    label: "Address Id",
    readOnly: true,
  },

  {
    id: 14,
    name: "addressType",
    type: "dropdown", // Specify "dropdown" type for this input
    label: "Address Type",
    options: [
      // { value: "select", label: "---Select One---" },
      { value: "private", label: "ADDR1 - Private" },
      { value: "other", label: "Other" },
      // Add more options as needed
    ],
    disabled: true,
  },

  {
    id: 15,
    name: "addressLine1",
    type: "text",
    placeholder: "enter address line 1",
    errorMessage: "Enter valid Address Line 1",
    label: "Address Line 1",
    required: true,
  },

  {
    id: 16,
    name: "addressLine2",
    type: "text",
    placeholder: "enter address line 2",
    errorMessage: "Enter valid Address Line 2",
    label: "Address Line 2",
    required: true,
  },

  {
    id: 17,
    name: "region",
    type: "dropdown", // Specify "dropdown" type for this input
    label: "Region",
    options: [
      { value: "select", label: "---Select Region---" },
      { value: "yangon", label: "Yangon" },
      { value: "mandalay", label: "Mandalay" },
      { value: "hinthada", label: "Hinthada" },
      // Add more options as needed
    ],
  },

  {
    id: 18,
    name: "phone",
    type: "phone",
    placeholder: "enter phone no.",
    errorMessage: "Enter valid Phone Number",
    label: "Mobile Phone",
  },

  {
    id: 19,
    name: "email",
    type: "email",
    placeholder: "enter email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
  },

  {
    id: 20,
    name: "cardNumber",
    type: "text",
    placeholder: "enter card no.",
    errorMessage: "Enter valid card number",
    label: "Card Number",
    required: true,
  },
  {
    id: 21,
    name: "embossedName",
    type: "text",
    placeholder: "enter embossed name",
    errorMessage: "Enter valid embossed name",
    label: "Embossed Name",
    required: true,
  },
  {
    id: 22,
    name: "regionList",
    type: "dropdown", // Specify "dropdown" type for this input
    label: "Region List",
    options: [
      { value: "select", label: "---Select Region---" },
      { value: "yangon", label: "Yangon" },
      { value: "mandalay", label: "Mandalay" },
      { value: "hinthada", label: "Hinthada" },
      { value: "taunggyi", label: "Taunggyi" },
      // Add more options as needed
    ],
  },
];

const App = () => {
  const [values, setValues] = useState(initialState);

  const renderInputColumns = (start, end) => {
    return inputs
      .slice(start, end)
      .map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        />
      ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object with the form values
      const formData = {
        accountNo: values.accountNo,
        accountType: values.accountType,
        customerID: values.customerID,
        documentType: values.documentType,
        NRCnumber: values.NRCnumber,
        personId: values.personId,
        firstName: values.firstName,
        surName: values.surName,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        typeOfPersonId: values.typeOfPersonId,
        noOfPersonId: values.noOfPersonId,
        addressId: values.addressId,
        addressType: values.addressType,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        region: values.region,
        phone: values.phone,
        email: values.email,
        cardNumber: values.cardNumber,
        embossedName: values.embossedName,
        regionList: values.regionList,
      };

      // Send a POST request to the API
      const response = await axios.post(
        "https://localhost:7104/api/Form/Save",
        formData
      );

      // Handle the API response as needed
      console.log("API Response:", response.data);
      alert("Data saved successfully");
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error Response:", error.response);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>GREEN PIN INSTANT CARD APPLICATION</h1>

        <h3>Creating GreenPIN Instant Card</h3>
        <div className="blueLine">
          {" "}
          <hr />
        </div>
        <h3>Account Block</h3>

        <div className="input-columns">
          <div className="column">{renderInputColumns(0, 1)}</div>

          <div className="column">{renderInputColumns(1, 2)}</div>
        </div>
        <div className="line">
          {" "}
          <hr />
        </div>
        <h3>Customer Block</h3>

        <div className="input-columns">
          <div className="column">
            {renderInputColumns(2, 3)}
            {renderInputColumns(4, 5)}
          </div>

          <div className="column">{renderInputColumns(3, 4)}</div>
        </div>

        <div className="line">
          {" "}
          <hr />
        </div>

        <h3>Card Holder Block</h3>

        <div className="input-columns">
          <div className="column">
            {renderInputColumns(5, 6)}
            {renderInputColumns(7, 8)}
          </div>

          <div className="column">
            {renderInputColumns(6, 7)}
            {renderInputColumns(8, 10)}
          </div>
        </div>

        <div className="input-columns">
          <div className="column">
            {renderInputColumns(10, 11)}
            {renderInputColumns(12, 13)}
          </div>

          <div className="column">
            {renderInputColumns(11, 12)}
            {renderInputColumns(13, 14)}
            {renderInputColumns(14, 15)}
          </div>
        </div>

        <div className="input-columns">
          <div className="column">
            {renderInputColumns(15, 16)}
            {renderInputColumns(17, 18)}
          </div>

          <div className="column">
            {renderInputColumns(16, 17)}
            {renderInputColumns(18, 19)}
          </div>
        </div>

        <div className="line">
          {" "}
          <hr />
        </div>

        <h3>Card Block</h3>
        <div className="input-columns">
          <div className="column">
            {renderInputColumns(19, 20)}
            {renderInputColumns(21, 22)}
          </div>

          <div className="column">{renderInputColumns(20, 21)}</div>
        </div>
        {/* Add the rest of your form inputs with similar structure */}

        <div className="button-container">
          <button type="submit" className="saveBut">
            Save
          </button>
          <button type="button" onClick={resetForm}>
            Reset
          </button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default App;
