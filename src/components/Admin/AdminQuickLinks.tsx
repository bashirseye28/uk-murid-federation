// components/Admin/AdminQuickLinks.tsx

export const AdminQuickLinks = () => {
  const links = [
    {
      title: "Manage Gallery",
      href: "/admin/gallery",
      emoji: "🖼️",
    },
    {
      title: "View All Donations",
      href: "/admin/donations",
      emoji: "💷",
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="block p-4 bg-white rounded-xl shadow hover:bg-gray-50 transition"
          >
            <div className="text-2xl">{link.emoji}</div>
            <p className="mt-2 font-medium text-gray-700">{link.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};