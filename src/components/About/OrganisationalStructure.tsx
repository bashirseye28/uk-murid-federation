'use client';

import { useState } from 'react';
import Image from 'next/image';

type Member = {
  name: string;
  title: string;
  image: string; // supports local or remote
  responsibilities: string[];
};

const members: Member[] = [
  {
    name: 'Lamine Ndiaye',
    title: 'Chairman (Diewrign)',
    image: '/profile.jpg',
    responsibilities: [
      'Provide leadership and direction to the organisation.',
      'Preside over meetings and represent the organisation externally.',
      'Ensure effective and efficient operation of the organisation.',
      'Oversee appointments for key roles.'
    ]
  },
  // Remaining members...
  {
    name: 'Srg Khassim Dieng',
    title: 'General Secretary',
    image: '/profile.jpg',
    responsibilities: [
      'Manage administrative functions and maintain records.',
      'Support leaders and ensure proper documentation.',
      'Coordinate internal communication and training.',
      'Map and enforce business processes.'
    ]
  },
  {
    name: 'Srg Pape Mor Niang',
    title: 'Official Relations Officer',
    image: '/profile.jpg',
    responsibilities: [
      'Manage external relations with authorities and institutions.',
      'Lead protocol duties during events.'
    ]
  },
  {
    name: 'Mamadou Mbengue',
    title: 'Accountant',
    image: '/profile.jpg',
    responsibilities: [
      'Manage budgeting, financial reporting, and compliance.',
      'Provide financial analysis to support decision-making.'
    ]
  },
  {
    name: 'Abdou Salam',
    title: 'Accountant (Manchester)',
    image: '/profile.jpg',
    responsibilities: [
      'Support with local finance duties and reporting.'
    ]
  },
  {
    name: 'Fallou Gueye',
    title: 'Social Support Officer',
    image: '/profile.jpg',
    responsibilities: [
      'Lead repatriation cases and coordinate with consulates.',
      'Guide family and oversee Islamic compliance.',
      'Document and manage communications.'
    ]
  },
  {
    name: 'Talla Gueye',
    title: 'Fundraising Coordinator',
    image: '/profile.jpg',
    responsibilities: [
      'Plan campaigns and identify donor strategies.',
      'Build and maintain relationships with sponsors.'
    ]
  },
  {
    name: 'Mame Thierno Diaw',
    title: 'Fundraising Coordinator',
    image: '/profile.jpg',
    responsibilities: [
      'Coordinate events and fundraising logistics.',
      'Ensure ethical fundraising practices.'
    ]
  },
  {
    name: 'Moustapha Gueye',
    title: 'Religious Affairs Officer',
    image: '/profile.jpg',
    responsibilities: [
      'Organise Annual Ziarra and religious education.',
      'Ensure alignment with Islamic values.'
    ]
  }
];

export default function OrganisationalStructure() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-mourid-green">Our Organisational Structure</h2>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          Meet the individuals guiding our federation with wisdom, integrity, and dedication.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member, index) => {
          const isChairman = member.title.toLowerCase().includes('chairman');
          const isRemote = member.image.startsWith('http');
          const imageSrc = isRemote ? member.image : member.image;

          return (
            <div
              key={index}
              className={`bg-white border border-slate-200 rounded-xl p-5 shadow hover:shadow-md transition-all
                ${isChairman ? 'col-span-full md:col-span-4 bg-mourid-green/5 border-mourid-green' : ''}`}
            >
              <Image
                src={imageSrc}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full mx-auto mb-4 object-cover"
                unoptimized={isRemote}
              />
              <h3 className="text-lg font-semibold text-slate-800 text-center">{member.name}</h3>
              <p className="text-sm text-mourid-green font-medium text-center mb-2">{member.title}</p>

              <button
                className="block mx-auto text-xs text-mourid-green hover:underline focus:outline-none"
                onClick={() => setExpanded(expanded === member.name ? null : member.name)}
              >
                {expanded === member.name ? 'Hide Details' : 'View Responsibilities'}
              </button>

              {expanded === member.name && (
                // <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1 text-left">
                <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1 text-center mx-auto max-w-xs"> 
                  {member.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-3xl mx-auto text-sm text-slate-700">
        <strong>Note:</strong> The federation recognises the “Federation Sokhna Mame Diarra UK,” comprising women’s groups from Dahiras across the UK.
      </div>
    </section>
  );
}