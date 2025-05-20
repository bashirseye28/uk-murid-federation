"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Mail, User, Smartphone, ArrowLeft } from "lucide-react";

export interface DonorInfo {
  name?: string;
  email: string;
  phone?: string;
  isAnonymous: boolean;
}

interface DonationFormProps {
  amount?: number;
  onSubmit: (info: DonorInfo) => void;
  onBack: () => void;
}

const baseInput =
  "w-full rounded-lg border border-gray-300 px-10 py-3 text-sm shadow-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green";

export default function DonationForm({ amount, onSubmit, onBack }: DonationFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<DonorInfo>({ mode: "onChange", defaultValues: { isAnonymous: false } });

  const anonymous = watch("isAnonymous");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100"
      noValidate
    >
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-mourid-green">Donor Details</h3>
        {amount !== undefined && (
          <p className="mt-1 text-sm text-slate-600">
            You are donating <span className="font-medium">£{amount.toLocaleString()}</span>
          </p>
        )}
      </div>

      {/* Anonymous toggle */}
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          {...register("isAnonymous")}
          className="h-4 w-4 rounded border-gray-300 text-mourid-green focus:ring-mourid-green"
        />
        Donate anonymously
      </label>

      {/* Name */}
      {!anonymous && (
        <div>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-mourid-blue" />
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your full name"
              className={`${baseInput} ${errors.name ? "border-red-500" : ""}`}
              aria-label="Full name"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-600">Name is required.</p>}
        </div>
      )}

      {/* Email */}
      <div>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-mourid-blue" />
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." },
            })}
            type="email"
            placeholder="Enter your email address"
            className={`${baseInput} ${errors.email ? "border-red-500" : ""}`}
            aria-label="Email address"
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      {!anonymous && (
        <div>
          <div className="relative">
            <Smartphone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-mourid-blue" />
            <input
              {...register("phone")}
              type="tel"
              placeholder="Enter your mobile number (optional)"
              className={baseInput}
              aria-label="Phone number"
            />
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-lg bg-mourid-green py-3 text-sm font-semibold text-white transition hover:bg-mourid-blue disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to Payment
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-mourid-green py-3 text-sm font-semibold text-mourid-green transition hover:bg-mourid-green hover:text-white"
        >
          <ArrowLeft size={16} /> Back to causes
        </button>
      </div>
    </form>
  );
}