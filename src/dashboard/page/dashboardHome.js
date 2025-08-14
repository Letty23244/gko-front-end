import Header from "../component/Header";
import KPISection from "../component/KPISection";
import DashboardChart from "../component/dashboardCharts";


function DashboardHome() {
  const handleLogout = () => {
   
    localStorage.clear(); 
    window.location.href = "/"; // redirect to homepage or login
  };

  return (
    <div>
      <Header title="Dashboard Home" userName="Leticia" onLogout={handleLogout} />

       <KPISection />
        <DashboardChart />
    </div>
  );
}

export default DashboardHome;
