import { SIMPLE_ICON } from "./icons";

export interface Contact {
  name: string;
  icon: string;
  href: string;
}

const EMAIL_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/></svg>'
  );

export const CONTACTS: Contact[] = [
  { name: "Email", icon: EMAIL_ICON, href: "mailto:agustinlc88@gmail.com" },
  {
    name: "LinkedIn",
    icon: SIMPLE_ICON("linkedin"),
    href: "https://www.linkedin.com/in/agustin-linares-carrera/",
  },
  { name: "GitHub", icon: SIMPLE_ICON("github"), href: "https://github.com/agustinlinares" },
  {
    name: "Discord",
    icon: SIMPLE_ICON("discord"),
    href: "https://discord.com/users/1292505492882587708",
  },
  { name: "X", icon: SIMPLE_ICON("x"), href: "https://x.com/alinarescarrera" },
  {
    name: "Instagram",
    icon: SIMPLE_ICON("instagram"),
    href: "https://instagram.com/alinarescarrera",
  },
  { name: "Telegram", icon: SIMPLE_ICON("telegram"), href: "https://t.me/alinarescarrera" },
  { name: "WhatsApp", icon: SIMPLE_ICON("whatsapp"), href: "https://wa.me/34603548182" },
];
