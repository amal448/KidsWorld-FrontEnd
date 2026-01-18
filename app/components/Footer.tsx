'use client';
import React from 'react';
import { openingHours, socials } from '../constants';

const Footer = () => {


  return (
    <footer id='contact' className="relative bg-slate-950 text-white py-24 overflow-hidden">
      {/* Decorative Elements */}
      <div id='f-star-1' className="absolute top-10 right-10 text-6xl opacity-50 select-none">🎈</div>
      <div id='f-star-2' className="absolute bottom-10 left-10 text-6xl opacity-50 select-none">🌟</div>

      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Where to Find Us
        </h2>

        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest">Visit Our Store</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              123 Toy Lane, <br />
              Fun City, Playland, 90210
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest">Contact Us</h3>
            <p className="text-slate-400 text-lg mb-2">(555) 123-4567</p>
            <p className="text-slate-400 text-lg">hello@kidsworld.com</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest">Open Every Day</h3>
            <div className="text-slate-400 text-lg space-y-2">
              {
                openingHours.map((item) => (
                  <p key={item.day}>
                    <span className="block font-medium text-white">{item.day}</span>
                    <span>{item.time}</span>
                  </p>
                ))
              }
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest">Socials</h3>
            <div className='flex gap-6 justify-center md:justify-start'>
              {socials.map((social) => (
                <a
                  href={social.url}
                  key={social.name}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 text-2xl"
                  aria-label={social.label}
                >
                  {/* Placeholder Icons using Emoji or text since we don't have SVGs yet */}
                  {social.name === 'Instagram' && '📸'}
                  {social.name === 'Facebook' && '📘'}
                  {social.name === 'Twitter' && '🐦'}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 text-slate-500 text-sm">
          &copy; 2026 KidsWorld. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;