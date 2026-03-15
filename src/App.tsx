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
            This dark-mode-safe version keeps the design as an image and preserves clickable links
            underneath it.
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
              <table
                cellPadding="0"
                cellSpacing="0"
                border={0}
                style={{
                  width: '700px',
                  borderCollapse: 'collapse',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#ffffff',
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: '0 0 12px 0' }}>
                      <img
                        src="/signature-card.png"
                        data-remote-src={signatureImageUrl}
                        alt="Marine email signature"
                        width="700"
                        height="372"
                        style={{
                          display: 'block',
                          width: '700px',
                          maxWidth: '700px',
                          height: '372px',
                          border: '0',
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '2px 0 0 0' }}>
                      <table
                        cellPadding="0"
                        cellSpacing="0"
                        border={0}
                        width="100%"
                        style={{
                          borderCollapse: 'collapse',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                padding: '0 0 8px 0',
                                color: '#0f172a',
                                fontSize: '12px',
                                lineHeight: '1.4',
                              }}
                            >
                              <a
                                href="https://wa.me/23055096001"
                                style={{ color: '#0369a1', textDecoration: 'none' }}
                              >
                                Call
                              </a>
                              <span style={{ color: '#94a3b8', padding: '0 8px' }}>|</span>
                              <a
                                href="mailto:mis@marinesurvey.mu"
                                style={{ color: '#0369a1', textDecoration: 'none' }}
                              >
                                Email
                              </a>
                              <span style={{ color: '#94a3b8', padding: '0 8px' }}>|</span>
                              <a
                                href="https://www.marinesurvey.mu/"
                                style={{ color: '#0369a1', textDecoration: 'none' }}
                              >
                                Website
                              </a>
                              <span style={{ color: '#94a3b8', padding: '0 8px' }}>|</span>
                              <a
                                href="https://www.linkedin.com/in/marine-independent-surveyors-ltd-3223a53b5/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#0369a1', textDecoration: 'none' }}
                              >
                                LinkedIn
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: '0',
                                color: '#475569',
                                fontSize: '12px',
                                lineHeight: '1.4',
                              }}
                            >
                              2 Avenue Flamboyant, Residence Vallijee, 11309 Port Louis
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-cyan-950">Outlook setup</h3>
          <ol className="list-inside list-decimal space-y-2 text-sm text-cyan-900">
            <li>Click Copy Signature.</li>
            <li>Paste it into Outlook signatures.</li>
            <li>Keep Outlook in dark mode if you want. The visual block will stay unchanged.</li>
            <li>Test the clickable links from a draft email.</li>
          </ol>
          <p className="mt-4 text-sm text-cyan-800">
            Outlook can recolor HTML blocks in dark mode, but it will usually leave normal images alone.
            This version uses that behavior intentionally.
          </p>
        </div>
      </div>
    </div>
  );
}
