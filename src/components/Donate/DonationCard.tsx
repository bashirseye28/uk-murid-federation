// components/DonationCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  title: string;
  image: string;
  price?: number;
  campaign: string;
};

export default function DonationCard({ id, title, image, price, campaign }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow hover:shadow-md p-4 text-center flex flex-col items-center">
      <div className="w-full h-48 relative rounded-md overflow-hidden mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-mourid-green font-bold text-lg mb-1">{title}</h3>

      {price && (
        <p className="text-sm text-slate-700 mb-2 font-semibold">£{price.toLocaleString()}</p>
      )}

      <Link
        href={`/donate/form?cause=${encodeURIComponent(title)}&amount=${price || ''}&campaign=${encodeURIComponent(campaign)}`}
        className="mt-auto inline-block bg-mourid-green text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-mourid-blue transition"
      >
        Donate
      </Link>
    </div>
  );
}