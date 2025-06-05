
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { contactFormSchema, sanitizeInput, sanitizeEmail, sanitizePhone, type ContactFormData } from '@/lib/validation';
import { useLanguage } from '@/contexts/LanguageContext';

const CONTACT_EMAIL = 'matthias.herbert@obviousworks.ch';

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  quizResults?: string;
}

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    role: '',
    message: '',
    quizResults: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isValid = Object.values(formErrors).every(error => error === '') &&
                    formData.name.trim() !== '' &&
                    formData.email.trim() !== '' &&
                    formData.message.trim() !== '';

  const roles = [
    { value: 'ceo', label: t('role.ceo') },
    { value: 'manager', label: t('role.manager') },
    { value: 'entrepreneur', label: t('role.entrepreneur') },
    { value: 'freelancer', label: t('role.freelancer') },
    { value: 'employee', label: t('role.employee') },
    { value: 'other', label: t('role.other') }
  ];

  const validateField = (fieldName: string, value: string) => {
    let error = '';
    switch (fieldName) {
      case 'name':
        if (value.trim() === '') {
          error = t('form.error.name.required');
        }
        break;
      case 'email':
        if (value.trim() === '') {
          error = t('form.error.email.required');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          error = t('form.error.email.invalid');
        }
        break;
      case 'message':
        if (value.trim() === '') {
          error = t('form.error.message.required');
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Validate the field and update formErrors
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateField(name, value)
    }));
  };

  const sendContactForm = async (formData: FormData) => {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: CONTACT_EMAIL,
        subject: `Contact Form Message: KI Revolution - ${formData.name}`,
        body: `
Neue Kontaktanfrage von der KI-Revolution Website:

Name: ${formData.name}
E-Mail: ${formData.email}
Telefon: ${formData.phone}
Rolle: ${formData.role}

Nachricht:
${formData.message}

Gesendet am: ${new Date().toLocaleString('de-DE')}
        `,
        fromName: formData.name,
        token: 'legitimate-form-2024'
      }
    });
    
    return { data, error };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);

    setFormErrors({
      name: nameError,
      email: emailError,
      phone: '',
      message: messageError
    });

    // If there are any errors, stop submission
    if (nameError || emailError || messageError) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await sendContactForm(formData);
      if (!error) {
        toast.success(t('form.success'));
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          message: '',
          quizResults: ''
        });
        setFormErrors({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        console.error('Email sending error:', error);
        toast.error(t('form.error.submit'));
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(t('form.error.submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-2 border-cyan-400 rounded-2xl p-4 sm:p-6 lg:p-8 bg-black bg-opacity-70">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-3 sm:mb-4 animate-pulse leading-tight">
          {t('form.title')}
        </h3>
        <p className="text-cyan-400 text-base sm:text-lg leading-relaxed">
          {t('form.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-yellow-400 font-bold text-sm">
            {t('form.name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t('form.name.placeholder')}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all text-sm sm:text-base ${
              formErrors.name ? 'border-red-500' : 'border-gray-600 hover:border-cyan-400'
            }`}
            required
            disabled={isSubmitting}
          />
          {formErrors.name && (
            <p className="text-red-400 text-sm animate-pulse">{formErrors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-yellow-400 font-bold text-sm">
            {t('form.email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('form.email.placeholder')}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all text-sm sm:text-base ${
              formErrors.email ? 'border-red-500' : 'border-gray-600 hover:border-cyan-400'
            }`}
            required
            disabled={isSubmitting}
          />
          {formErrors.email && (
            <p className="text-red-400 text-sm animate-pulse">{formErrors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-yellow-400 font-bold text-sm">
            {t('form.phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={t('form.phone.placeholder')}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all text-sm sm:text-base ${
              formErrors.phone ? 'border-red-500' : 'border-gray-600 hover:border-cyan-400'
            }`}
            disabled={isSubmitting}
          />
          {formErrors.phone && (
            <p className="text-red-400 text-sm animate-pulse">{formErrors.phone}</p>
          )}
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <label htmlFor="role" className="block text-yellow-400 font-bold text-sm">
            {t('form.role')}
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:border-cyan-400 transition-all text-sm sm:text-base"
            disabled={isSubmitting}
          >
            <option value="">{t('form.role.placeholder')}</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-yellow-400 font-bold text-sm">
            {t('form.message')} *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={t('form.message.placeholder')}
            rows={4}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none text-sm sm:text-base ${
              formErrors.message ? 'border-red-500' : 'border-gray-600 hover:border-cyan-400'
            }`}
            required
            disabled={isSubmitting}
          />
          {formErrors.message && (
            <p className="text-red-400 text-sm animate-pulse">{formErrors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full py-3 sm:py-4 text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 text-black hover:from-cyan-400 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed animate-pulse"
        >
          {isSubmitting ? t('form.submitting') : t('form.submit')}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
