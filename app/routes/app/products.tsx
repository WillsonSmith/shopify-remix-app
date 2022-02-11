import { Card, List, Page } from "@shopify/polaris";
import { LoaderFunction, useLoaderData } from "remix";
import { getShop, requireAccessToken } from "~/utils/session.server";

const query = `
{
  products(first: 5) {
    edges {
      node {
        id
        handle
        title
        description
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
`;

export const loader: LoaderFunction = async ({ request }) => {
  const accessToken = await requireAccessToken(request);
  const shop = await getShop(request);
  try {
    const response = await fetch(
      `https://${shop}/admin/api/2022-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/graphql",
          "X-Shopify-Access-Token": accessToken,
        },
        body: query,
      }
    );
    const data = await response.json();
    const {
      data: {
        products: { edges },
      },
    } = data;
    return edges;
  } catch (e) {
    return {};
  }
};
export default function Products() {
  const products = useLoaderData();
  return (
    <Page title="Products">
      <Card title="Product list" sectioned>
        <List type="bullet">
          {products.map((edge: any) => {
            const { node: product } = edge;
            return (
              <List.Item key={product.id}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </List.Item>
            );
          })}
        </List>
      </Card>
    </Page>
  );
}
