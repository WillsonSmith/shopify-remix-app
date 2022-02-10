import { Outlet } from "remix";

export default function () {
  return (
    <div>
      <div>Auth</div>
      <Outlet />
    </div>
  );
}
