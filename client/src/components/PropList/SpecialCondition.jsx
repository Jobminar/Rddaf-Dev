import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";

const SpecialCondition = ({ values }) => {
  return (
    <div>
      {/* Price */}
      <label>Price</label>
      <Field type="number" name="price" />

      {/* Place */}
      <label>Place</label>
      <Field type="text" name="place" />

      {/* Street Parking */}
      <label>Street Parking</label>
      <Field type="checkbox" name="streetParking" />

      {/* Rear Garden */}
      <label>Rear Garden</label>
      <Field type="checkbox" name="rearGarden" />

      {/* Gas Central Heating */}
      <label>Gas Central Heating</label>
      <Field type="checkbox" name="gasCentralheating" />

      {/* Double Glazed */}
      <label>Double Glazed</label>
      <Field type="checkbox" name="doubleGlazed" />

      {/* Epc */}
      <label>Epc</label>
      <Field type="checkbox" name="Epc" />

      {/* Pin Code */}
      <label>Pin Code</label>
      <Field type="number" name="pinCode" />

      {/* Delete Flag */}
      <label>Delete Flag</label>
      <Field type="checkbox" name="deleteFlag" />

      {/* Schedule Date Time */}
      <label>Schedule Date Time</label>
      <Field
        type="text"
        name="scheduleDateTime"
        placeholder="YYYY-MM-DDTHH:mm:ss.sssZ"
      />

      {/* Created On */}
      <label>Created On</label>
      <Field
        type="text"
        name="createdOn"
        placeholder="YYYY-MM-DDTHH:mm:ss.sssZ"
      />

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
SpecialCondition.propTypes = {
  values: PropTypes.object.isRequired, // Assuming values is an object
};

export default SpecialCondition;
