'use client';

import { useEffect, useState } from 'react';

export default function OrientationPrompt() {
    const [isPortrait, setIsPortrait] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };

        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
            const isProbablyMobile = /android|iphone|ipad|ipod/i.test(userAgent.toLowerCase());
            setIsMobile(isProbablyMobile);
        };

        checkMobile();
        checkOrientation();

        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (!isMobile || !isPortrait) return null;

    return (
        <div className="fixed inset-0 z-[1000] bg-slate-900/95 flex flex-col items-center justify-center text-white p-8 text-center backdrop-blur-sm animate-in fade-in duration-500">
            <div className="mb-6 animate-bounce">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-400 rotate-90"
                >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4">Ruota il Tuo Dispositivo</h2>
            <p className="text-slate-300 max-w-xs leading-relaxed">
                Questo esercizio richiede la modalità <strong>Orizzontale (Landscape)</strong> per visualizzare correttamente il pentagramma.
                Per favore, ruota lo schermo del tuo dispositivo.
            </p>

            <div className="mt-10 p-3 bg-white/10 rounded-lg text-xs text-slate-400">
                <p>💡 Suggerimento: Assicurati che il "Blocco Rotazione" del tuo iPhone/iPad sia disattivato.</p>
            </div>
        </div>
    );
}
