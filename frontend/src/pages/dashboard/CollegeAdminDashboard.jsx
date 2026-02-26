import DashboardLayout from "../../components/layout/DashboardLayout";

const CollegeAdminDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold">College Admin Dashboard</h2>
      <p className="text-muted-foreground mt-2">
        Manage events, approvals, and participants.
      </p>
    </DashboardLayout>
  );
};

export default CollegeAdminDashboard;
