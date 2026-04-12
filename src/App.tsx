/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  IceCream, 
  Heart, 
  ChevronRight,
  ChevronLeft,
  Menu as MenuIcon,
  X,
  ArrowRight
} from 'lucide-react';
import { getCafeDetails } from './services/geminiService';
import { CafeDetails, FALLBACK_CAFE_DETAILS } from './types';
import { cn } from './lib/utils';

import menu1 from './assets/menu/1.png';
import menu2 from './assets/menu/2.png';
import menu3 from './assets/menu/3.png';
import menu4 from './assets/menu/4.png';

export default function App() {
  const [details, setDetails] = useState<CafeDetails>(FALLBACK_CAFE_DETAILS);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(null);

  const menuImages = [menu1, menu2, menu3, menu4];

  const handleNextMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedMenuIndex !== null) {
      setSelectedMenuIndex((selectedMenuIndex + 1) % menuImages.length);
    }
  };

  const handlePrevMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedMenuIndex !== null) {
      setSelectedMenuIndex((selectedMenuIndex - 1 + menuImages.length) % menuImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMenuIndex === null) return;
      if (e.key === 'Escape') setSelectedMenuIndex(null);
      if (e.key === 'ArrowRight') handleNextMenu();
      if (e.key === 'ArrowLeft') handlePrevMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMenuIndex]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCafeDetails();
        if (data && Object.keys(data).length > 0) {
          setDetails(prev => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to fetch cafe details, using fallback.", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-sm font-medium hover:text-brand-mustard transition-colors duration-200"
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-espresso/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-brand-lime rounded-full flex items-center justify-center text-brand-espresso">
              <Coffee size={20} />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">Sunshine Haven</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-10">
            <NavLink href="#story">Our Story</NavLink>
            <NavLink href="#vdl">VDL Ice Cream</NavLink>
            <NavLink href="#menu">Menu</NavLink>
            <NavLink href="#visit">Visit</NavLink>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/sunshinehaven.au/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-brand-mustard/20 hover:text-brand-mustard rounded-full transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/sunshinehaven.au/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-brand-mustard/20 hover:text-brand-mustard rounded-full transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-cream pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-serif">
              <NavLink href="#story">Our Story</NavLink>
              <NavLink href="#vdl">VDL Ice Cream</NavLink>
              <NavLink href="#menu">Menu</NavLink>
              <NavLink href="#visit">Visit</NavLink>
              <div className="flex gap-6 pt-4">
                <a href="https://www.instagram.com/sunshinehaven.au/" className="p-3 bg-brand-lime/20 rounded-full text-brand-lime hover:bg-brand-mustard/20 hover:text-brand-mustard transition-colors"><Instagram /></a>
                <a href="https://www.facebook.com/sunshinehaven.au/" className="p-3 bg-brand-lime/20 rounded-full text-brand-lime hover:bg-brand-mustard/20 hover:text-brand-mustard transition-colors"><Facebook /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1501339819358-ee5969a2f242?auto=format&fit=crop&q=80&w=2000" 
              alt="Cafe Ambience" 
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/0 via-brand-cream/50 to-brand-cream" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-espresso rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
                Sydney's Sun-Drenched Sanctuary
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight text-brand-espresso">
                Your Daily Dose of <br />
                <span className="italic text-brand-lime text-shadow-sm hover:text-brand-mustard transition-colors duration-500 cursor-default">Sunshine & Coffee</span>
              </h1>
              <p className="text-xl text-brand-espresso/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                A warm, inviting space in the heart of Sydney, dedicated to exceptional brews and artisanal moments.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <div className="w-6 h-10 border-2 border-brand-espresso/20 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-brand-espresso/40 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* The Story Section */}
        <section id="story" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" 
                  alt="Owner's Passion" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-lime/10 rounded-3xl -z-10 hidden lg:block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-brand-lime mb-4">
                <Heart size={20} fill="currentColor" />
                <span className="font-semibold uppercase tracking-widest text-sm">Our Passion</span>
              </div>
              <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">
                A Haven Built on <br />
                <span className="italic">Love and Community</span>
              </h2>
              <p className="text-lg text-brand-espresso/70 leading-relaxed mb-8">
                We are deeply committed to creating a vibrant and welcoming community hub in Dural, driven by a passion for high-quality coffee and establishing a 'home away from home' for every guest. Our focus is on building a cheerful sanctuary for locals to gather and enjoy premium coffee, treats and savory items.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-serif font-bold text-2xl mb-2 italic">Ambience</h4>
                  <p className="text-sm text-brand-espresso/60">{details.ambience}</p>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-2xl mb-2 italic">Vibe</h4>
                  <p className="text-sm text-brand-espresso/60">Warm, inviting, and perfectly sun-lit for your morning ritual.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* VDL Ice Cream Section - The Exclusivity */}
        <section id="vdl" className="py-32 px-6 bg-brand-mustard text-brand-espresso">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">
                  Where Every Scoop <br />
                  <span className="italic text-brand-espresso hover:text-brand-mustard transition-colors duration-500 cursor-default">Tastes Like Sunshine</span>
                </h2>
                <p className="text-xl text-brand-espresso/70 leading-relaxed">
                  {details.vdlIceCream?.exclusivity} We are the proud, exclusive partners of <span className="font-bold text-brand-espresso">Van Diemens Land Creamery</span> in Sydney, bringing you the best ice cream, sorbets, and gelatos from the fresh and breathtaking lands of Tasmania.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {FALLBACK_CAFE_DETAILS.vdlIceCream.flavors.map((flavor, index) => (
                <motion.div
                  key={flavor}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="w-16 h-16 bg-brand-espresso rounded-2xl flex items-center justify-center text-brand-lime mb-6 group-hover:scale-110 group-hover:bg-brand-lime group-hover:text-brand-espresso transition-all duration-300">
                    <IceCream size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">{flavor}</h3>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-20 p-10 bg-brand-cream/40 text-brand-espresso rounded-[3rem] flex flex-col md:flex-row items-center gap-10 backdrop-blur-sm border border-brand-espresso/10"
            >
              <div className="flex-1">
                <h3 className="text-3xl font-serif font-bold mb-4 italic">Why Van Diemen's Land Creamery?</h3>
                <p className="text-brand-espresso/70 leading-relaxed">
                  {details.vdlIceCream?.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&q=80&w=400" 
                  alt="Ice Cream Scoop" 
                  className="w-48 h-48 object-cover rounded-full border-8 border-brand-espresso/10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Menu Highlights */}
        <section id="menu" className="py-32 px-6 bg-brand-cream/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div>
                <h2 className="text-5xl font-serif font-bold mb-4">The Menu</h2>
                <p className="text-brand-espresso/60">Our official menu cards, exactly as served in-store.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {menuImages.map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[2rem] overflow-hidden shadow-xl border border-brand-espresso/5 bg-white cursor-zoom-in group relative"
                  onClick={() => setSelectedMenuIndex(index)}
                >
                  <img 
                    src={src} 
                    alt={`Menu Card ${index + 1}`} 
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-espresso/0 group-hover:bg-brand-espresso/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 p-4 rounded-full text-brand-espresso shadow-lg">
                      <ArrowRight size={24} className="-rotate-45" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Lightbox */}
        <AnimatePresence>
          {selectedMenuIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-brand-espresso/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
              onClick={() => setSelectedMenuIndex(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
                onClick={() => setSelectedMenuIndex(null)}
              >
                <X size={32} />
              </motion.button>

              <button
                className="absolute left-4 md:left-10 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
                onClick={handlePrevMenu}
              >
                <ChevronLeft size={40} />
              </button>

              <motion.div
                key={selectedMenuIndex}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                className="relative max-w-5xl w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={menuImages[selectedMenuIndex]}
                  alt={`Menu Card ${selectedMenuIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/60 font-medium">
                  {selectedMenuIndex + 1} / {menuImages.length}
                </div>
              </motion.div>

              <button
                className="absolute right-4 md:right-10 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
                onClick={handleNextMenu}
              >
                <ChevronRight size={40} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visit Us Section */}
        <section id="visit" className="py-32 px-6 bg-brand-mustard text-brand-espresso">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-brand-cream/40 p-12 rounded-[3rem] backdrop-blur-sm border border-brand-espresso/10"
            >
              <h2 className="text-5xl font-serif font-bold mb-10">Visit Our Haven</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-espresso rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-lime hover:bg-brand-lime hover:text-brand-espresso transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2 italic">Location</h4>
                    <p className="text-brand-espresso/70 leading-relaxed">{details.location?.address}</p>
                    <a 
                      href="https://www.google.com/maps/search/Sunshine+Haven/@-33.7445553,151.0166714,12z" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand-espresso font-bold mt-4 hover:text-brand-mustard transition-colors"
                    >
                      Open in Google Maps <ChevronRight size={16} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-espresso rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-lime hover:bg-brand-lime hover:text-brand-espresso transition-colors">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2 italic">Hours</h4>
                    <p className="text-brand-espresso/70 leading-relaxed">{details.location?.hours}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-espresso rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-lime hover:bg-brand-lime hover:text-brand-espresso transition-colors">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2 italic text-brand-espresso">Connect</h4>
                    <div className="flex gap-4 mt-2">
                      <a href="https://www.instagram.com/sunshinehaven.au/" className="text-brand-espresso/70 hover:text-brand-mustard transition-colors flex items-center gap-2 font-medium"><Instagram size={18} /> Instagram</a>
                      <a href="https://www.facebook.com/sunshinehaven.au/" className="text-brand-espresso/70 hover:text-brand-mustard transition-colors flex items-center gap-2 font-medium"><Facebook size={18} /> Facebook</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" 
                  alt="Cafe Interior" 
                  className="w-full h-64 object-cover rounded-3xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600" 
                  alt="Artisanal Coffee" 
                  className="w-full h-80 object-cover rounded-3xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6 pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=600" 
                  alt="Ice Cream Scoops" 
                  className="w-full h-80 object-cover rounded-3xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600" 
                  alt="Milkshake" 
                  className="w-full h-64 object-cover rounded-3xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-espresso/5 bg-brand-cream">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-lime rounded-full flex items-center justify-center text-brand-espresso hover:bg-brand-mustard transition-colors">
              <Coffee size={16} />
            </div>
            <span className="text-lg font-serif font-bold tracking-tight">Sunshine Haven</span>
          </div>
          
          <p className="text-sm text-brand-espresso/40">
            © {new Date().getFullYear()} Sunshine Haven Cafe. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="https://www.instagram.com/sunshinehaven.au/" className="text-brand-espresso/60 hover:text-brand-mustard transition-colors"><Instagram size={20} /></a>
            <a href="https://www.facebook.com/sunshinehaven.au/" className="text-brand-espresso/60 hover:text-brand-mustard transition-colors"><Facebook size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
