export interface OdsGoal {
  n: number;
  name: string;
  nameEn: string;
  color: string;
  icon: string; // raw inner-SVG markup, viewBox 0 0 24 24
}

// ODS: 17 objetivos, colores oficiales + iconos propios (no se reproducen los
// pictogramas oficiales de la ONU).
export const ODS_GOALS: OdsGoal[] = [
  { n: 1, name: "Fin de la pobreza", nameEn: "No poverty", color: "#E5243B", icon: '<circle cx="6" cy="7" r="2" fill="#fff"/><rect x="3.3" y="10" width="5.4" height="7" rx="2.5" fill="#fff"/><circle cx="12" cy="5.5" r="2.3" fill="#fff"/><rect x="8.8" y="9" width="6.4" height="8.5" rx="2.8" fill="#fff"/><circle cx="18" cy="7" r="2" fill="#fff"/><rect x="15.3" y="10" width="5.4" height="7" rx="2.5" fill="#fff"/>' },
  { n: 2, name: "Hambre cero", nameEn: "Zero hunger", color: "#DDA63A", icon: '<path d="M9 4c0 1.2-1 1.2-1 2.4S9 8 9 9.2" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M15 4c0 1.2-1 1.2-1 2.4S15 8 15 9.2" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M4 12h16a8 8 0 0 1-16 0Z" fill="#fff"/>' },
  { n: 3, name: "Salud y bienestar", nameEn: "Good health", color: "#4C9F38", icon: '<path d="M12 20s-7.5-4.9-9.8-9.1C.6 8 1.7 4.6 5 3.3c2.5-1 4.8 0 7 2.3 2.2-2.3 4.5-3.3 7-2.3 3.3 1.3 4.4 4.7 2.8 7.6C19.5 15.1 12 20 12 20Z" fill="#fff"/>' },
  { n: 4, name: "Educación de calidad", nameEn: "Quality education", color: "#C5192D", icon: '<path d="M12 5.5C10 4 7 3.5 4 4.2v13.6c3-.7 6-.2 8 1.2 2-1.4 5-1.9 8-1.2V4.2c-3-.7-6-.2-8 1.3Z" fill="#fff"/>' },
  { n: 5, name: "Igualdad de género", nameEn: "Gender equality", color: "#FF3A21", icon: '<circle cx="7.5" cy="8" r="4" fill="none" stroke="#fff" stroke-width="1.7"/><line x1="7.5" y1="12" x2="7.5" y2="19" stroke="#fff" stroke-width="1.7"/><line x1="4.7" y1="15.5" x2="10.3" y2="15.5" stroke="#fff" stroke-width="1.7"/><circle cx="16" cy="11" r="4" fill="none" stroke="#fff" stroke-width="1.7"/><line x1="18.8" y1="8.2" x2="22.5" y2="4.5" stroke="#fff" stroke-width="1.7"/><polyline points="18.5,4.5 22.5,4.5 22.5,8.5" fill="none" stroke="#fff" stroke-width="1.7"/>' },
  { n: 6, name: "Agua limpia y saneamiento", nameEn: "Clean water", color: "#26BDE2", icon: '<path d="M12 3c3 4.5 6 8.2 6 11.5A6 6 0 0 1 6 14.5C6 11.2 9 7.5 12 3Z" fill="#fff"/>' },
  { n: 7, name: "Energía asequible y no contaminante", nameEn: "Affordable energy", color: "#FCC30B", icon: '<circle cx="12" cy="12" r="4" fill="#fff"/><g stroke="#fff" stroke-width="1.6" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="7" y2="7"/><line x1="17" y1="17" x2="19" y2="19"/><line x1="5" y1="19" x2="7" y2="17"/><line x1="17" y1="7" x2="19" y2="5"/></g>' },
  { n: 8, name: "Trabajo decente y crecimiento económico", nameEn: "Decent work", color: "#A21942", icon: '<g fill="#fff"><rect x="3" y="14" width="3.2" height="6"/><rect x="9" y="10" width="3.2" height="10"/><rect x="15" y="6" width="3.2" height="14"/></g><polyline points="3,10 9,5 13,8 21,2" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' },
  { n: 9, name: "Industria, innovación e infraestructura", nameEn: "Industry & innovation", color: "#FD6925", icon: '<g fill="#fff"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></g>' },
  { n: 10, name: "Reducción de las desigualdades", nameEn: "Reduced inequalities", color: "#DD1367", icon: '<g stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="12,2 12,10"/><polyline points="8,6 12,2 16,6"/><polyline points="12,22 12,14"/><polyline points="8,18 12,22 16,18"/></g>' },
  { n: 11, name: "Ciudades y comunidades sostenibles", nameEn: "Sustainable cities", color: "#FD9D24", icon: '<g fill="#fff"><rect x="3" y="10" width="5" height="10"/><rect x="10" y="5" width="5" height="15"/><rect x="17" y="12" width="4" height="8"/></g>' },
  { n: 12, name: "Producción y consumo responsables", nameEn: "Responsible consumption", color: "#BF8B2E", icon: '<path d="M7 15a4 4 0 1 1 0-8c2.5 0 4 2 5 4 1-2 2.5-4 5-4a4 4 0 1 1 0 8c-2.5 0-4-2-5-4-1 2-2.5 4-5 4Z" fill="none" stroke="#fff" stroke-width="1.8"/>' },
  { n: 13, name: "Acción por el clima", nameEn: "Climate action", color: "#3F7E44", icon: '<circle cx="12" cy="12" r="8" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M4 12h16" stroke="#fff" stroke-width="1.2"/><path d="M12 4c2.5 2.2 2.5 13.8 0 16" stroke="#fff" stroke-width="1.2" fill="none"/><path d="M12 4c-2.5 2.2-2.5 13.8 0 16" stroke="#fff" stroke-width="1.2" fill="none"/>' },
  { n: 14, name: "Vida submarina", nameEn: "Life below water", color: "#0A97D9", icon: '<path d="M3 12c3-4 8-5 12-3-1 1-1 5 0 6-4 2-9 1-12-3Z" fill="#fff"/><path d="M15 9v6l4-3-4-3Z" fill="#fff"/>' },
  { n: 15, name: "Vida de ecosistemas terrestres", nameEn: "Life on land", color: "#56C02B", icon: '<circle cx="12" cy="8" r="6" fill="#fff"/><rect x="10.5" y="13" width="3" height="7" fill="#fff"/>' },
  { n: 16, name: "Paz, justicia e instituciones sólidas", nameEn: "Peace & justice", color: "#00689D", icon: '<path d="M2 13c3-1 5-3 6-5 1 3 4 5 8 5-2 2-5 3-8 2 1 2 3 3 6 3-4 2-9 1-12-2 1-1 1-2 0-3Z" fill="#fff"/>' },
  { n: 17, name: "Alianzas para lograr los objetivos", nameEn: "Partnerships for the goals", color: "#19486A", icon: '<circle cx="9" cy="12" r="6" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16" cy="12" r="6" fill="none" stroke="#fff" stroke-width="1.8" opacity=".85"/>' },
];
