// components/Admin/RecentDonationsTable.tsx

type Donation = {
  name: string;
  amount: number;
  campaign: string;
  date: string;
};

type Props = {
  donations: Donation[];
};

export const RecentDonationsTable = ({ donations }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Donations</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Campaign</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{donation.name}</td>
                <td className="px-4 py-2">£{donation.amount}</td>
                <td className="px-4 py-2">{donation.campaign}</td>
                <td className="px-4 py-2">{new Date(donation.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right mt-2">
        <a href="/admin/donations" className="text-sm text-blue-600 hover:underline">
          View All Donations →
        </a>
      </div>
    </div>
  );
};