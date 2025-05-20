'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMosque } from '@fortawesome/free-solid-svg-icons';
import { BookOpen, HeartHandshake, Landmark } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function WhyDonateSection() {
  const reasons = [
    {
      icon: <FontAwesomeIcon icon={faMosque} className="w-6 h-6 text-mourid-yellow" />,
      title: 'Support Our Spiritual Mission',
      desc: 'Your donations help preserve the teachings of Cheikh Ahmadou Bamba and support the growth of Mourid communities.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-mourid-yellow" />,
      title: 'Promote Islamic Education',
      desc: 'We organise seminars, classes and publish materials rooted in Islamic principles and Muridiyya.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-mourid-yellow" />,
      title: 'Strengthen Social Support',
      desc: 'Funds are used for funeral support, repatriation, and aiding families in times of need.',
    },
    {
      icon: <Landmark className="w-6 h-6 text-mourid-yellow" />,
      title: 'Contribute to Khalif Projects',
      desc: 'We support large-scale projects such as Touba University, under the guidance of the Khalif General.',
    },
  ];

  const [triggered, setTriggered] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) setTriggered(true);
  }, [inView]);

  return (
    <section className="py-16 px-6 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-mourid-green">Why Donate?</h2>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          Your generosity directly empowers our mission, helps those in need, and sustains our legacy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className={`bg-gray-50 border border-slate-100 rounded-xl p-6 text-center shadow transition-all duration-700 ease-out
              ${triggered ? 'animate-slide-up' : 'opacity-0 translate-y-4'}`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-lg font-semibold text-mourid-green mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}