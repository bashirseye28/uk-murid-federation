'use client';

import { motion } from 'framer-motion';
import {
  Users,
  PiggyBank,
  CheckCircle,
  Globe,
} from 'lucide-react';

const achievements = [
  {
    icon: Users,
    title: 'Unified UK Dahiras',
    description:
      'Successfully united Mouride Dahiras across the UK through events like Bamba Day and Mame Cheikh Ibrahima Fall Day.',
  },
  {
    icon: PiggyBank,
    title: 'Raised Community Funds',
    description:
      'Mobilised significant funds for social support, community projects, and Khalif-led initiatives such as the Touba University.',
  },
  {
    icon: CheckCircle,
    title: 'Financial Transparency',
    description:
      'Established an accountable financial system aligned with Islamic principles to ensure transparent and ethical stewardship.',
  },
  {
    icon: Globe,
    title: 'Global Mouride Relations',
    description:
      'Built strong relationships with Mouride leaders and institutions across the world to support shared goals and unity.',
  },
];

export default function AchievementsSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-mourid-green mb-4">
          Our Achievements
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          These milestones reflect our collective commitment to faith, service, and community development.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-50 border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-center mb-5">
              <item.icon className="text-mourid-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 text-center whitespace-nowrap overflow-hidden text-ellipsis">
              {item.title}
            </h3>
            <p className="text-base text-slate-600 mt-3 text-center leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
