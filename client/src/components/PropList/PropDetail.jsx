import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";

const PropDetails = ({ values }) => {
  return (
    <div>
      {/* Property Dimensions */}
      <label>Property Dimensions</label>
      <Field
        type="text"
        name="propertyDimensions.reception.length"
        placeholder="Reception Length"
      />
      <Field
        type="text"
        name="propertyDimensions.reception.width"
        placeholder="Reception Width"
      />
      <Field
        type="text"
        name="propertyDimensions.kitchen.length"
        placeholder="Kitchen Length"
      />
      <Field
        type="text"
        name="propertyDimensions.kitchen.width"
        placeholder="Kitchen Width"
      />
      {/* Add similar fields for other dimensions */}

      {/* Nearby */}
      <label>Nearby</label>
      <Field
        type="text"
        name="nearby.hospital.distance"
        placeholder="Hospital Distance"
      />
      <Field
        type="text"
        name="nearby.hospital.name"
        placeholder="Hospital Name"
      />
      <Field
        type="text"
        name="nearby.school.distance"
        placeholder="School Distance"
      />
      <Field type="text" name="nearby.school.name" placeholder="School Name" />
      <Field
        type="text"
        name="nearby.busStation.distance"
        placeholder="Bus Station Distance"
      />
      <Field
        type="text"
        name="nearby.busStation.name"
        placeholder="Bus Station Name"
      />

      {/* Number of Bedrooms */}
      <label>Number of Bedrooms</label>
      <Field type="number" name="noOfBedrooms" />

      {/* Number of Toilets */}
      <label>Number of Toilets</label>
      <Field type="number" name="noOfToilets" />

      {/* Parking Capacity */}
      <label>Parking Capacity</label>
      <Field type="number" name="parkingCapacity" />

      {/* Contact Details */}
      <label>Contact Details</label>
      <Field
        type="text"
        name="contactDetails.fullname"
        placeholder="Full Name"
      />
      <Field type="text" name="contactDetails.email" placeholder="Email" />
      <Field
        type="text"
        name="contactDetails.phoneNumber"
        placeholder="Phone Number"
      />
      <Field type="text" name="contactDetails.subject" placeholder="Subject" />

      {/* Add other input fields similarly */}

      {/* You can access values and other Formik props */}
      {values && (
        <div>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// Define PropTypes
PropDetails.propTypes = {
  values: PropTypes.object.isRequired, // Assuming values is an object
};

export default PropDetails;
