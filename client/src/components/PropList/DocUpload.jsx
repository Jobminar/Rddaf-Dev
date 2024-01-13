import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

// Custom component for file input
const FileInput = ({ name, label, multiple, accept, formik }) => {
  const handleChange = (event) => {
    const files = event.target.files;

    if (multiple) {
      formik.setFieldValue(name, Array.from(files));
    } else {
      formik.setFieldValue(name, files[0]);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="file"
        name={name}
        onChange={handleChange}
        multiple={multiple}
        accept={accept}
      />
    </div>
  );
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  formik: PropTypes.object.isRequired,
};

// Custom component for text input
const TextInput = ({ name, label, formik }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
      />
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};

// Custom component for checkbox input
const CheckboxInput = ({ name, label, formik }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="checkbox"
        name={name}
        checked={formik.values[name]}
        onChange={formik.handleChange}
      />
    </div>
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};

// Main component - DocUpload
const DocUpload = () => {
  // Initialize form values and useFormik hook
  const formik = useFormik({
    initialValues: {
      userType: "",
      purpose: "",
      propertyType: "",
      isVerified: false,
      images: [],
      propertyTitleDeals: [],
      fittingContentForm: [],
      energyPerformanceCertificate: [],
      leaseHoldInformation: [],
      localAuthoritySearch: [],
      propertyValuationReport: [],
      floorPlan: [],
      propertyInfoForm: [],
      propertyDescription: "",
    },
  });

  // Return the form with custom input components
  return (
    <form>
      {/* Basic Information */}
      <TextInput name="userType" label="User Type" formik={formik} />
      <TextInput name="purpose" label="Purpose" formik={formik} />
      <TextInput name="propertyType" label="Property Type" formik={formik} />
      <CheckboxInput name="isVerified" label="Is Verified" formik={formik} />

      {/* Image Uploads */}
      <FileInput
        name="images"
        label="Images"
        multiple
        accept="image/*"
        formik={formik}
      />

      {/* Property Documents (PDFs) */}
      <FileInput
        name="propertyTitleDeals"
        label="Property Title Deals (PDF)"
        multiple
        accept=".pdf"
        formik={formik}
      />
      <FileInput
        name="fittingContentForm"
        label="Fitting Content Form (PDF)"
        multiple
        accept=".pdf"
        formik={formik}
      />
      <FileInput
        name="energyPerformanceCertificate"
        label="Energy Performance Certificate (PDF)"
        multiple
        accept=".pdf"
        formik={formik}
      />
      <FileInput
        name="leaseHoldInformation"
        label="Leasehold Information (PDF)"
        multiple
        accept=".pdf"
        formik={formik}
      />
      <FileInput
        name="localAuthoritySearch"
        label="Local Authority Search (PDF)"
        multiple
        accept=".pdf"
        formik={formik}
      />
      <FileInput
        name="propertyValuationReport"
        label="Property Valuation Report (PDF)"
        multiple
        accept=".pdf"
        formik={formik}
      />
      <FileInput
        name="floorPlan"
        label="Floor Plan (PDF)"
        multiple
        accept=".pdf"
        formik={formik}
      />
      <FileInput
        name="propertyInfoForm"
        label="Property Info Form (PDF)"
        multiple
        accept=".pdf"
        formik={formik}
      />

      {/* Additional Fields */}
      <TextInput
        name="propertyDescription"
        label="Property Description"
        formik={formik}
      />

      {/* Display Formik values for debugging */}
      {formik.values && (
        <div>
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default DocUpload;
