import React from "react";
import { ProfileView } from "../../components/views/ProfileView";
import DefaultLayout from "../../layouts/default";

// manifest object to enable the popup window
// "default_popup": "profile.html",

import "./Popup.css";
// import Greetings from "../../containers/Greetings/Greetings";

const Popup = () => {
  return (
    <DefaultLayout>
      <ProfileView url="nickfrosty" />
    </DefaultLayout>
  );
};

export default Popup;
