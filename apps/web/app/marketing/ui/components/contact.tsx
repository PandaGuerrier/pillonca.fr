'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

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

/* ── Mobile: section inline sous les photos ── */
export function MobileContact() {
  return (
    <div className="w-full max-w-sm mx-auto mt-8 px-1">
      <div className="border-t border-white/10 pt-6">
        <p className="text-xs tracking-widest uppercase text-white/30 mb-4">Contact - Laurent Pillonca</p>
        <ContactInfoList />
      </div>
    </div>
  )
}

/* ── Desktop: bouton flottant + modal ── */
export function DesktopContactFloat() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-white text-black shadow-xl shadow-black/40 hover:bg-white/90 transition-colors"
        aria-label="Nous contacter"
      >
        <Phone className="size-4" />
        <span className="text-sm font-semibold tracking-wide">Contactez-moi</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed bottom-24 right-8 z-50 w-72 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-5"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs tracking-widest uppercase text-white/30 mb-0.5">Contact</p>
                  <p className="text-base font-bold text-white">Laurent Pillonca</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center size-7 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <ContactInfoList />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
