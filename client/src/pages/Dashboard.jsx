// src/pages/Dashboard.js
import React from "react";
import { useAuth } from "../context/auth";
import { useMediaQuery } from "react-responsive";
import Admin from "../components/Admin";
import Parent from "../components/Parent";
import DriverMobile from "../components/Driver/DriverMobile";
import DriverDesktop from "../components/Driver/DriverDesktop";

const Dashboard = () => {
  const { user } = useAuth();
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  if (user.role === "driver") {
    return isDesktop ? <DriverDesktop /> : <DriverMobile />;
  }

  if (user.role === "admin") {
    return isDesktop ? <Admin /> : <h1>Only on Desktop please</h1>;
  }

  if (user.role === "parent") {
    return !isDesktop ? <Parent /> : <h1>Only on Parent please</h1>;
  }

  return <h1>Unauthorized</h1>;
};

export default Dashboard;
