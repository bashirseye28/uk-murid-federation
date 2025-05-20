// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { donationCampaigns } from '@/data/donationCampaigns'; // ✅ adjust the import path

// // ✅ Define a type for donation items
// type DonationItem = {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
// };

// export default function RandomDonations() {
//   const [randomDonations, setRandomDonations] = useState<DonationItem[]>([]);

//   useEffect(() => {
//     // 1️⃣ Get ONLY Bamba Day items
//     const bambaDayItems: DonationItem[] = donationCampaigns.bambaDay.items;

//     // 2️⃣ Shuffle and pick 3
//     const shuffled = bambaDayItems.sort(() => 0.5 - Math.random());
//     setRandomDonations(shuffled.slice(0, 3));
//   }, []);

//   return (
//     <section className="py-16 px-6 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-2xl md:text-3xl font-bold text-mourid-green text-center mb-10">
//           Bamba Day Donation List
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {randomDonations.map(item => (
//             <div key={item.id} className="bg-white shadow border rounded-lg overflow-hidden flex flex-col">
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={600}
//                 height={400}
//                 className="object-cover w-full h-48"
//               />
//               <div className="p-4 flex-1 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-lg font-semibold mb-2 text-mourid-green">{item.title}</h3>
//                   <p className="text-sm text-slate-600 mb-4">{item.description}</p>
//                 </div>
//                 <Link
//                   href={`/donate?item=${encodeURIComponent(item.title)}`}
//                   className="inline-block mt-auto bg-mourid-green text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-mourid-blue transition text-center"
//                 >
//                   Donate Now
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }