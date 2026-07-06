import { useEffect } from "react";

import { getAllTests } from "../../api/testApi";

const Dashboard = () => {
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await getAllTests();

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTests();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;