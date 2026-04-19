import React, { useEffect } from "react";
import Loader from "../components/common/Loading";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";
import { useSelector } from "react-redux";

function Dashboard() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const userdata = useSelector((state) => state.auth.user);

  useEffect(() => {
    setData(userdata);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  if (data.role === "admin") {
    return <div>{data.first_name}</div>;
  } else if (data.role === "employee") {
    return <EmployeeDashboard data={data} />;
  }

  // return <div></div>;
}

export default Dashboard;
