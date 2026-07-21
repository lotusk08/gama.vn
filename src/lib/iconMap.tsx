import React from 'react';
import {
  ShieldCheck, Paintbrush, Palette, Globe, Leaf, Recycle, Flame, Award, Compass,
  Cpu, FlaskConical, Sun, Shield, Sparkles, Users, Handshake, MapPin, Mail, Phone,
  CheckCircle2, Star, BookOpen, MessageSquare, Target, Layers, Eye, HardHat,
  Droplets, Truck, ClipboardCheck, RefreshCw, Search, FileText, ArrowUpRight,
  HelpCircle, ChevronRight, ShieldAlert,
} from 'lucide-react';

/** Shared icon registry for Payload-driven blocks (FeatureGrid, StatHighlights, CoreValues, …). */
export const ICON_REGISTRY: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Paintbrush, Palette, Globe, Leaf, Recycle, Flame, Award, Compass,
  Cpu, FlaskConical, Sun, Shield, Sparkles, Users, Handshake, MapPin, Mail, Phone,
  CheckCircle2, Star, BookOpen, MessageSquare, Target, Layers, Eye, HardHat,
  Droplets, Truck, ClipboardCheck, RefreshCw, Search, FileText, ArrowUpRight,
  HelpCircle, ChevronRight, ShieldAlert,
};

export const ICON_OPTIONS = Object.keys(ICON_REGISTRY);

export function renderIcon(name: string | undefined | null, className = 'w-6 h-6') {
  const Icon = (name && ICON_REGISTRY[name]) || ShieldCheck;
  return <Icon className={className} />;
}
