/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function App() {
  const [copied, setCopied] = useState(false);
  const signatureRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (!signatureRef.current) return;

    const clone = signatureRef.current.cloneNode(true) as HTMLDivElement;
    clone.querySelectorAll('img[data-remote-src]').forEach((image) => {
      image.setAttribute('src', image.getAttribute('data-remote-src') || '');
    });

    clone.style.position = 'fixed';
    clone.style.left = '-99999px';
    clone.style.top = '0';
    document.body.appendChild(clone);

    const range = document.createRange();
    range.selectNode(clone);
    const selection = window.getSelection();
    if (!selection) return;

    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy signature', error);
    }

    selection.removeAllRanges();
    document.body.removeChild(clone);
  };

  const signatureImageUrl =
    'https://raw.githubusercontent.com/Lolor92/MarineEmailSignature/main/public/signature-card.png';

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Marine Email Signature</h1>
          <p className="text-slate-600">
            This version is flattened as an image so Outlook keeps the look closer to the preview.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Preview
            </h2>
            <button
              onClick={handleCopy}
              className="inline-flex items-center rounded-full bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-800"
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied' : 'Copy Signature'}
            </button>
          </div>

          <div className="overflow-x-auto bg-white p-8">
            <div
              ref={signatureRef}
              style={{ backgroundColor: '#ffffff', padding: '20px', display: 'inline-block' }}
            >
              <img
                src="/signature-card.png"
                data-remote-src={signatureImageUrl}
                alt="Marine email signature"
                width="620"
                height="330"
                style={{
                  display: 'block',
                  width: '620px',
                  maxWidth: '620px',
                  height: '330px',
                  border: '0',
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-cyan-950">Outlook setup</h3>
          <ol className="list-inside list-decimal space-y-2 text-sm text-cyan-900">
            <li>Click Copy Signature.</li>
            <li>Paste it into Outlook signatures.</li>
            <li>Save and assign it as your default if needed.</li>
          </ol>
          <p className="mt-4 text-sm text-cyan-800">
            This exact-look version is an image, so Outlook will preserve the background, colors, and
            logo placement much better than editable HTML.
          </p>
        </div>
      </div>
    </div>
  );
}
