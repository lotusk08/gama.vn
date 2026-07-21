import React from 'react';
import type { PageBlock } from '../lib/payloadApi';
import Hero from './Hero';
import Stats from './Stats';
import Process from './Process';
import Testimonials from './Testimonials';
import ColorOfTheYear from './ColorOfTheYear';
import CoreValues from './blocks/CoreValues';
import CtaBanner from './blocks/CtaBanner';
import AboutBlockSection from './blocks/AboutBlockSection';
import RichTextSection from './blocks/RichTextSection';
import TabbedPanel from './blocks/TabbedPanel';
import Timeline from './blocks/Timeline';
import FeatureGrid from './blocks/FeatureGrid';
import StatHighlights from './blocks/StatHighlights';
import Quote from './blocks/Quote';
import Team from './blocks/Team';
import Certifications from './blocks/Certifications';
import ContactInfo from './blocks/ContactInfo';
import ContactSection from './ContactSection';

interface BlockRendererProps {
  layout?: PageBlock[] | null;
  /** Optional overrides for the first `hero` block's CTA behavior (used on the home route). */
  heroHandlers?: { onExploreServices?: () => void; onExploreWork?: () => void };
}

/** Renders a Payload `pages.layout` blocks array — the single place block-type → component mapping lives. */
export default function BlockRenderer({ layout, heroHandlers }: BlockRendererProps) {
  if (!layout || layout.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {layout.map((block, idx) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <Hero
                key={idx}
                data={block as any}
                onExploreServices={heroHandlers?.onExploreServices}
                onExploreWork={heroHandlers?.onExploreWork}
              />
            );
          case 'about':
            return <AboutBlockSection key={idx} data={block as any} />;
          case 'stats':
            return <Stats key={idx} data={block as any} />;
          case 'process':
            return <Process key={idx} />;
          case 'testimonials':
            return (
              <div key={idx} id="testimonials-section">
                <Testimonials data={block as any} />
              </div>
            );
          case 'color-year':
            return <ColorOfTheYear key={idx} data={block as any} />;
          case 'core-values':
            return <CoreValues key={idx} data={block as any} />;
          case 'cta-banner':
            return <CtaBanner key={idx} data={block as any} />;
          case 'rich-text':
            return <RichTextSection key={idx} data={block as any} />;
          case 'tabbed-panel':
            return <TabbedPanel key={idx} data={block as any} />;
          case 'timeline':
            return <Timeline key={idx} data={block as any} />;
          case 'feature-grid':
            return <FeatureGrid key={idx} data={block as any} />;
          case 'stat-highlights':
            return <StatHighlights key={idx} data={block as any} />;
          case 'quote':
            return <Quote key={idx} data={block as any} />;
          case 'team':
            return <Team key={idx} data={block as any} />;
          case 'certifications':
            return <Certifications key={idx} data={block as any} />;
          case 'contact-info':
            return <ContactInfo key={idx} data={block as any} />;
          case 'contact-form':
            return <ContactSection key={idx} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
