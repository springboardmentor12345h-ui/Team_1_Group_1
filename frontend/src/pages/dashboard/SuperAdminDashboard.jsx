import DashboardLayout from "../../components/layout/DashboardLayout";

const SuperAdminDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold">Super Admin Dashboard</h2>
      <p className="text-muted-foreground mt-2">
        Platform-wide analytics and control panel.
      </p>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
