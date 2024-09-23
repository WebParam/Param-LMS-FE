import { NextPage } from "next";
import SideTab from "@/app/interfaces/sideTabs";
import { usePathname } from "next/navigation";
import Dropdown from "../components/Dropdown";
import Cookies from "universal-cookie";
import { useState } from "react";

const Menu: NextPage<{ sideTabs: SideTab[] }> = ({ sideTabs }) => {
  const pathname = usePathname();
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  return (
    <>
      <ul style={{ height: "100vh" }} className="sidebar-menu">
        {sideTabs &&
          sideTabs.map((tab, index) => {
            return (
              <>
                {loggedInUser &&
                loggedInUser.role &&
                tab.roles &&
                tab.roles.includes(loggedInUser.role) ? (
                  <li
                    key={tab.url}
                    className={`sidebar-menu-item ${
                      pathname === tab.url ? "active" : ""
                    }`}
                  >
                    {tab.children ? (
                      <Dropdown
                        key={tab.name}
                        icon={tab.icon}
                        parent={tab.name}
                        children={tab.children}
                        pathname={pathname}
                      />
                    ) : (
                      <a className="sidebar-menu-button" href={tab.url}>
                        <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">
                          {tab.icon}
                        </span>
                        <span className="sidebar-menu-text">{tab.name}</span>
                      </a>
                    )}
                  </li>
                ) : (
                  <></>
                )}
              </>
            );
          })}
      </ul>
    </>
  );
};

export default Menu;