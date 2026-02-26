import DashboardLayout from "../../components/layout/DashboardLayout";

const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold">Student Dashboard</h2>
      <p className="text-muted-foreground mt-2">
        Upcoming events and registrations will appear here.
      </p>
    </DashboardLayout>
  );
};

export default StudentDashboard;
