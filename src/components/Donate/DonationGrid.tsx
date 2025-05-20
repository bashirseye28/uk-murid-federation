import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCurrentCampaign } from '@/lib/donations';

export type DonationItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  /** 'donation' (default) or 'registration' */
  formType?: 'donation' | 'registration';
};

export type DonationCampaign = {
  id: string;
  name: string;
  items: DonationItem[];
};

interface DonationGridProps {
  /** Callback fired when the user clicks Donate; receives the full DonationItem */
  onDonate?: (item: DonationItem) => void;
}

/**
 * DonationGrid – lists the active campaign’s donation items in a responsive grid.
 * If an onDonate handler is provided, clicking a card routes through client logic;
 * otherwise it falls back to a simple anchor link (useful for SSR or static pages).
 */
const DonationGrid: React.FC<DonationGridProps> = ({ onDonate }) => {
  const [campaign, setCampaign] = useState<DonationCampaign | null>(null);

  useEffect(() => {
    setCampaign(getCurrentCampaign());
  }, []);

  if (!campaign) {
    return (
      <section className="bg-white px-6 py-20 text-center">
        <p className="text-gray-500">Loading donation options…</p>
      </section>
    );
  }

  return (
    <section id="list_donation" className="bg-white px-6 py-20">
      {/* Heading */}
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <h2 className="text-3xl font-bold text-mourid-green md:text-4xl">
          {campaign.name}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Choose a cause below and help make a meaningful contribution.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {campaign.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50 p-5 text-center shadow transition hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Title & price */}
            <h3 className="mb-1 text-lg font-bold text-mourid-green">
              {item.title}
            </h3>
            <p className="mb-2 text-sm font-semibold text-mourid-accent">
              £{item.price.toLocaleString()}
            </p>
            {item.description && (
              <p className="mb-4 line-clamp-3 text-sm text-slate-600">
                {item.description}
              </p>
            )}

            {/* CTA */}
            {onDonate ? (
              <button
                onClick={() => onDonate(item)}
                className="mt-auto rounded-md bg-mourid-green px-5 py-2 text-sm font-semibold text-white transition hover:bg-mourid-blue"
              >
                Donate
              </button>
            ) : (
              <a
                href={`/donate/form?item=${encodeURIComponent(item.title)}&campaign=${encodeURIComponent(campaign.id)}`}
                className="mt-auto rounded-md bg-mourid-green px-5 py-2 text-sm font-semibold text-white transition hover:bg-mourid-blue"
              >
                Donate
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DonationGrid;