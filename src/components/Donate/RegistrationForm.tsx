'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Smartphone, MapPin, Users, ArrowLeft } from 'lucide-react';
import { sendRegistrationEmail } from '@/lib/sendRegistrationEmail';

export interface RegistrationInfo {
  name: string;
  email: string;
  phone: string;
  dahiraCity: string;
  childrenUnder16: number;
}

interface RegistrationFormProps {
  price: number;
  onBack: () => void;
  onSubmit: (info: RegistrationInfo) => void;
}

const baseInput =
  'w-full rounded-lg border border-gray-300 px-10 py-3 text-sm shadow-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ price, onBack, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationInfo>({
    mode: 'onChange',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100"
    >
      {/* HEADER */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-mourid-green">Registration Details</h3>
        <p className="mt-1 text-sm text-slate-600">
          Carte Barkeelu – <span className="font-medium">£{price.toLocaleString()}</span>
        </p>
      </div>

      {/* Full Name */}
      <div>
        <div className="relative">
          <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Enter your full name"
            aria-label="Full name"
            {...register('name', { required: 'Name is required.' })}
            className={`${baseInput} ${errors.name ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email.',
              },
            })}
            className={`${baseInput} ${errors.email ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <div className="relative">
          <Smartphone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="tel"
            placeholder="Enter your mobile number"
            aria-label="Phone number"
            {...register('phone', { required: 'Phone number is required.' })}
            className={`${baseInput} ${errors.phone ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>

      {/* Dahira or City */}
      <div>
        <div className="relative">
          <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Which Dahira or city are you coming from?"
            aria-label="Dahira or City"
            {...register('dahiraCity', { required: 'This field is required.' })}
            className={`${baseInput} ${errors.dahiraCity ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.dahiraCity && (
          <p className="mt-1 text-xs text-red-600">{errors.dahiraCity.message}</p>
        )}
      </div>

      {/* Children under 16 */}
      <div>
        <div className="relative">
          <Users className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="number"
            min={0}
            placeholder="How many children under 16 will be with you?"
            aria-label="Children under 16 attending"
            {...register('childrenUnder16', {
              required: 'Please indicate number of children.',
              min: { value: 0, message: 'Value cannot be negative.' },
            })}
            className={`${baseInput} ${errors.childrenUnder16 ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.childrenUnder16 && (
          <p className="mt-1 text-xs text-red-600">{errors.childrenUnder16.message}</p>
        )}
      </div>

      {/* Submit & Back */}
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
};

export default RegistrationForm;