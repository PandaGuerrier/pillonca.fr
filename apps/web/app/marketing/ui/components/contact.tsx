'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, X, FileText, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from '@inertiajs/react'

const CONTACT = {
  phone: '06 75 37 45 22',
  email: 'lpillonca29@gmail.com',
  location: '17210 - Saint palais de Negrignac',
}

function ContactInfoList() {
  return (
    <ul className="flex flex-col gap-3">
      <li>
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
        >
          <span className="flex items-center justify-center size-9 rounded-full bg-white/10 border border-white/10">
            <Phone className="size-4" />
          </span>
          <span className="text-sm font-medium">{CONTACT.phone}</span>
        </a>
      </li>
      <li>
        <a
          href={`mailto:${CONTACT.email}`}
          className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
        >
          <span className="flex items-center justify-center size-9 rounded-full bg-white/10 border border-white/10">
            <Mail className="size-4" />
          </span>
          <span className="text-sm font-medium">{CONTACT.email}</span>
        </a>
      </li>
      <li className="flex items-center gap-3 text-white/50">
        <span className="flex items-center justify-center size-9 rounded-full bg-white/5 border border-white/10">
          <MapPin className="size-4" />
        </span>
        <span className="text-sm">{CONTACT.location}</span>
      </li>
    </ul>
  )
}

/* ── Mobile: section inline sous les photos + footer ── */
export function MobileContact() {
  return (
    <div className="w-full max-w-sm mx-auto mt-8 px-1">
      <div className="border-t border-white/10 pt-6">
        <p className="text-xs tracking-widest uppercase text-white/30 mb-4">Contact - Laurent Pillonca</p>
        <ContactInfoList />
      </div>

      {/* Footer mobile */}
      <footer className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-3">
        <nav className="flex items-center gap-3 text-xs text-white/20">
          <Link href="/mentions-legales" className="hover:text-white/50 transition-colors">
            Mentions légales
          </Link>
          <span>•</span>
          <Link href="/politique-de-confidentialite" className="hover:text-white/50 transition-colors">
            Confidentialité
          </Link>
        </nav>
        <p className="flex items-center gap-1.5 text-xs text-white/15">
          fais par jules
          <Heart className="size-3 fill-white/20 text-white/20" />
        </p>
      </footer>
    </div>
  )
}

/* ── Desktop: deux boutons flottants ── */
export function DesktopContactFloat() {
  const [contactOpen, setContactOpen] = useState(false)
  const [legalOpen, setLegalOpen] = useState(false)

  const closeAll = () => {
    setContactOpen(false)
    setLegalOpen(false)
  }

  return (
    <>
      {/* Boutons flottants */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2">
        {/* Legal — icon only */}
        <motion.button
          onClick={() => { setLegalOpen((v) => !v); setContactOpen(false) }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center size-11 rounded-full bg-white/10 border border-white/10 text-white/60 hover:bg-white/15 hover:text-white shadow-lg shadow-black/30 transition-colors backdrop-blur-sm"
          aria-label="Pages légales"
        >
          <FileText className="size-4" />
        </motion.button>

        {/* Contact */}
        <motion.button
          onClick={() => { setContactOpen((v) => !v); setLegalOpen(false) }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-white text-black shadow-xl shadow-black/40 hover:bg-white/90 transition-colors"
          aria-label="Nous contacter"
        >
          <Phone className="size-4" />
          <span className="text-sm font-semibold tracking-wide">Contactez-moi</span>
        </motion.button>
      </div>

      {/* Backdrop partagé */}
      <AnimatePresence>
        {(contactOpen || legalOpen) && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeAll}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Modal contact */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            key="contact-panel"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed bottom-24 right-8 z-50 w-72 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-5"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-xs tracking-widest uppercase text-white/30 mb-0.5">Contact</p>
                <p className="text-base font-bold text-white">Laurent Pillonca</p>
              </div>
              <button
                onClick={() => setContactOpen(false)}
                className="flex items-center justify-center size-7 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <ContactInfoList />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popover légal */}
      <AnimatePresence>
        {legalOpen && (
          <motion.div
            key="legal-panel"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed bottom-24 right-8 z-50 w-56 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-4"
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs tracking-widest uppercase text-white/30">Légal</p>
              <button
                onClick={() => setLegalOpen(false)}
                className="flex items-center justify-center size-5 rounded-full text-white/30 hover:text-white transition-colors"
              >
                <X className="size-3" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                href="/mentions-legales"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Politique de confidentialité
              </Link>
            </nav>

            <p className="flex items-center gap-1.5 text-xs text-white/20 mt-4 pt-3 border-t border-white/5">
              fais par jules
              <Heart className="size-3 fill-white/20 text-white/20" />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
