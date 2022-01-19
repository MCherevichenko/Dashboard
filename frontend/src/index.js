// scroll bar
import "simplebar/src/simplebar.css";

import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// contexts
import { SettingsProvider } from "./contexts/SettingsContext";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

//
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// ----------------------------------------------------------------------

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <ApolloProvider client={client}>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <BrowserRouter>
              <Provider store={store}>
                <App />
              </Provider>
            </BrowserRouter>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </ApolloProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();