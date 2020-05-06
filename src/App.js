import React, { Fragment, Suspense } from "react";
import { toast, Slide } from "react-toastify";
import { Loader } from "@util-components";
import { ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Routes from "./routes";
import theme from "./utils/theme";
import { StylesProvider } from "@material-ui/core/styles";
// import "react-toastify/dist/ReactToastify.css";
// import "normalize.css";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "@inrupt/solid-style-guide";
import { SnackbarProvider } from 'notistack';

library.add(fas);
library.add(faGithub);

function App() {  
  return (
    <SnackbarProvider maxSnack={3}>
      <Suspense fallback={<Loader />}>
        <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Fragment>
            <Routes />
          </Fragment>
          </StylesProvider>
        </ThemeProvider>
      </Suspense>
    </SnackbarProvider>
  );
}
export default App;
