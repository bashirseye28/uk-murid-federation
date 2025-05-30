// components/Admin/DashboardHeader.tsx

type Props = {
  adminName: string;
};

export const DashboardHeader = ({ adminName }: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">
        Welcome back, {adminName}
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Here’s what’s happening today in the Murid Community dashboard.
      </p>
    </div>
  );
};