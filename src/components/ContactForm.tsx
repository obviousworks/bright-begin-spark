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
          error = 'Name is required';
        }
        break;
      case 'email':
        if (value.trim() === '') {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'message':
        if (value.trim() === '') {
          error = 'Message is required';
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

  const sendContactForm = async (data: FormData) => {
    try {
      const { error } = await supabase.from('contact_form_submissions').insert([
        {
          name: sanitizeInput(data.name),
          email: sanitizeEmail(data.email),
          phone: sanitizePhone(data.phone),
          role: data.role,
          message: sanitizeInput(data.message),
          quiz_results: data.quizResults || null,
        },
      ]);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to submit form');
      }

      // Send email via Supabase Edge Function
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: CONTACT_EMAIL,
          subject: 'New Contact Form Submission',
          message: `
          Name: ${data.name}
          Email: ${data.email}
          Phone: ${data.phone}
          Role: ${data.role}
          Message: ${data.message}
          `,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Email sending error:', errorData);
        throw new Error('Failed to send email');
      }

      return true;
    } catch (err) {
      console.error("Submission error:", err);
      return false;
    }
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
      const success = await sendContactForm(formData);
      if (success) {
        toast.success("KI-Revolution wurde gestartet! Checke deine E-Mails!");
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
        toast.error("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-2 border-cyan-400 rounded-2xl p-8 bg-black bg-opacity-70">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-yellow-400 mb-4 animate-pulse">
          {t('form.title')}
        </h3>
        <p className="text-cyan-400 text-lg">
          {t('form.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            className={`w-full px-4 py-3 bg-black border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
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
            className={`w-full px-4 py-3 bg-black border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
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
            className={`w-full px-4 py-3 bg-black border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
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
            className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:border-cyan-400 transition-all"
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
            rows={5}
            className={`w-full px-4 py-3 bg-black border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none ${
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
          className="w-full py-4 text-lg font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 text-black hover:from-cyan-400 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed animate-pulse"
        >
          {isSubmitting ? t('form.submitting') : t('form.submit')}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
