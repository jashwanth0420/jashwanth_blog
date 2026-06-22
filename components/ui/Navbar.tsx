'use client';

import { useEffect, useState } from 'react';
import PillNav from './PillNav';

const NAV_ITEMS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Contact',    href: '#contact'    },
];

export default function Navbar() {
  const [activeHref, setActiveHref] = useState('#hero');

  useEffect(() => {
    const getActive = () => {
      // Use the vertical midpoint of the viewport as the probe
      const probe = window.scrollY + window.innerHeight / 2;

      // Walk sections in reverse so the last one whose top is above the
      // probe wins (handles tall sections correctly)
      let active = NAV_ITEMS[0].href;
      for (const { href } of NAV_ITEMS) {
        const el = document.getElementById(href.slice(1));
        if (el && el.offsetTop <= probe) {
          active = href;
        }
      }
      setActiveHref(active);
    };

    // Run once on mount, then on every scroll
    getActive();
    window.addEventListener('scroll', getActive, { passive: true });
    return () => window.removeEventListener('scroll', getActive);
  }, []);

  return (
    <PillNav
      logoText="J"
      items={NAV_ITEMS}
      activeHref={activeHref}
      baseColor="rgba(13, 17, 35, 0.92)"
      pillColor="rgba(30, 41, 59, 0.9)"
      pillTextColor="#94a3b8"
      hoveredPillTextColor="#ffffff"
      ease="power3.out"
      initialLoadAnimation
    />
  );
}
