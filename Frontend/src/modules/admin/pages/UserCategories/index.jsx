import React, { useEffect, useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiGrid, FiList, FiAward } from "react-icons/fi";
import { ensureIds, loadCatalog } from "./utils";

const UserCategories = () => {
  const [catalog, setCatalog] = useState(() => ensureIds(loadCatalog()));

  useEffect(() => {
    const handler = () => setCatalog(ensureIds(loadCatalog()));
    window.addEventListener("adminUserAppCatalogUpdated", handler);
    return () => window.removeEventListener("adminUserAppCatalogUpdated", handler);
  }, []);

  const tabLinks = [
    { name: "Manage Home UI", path: "/admin/user-categories/home", icon: FiHome },
    { name: "Categories", path: "/admin/user-categories/categories", icon: FiGrid },
    { name: "Services", path: "/admin/user-categories/sections", icon: FiList },
    { name: "Brands", path: "/admin/user-categories/brands", icon: FiAward },
  ];

  const location = useLocation();

  const contextValue = React.useMemo(() => ({ catalog, setCatalog }), [catalog]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Outlet context={contextValue} />
      </motion.div>
    </div>
  );
};

export default UserCategories;
