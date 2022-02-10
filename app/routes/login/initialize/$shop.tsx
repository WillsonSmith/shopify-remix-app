import { LoaderFunction } from "remix";
import { beginAuth } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const shop = params.shop;
  if (!shop) throw new Error("Shop is required");
  return await beginAuth(request, { shop });
};
