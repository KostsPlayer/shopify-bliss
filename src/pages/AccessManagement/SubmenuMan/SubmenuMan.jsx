import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import SubmenuManModal from "./SubmenuManModal";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { Link } from "react-router-dom";

function DisplayView({
  isLoadingSubmenuMan,
  submenus,
  setSubmenuId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  return (
    <>
      {isLoadingSubmenuMan && (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      )}
      {type === "grid" ? (
        <div className="submenu-man-grid">
          {submenus.map((data) => (
            <div className="item" key={data.sub_menu_id}>
              <div className="item-name">{data.name}</div>
              <Link className="item-menu" to={`/${data.menus.url}`}>
                {data.menus.url}
              </Link>
              <div className="item-action">
                {data.default === true ? (
                  <>
                    <div className="item-action-default">
                      <span className="material-symbols-outlined item-action-default-icon">
                        settings
                      </span>
                      <span className="item-action-default-text">Default</span>
                    </div>
                  </>
                ) : null}
                <span
                  className="material-symbols-rounded item-action-edit"
                  onClick={() => {
                    setIsUpdateModalOpen(true);
                    setSubmenuId(data.sub_menu_id);
                  }}
                >
                  edit_square
                </span>
                <span
                  className="material-symbols-rounded item-action-delete"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setSubmenuId(data.sub_menu_id);
                  }}
                >
                  delete
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="submenu-man-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Name</div>
            <div className="head-col">Menu</div>
            <div className="head-col">Default</div>
            <div className="head-col">Action</div>
          </div>
          {submenus.map((data, index) => (
            <div className="body" key={data.sub_menu_id}>
              <dic className="body-col">{index + 1}</dic>
              <div className="body-col">{data.name}</div>
              <div className="body-col">{data.menus.name}</div>
              <div className="body-col">
                {data.default === true ? (
                  <span className="default">Default</span>
                ) : (
                  <span className="nope">-</span>
                )}
              </div>
              <div className="body-col">
                <span
                  className="material-symbols-rounded edit"
                  onClick={() => {
                    setIsUpdateModalOpen(true);
                    setSubmenuId(data.sub_menu_id);
                  }}
                >
                  edit_square
                </span>
                <span
                  className="material-symbols-rounded delete"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setSubmenuId(data.sub_menu_id);
                  }}
                >
                  delete
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function SubmenuMan() {
  axios.defaults.withCredentials = true;
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [submenuId, setSubmenuId] = useState(null);

  const { submenus, fetchDashboardData, isLoading } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  return (
    <>
      <div className="submenu-man">
        <Header
          className="submenu-man"
          title="Menu Management — Submenus"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingSubmenuMan={isLoading}
            submenus={submenus}
            setSubmenuId={setSubmenuId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingSubmenuMan={isLoading}
            submenus={submenus}
            setSubmenuId={setSubmenuId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <SubmenuManModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchDashboardData}
        />
        <SubmenuManModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchDashboardData}
          submenuId={submenuId}
        />
        <SubmenuManModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchDashboardData}
          submenuId={submenuId}
        />
      </div>
    </>
  );
}

export default SubmenuMan;