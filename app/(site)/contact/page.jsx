'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import GlassCard from '@/components/GlassCard'

const contactInfo = [
  { icon: '📍', label: 'Address', value: 'Wattegama, Kandy, Sri Lanka' },
  { icon: '📞', label: 'Phone',   value: '+94 77 697 0864' },
  { icon: '✉️', label: 'Email',   value: 'info@eurolanka.lk' },
  { icon: '🕒', label: 'Hours',   value: 'Mon–Sat: 8:30 AM – 6:00 PM' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const inputClass = (field) =>
    `w-full glass rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm border outline-none focus:border-sky-500/60 transition-all duration-200 ${
      errors[field] ? 'border-red-500/60 focus:border-red-400' : 'border-white/10'
    }`

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h1 className="section-heading gradient-text">Get in Touch</h1>
          <p className="section-sub">Interested in bulk pricing, custom orders, or product enquiries? We'd love to hear from you.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal direction="right">
              <GlassCard className="p-8">
                <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {contactInfo.map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <span className="text-2xl mt-0.5">{icon}</span>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">{label}</p>
                        <p className="text-slate-200 text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🇨🇳</span>
                  <h3 className="text-white font-bold">Direct China Imports</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We source directly from verified factories in Guangzhou, Foshan, and Shenzhen — ensuring quality and competitive pricing for every order.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Quality Assured', 'Factory Direct', 'ISO Certified', 'Monthly Shipments'].map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/25">{tag}</span>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <GlassCard className="overflow-hidden">
                <div className="relative h-48">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31677.85!2d80.6715!3d7.3497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3660e7e3f1b5f%3A0x7a5c5c5c5c5c5c5c!2sWattegama%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1680000000000"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Wattegama, Kandy, Sri Lanka"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-white text-sm font-semibold">Wattegama, Kandy, Sri Lanka</p>
                      <p className="text-slate-400 text-xs">Mon–Sat · 8:30 AM – 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3">
            <ScrollReveal direction="left">
              <GlassCard className="p-8">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => { setForm({ name: '', email: '', phone: '', message: '' }); setSubmitted(false) }}
                      className="mt-6 px-6 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white hover:border-sky-500/40 transition-all text-sm">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">Full Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Silva" className={inputClass('name')} />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">Email *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass('email')} />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="mb-5">
                      <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+94 XX XXX XXXX" className={inputClass('phone')} />
                    </div>
                    <div className="mb-7">
                      <label className="block text-xs text-slate-400 uppercase tracking-widest mb-2">Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                        placeholder="Tell us what you're looking for — product type, quantity, etc."
                        className={`${inputClass('message')} resize-none`} />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" className="glow-btn w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 text-base">
                      Send Message →
                    </button>
                  </form>
                )}
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
