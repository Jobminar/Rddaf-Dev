import React, { useState } from "react";

const InstantEvalForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumber: "",
    postCode: "",
    address: "",
    propertyAction: "SELL",
    timing: "0-3 MONTHS",
    additionalMessage: "",
    bestWayToContact: "EMAIL",
    bestTimeToContact: "MORNING",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form fields
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.emailAddress ||
        !formData.contactNumber ||
        !formData.postCode ||
        !formData.address
      ) {
        throw new Error("All fields marked as required must be filled.");
      }

      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      setSuccessMessage("Form submitted successfully");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to submit the form. Please try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>

        <label>
          Email Address:
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
          />
        </label>

        <label>
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Post Code:
          <input
            type="text"
            name="postCode"
            value={formData.postCode}
            onChange={handleChange}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>

        <label>
          Property Action:
          <select
            name="propertyAction"
            value={formData.propertyAction}
            onChange={handleChange}
          >
            <option value="SELL">Sell</option>
            <option value="LET">Let</option>
            <option value="CURIOUS">Curious</option>
            <option value="REMORTGAGING">Remortgaging</option>
          </select>
        </label>

        <label>
          Timing:
          <select name="timing" value={formData.timing} onChange={handleChange}>
            <option value="0-3 MONTHS">0-3 Months</option>
            <option value="3-6 MONTHS">3-6 Months</option>
            <option value="6+ MONTHS">6+ Months</option>
          </select>
        </label>

        <label>
          Additional Message:
          <textarea
            name="additionalMessage"
            value={formData.additionalMessage}
            onChange={handleChange}
          />
        </label>

        <label>
          Best Way To Contact:
          <select
            name="bestWayToContact"
            value={formData.bestWayToContact}
            onChange={handleChange}
          >
            <option value="EMAIL">Email</option>
            <option value="PHONE">Phone</option>
            <option value="EITHER">Either</option>
          </select>
        </label>

        <label>
          Best Time To Contact:
          <select
            name="bestTimeToContact"
            value={formData.bestTimeToContact}
            onChange={handleChange}
          >
            <option value="MORNING">Morning</option>
            <option value="AFTERNOON">Afternoon</option>
            <option value="EVENING">Evening</option>
            <option value="ANYTIME">Anytime</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default InstantEvalForm;
