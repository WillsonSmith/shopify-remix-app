import { AppProvider } from "@shopify/polaris";
import shopifyStyles from "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

import { LinksFunction, Outlet } from "remix";
export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: shopifyStyles,
    },
  ];
};

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Outlet />
    </AppProvider>
  );
}
