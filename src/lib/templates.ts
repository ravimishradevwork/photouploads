import {
  Crown,
  PartyPopper,
  Camera,
  Megaphone,
  Vote,
  Dumbbell,
  Sparkles,
  Palette,
} from "lucide-react";
import type { ComponentType } from "react";

export type Template = {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  prompt: string;
};

export const TEMPLATES: Template[] = [
  {
    id: "luxury-poster",
    name: "Luxury Poster",
    icon: Crown,
    color: "bg-gradient-gold",
    prompt:
      "Transform this photo into a luxury magazine cover. Cinematic lighting, gold accents, deep shadows, ultra-sharp detail, premium fashion editorial style.",
  },
  {
    id: "festival-promo",
    name: "Festival Promo",
    icon: PartyPopper,
    color: "bg-gradient-purple",
    prompt:
      "Turn this into a vibrant music festival poster. Neon lights, motion blur, confetti, bold saturated colors, energetic crowd atmosphere.",
  },
  {
    id: "influencer-style",
    name: "Influencer Style",
    icon: Camera,
    color: "bg-gradient-luxe",
    prompt:
      "Style as a high-end Instagram influencer photo. Soft warm lighting, shallow depth of field, aesthetic background, magazine-quality skin retouching.",
  },
  {
    id: "business-ad",
    name: "Business Ad",
    icon: Megaphone,
    color: "bg-gradient-gold",
    prompt:
      "Transform into a professional corporate advertisement. Clean modern background, sharp suit/business attire, confident pose, LinkedIn premium quality.",
  },
  {
    id: "political-banner",
    name: "Political Banner",
    icon: Vote,
    color: "bg-gradient-purple",
    prompt:
      "Create a powerful political campaign banner. Patriotic color tones, strong heroic lighting, confident leadership pose, high contrast.",
  },
  {
    id: "fitness-transform",
    name: "Fitness Transform",
    icon: Dumbbell,
    color: "bg-gradient-luxe",
    prompt:
      "Transform into a fitness magazine cover. Athletic gym lighting, defined musculature, dynamic action pose, energetic dramatic atmosphere.",
  },
  {
    id: "anime-style",
    name: "Anime Style",
    icon: Sparkles,
    color: "bg-gradient-purple",
    prompt:
      "Convert into Studio Ghibli inspired anime art style. Soft pastel colors, hand-drawn aesthetic, dreamy background, expressive features.",
  },
  {
    id: "oil-painting",
    name: "Oil Painting",
    icon: Palette,
    color: "bg-gradient-gold",
    prompt:
      "Transform into a Renaissance oil painting. Rich textures, dramatic chiaroscuro lighting, classical composition, museum gallery quality.",
  },
];
