import React from "react";
import { Logo } from "../../AiBuilderSupport/AiBuilderSupport";
import { useDashboard } from "../DashboardContext";

function Topbar() {
  const { submenu, activeMenu, handleSubmenuPage, submenuPage } =
    useDashboard();

  return (
    <div className="layout-dashboard-topbar">
      <Logo />
      <div className="links">
        {submenu
          .filter((menu) => menu.menu_id === activeMenu)
          .map((submenu) => {
            return (
              <div
                key={submenu.id}
                className={`links-item ${
                  submenu.name === submenuPage ? "active" : ""
                }`}
                onClick={() => handleSubmenuPage(submenu.name)}
              >
                {submenu.name}
              </div>
            );
          })}
      </div>
      <div className="others">
        <div className="others-icons">
          <div className="message"></div>
          <div className="notif"></div>
        </div>
        <div className="others-config">
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
