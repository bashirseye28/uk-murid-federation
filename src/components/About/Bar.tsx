'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function FundraisingProgress() {
  const goal = 22000;
  const [raised, setRaised] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();
    const duration = 2000;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      setRaised(Math.floor(eased * goal));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView]);

  const percentage = Math.min((raised / goal) * 100, 100);

  return (
    <section ref={ref} className="max-w-4xl mx-auto mt-20 px-6 text-center" aria-labelledby="fundraising-title">
      <h3 id="fundraising-title" className="text-xl sm:text-2xl font-bold text-mourid-green mb-2">
        Fundraising Achievement
      </h3>
      <p className="text-sm text-slate-600 mb-6">
        Raised over <strong className="text-mourid-green">£{goal.toLocaleString()}</strong> for the University of Touba Project (2021).
      </p>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={raised}
        className="relative w-full h-10 bg-slate-200 rounded-full overflow-hidden shadow-inner"
      >
        <div
          className="absolute h-full bg-gradient-to-r from-mourid-green to-mourid-blue animate-pulse-glow transition-all duration-700"
          style={{ width: `${percentage}%` }}
        ></div>

        <div className="absolute inset-0 flex justify-between items-center px-4 text-xs sm:text-sm font-semibold text-yellow-500 tracking-wide z-10">
          <span>£{raised.toLocaleString()}</span>
          <span>{Math.floor(percentage)}%</span>
          <span>Goal: £{goal.toLocaleString()}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0px 0 rgba(255, 204, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 12px 4px rgba(255, 204, 0, 0.4);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}