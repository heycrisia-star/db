
export const LOCATIONS = {
    FIRA_GV: { lat: 41.3546, lng: 2.1276, name: "Fira Gran Via (L'Hospitalet)" },
    FIRA_MJ: { lat: 41.3738, lng: 2.1523, name: "Fira Montjuïc" },
    CCIB: { lat: 41.4115, lng: 2.2215, name: "CCIB / Fòrum" },
    CIRCUIT: { lat: 41.5694, lng: 2.2576, name: "Circuit Barcelona-Catalunya" },
    FORUM: { lat: 41.4105, lng: 2.2272, name: "Parc del Fòrum" },
    CENTER: { lat: 41.3851, lng: 2.1734, name: "Centro Ciudad (Plaça Catalunya)" },
    SANT_JORDI: { lat: 41.3633, lng: 2.1525, name: "Palau Sant Jordi" },
    CAMP_NOU: { lat: 41.3809, lng: 2.1228, name: "Estadio (Camp Nou / Olímpic)" },
    BEACH: { lat: 41.3784, lng: 2.1925, name: "Playas de Barcelona" }
};

export const TYPES = {
    BIZ: { color: "#2563eb", bg: "bg-blue-600", label: "Congreso / Negocio", short: "BIZ" },
    SPORT: { color: "#dc2626", bg: "bg-red-600", label: "Deporte Masivo", short: "SPORT" },
    MUSIC: { color: "#9333ea", bg: "bg-purple-600", label: "Concierto / Festival", short: "MUSIC" },
    CULT: { color: "#d97706", bg: "bg-amber-600", label: "Cultural / Festivo", short: "CULT" },
    TOUR: { color: "#10b981", bg: "bg-emerald-500", label: "Turismo Puro / Ocio", short: "TOUR" }
};

export const MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const MASTER_EVENTS_LIST = [
    { id: 1, weekId: 1, monthIdx: 0, date: "1 Ene", name: "Año Nuevo", type: "TOUR", desc: "Turismo internacional." },
    { id: 2, weekId: 2, monthIdx: 0, date: "6 Ene", name: "Reyes Magos", type: "CULT", desc: "Cabalgata BCN. Familias." },
    { id: 3, weekId: 4, monthIdx: 0, date: "19-21 Ene", name: "ICE & iGB Affiliate", type: "BIZ", desc: "Fira GV. +40k pax. Gaming/Betting." },
    { id: 4, weekId: 4, monthIdx: 0, date: "Enero", name: "Conciertos (Fito/Eladio)", type: "MUSIC", desc: "Palau Sant Jordi." },

    { id: 5, weekId: 6, monthIdx: 1, date: "3-6 Feb", name: "ISE 2026", type: "BIZ", desc: "Fira GV. +70k pax. Tecnología AV." },
    { id: 6, weekId: 9, monthIdx: 1, date: "28 Feb", name: "Premios Goya", type: "CULT", desc: "CCIB. Gala cine español." },

    { id: 7, weekId: 10, monthIdx: 2, date: "2-5 Mar", name: "Mobile World Congress", type: "BIZ", desc: "Fira GV. +90k pax. Evento #1." },
    { id: 8, weekId: 11, monthIdx: 2, date: "15 Mar", name: "El Clásico (Est.)", type: "SPORT", desc: "Barça vs Madrid. Camp Nou." },
    { id: 9, weekId: 12, monthIdx: 2, date: "Marzo", name: "Zurich Marató", type: "SPORT", desc: "Centro Ciudad. +25k runners." },

    { id: 10, weekId: 14, monthIdx: 3, date: "Abril", name: "Semana Santa", type: "TOUR", desc: "Turismo Nacional/Int." },
    { id: 11, weekId: 17, monthIdx: 3, date: "23 Abr", name: "Sant Jordi", type: "CULT", desc: "Centro ciudad. Impacto altísimo." },

    { id: 12, weekId: 18, monthIdx: 4, date: "1 May", name: "Día del Trabajador", type: "TOUR", desc: "Puente festivo." },
    { id: 13, weekId: 20, monthIdx: 4, date: "Mayo", name: "Expoquimia / Construmat", type: "BIZ", desc: "Fira Barcelona. Público PRO." },

    { id: 14, weekId: 23, monthIdx: 5, date: "4-7 Jun", name: "Primavera Sound", type: "MUSIC", desc: "Fòrum. +200k pax." },
    { id: 15, weekId: 24, monthIdx: 5, date: "11-15 Jun", name: "F1 GP España", type: "SPORT", desc: "Circuit. Turismo Premium." },
    { id: 16, weekId: 25, monthIdx: 5, date: "18-20 Jun", name: "SÓNAR", type: "MUSIC", desc: "Fira Montjuïc/GV. Música+Tech." },
    { id: 17, weekId: 26, monthIdx: 5, date: "23-24 Jun", name: "Sant Joan", type: "CULT", desc: "Playas. Inicio Temporada Alta." },

    { id: 18, weekId: 27, monthIdx: 6, date: "4-6 Jul", name: "Tour de France", type: "SPORT", desc: "Salida desde BCN. Impacto Mundial." },
    { id: 19, weekId: 28, monthIdx: 6, date: "8-11 Jul", name: "Cruïlla Festival", type: "MUSIC", desc: "Fòrum. Ocio Urbano." },
    { id: 20, weekId: 29, monthIdx: 6, date: "Julio", name: "Conciertos (Rivera/Yandel)", type: "MUSIC", desc: "Sant Jordi." },

    { id: 21, weekId: 33, monthIdx: 7, date: "15 Ago", name: "Asunción", type: "TOUR", desc: "Pico Vacacional Europeo." },
    { id: 22, weekId: 34, monthIdx: 7, date: "Agosto", name: "Turismo Masivo", type: "TOUR", desc: "Cruceros + Playas llenas." },

    { id: 23, weekId: 37, monthIdx: 8, date: "11 Sep", name: "La Diada", type: "CULT", desc: "Impacto urbano centro." },
    { id: 24, weekId: 39, monthIdx: 8, date: "24 Sep", name: "La Mercè", type: "CULT", desc: "Fiesta Mayor. Multitudinario." },

    { id: 25, weekId: 42, monthIdx: 9, date: "12 Oct", name: "Fiesta Nacional", type: "TOUR", desc: "Puente Otoño." },
    { id: 26, weekId: 43, monthIdx: 9, date: "Octubre", name: "Conciertos (Hombres G)", type: "MUSIC", desc: "Sant Jordi." },

    { id: 27, weekId: 44, monthIdx: 10, date: "1 Nov", name: "Todos los Santos", type: "TOUR", desc: "Turismo fin de semana." },
    { id: 28, weekId: 46, monthIdx: 10, date: "Noviembre", name: "Smart City Expo", type: "BIZ", desc: "Fira GV. Congreso Ciudades." },

    { id: 29, weekId: 49, monthIdx: 11, date: "6-8 Dic", name: "Puente Constitución", type: "TOUR", desc: "Turismo Compras Nacional." },
    { id: 30, weekId: 50, monthIdx: 11, date: "Diciembre", name: "Manga Barcelona", type: "CULT", desc: "Fira GV. Público Joven." },
    { id: 31, weekId: 52, monthIdx: 11, date: "25 Dic", name: "Navidad", type: "TOUR", desc: "Turismo Familiar." }
];
