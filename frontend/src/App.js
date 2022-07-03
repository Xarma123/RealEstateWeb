import React from "react";
import Layout from "./hocs/Layout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./containers/Home";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Listings from "./containers/Listings";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import ListingDetail from "./containers/ListingDetail";
import NotFound from "./components/NotFound";
import "./sass/main.scss";
import { Provider } from "react-redux";
import store from "./store";
import "./sass/main.scss";
import { useSelector } from 'react-redux'
const select = state => {return state.auth}
const PrivateRoute = () => { 
  const auth= useSelector(select);
  if (!auth.isAuthenticated && !auth.loading) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/*" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/listings" element={<Listings />} />
            <Route element={<PrivateRoute />}>
              <Route path="/listings/:id" element={<ListingDetail />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
