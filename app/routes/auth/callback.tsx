import { LoaderFunction } from "remix";
import { handleCallback } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await handleCallback(request);
};

export default function () {
  return (
    <div>
      <div>Callback</div>
    </div>
  );
}
