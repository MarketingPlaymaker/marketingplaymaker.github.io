/**
 * EmailJS account that delivers booking requests by email (carried over from
 * the previous site). These are public, browser-side identifiers by design;
 * restrict allowed origins in the EmailJS dashboard.
 */
export const EMAILJS = {
  serviceId: "service_5m366v9",
  templateId: "template_27p9c6k",
  publicKey: "yL5w4mmVv94Ocl0Tc",
};

export const CONTACT_EMAIL = "marketingplaymaker1@gmail.com";

export const SERVICE_OPTIONS = [
  "Brand strategy",
  "Sports marketing",
  "Event activation",
  "Digital campaigns",
  "Community & belonging",
  "Content production",
] as const;

export type BookingRequest = {
  name: string;
  email: string;
  organization: string;
  service: string;
  date: string;
  context: string;
};

export type BookingErrors = Partial<Record<keyof BookingRequest, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Client-side validation for the booking form. */
export function validateBooking(data: Partial<BookingRequest>): BookingErrors {
  const errors: BookingErrors = {};
  if (!data.name?.trim()) errors.name = "Please enter your name.";
  if (!data.email?.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL.test(data.email.trim())) errors.email = "That email doesn't look right.";
  if (!data.service || !SERVICE_OPTIONS.includes(data.service as (typeof SERVICE_OPTIONS)[number]))
    errors.service = "Please choose a service.";
  if ((data.context?.length ?? 0) > 2000) errors.context = "Please keep it under 2,000 characters.";
  return errors;
}
