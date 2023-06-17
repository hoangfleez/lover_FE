import { blue } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        customColorSchemes: {
          basicColor: "#fff",
          backgroundColor: "#fff",
          textColor: "#000",
          bgColor:"#e9ebee",
        },
        customBtnColor: {
          backgroundColor: "#777",
          color: "#fff",
        },
        customSelected: {
          backgroundColor: "#000",
          color: "#fff",
        },
      },
    },
    dark: {
      palette: {
        customColorSchemes: {
          basicColor: "#121212",
          backgroundColor: "#272727",
          textColor: "#fff",
          bgColor:"#1f1f22",
        },
        customBtnColor: {
          backgroundColor: "#272727",
          color: "#fff",
        },
        customSelected: {
          backgroundColor: "#fff",
          color: "#000",
        },
      },
    },
  },

  
});

export default theme;


