import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FileInputComponent from "../Fileupload";
// Create a theme object with your desired styles
const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // Adjust colors as needed
    },
  },
});

const ListingProp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          List a Property
        </Typography>
        <Typography variant="h2" sx={{ color: "white", mb: 2 }}>
          For Sale
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          These documents confirm your ownership of the property.
          <FileInputComponent />
        </Typography>
      </Paper>

      {/* Other sections go here... */}

      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h2">Property Description:</Typography>
        <TextField
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          placeholder="A well-written description of the property, highlighting its key features and benefits."
        />
      </Paper>

      {/* ... other sections ... */}

      <Paper elevation={0} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center">
          <Box sx={{ mr: 2 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Agent ID
            </Typography>
          </Box>
          <Typography variant="h2">AGENT XYZ</Typography>
          <Box sx={{ ml: 2 }}>
            <img
              src="https://via.placeholder.com/49x49"
              alt="Agent"
              sx={{
                width: 49,
                height: 49,
                borderRadius: "50%",
                border: "1px solid #007bff", // Match primary color
              }}
            />
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ListingProp;
