import React from 'react';

const Infographic = ({ src, alt, title }) => {
    return (
        <div className="mb-8 w-full">
            {title && <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>}
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                <img src={src} alt={alt} className="w-full h-auto object-cover" />
            </div>
        </div>
    );
};

export default Infographic;
