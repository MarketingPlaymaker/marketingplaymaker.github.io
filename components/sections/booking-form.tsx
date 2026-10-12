"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, ChevronDown, LoaderCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { EMAILJS, SERVICE_OPTIONS, validateBooking, type BookingErrors, type BookingRequest } from "@/lib/booking";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const ease = [0.16, 1, 0.3, 1] as const;

const field =
  "w-full border bg-ink-950 px-5 py-4 text-base text-fg outline-none placeholder:text-white/45 focus:border-brand";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.14em] text-fg-muted">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-[#ff8a7a]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<BookingErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as unknown as BookingRequest;
    const found = validateBooking(data);
    setErrors(found);
    if (Object.keys(found).length) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      // Same EmailJS service and template as the previous site; the field names match the template.
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          user_name: data.name.trim(),
          user_email: data.email.trim(),
          organization: data.organization?.trim() ?? "",
          service: data.service,
          preferred_date: data.date ?? "",
          message: data.context?.trim() ?? "",
        },
        { publicKey: EMAILJS.publicKey },
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const describedBy = (key: keyof BookingRequest) => (errors[key] ? `${key}-error` : undefined);
  const border = (key: keyof BookingRequest) => (errors[key] ? "border-[#ff8a7a]" : "border-line");

  return (
    <div className="border border-line bg-ink-900 p-6 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex min-h-[28rem] flex-col items-start justify-center gap-5"
          >
            <span className="grid size-14 place-items-center bg-brand text-ink-950">
              <Check size={28} strokeWidth={3} aria-hidden />
            </span>
            <h3 className="font-display text-4xl uppercase leading-none text-fg">Request received.</h3>
            <p className="max-w-sm text-base leading-relaxed text-fg-muted">
              We'll confirm your call by email within 12 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Name" required error={errors.name}>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  className={cn(field, border("name"))}
                />
              </Field>
              <Field id="email" label="Email" required error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  className={cn(field, border("email"))}
                />
              </Field>
            </div>

            <Field id="organization" label="Organization">
              <input
                id="organization"
                name="organization"
                autoComplete="organization"
                placeholder="Your gym, arena or project"
                className={cn(field, "border-line")}
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="service" label="Service of interest" required error={errors.service}>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    defaultValue=""
                    aria-invalid={!!errors.service}
                    aria-describedby={describedBy("service")}
                    className={cn(field, border("service"), "appearance-none pr-12")}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={20}
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted"
                  />
                </div>
              </Field>
              <Field id="date" label="Preferred date">
                <input id="date" name="date" type="date" className={cn(field, "border-line")} />
              </Field>
            </div>

            <Field id="context" label="About your project" error={errors.context}>
              <textarea
                id="context"
                name="context"
                rows={4}
                placeholder="Tell us briefly what you want to achieve"
                aria-invalid={!!errors.context}
                aria-describedby={describedBy("context")}
                className={cn(field, border("context"), "resize-none")}
              />
            </Field>

            <AnimatePresence initial={false}>
              {status === "error" && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border border-[#ff8a7a]/40 bg-[#ff8a7a]/10 px-5 py-4 text-sm text-[#ffb3a8]"
                >
                  We couldn't send your request. Please try again in a moment.
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === "submitting"}
              initial="rest"
              animate="rest"
              whileHover={status === "submitting" ? undefined : "hover"}
              whileTap={status === "submitting" ? undefined : "tap"}
              variants={{
                rest: { y: 0, scale: 1, backgroundColor: "#c8f135" },
                hover: { y: -2, scale: 1, backgroundColor: "#d8ff40" },
                tap: { y: 0, scale: 0.98, backgroundColor: "#d8ff40" },
              }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-5 text-sm font-bold uppercase tracking-[0.14em] text-ink-950 disabled:cursor-wait sm:text-base"
            >
              {status === "submitting" ? (
                <>
                  <motion.span
                    className="inline-flex"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
                  >
                    <LoaderCircle size={18} aria-hidden />
                  </motion.span>
                  Sending
                </>
              ) : (
                <>
                  Request my call
                  <motion.span variants={{ rest: { x: 0 }, hover: { x: 4 }, tap: { x: 4 } }} className="inline-flex">
                    <ArrowRight size={18} aria-hidden />
                  </motion.span>
                </>
              )}
            </motion.button>
            <p className="text-center text-sm text-fg-muted">We'll confirm by email within 12 hours.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
