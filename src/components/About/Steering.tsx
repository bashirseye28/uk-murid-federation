"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

const committeeMembers = [
  {
    dahira: "Birmingham",
    diewrign: "Mamadou Mbengue",
    secondMember: "Khassim Dieng",
  },
  {
    dahira: "Bristol",
    diewrign: "Dame Gueye",
    secondMember: "Pape Mor Niang",
  },
  {
    dahira: "Crowley & Brighton",
    diewrign: "Hakim Mbaye",
    secondMember: "Elmamoune Fall",
  },
  {
    dahira: "Leeds",
    diewrign: "Fallou Gueye",
    secondMember: "Meissa Ndiaye",
  },
  {
    dahira: "Leicester",
    diewrign: "Mame Thierno Diaw",
    secondMember: "Ismael Dioum",
  },
  {
    dahira: "Liverpool",
    diewrign: "Moustapha Diagne",
    secondMember: "Mbacke Sarr",
  },
  {
    dahira: "London",
    diewrign: "Abdoulaye Dieng",
    secondMember: "Fallou Diop",
  },
  {
    dahira: "Manchester",
    diewrign: "Moustapha Gueye",
    secondMember: "Gora Seck",
  },
  {
    dahira: "Oxford",
    diewrign: "Modou Diene Sarr",
    secondMember: "Baye Talla Gueye",
  },
  {
    dahira: "Sheffield",
    diewrign: "Elhadji Kasse",
    secondMember: "Yancoba Ndiaye",
  },
];

export default function SteeringCommittee() {
  return (
    <section className="py-16 px-6 bg-gray-50" id="steering-committee">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-mourid-green mb-2">
            Steering Committee Appointees
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            The Steering Committee provides strategic oversight, makes key policy decisions,
            and guides the Federation toward its mission and vision.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border text-sm md:text-base">
            <thead className="bg-mourid-green text-white">
              <tr>
                <th className="py-3 px-4 text-left">Dahira</th>
                <th className="py-3 px-4 text-left">Diewrign</th>
                <th className="py-3 px-4 text-left">2nd Member</th>
              </tr>
            </thead>
            <tbody>
              {committeeMembers.map((member, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }
                >
                  <td className="py-2 px-4 font-semibold">{member.dahira}</td>
                  <td className="py-2 px-4">{member.diewrign}</td>
                  <td className="py-2 px-4">{member.secondMember}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
