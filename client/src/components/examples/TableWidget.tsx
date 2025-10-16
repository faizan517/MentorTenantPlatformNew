import TableWidget from "../TableWidget";

export default function TableWidgetExample() {
  const mockData = [
    { name: "Acme Corp", status: "Active", users: 145 },
    { name: "TechStart Inc", status: "Active", users: 89 },
    { name: "HealthCo", status: "Pending", users: 234 },
  ];

  return (
    <div className="p-6">
      <TableWidget
        title="Recent Tenants"
        headers={["Name", "Status", "Users"]}
        data={mockData}
        testId="table-tenants"
      />
    </div>
  );
}
