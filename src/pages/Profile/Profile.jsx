import React from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Password from "./Password/Password";

function Profile() {
  const { submenuPage } = useDashboard();

  return (
    <LayoutDashboard>
      {submenuPage === "bio" && <div>Profile</div>}
      {submenuPage === "password" && <Password />}
    </LayoutDashboard>
  );
}

export default Profile;
