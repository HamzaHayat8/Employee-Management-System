import React, { useEffect } from "react";
import { userdata } from "../assets/data";
import Loader from "../components/common/Loading";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";

function Dashboard() {
  
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const user = userdata.find((u) => u.id === 1); // or from login
    setData(user);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  console.log("data.role", data.role);

  if (data.role === "admin") {
    return <div>Admin</div>;
  } else if (data.role === "employee") {
    return <EmployeeDashboard />;
  }

  return <div></div>;
}

export default Dashboard;
