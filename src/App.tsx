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

    const range = document.createRange();
    range.selectNode(signatureRef.current);
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
  };

  const boatImageUrl =
    'https://raw.githubusercontent.com/Lolor92/MarineEmailSignature/main/public/boat-banner.png';
  const logoUrl =
    'https://raw.githubusercontent.com/Lolor92/MarineEmailSignature/main/public/marine-logo.png';

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Marine Email Signature</h1>
          <p className="text-slate-600">
            Copy the signature below and paste it into Outlook.
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
            <div ref={signatureRef} style={{ backgroundColor: '#ffffff', padding: '20px' }}>
              <table
                cellPadding="0"
                cellSpacing="0"
                border={0}
                style={{
                  width: '700px',
                  borderCollapse: 'collapse',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#0f172a',
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={boatImageUrl}
                        alt="Marine vessel banner"
                        width="700"
                        height="180"
                        style={{ display: 'block', width: '700px', height: '180px', border: '0' }}
                        referrerPolicy="no-referrer"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '28px 30px 24px 30px', backgroundColor: '#0f172a' }}>
                      <table
                        cellPadding="0"
                        cellSpacing="0"
                        border={0}
                        width="100%"
                        style={{ borderCollapse: 'collapse' }}
                      >
                        <tbody>
                          <tr>
                            <td width="58%" valign="top" style={{ paddingRight: '24px' }}>
                              <img
                                src={logoUrl}
                                alt="Marine Independent Surveyors Ltd"
                                width="250"
                                height="102"
                                style={{
                                  display: 'block',
                                  width: '250px',
                                  height: '102px',
                                  border: '0',
                                  marginBottom: '18px',
                                }}
                                referrerPolicy="no-referrer"
                              />
                              <p
                                style={{
                                  margin: '0 0 6px 0',
                                  color: '#ffffff',
                                  fontSize: '26px',
                                  lineHeight: '30px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Conchiano Evenor
                              </p>
                              <p
                                style={{
                                  margin: '0 0 14px 0',
                                  color: '#facc15',
                                  fontSize: '15px',
                                  lineHeight: '18px',
                                  fontWeight: 'bold',
                                  letterSpacing: '1px',
                                  textTransform: 'uppercase',
                                }}
                              >
                                Surveyor
                              </p>
                              <p
                                style={{
                                  margin: '0 0 14px 0',
                                  color: '#cbd5e1',
                                  fontSize: '12px',
                                  lineHeight: '18px',
                                }}
                              >
                                For and on behalf of Marine Independent Surveyors Ltd, as agents
                                only.
                              </p>
                              <p
                                style={{
                                  margin: '0 0 4px 0',
                                  color: '#cbd5e1',
                                  fontSize: '11px',
                                  lineHeight: '16px',
                                }}
                              >
                                Business Registration No:{' '}
                                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
                                  C22186278
                                </span>
                              </p>
                              <p
                                style={{
                                  margin: '0',
                                  color: '#cbd5e1',
                                  fontSize: '11px',
                                  lineHeight: '16px',
                                }}
                              >
                                VAT Reg No:{' '}
                                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
                                  28018844
                                </span>
                              </p>
                            </td>
                            <td
                              width="42%"
                              valign="top"
                              style={{
                                paddingLeft: '24px',
                                borderLeft: '1px solid #facc15',
                              }}
                            >
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                border={0}
                                width="100%"
                                style={{ borderCollapse: 'collapse' }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      valign="top"
                                      style={{
                                        padding: '0 0 10px 0',
                                        color: '#facc15',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                      }}
                                    >
                                      Mobile
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: '0 0 12px 0' }}>
                                      <a
                                        href="https://wa.me/23055096001"
                                        style={{
                                          color: '#ffffff',
                                          textDecoration: 'none',
                                          fontSize: '14px',
                                          lineHeight: '18px',
                                        }}
                                      >
                                        +230 5509 6001
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      valign="top"
                                      style={{
                                        padding: '0 0 10px 0',
                                        color: '#facc15',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                      }}
                                    >
                                      Email
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: '0 0 12px 0' }}>
                                      <a
                                        href="mailto:mis@marinesurvey.mu"
                                        style={{
                                          color: '#ffffff',
                                          textDecoration: 'none',
                                          fontSize: '14px',
                                          lineHeight: '18px',
                                        }}
                                      >
                                        mis@marinesurvey.mu
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      valign="top"
                                      style={{
                                        padding: '0 0 10px 0',
                                        color: '#facc15',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                      }}
                                    >
                                      Website
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: '0 0 12px 0' }}>
                                      <a
                                        href="https://www.marinesurvey.mu/"
                                        style={{
                                          color: '#ffffff',
                                          textDecoration: 'none',
                                          fontSize: '14px',
                                          lineHeight: '18px',
                                        }}
                                      >
                                        www.marinesurvey.mu
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      valign="top"
                                      style={{
                                        padding: '0 0 10px 0',
                                        color: '#facc15',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                      }}
                                    >
                                      Address
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{
                                        padding: '0 0 14px 0',
                                        color: '#ffffff',
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                      }}
                                    >
                                      2 Avenue Flamboyant
                                      <br />
                                      Residence Vallijee
                                      <br />
                                      11309 Port Louis
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      valign="top"
                                      style={{
                                        padding: '0 0 10px 0',
                                        color: '#facc15',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                      }}
                                    >
                                      LinkedIn
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: '#ffffff', fontSize: '14px', lineHeight: '18px' }}>
                                      <a
                                        href="https://www.linkedin.com/in/marine-independent-surveyors-ltd-3223a53b5/"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: '#ffffff', textDecoration: 'none' }}
                                      >
                                        Marine Independent Surveyors Ltd
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ paddingTop: '22px' }}>
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                border={0}
                                width="100%"
                                style={{ borderCollapse: 'collapse' }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      height="1"
                                      style={{ backgroundColor: '#334155', fontSize: '1px', lineHeight: '1px' }}
                                    >
                                      &nbsp;
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ paddingTop: '16px' }}>
                                      <p
                                        style={{
                                          margin: '0 0 6px 0',
                                          color: '#94a3b8',
                                          fontSize: '9px',
                                          lineHeight: '14px',
                                          textAlign: 'justify',
                                        }}
                                      >
                                        Any views expressed in this email are those of the sender only.
                                        The content of this email is confidential and intended solely
                                        for the use of the recipient. If received in error, it should be
                                        removed from the system without being read, copied, distributed
                                        or disclosed.
                                      </p>
                                      <p
                                        style={{
                                          margin: '0 0 6px 0',
                                          color: '#94a3b8',
                                          fontSize: '9px',
                                          lineHeight: '14px',
                                          textAlign: 'justify',
                                        }}
                                      >
                                        Every care has been taken for this email to reach the recipient
                                        free from computer viruses. No liability will be accepted for
                                        any loss or damage which may be caused.
                                      </p>
                                      <p
                                        style={{
                                          margin: '0',
                                          color: '#94a3b8',
                                          fontSize: '9px',
                                          lineHeight: '14px',
                                          textAlign: 'justify',
                                        }}
                                      >
                                        We process your personal data in accordance with the Data
                                        Protection Act 2017, aligned with the General Data Protection
                                        Regulation.
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
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
            <li>Open Outlook signature settings.</li>
            <li>Paste into a new signature.</li>
            <li>Save and assign it to new emails or replies.</li>
          </ol>
          <p className="mt-4 text-sm text-cyan-800">
            The banner and logo are expected at the GitHub raw URLs above, so the repository needs the
            files in `public/` before you use the signature in Outlook.
          </p>
        </div>
      </div>
    </div>
  );
}
