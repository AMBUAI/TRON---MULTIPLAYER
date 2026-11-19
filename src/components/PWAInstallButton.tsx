import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({
  compact = false,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    if (compact) return null;
    return (
      <div className="min-h-[44px] inline-flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
        <Smartphone className="w-4 h-4 shrink-0" />
        <span>Running as Installed PWA</span>
      </div>
    );
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-400/50 bg-cyan-500/15 px-4 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/25 active:scale-[0.98] transition whitespace-nowrap shrink-0"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>{compact ? 'Install App' : 'Install TRON BIKE PWA'}</span>
      </button>
    );
  }

  if (isIOS || !compact) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowGuide(true)}
          className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-400/40 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-cyan-200 hover:bg-slate-800 active:scale-[0.98] transition whitespace-nowrap shrink-0"
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          <span>{isIOS ? 'Install on iOS' : 'Install App'}</span>
        </button>

        {showGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-sm rounded-xl border border-cyan-500/40 bg-[#0A1020] p-5 text-slate-100">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-base font-bold text-cyan-300">
                  Install TRON BIKE
                </h3>
                <button
                  type="button"
                  onClick={() => setShowGuide(false)}
                  aria-label="Close install instructions"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {isIOS ? (
                <ol className="mt-3 space-y-2 text-sm text-slate-300 leading-relaxed">
                  <li>
                    1. Tap the <strong className="text-white">Share</strong> button
                    in the Safari browser toolbar.
                  </li>
                  <li>
                    2. Scroll down and select{' '}
                    <strong className="text-white">Add to Home Screen</strong>.
                  </li>
                  <li>
                    3. Launch <strong className="text-cyan-300">TRON BIKE</strong>{' '}
                    from your home screen for fullscreen landscape play.
                  </li>
                </ol>
              ) : (
                <ol className="mt-3 space-y-2 text-sm text-slate-300 leading-relaxed">
                  <li>
                    1. Open this app directly in its own browser tab (outside any
                    embedded preview frame).
                  </li>
                  <li>
                    2. Click the <strong className="text-white">Install</strong>{' '}
                    icon in your browser address bar, or open the{' '}
                    <strong className="text-white">Browser Menu → Install app</strong>.
                  </li>
                  <li>
                    3. Launch <strong className="text-cyan-300">TRON BIKE</strong>{' '}
                    as a standalone app on Android, Windows, macOS, or Linux.
                  </li>
                </ol>
              )}
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="mt-4 w-full min-h-[44px] rounded-lg bg-cyan-500 text-slate-950 font-semibold text-sm hover:bg-cyan-400 transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
