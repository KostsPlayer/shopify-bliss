import { useEffect } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useNavigate } from "react-router-dom";
import ColorHexs from "./Hexs/ColorHexs";

function ColorsManagement() {
  const { submenuPage, accessMenus, user } = useDashboard();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasAccess = accessMenus?.some(
        (data) =>
          data.role_id === user?.role_id &&
          data.menu_id === "98e0bafb-3499-4123-954f-5dffbb42e80d"
      );

      if (hasAccess === false) {
        navigate("/403", { replace: true });
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [accessMenus, user, navigate]);

  return (
    <>
      <LayoutDashboard>
        {submenuPage === "3b37ca81-d163-442c-a445-099196844800" && (
          <ColorHexs />
        )}
      </LayoutDashboard>
    </>
  );
}

export default ColorsManagement;