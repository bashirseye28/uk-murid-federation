// components/Admin/StatsGrid.tsx

type Props = {
  totalThisYear: number;
  totalAllTime: number;
  donorCount: number;
  currentCampaign: string;
};

export const StatsGrid = ({
  totalThisYear,
  totalAllTime,
  donorCount,
  currentCampaign,
}: Props) => {
  const cards = [
    {
      title: "Total Donations",
      value: `£${totalThisYear} / £${totalAllTime}`,
      icon: "💰",
    },
    {
      title: "Total Donors",
      value: donorCount,
      icon: "👥",
    },
    {
      title: "Current Campaign",
      value: currentCampaign,
      icon: "📢",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-2xl shadow-md flex items-start space-x-4"
        >
          <div className="text-3xl">{card.icon}</div>
          <div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="text-lg font-semibold text-gray-800">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};