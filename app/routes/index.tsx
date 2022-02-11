import { Link, LinksFunction, LoaderFunction } from "remix";
import { requireActiveShop } from "~/utils/db.server";

import { AppProvider, Page, Card, Layout } from "@shopify/polaris";
import shopifyStyles from "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: shopifyStyles,
    },
  ];
};

export const loader: LoaderFunction = async (request) => {
  return {};
};

export default function Index() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page title="New Remix App">
        <Layout>
          <Layout.Section>
            <Card title="files" sectioned>
              <ul style={{ margin: 0, paddingLeft: "0.8rem" }}>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}
