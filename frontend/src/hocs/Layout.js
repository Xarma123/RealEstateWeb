import React from "react";
import Navbar from "../components/Navbar";

function layout(props) {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
}
export default layout;
