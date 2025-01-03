import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import AccessManModal from "./AccessManModal";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { useAuth } from "../../../helpers/AuthContext";

function DisplayView({
  isLoadingAccessMan,
  accessMenus,
  setAccessId,
  setIsDeleteModalOpen,
  type,
  menus,
  activeRole,
  handleActiveRole,
  roles,
}) {
  return (
    <>
      {isLoadingAccessMan && (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      )}
      <div className="access-man-wrapper">
        <div className="access-man-roles">
          {roles.map((role) => (
            <div
              className={`role ${activeRole === role.role_id ? "active" : ""}`}
              key={role.role_id}
              onClick={() => handleActiveRole(role.role_id)}
            >
              {role.role_name}
            </div>
          ))}
        </div>
        {type === "grid" ? (
          <div className="access-man-grid">
            {menus.map((menu) => {
              const matchedAccess = accessMenus.find(
                (access) =>
                  access.menu_id === menu.menu_id &&
                  access.role_id === activeRole
              );

              const hasAccess = !!matchedAccess;

              return (
                <div className="item" key={menu.menu_id}>
                  <div className="item-name">{menu.name}</div>
                  <span className="material-symbols-outlined item-check">
                    {hasAccess ? "task_alt" : "circle"}
                  </span>
                  <div className="item-action">
                    {hasAccess && (
                      <span
                        className="material-symbols-rounded item-action-delete"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setAccessId(matchedAccess.access_id);
                        }}
                      >
                        delete
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="access-man-list">
            <div className="head">
              <div className="head-col">No</div>
              <div className="head-col">Menu</div>
              <div className="head-col">Access</div>
              <div className="head-col">Action</div>
            </div>
            {menus.map((menu, index) => {
              const matchedAccess = accessMenus.find(
                (access) =>
                  access.menu_id === menu.menu_id &&
                  access.role_id === activeRole
              );

              const hasAccess = !!matchedAccess;

              return (
                <div className="body" key={menu.menu_id}>
                  <div className="body-col">{index + 1}</div>
                  <div className="body-col">{menu.name}</div>
                  <div className="body-col material-symbols-outlined">
                    {hasAccess ? "task_alt" : "circle"}
                  </div>
                  <div className="body-col">
                    {hasAccess && (
                      <span
                        className="material-symbols-rounded delete"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setAccessId(matchedAccess.access_id);
                        }}
                      >
                        delete
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function AccessMan() {
  axios.defaults.withCredentials = true;

  const [isLoadingAccessMan, setIsLoadingAccessMan] = useState(true);
  const [activeDisplay, setActiveDisplay] = useState("list");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accessId, setAccessId] = useState(null);
  const [activeRole, setActiveRole] = useState(
    "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
  );
  const [roles, setRoles] = useState([]);

  const { token } = useAuth();
  const { accessMenus, fetchDashboardData, menus } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const handleActiveRole = useCallback((role) => {
    setActiveRole(role);
  }, []);

  const fetchRoles = useCallback(async () => {
    setIsLoadingAccessMan(true);

    try {
      const response = await axios.get(urlEndpoint.role, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;

      setRoles(data);
      setIsLoadingAccessMan(false);
    } catch (error) {
      console.error(error);
      setIsLoadingAccessMan(false);
    } finally {
      setIsLoadingAccessMan(false);
    }
  }, [token, urlEndpoint.role]);

  useEffect(() => {
    fetchDashboardData();
    fetchRoles();
  }, [fetchRoles, fetchDashboardData]);

  return (
    <>
      <div className="access-man">
        <Header
          className="access-man"
          title="Menu Management — Access Menu"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            roles={roles}
            isLoadingAccessMan={isLoadingAccessMan}
            accessMenus={accessMenus}
            setAccessId={setAccessId}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
            menus={menus}
            activeRole={activeRole}
            handleActiveRole={handleActiveRole}
          />
        ) : (
          <DisplayView
            roles={roles}
            isLoadingAccessMan={isLoadingAccessMan}
            accessMenus={accessMenus}
            setAccessId={setAccessId}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
            menus={menus}
            activeRole={activeRole}
            handleActiveRole={handleActiveRole}
          />
        )}
        <AccessManModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchDashboardData}
          roles={roles}
        />
        <AccessManModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchDashboardData}
          accessId={accessId}
          roles={roles}
        />
      </div>
    </>
  );
}

export default AccessMan;
