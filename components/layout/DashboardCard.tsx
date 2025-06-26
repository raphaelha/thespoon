import React from "react";

export default function DashboardCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-gray-50 rounded-xl shadow-lg">
      {children}
    </div>
  );
}