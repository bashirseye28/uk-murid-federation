"use client";

import { useState } from "react";

type DonationFormProps = {
  onSubmit: (donorInfo: {
    name: string;
    email: string;
    phone?: string;
    isAnonymous: boolean;
  }) => void;
};

export default function DonationForm({ onSubmit }: DonationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isAnonymous: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.isAnonymous) {
      if (!formData.name.trim()) newErrors.name = "Name is required.";
      if (!formData.email.trim()) newErrors.email = "Email is required.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
      <h3 className="text-lg font-semibold text-mourid-green mb-4 text-center">
        Donor Information
      </h3>

      {/* Anonymous Checkbox */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="isAnonymous"
          name="isAnonymous"
          checked={formData.isAnonymous}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label htmlFor="isAnonymous" className="text-sm text-slate-700">
          Donate anonymously
        </label>
      </div>

      {/* Name */}
      {!formData.isAnonymous && (
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
      )}

      {/* Email */}
      {!formData.isAnonymous && (
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      )}

      {/* Phone (optional) */}
      {!formData.isAnonymous && (
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-mourid-green text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-mourid-blue transition"
      >
        Continue to Payment
      </button>
    </form>
  );
}