
import React from 'react';
import { MapPin, Camera, Utensils, Car, Star } from 'lucide-react';
import Infographic from './Infographic';
import essentialInfoImg from '../assets/barcelona-essential-infographic.jpg';
import { useLanguage } from '../context/LanguageContext';

const DayPlan = ({ day, title, items, isExcursion }) => {
    const { t } = useLanguage();
    return (
        <div className={`rounded-xl shadow-sm border overflow-hidden mb-8 ${isExcursion ? 'border-purple-200 bg-purple-50' : 'border-slate-200 bg-white'}`}>
            <div className={`p-4 flex justify-between items-center ${isExcursion ? 'bg-purple-600' : 'bg-slate-800'} text-white`}>
                <h3 className="text-xl font-bold">{t('period.day')} {day}: {title}</h3>
                {isExcursion && <span className="bg-purple-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Fuera de BCN</span>}
            </div>
            <div className="divide-y divide-slate-100/50">
                {items.map((item, idx) => {
                    let periodLabel = item.period;
                    if (item.period === "Mañana") periodLabel = t('period.morning');
                    else if (item.period === "Mediodía") periodLabel = t('period.noon');
                    else if (item.period === "Tarde") periodLabel = t('period.afternoon');
                    else if (item.period === "Anochecer") periodLabel = t('period.evening');
                    else if (item.period === "Noche") periodLabel = t('period.night');
                    else if (item.period === "Cena") periodLabel = t('period.dinner');
                    else if (item.period.startsWith("Opción")) periodLabel = `${t('period.option')} ${item.period.split(" ")[1]}`;

                    return (
                        <div key={idx} className={`p-5 flex gap-4 transition-colors ${item.type === 'food' ? 'bg-orange-50/50 hover:bg-orange-50' : 'hover:bg-white/50'}`}>
                            <div className={`w-24 shrink-0 font-bold text-sm pt-1 uppercase tracking-wide ${item.type === 'food' ? 'text-orange-600' : 'text-slate-400'}`}>
                                {periodLabel}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <h4 className={`font-bold text-lg mb-1 ${item.type === 'food' ? 'text-orange-800' : 'text-slate-800'}`}>
                                        {item.title}
                                    </h4>
                                    {item.type === 'food' && <Utensils className="w-4 h-4 text-orange-400" />}
                                </div>

                                <p className="text-slate-600 mb-3 leading-relaxed">{item.desc}</p>

                                <div className="flex flex-wrap gap-3 text-xs">
                                    {item.loc && (
                                        <span className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded text-slate-600 font-medium">
                                            <MapPin className="w-3 h-3" /> {item.loc}
                                        </span>
                                    )}
                                    {item.tips && (
                                        <span className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium border border-blue-100">
                                            <Camera className="w-3 h-3" /> {item.tips}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const Itinerary = () => {
    const { t } = useLanguage();
    const days = [
        {
            day: 1,
            title: "El Corazón Modernista y Gótico",
            items: [
                { period: "Mañana", type: "activity", title: "La Sagrada Familia", desc: "Empieza el viaje en la obra maestra de Gaudí. Imprescindible subir a las torres para ver la ciudad.", loc: "Eixample", tips: "Fachada del Nacimiento a primera hora." },
                { period: "Mañana", type: "activity", title: "Passeig de Gràcia", desc: "Camina hacia el mar pasando por La Pedrera y Casa Batlló. El lujo y la arquitectura se mezclan.", loc: "Eixample" },
                { period: "Mediodía", type: "food", title: "Comida en Cervecería Catalana", desc: "Un clásico vibrante de tapas de calidad. Montaditos y marisco fresco.", loc: "Rambla Catalunya" },
                { period: "Tarde", type: "activity", title: "Barrio Gótico & Catedral", desc: "Piérdete por las calles medievales. Visita la Catedral de la Santa Creu y la Plaça del Rei.", loc: "Ciutat Vella" },
                { period: "Anochecer", type: "activity", title: "El Born", desc: "Paseo por el barrio más 'cool'. Santa Maria del Mar es obligatoria.", loc: "Born" },
                { period: "Cena", type: "food", title: "Cena en El Xampanyet", desc: "Auténtica experiencia de bodega. Cava, anchoas y ambiente local ruidoso y alegre.", loc: "Born" }
            ]
        },
        {
            day: 2,
            title: "Vistas, Mar y Montaña",
            items: [
                { period: "Mañana", type: "activity", title: "Park Güell", desc: "El parque de cuento de hadas de Gaudí. Vistas panorámicas de toda Barcelona.", loc: "Gràcia Norte" },
                { period: "Mediodía", type: "activity", title: "Barceloneta y Teleférico", desc: "Baja al puerto y cruza volando el puerto hacia Montjuïc (o pasea por la playa).", loc: "Puerto" },
                { period: "Mediodía", type: "food", title: "Paella en 7 Portes", desc: "Fundado en 1836. Historia viva y arroces excelentes. Reserva con antelación.", loc: "Port Vell" },
                { period: "Tarde", type: "activity", title: "Montjuïc & MNAC", desc: "Museo Nacional, Anillo Olímpico y vistas desde el Castillo.", loc: "Sants-Montjuïc" },
                { period: "Noche", type: "activity", title: "Fuente Mágica", desc: "Espectáculo de agua, luz y sonido para cerrar el día.", loc: "Plaça Espanya" }
            ]
        },
        {
            day: 3,
            title: "Bohemia y Gaudí Secreto",
            items: [
                { period: "Mañana", type: "activity", title: "Hospital de Sant Pau", desc: "El recinto modernista más grande del mundo. Una joya a menudo ignorada.", loc: "Guinardó" },
                { period: "Mediodía", type: "activity", title: "Barrio de Gràcia", desc: "Callejear por Verdi, Plaça de la Virreina. Ambiente de pueblo dentro de la ciudad.", loc: "Gràcia" },
                { period: "Mediodía", type: "food", title: "Festín en Botafumeiro", desc: "Si el presupuesto lo permite, el mejor marisco gallego de la ciudad.", loc: "Gran de Gràcia" },
                { period: "Tarde", type: "activity", title: "Casa Vicens", desc: "La primera casa de Gaudí. Un estilo orientalista único y colorido.", loc: "Gràcia" },
                { period: "Cena", type: "food", title: "Tapas en Tapeo (Born)", desc: "Cocina creativa de Daniel Rueda. Costilla con miel imprescindible.", loc: "Born" }
            ]
        },
        {
            day: 4,
            title: "Cultura Profunda",
            items: [
                { period: "Mañana", type: "activity", title: "Palau de la Música", desc: "Auditorio modernista Patrimonio de la Humanidad. La sala de conciertos es mágica.", loc: "Urquinaona" },
                { period: "Mañana", type: "activity", title: "Mercado de la Boquería", desc: "Explosión de colores y olores. Perfecto para fotos y picar algo rápido.", loc: "Ramblas" },
                { period: "Mediodía", type: "food", title: "Tapeo en Ciudad Condal", desc: "Barra inmensa de tapas clásicas. Siempre lleno, siempre bueno.", loc: "Eixample" },
                { period: "Tarde", type: "activity", title: "Museo Picasso o MOCO", desc: "Arte clásico o moderno en el corazón del Born.", loc: "Born" },
                { period: "Despedida", type: "activity", title: "Puesta de sol en Búnkers del Carmel", desc: "La mejor vista 360 grados de la ciudad (acceso en bus).", loc: "Carmel" }
            ]
        },
        {
            day: 5,
            title: "Excursiones de Ensueño",
            isExcursion: true,
            items: [
                { period: "Opción A", type: "activity", title: "Girona & Besalú", desc: "Girona: Barrio judío (Juego de Tronos), Catedral y casas del río Onyar. Besalú: Pueblo medieval espectacular con puente icónico.", loc: "Norte (1.5h)", tips: "Alquiler de coche recomendado." },
                { period: "Opción B", type: "activity", title: "Montserrat", desc: "Montaña mágica con formas imposibles y monasterio. Sube en Cremallera o Aeri.", loc: "Oeste (1h)", tips: "Escolanía canta a la 13:00." },
                { period: "Opción C", type: "activity", title: "Cadaqués", desc: "El pueblo más bonito de la Costa Brava. Casa de Dalí en Portlligat.", loc: "Costa Brava (2.5h)", tips: "Carretera con curvas, pero vale la pena." },
                { period: "Opción D", type: "activity", title: "Pals & Peratallada", desc: "Pueblos de piedra perfectamente conservados en el Empordà.", loc: "Empordà (1.5h)" }
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 pb-20">
            <h1 className="text-4xl font-black text-slate-800 mb-2">{t('itinerary.title')}</h1>
            <p className="text-xl text-slate-500 mb-8 font-light">Una ruta diseñada para mezclar los monumentos icónicos con la mejor gastronomía y escapadas.</p>

            <Infographic src={essentialInfoImg} alt="Barcelona Esencial Infografia" title={t('infographic.essential')} />

            {days.map(d => <DayPlan key={d.day} {...d} />)}

            <div className="mt-12 bg-slate-100 p-6 rounded-xl text-center border active:border-slate-300">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-current" />
                <h4 className="font-bold text-slate-800">{t('itinerary.pro_tip')}</h4>
                <p className="text-slate-600">Para las cenas populares (7 Portes, Botafumeiro), reserva con 2-3 semanas de antelación.</p>
            </div>
        </div>
    );
};

export default Itinerary;
