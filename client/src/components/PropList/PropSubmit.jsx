import React, { useState } from "react";
import DocUpload from "./DocUpload"; // Adjust the path accordingly
import PropDetails from "./PropDetails"; // Adjust the path accordingly
import SpecialCondition from "./SpecialCondition"; // Adjust the path accordingly

const PropSubmit = () => {
  // State to store data from child components
  const [formData, setFormData] = useState({});

  // Function to handle changes from child components
  const handleFormChange = (name, value) => {
    console.log("Data", value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const formDataWithDefaults = {
        ...formData,
        propertyDimensions: {
          reception: formData?.propertyDimensions?.reception || {},
          kitchen: formData?.propertyDimensions?.kitchen || {},
          masterBedroom: formData?.propertyDimensions?.masterBedroom || {},
          bedroom: formData?.propertyDimensions?.bedroom || {},
        },
      };
      console.log("FormData with defaults:", formDataWithDefaults);
      console.log("FormData:", formData);

      // Unwrap values from each component and create request body
      const requestBody = {
        purpose: formData.purpose || "",
        propertyType: formData.propertyType || [],
        isVerified: formData.isVerified || false,
        images: formData.images || [],
        propertyDescription: formData.propertyDescription || "",
        propertyDimensions: {
          bedroom: {
            length: formData.propertyDimensions?.bedroom?.length || 0,
            width: formData.propertyDimensions?.bedroom?.width || 0,
          },
          masterBedroom: {
            length: formData.propertyDimensions?.masterBedroom?.length || 0,
            width: formData.propertyDimensions?.masterBedroom?.width || 0,
          },
          kitchen: {
            length: formData.propertyDimensions?.kitchen?.length || 0,
            width: formData.propertyDimensions?.kitchen?.width || 0,
          },
          reception: {
            length: formData.propertyDimensions?.reception?.length || 0,
            width: formData.propertyDimensions?.reception?.width || 0,
          },
        },
        nearby: {
          hospital: {
            distance: formData.nearby?.hospital?.distance || 0,
            name: formData.nearby?.hospital?.name || "",
          },
          school: {
            distance: formData.nearby?.school?.distance || 0,
            name: formData.nearby?.school?.name || "",
          },
          busStation: {
            distance: formData.nearby?.busStation?.distance || 0,
            name: formData.nearby?.busStation?.name || "",
          },
        },
        noOfBedrooms: formData.noOfBedrooms || 0,
        noOfBathrooms: formData.noOfBathrooms || 0,
        noOfToilets: formData.noOfToilets || 0,
        parkingCapacity: formData.parkingCapacity || 0,
        contactDetails: formData.contactDetails || {},
        specialConditions: formData.specialConditions || "",
        propertyDocuments: formData.propertyDocuments || [],
        fittingAndContentsForm: formData.fittingAndContentsForm || [],
        energyPerformanceCertificate:
          formData.energyPerformanceCertificate || [],
        leaseholdInformation: formData.leaseholdInformation || [],
        propertyInfoForm: formData.propertyInfoForm || [],
        localAuthoritySearch: formData.localAuthoritySearch || [],
        floorplan: formData.floorplan || [],
        propertyValuationReport: formData.propertyValuationReport || [],
        price: formData.price || 0,
        place: formData.place || "United Kingdom",
        streetParking: formData.streetParking || false,
        rearGarden: formData.rearGarden || false,
        gasCentralheating: formData.gasCentralheating || false,
        doubleGlazed: formData.doubleGlazed || false,
        Epc: formData.Epc || false,
        pinCode: formData.pinCode || 0,
        deleteFlag: formData.deleteFlag || false,
        scheduleDateTime: formData.scheduleDateTime || null,
      };
      console.log("RequestBody:", requestBody);
      console.log("Request Body before POST:", requestBody);
      // Send a POST request to your API endpoint
      const response = await fetch(
        "http://localhost:3000/listing-property/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        console.log("Server Response:", response);
        // Handle success, e.g., show a success message
        console.log("Property submitted successfully!");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to submit property");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      {/* Include the three components */}
      <DocUpload onChange={handleFormChange} values={formData} />
      <PropDetails onChange={handleFormChange} values={formData} />
      <SpecialCondition onChange={handleFormChange} values={formData} />

      {/* Add a button to submit the form */}
      <button onClick={handleSubmit}>Submit Property</button>
    </div>
  );
};

export default PropSubmit;
