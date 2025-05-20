import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Smartphone, MapPin, Users, ArrowLeft } from 'lucide-react';

export interface RegistrationInfo {
  name: string;
  email: string;
  phone: string;
  dahiraCity: string;
  childrenUnder16: number;
}

interface RegistrationFormProps {
  price: number;
  onSubmit: (info: RegistrationInfo) => void;
  onBack: () => void;
}

const baseInput =
  'w-full rounded-lg border border-gray-300 px-10 py-3 text-sm shadow-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ price, onSubmit, onBack }) => {
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
      className="mx-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100"
      noValidate
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-mourid-green">Registration Details</h3>
        <p className="mt-1 text-sm text-slate-600">
          Carte Barkeelu – <span className="font-medium">£{price.toLocaleString()}</span>
        </p>
      </div>

      {/* Name */}
      <div>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter your full name"
            aria-label="Full name"
            className={`${baseInput} ${errors.name ? 'border-red-500' : ''}`}
            {...register('name', { required: 'Name is required.' })}
          />
        </div>
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            className={`${baseInput} ${errors.email ? 'border-red-500' : ''}`}
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email.',
              },
            })}
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <div className="relative">
          <Smartphone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="tel"
            placeholder="Enter your mobile number"
            aria-label="Phone number"
            className={`${baseInput} ${errors.phone ? 'border-red-500' : ''}`}
            {...register('phone', { required: 'Phone number is required.' })}
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>

      {/* Dahira / City */}
      <div>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Which Dahira or city are you coming from?"
            aria-label="Dahira or City"
            className={`${baseInput} ${errors.dahiraCity ? 'border-red-500' : ''}`}
            {...register('dahiraCity', { required: 'This field is required.' })}
          />
        </div>
        {errors.dahiraCity && (
          <p className="mt-1 text-xs text-red-600">{errors.dahiraCity.message}</p>
        )}
      </div>

      {/* Children under 16 */}
      <div>
        <div className="relative">
          <Users className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <input
            id="childrenUnder16"
            type="number"
            min={0}
            placeholder="How many children under 16 will be with you?"
            aria-label="Children under 16 attending"
            className={`${baseInput} ${errors.childrenUnder16 ? 'border-red-500' : ''}`}
            {...register('childrenUnder16', {
              required: 'Please indicate number of children.',
              min: { value: 0, message: 'Value cannot be negative.' },
            })}
          />
        </div>
        {errors.childrenUnder16 && (
          <p className="mt-1 text-xs text-red-600">{errors.childrenUnder16.message}</p>
        )}
      </div>

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
};

export default RegistrationForm;
