// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import FileInputComponent from "../Fileupload";
// // Create a theme object with your desired styles
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#007bff", // Adjust colors as needed
//     },
//   },
// });

// const ListingProp = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h1" sx={{ mb: 2 }}>
//           List a Property
//         </Typography>
//         <Typography variant="h2" sx={{ color: "white", mb: 2 }}>
//           For Sale
//         </Typography>
//         <Typography variant="body2" sx={{ mt: 1 }}>
//           These documents confirm your ownership of the property.
//           <FileInputComponent />
//         </Typography>
//       </Paper>

//       {/* Other sections go here... */}

//       <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h2">Property Description:</Typography>
//         <TextField
//           variant="outlined"
//           multiline
//           rows={4}
//           fullWidth
//           placeholder="A well-written description of the property, highlighting its key features and benefits."
//         />
//       </Paper>

//       {/* ... other sections ... */}

//       <Paper elevation={0} sx={{ p: 3 }}>
//         <Box display="flex" alignItems="center">
//           <Box sx={{ mr: 2 }}>
//             <Typography variant="body2" sx={{ color: "text.secondary" }}>
//               Agent ID
//             </Typography>
//           </Box>
//           <Typography variant="h2">AGENT XYZ</Typography>
//           <Box sx={{ ml: 2 }}>
//             <img
//               src="https://via.placeholder.com/49x49"
//               alt="Agent"
//               sx={{
//                 width: 49,
//                 height: 49,
//                 borderRadius: "50%",
//                 border: "1px solid #007bff", // Match primary color
//               }}
//             />
//           </Box>
//         </Box>
//       </Paper>
//     </ThemeProvider>
//   );
// };

// export default ListingProp;
import React, { useState } from "react";

const ListingProp = () => {
  const [formData, setFormData] = useState({
    category: "",
    itemname: "",
    description: "",
    units: "kg",
    costPerUnit: "",
    discount: "0",
    quantity: "0",
    itemImages: [],
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    setFormData({
      ...formData,
      itemImages: Array.from(files),
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataForFetch = new FormData();
      for (const key in formData) {
        if (key === "itemImages") {
          formData[key].forEach((image) => {
            formDataForFetch.append("itemImages", image);
          });
        } else {
          formDataForFetch.append(key, formData[key]);
        }
      }

      const response = await fetch("https://kisanmart.onrender.com/addItem", {
        method: "POST",
        body: formDataForFetch,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server Response:", data); // Log the server response

      // Optionally, reset the form after successful submission
      setFormData({
        category: "",
        itemname: "",
        description: "",
        units: "kg",
        costPerUnit: "",
        discount: "0",
        quantity: "0",
        itemImages: [],
      });
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors or display a user-friendly message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>

      <label>
        Item Name:
        <input
          type="text"
          name="itemname"
          value={formData.itemname}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </label>

      <label>
        Units:
        <select name="units" value={formData.units} onChange={handleChange}>
          <option value="kg">kg</option>
          {/* Add other unit options if needed */}
        </select>
      </label>

      <label>
        Cost Per Unit:
        <input
          type="number"
          name="costPerUnit"
          value={formData.costPerUnit}
          onChange={handleChange}
        />
      </label>

      <label>
        Discount:
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </label>

      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>

      <label>
        Item Images:
        <label>
          Item Images:
          <input
            type="file"
            name="itemImages"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </label>

      <button type="submit">Add Item</button>
    </form>
  );
};

export default ListingProp;
