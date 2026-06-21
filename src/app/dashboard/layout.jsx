export default function DashboardLayout({
  children,
}) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </div>
  );
}