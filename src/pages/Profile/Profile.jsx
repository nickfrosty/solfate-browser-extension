/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DefaultLayout from "../../layouts/default";

import { ProfileView } from "../../components/views/ProfileView";
import { SearchView } from "../../components/views/SearchView";
import { solParser } from "../../utils/urlParser";
import { useProfile } from "../../hooks/useProfile";

const Profile = () => {
  const location = useLocation();
  const [url, setURL] = useState();
  const [loading, setLoading] = useState(true);
  const user = useProfile(url);

  // handle and parse the changes to the requested .sol url
  useEffect(() => {
    const parsed = solParser(location.pathname, true);

    if (parsed?.name) {
      setURL(parsed.name.toLowerCase());
      setLoading(true);
    }
    // else if (location?.pathname === "/") setLoading(false);
    // if (!loading) setLoading(true);

    return () => {
      // second;
    };
  }, [location]);

  // enables a very simple loading splash screen
  // (with a time delay to prevent a rapid flash of the screen)
  useEffect(() => {
    // when a user address was found,
    // or an error was returned on the user search
    // gracefully stop the loading screen to prevent flashing
    if (user?.address || user?.error) {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    } else if (!url) setLoading(false);
  }, [url, user]);

  /*
    Handle the user status conditions (e.g. error, still searching, or success)
  */
  if (!loading && user?.address) {
    window.document.title = user?.name || "[name not found]";
    return (
      <DefaultLayout>
        <ProfileView user={user} />
      </DefaultLayout>
    );
  } else {
    // set the default title page for errors
    if (user?.error) window.document.title = "Solfate";

    return (
      <DefaultLayout>
        <SearchView url={url} error={user?.error} loading={loading} />
      </DefaultLayout>
    );
  }
};

export default Profile;
