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

  const boatImageUrl =
    'https://cdn.jsdelivr.net/gh/Lolor92/MarineEmailSignature@main/public/boat-background.png';
  const logoUrl =
    'https://cdn.jsdelivr.net/gh/Lolor92/MarineEmailSignature@main/public/marine-logo.png';

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Email Signature Generator</h1>
          <p className="text-gray-600">
            This version keeps the contact details clickable while using hosted images Outlook handles
            more reliably.
          </p>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-6 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">Preview</h2>
            <button
              onClick={handleCopy}
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Signature'}
            </button>
          </div>

          <div className="flex justify-center overflow-x-auto bg-white p-8">
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
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={boatImageUrl}
                        data-remote-src={boatImageUrl}
                        alt="Marine banner"
                        width="700"
                        height="150"
                        style={{
                          display: 'block',
                          width: '700px',
                          height: '150px',
                          border: '0',
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '26px 30px 22px 30px', backgroundColor: '#0f172a' }}>
                      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                        <tbody>
                          <tr>
                            <td width="25%" valign="top" style={{ paddingRight: '15px' }}>
                              <table cellPadding="0" cellSpacing="0" border={0}>
                                <tbody>
                                  <tr>
                                    <td valign="middle">
                                      <img
                                        src={logoUrl}
                                        data-remote-src={logoUrl}
                                        alt="Logo"
                                        width="88"
                                        height="40"
                                        style={{ display: 'block', border: 'none' }}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ paddingTop: '10px' }}>
                                      <div
                                        style={{
                                          color: '#eab308',
                                          fontSize: '10px',
                                          fontWeight: 'bold',
                                          lineHeight: '1.25',
                                          textTransform: 'uppercase',
                                        }}
                                      >
                                        Marine Independent
                                        <br />
                                        <span style={{ color: '#ffffff', fontSize: '8px' }}>
                                          Surveyors Ltd
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>

                            <td width="38%" valign="top" style={{ paddingRight: '15px' }}>
                              <h2
                                style={{
                                  margin: '0 0 4px 0',
                                  color: '#ffffff',
                                  fontSize: '18px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Conchiano Evenor
                              </h2>
                              <p
                                style={{
                                  margin: '0 0 12px 0',
                                  color: '#eab308',
                                  fontSize: '15px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Surveyor
                              </p>

                              <p
                                style={{
                                  margin: '0 0 12px 0',
                                  color: '#ffffff',
                                  fontSize: '12px',
                                  lineHeight: '1.4',
                                  fontWeight: 'bold',
                                }}
                              >
                                For and on behalf of Marine Independent
                                <br />
                                Surveyors Ltd, as agents only
                              </p>

                              <p style={{ margin: '0 0 2px 0', color: '#cbd5e1', fontSize: '11px' }}>
                                Business Registration No:{' '}
                                <strong style={{ color: '#ffffff' }}>C22186278</strong>
                              </p>
                              <p style={{ margin: '0', color: '#cbd5e1', fontSize: '11px' }}>
                                VAT Reg No: <strong style={{ color: '#ffffff' }}>28018844</strong>
                              </p>
                            </td>

                            <td width="2%" valign="top" style={{ padding: '0 15px' }}>
                              <table cellPadding="0" cellSpacing="0" border={0} height="100%">
                                <tbody>
                                  <tr>
                                    <td
                                      width="1"
                                      bgcolor="#eab308"
                                      style={{ backgroundColor: '#eab308', height: '112px' }}
                                    ></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>

                            <td width="35%" valign="top">
                              <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                                <tbody>
                                  <tr>
                                    <td
                                      width="20"
                                      valign="top"
                                      style={{
                                        paddingBottom: '6px',
                                        color: '#22c55e',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                      }}
                                    >
                                      W
                                    </td>
                                    <td valign="top" style={{ paddingBottom: '6px' }}>
                                      <a
                                        href="https://wa.me/23055096001"
                                        style={{
                                          color: '#ffffff',
                                          textDecoration: 'none',
                                          fontSize: '13px',
                                        }}
                                      >
                                        +230 5509 6001
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="20"
                                      valign="top"
                                      style={{
                                        paddingBottom: '6px',
                                        color: '#eab308',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                      }}
                                    >
                                      E
                                    </td>
                                    <td valign="top" style={{ paddingBottom: '6px' }}>
                                      <a
                                        href="mailto:mis@marinesurvey.mu"
                                        style={{
                                          color: '#ffffff',
                                          textDecoration: 'none',
                                          fontSize: '13px',
                                        }}
                                      >
                                        mis@marinesurvey.mu
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="20"
                                      valign="top"
                                      style={{
                                        paddingBottom: '6px',
                                        color: '#eab308',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                      }}
                                    >
                                      W
                                    </td>
                                    <td valign="top" style={{ paddingBottom: '6px' }}>
                                      <a
                                        href="https://www.marinesurvey.mu/"
                                        style={{
                                          color: '#ffffff',
                                          textDecoration: 'none',
                                          fontSize: '13px',
                                        }}
                                      >
                                        www.marinesurvey.mu
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="20"
                                      valign="top"
                                      style={{
                                        color: '#eab308',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                      }}
                                    >
                                      A
                                    </td>
                                    <td valign="top">
                                      <span
                                        style={{
                                          color: '#ffffff',
                                          fontSize: '13px',
                                          lineHeight: '1.4',
                                        }}
                                      >
                                        2 Avenue Flamboyant
                                        <br />
                                        Residence Vallijee,
                                        <br />
                                        11309 Port Louis
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} style={{ paddingTop: '12px' }}>
                                      <table cellPadding="0" cellSpacing="0" border={0}>
                                        <tbody>
                                          <tr>
                                            <td style={{ paddingRight: '8px' }} valign="middle">
                                              <a
                                                href="https://www.linkedin.com/in/marine-independent-surveyors-ltd-3223a53b5/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                  display: 'inline-block',
                                                  color: '#0ea5e9',
                                                  textDecoration: 'none',
                                                  fontSize: '14px',
                                                  fontWeight: 'bold',
                                                }}
                                              >
                                                in
                                              </a>
                                            </td>
                                            <td valign="middle">
                                              <a
                                                href="https://www.linkedin.com/in/marine-independent-surveyors-ltd-3223a53b5/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                  color: '#ffffff',
                                                  textDecoration: 'none',
                                                  fontSize: '13px',
                                                }}
                                              >
                                                Marine Independent Surveyor
                                              </a>
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

                      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                        <tbody>
                          <tr>
                            <td height="22" style={{ fontSize: '1px', lineHeight: '1px' }}>
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td height="1" bgcolor="#94a3b8" style={{ backgroundColor: '#475569' }}></td>
                          </tr>
                          <tr>
                            <td height="15" style={{ fontSize: '1px', lineHeight: '1px' }}>
                              &nbsp;
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                        <tbody>
                          <tr>
                            <td>
                              <p
                                style={{
                                  margin: '0 0 4px 0',
                                  color: '#cbd5e1',
                                  fontSize: '9px',
                                  lineHeight: '1.4',
                                  textAlign: 'justify',
                                }}
                              >
                                Any views expressed in this email are those of the sender only. The content
                                of this email is confidential and intended solely for the use of the
                                recipient(s). If received in error, it should be removed from the system
                                without being read, copied, distributed or disclosed to anyone.
                              </p>
                              <p
                                style={{
                                  margin: '0 0 4px 0',
                                  color: '#cbd5e1',
                                  fontSize: '9px',
                                  lineHeight: '1.4',
                                  textAlign: 'justify',
                                }}
                              >
                                Every care has been taken for this email to reach the recipient(s) free from
                                computer viruses. No liability will be accepted for any loss or damage which
                                may be caused.
                              </p>
                              <p
                                style={{
                                  margin: '0',
                                  color: '#cbd5e1',
                                  fontSize: '9px',
                                  lineHeight: '1.4',
                                  textAlign: 'justify',
                                }}
                              >
                                We process your personal data in accordance with the Data Protection Act
                                2017, which is itself aligned with the General Data Protection Regulation.
                              </p>
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

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">How to use this signature in Outlook</h3>
          <ol className="list-inside list-decimal space-y-2 text-sm text-blue-800">
            <li>Click Copy Signature.</li>
            <li>Paste it into Outlook signatures.</li>
            <li>Allow picture downloads if Outlook blocks external images.</li>
            <li>Test the email, website, phone, and LinkedIn links from a draft email.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
