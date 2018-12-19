import React, { Component } from "react";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import store from "./store";
import MainPage from "./components/MainPage";
import "./App.css";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
