import { useEffect } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import TempPages from "./TempPages/TempPages";
import TempSections from "./TempSections/TempSections";
import TempColors from "./TempColors/TempColors";
import TempFonts from "./TempFonts/TempFonts";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useNavigate } from "react-router-dom";

function TemplatesManagement() {
  const { submenuPage, accessMenus, user } = useDashboard();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasAccess = accessMenus?.some(
        (data) =>
          data.role_id === user?.role_id &&
          data.menu_id === "e0c2b209-08c0-4c8b-ae0d-77f86b088879"
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
        {submenuPage === "e3655a61-e8cd-41e6-a86b-56ec0dcfb6f3" && (
          <span>test</span>
        )}
        {submenuPage === "20c608ac-921c-47a3-955f-913949074a8d" && (
          <TempPages />
        )}
        {submenuPage === "cb84354f-a64a-48a7-98e4-198a932beed2" && (
          <TempSections />
        )}
        {submenuPage === "colors" && <TempColors />}
        {submenuPage === "fonts" && <TempFonts />}
      </LayoutDashboard>
    </>
  );
}

export default TemplatesManagement;
