import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import axios from "axios";
import "./Prop.css";
// Import your components
import DocUpload from "./DocUpload";
import PropDetail from "./PropDetail";
import SpecialCondition from "./SpecialCondition";

const PropSubmit = ({ initialValues }) => {
  // Define the onSubmit handler
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Validate and adjust values based on the backend schema
      const adjustedValues = {
        userType: values.userType || "User",
        purpose: values.purpose || "SALE",
        propertyType: values.propertyType || [],
        isVerified: false,
        propertyDocuments: values.propertyDetails.propertyDocuments || [],
        fittingAndContentsForm:
          values.propertyDetails.fittingAndContentsForm || [],
        energyPerformanceCertificate:
          values.propertyDetails.energyPerformanceCertificate || [],
        leaseholdInformation: values.propertyDetails.leaseholdInformation || [],
        propertyInfoForm: values.propertyDetails.propertyInfoForm || [],
        localAuthoritySearch: values.propertyDetails.localAuthoritySearch || [],
        floorplan: values.propertyDetails.floorplan || [],
        propertyValuationReport:
          values.propertyDetails.propertyValuationReport || [],
        // Add other fields based on your schema
        propertyDimensions: {
          reception: {
            length:
              parseFloat(values.propertyDimensions?.reception?.length) || 0,
            width: parseFloat(values.propertyDimensions?.reception?.width) || 0,
          },
          kitchen: {
            length: parseFloat(values.propertyDimensions?.kitchen?.length) || 0,
            width: parseFloat(values.propertyDimensions?.kitchen?.width) || 0,
          },
          masterBedroom: {
            length:
              parseFloat(values.propertyDimensions?.masterBedroom?.length) || 0,
            width:
              parseFloat(values.propertyDimensions?.masterBedroom?.width) || 0,
          },
          bedroom: {
            length: parseFloat(values.propertyDimensions?.bedroom?.length) || 0,
            width: parseFloat(values.propertyDimensions?.bedroom?.width) || 0,
          },
        },
        nearby: {
          hospital: {
            distance: parseFloat(values.nearby?.hospital?.distance) || 0,
            name: values.nearby?.hospital?.name || "",
          },
          school: {
            distance: parseFloat(values.nearby?.school?.distance) || 0,
            name: values.nearby?.school?.name || "",
          },
          busStation: {
            distance: parseFloat(values.nearby?.busStation?.distance) || 0,
            name: values.nearby?.busStation?.name || "",
          },
        },
        noOfBedrooms: parseInt(values.noOfBedrooms) || 0,
        noOfBathrooms: parseInt(values.noOfBathrooms) || 0,
        noOfToilets: parseInt(values.noOfToilets) || 0,
        parkingCapacity: parseInt(values.parkingCapacity) || 0,
        price: parseFloat(values.price) || 0,
        place: values.place || "United Kingdom",
        streetParking: !!values.streetParking,
        rearGarden: !!values.rearGarden,
        gasCentralheating: !!values.gasCentralheating,
        doubleGlazed: !!values.doubleGlazed,
        Epc: !!values.Epc,
        pinCode: parseInt(values.pinCode) || 0,
        deleteFlag: !!values.deleteFlag,
        scheduleDateTime: values.scheduleDateTime || "",
        contactDetails: {
          fullname: values.contactDetails?.fullname || "",
          email: values.contactDetails?.email || "",
          phoneNumber: values.contactDetails?.phoneNumber || "",
          subject: values.contactDetails?.subject || "",
        },
      };

      // Log the adjusted values
      console.log("Adjusted Values:", adjustedValues);

      // Create FormData
      const formData = new FormData();

      // Append all form data
      formData.append("adjustedValues", JSON.stringify(adjustedValues));

      // Append files from propertyDetails
      Object.entries(values.propertyDetails).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((file, index) => {
            formData.append(`${key}[${index}]`, file);
          });
        }
      });

      // Append other values to formData
      Object.entries(values).forEach(([key, value]) => {
        const skipFields = [
          "userType",
          "purpose",
          "propertyType",
          "contactDetails",
        ];
        if (!skipFields.includes(key) && value !== undefined) {
          if (Array.isArray(value) && value.length > 0) {
            value.forEach((file, index) => {
              formData.append(`${key}[${index}]`, file);
            });
          } else {
            formData.append(key, JSON.stringify(value));
          }
        }
      });

      // Perform the API request using axios or your preferred HTTP client
      const response = await axios.post("/api/submitProperty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response from the backend
      console.log("API Response:", response.data);

      // Set submitting to false
      setSubmitting(false);

      // Log a message to indicate that submission is completed
      console.log("Submission completed.");
    } catch (error) {
      // Handle errors if any
      console.error("API Error:", error);

      // Set submitting to false on error
      setSubmitting(false);

      // Log a message to indicate that submission has failed
      console.error("Submission failed.");
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        {/* DocUpload with its specific props */}
        <DocUpload propertyDetails={initialValues.propertyDetails} />

        {/* PropDetail with its specific props */}
        <PropDetail
          propertyDimensions={initialValues.propertyDimensions}
          nearby={initialValues.nearby}
          noOfBedrooms={initialValues.noOfBedrooms}
          noOfToilets={initialValues.noOfToilets}
          parkingCapacity={initialValues.parkingCapacity}
          contactDetails={initialValues.contactDetails}
        />

        {/* SpecialCondition with its specific props */}
        <SpecialCondition
          price={initialValues.price}
          place={initialValues.place}
          streetParking={initialValues.streetParking}
          rearGarden={initialValues.rearGarden}
          gasCentralheating={initialValues.gasCentralheating}
          doubleGlazed={initialValues.doubleGlazed}
          Epc={initialValues.Epc}
          pinCode={initialValues.pinCode}
          deleteFlag={initialValues.deleteFlag}
          scheduleDateTime={initialValues.scheduleDateTime}
          createdOn={initialValues.createdOn}
        />

        {/* Buttons for submission and skipping */}
        <button type="submit">Submit</button>
        <button type="button">Skip</button>
      </Form>
    </Formik>
  );
};

// Define PropTypes
PropSubmit.propTypes = {
  initialValues: PropTypes.object.isRequired, // Assuming initialValues is an object
};

export default PropSubmit;
