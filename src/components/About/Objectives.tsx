'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const objectives = [
  {
    title: 'Collective Celebrations',
    description:
      'Organise UK-wide events such as Bamba Day and Mame Cheikh Ibrahima Fall Day to strengthen communal bonds.',
  },
  {
    title: 'Annual Ziarra',
    description:
      'Coordinate the annual pilgrimage to Touba, ensuring seamless logistics and spiritual fulfilment for participants.',
  },
  {
    title: 'Social Support',
    description:
      'Provide assistance for repatriation and funeral expenses for community members in need.',
  },
  {
    title: 'Khalif Projects',
    description:
      'Mobilise resources to support initiatives led by the Khalif General of the Murids, including the Touba University project.',
  },
  {
    title: 'Cultural Preservation',
    description:
      'Promote the literary and spiritual works of Cheikh Ahmadou Bamba through educational programmes and interfaith dialogue.',
  },
];

export default function Objectives() {
  return (
    <section id="objectives" className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-mourid-green"
        >
          Our Objectives
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
        {objectives.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3 text-mourid-green">
              <CheckCircle className="w-5 h-5" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}