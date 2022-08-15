// import AppHeader from "../components/layout/AppHeader";
import SimpleFooter from "../components/layout/SimpleFooter";

export default function Layout({ seo, children }) {
  if (seo === undefined) seo = {};

  return (
    <>
      {/* <NextSeo {...seo} /> */}

      <AppHeader />

      {children}

      <SimpleFooter />
    </>
  );
}
