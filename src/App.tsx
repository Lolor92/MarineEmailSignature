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
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy!', err);
      }
      selection.removeAllRanges();
    }
  };

  const boatImageUrl =
    "https://raw.githubusercontent.com/Lolor92/MarineEmailSignature/main/public/boat-background.png";
  const logoUrl =
    "https://raw.githubusercontent.com/Lolor92/MarineEmailSignature/main/public/marine-logo.png";
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Signature Generator</h1>
          <p className="text-gray-600">Review and copy your new modern Outlook-compatible signature.</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Preview</h2>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy Signature'}
            </button>
          </div>
          
          <div className="p-8 overflow-x-auto bg-white flex justify-center">
            {/* SIGNATURE CONTAINER */}
            <div ref={signatureRef} className="bg-white" style={{ backgroundColor: '#ffffff', padding: '20px' }}>
              
              {/* OUTLOOK COMPATIBLE TABLE LAYOUT */}
              <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '700px', fontFamily: 'Arial, sans-serif', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ position: 'relative', backgroundColor: '#0f172a', backgroundImage: `url(${boatImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', width: '100%', height: '100%', padding: '30px', boxSizing: 'border-box' }}>
                        
                        {/* TOP SECTION: 3 COLUMNS */}
                        <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                          <tbody>
                            <tr>
                              {/* COLUMN 1: LOGO */}
                              <td width="25%" valign="top" style={{ paddingRight: '15px' }}>
                                <table cellPadding="0" cellSpacing="0" border={0}>
                                  <tbody>
                                    <tr>
                                      <td valign="middle">
                                        <img src={logoUrl} alt="Logo" width="60" height="60" style={{ display: 'block', border: 'none' }} referrerPolicy="no-referrer" />
                                      </td>
                                      <td valign="middle" style={{ paddingLeft: '10px' }}>
                                        <div style={{ color: '#eab308', fontSize: '10px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', lineHeight: '1.2', textTransform: 'uppercase' }}>Marine Independent<br/><span style={{ color: '#ffffff', fontSize: '8px' }}>Surveyors Ltd</span></div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>

                              {/* COLUMN 2: PERSONAL INFO */}
                              <td width="38%" valign="top" style={{ paddingRight: '15px' }}>
                                <h2 style={{ margin: '0 0 4px 0', color: '#ffffff', fontSize: '18px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Conchiano Evenor</h2>
                                <p style={{ margin: '0 0 12px 0', color: '#eab308', fontSize: '15px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Surveyor</p>
                                
                                <p style={{ margin: '0 0 12px 0', color: '#ffffff', fontSize: '12px', fontFamily: 'Arial, sans-serif', lineHeight: '1.4', fontWeight: 'bold' }}>
                                  For and on behalf of Marine Independent<br/>
                                  Surveyors Ltd, as agents only
                                </p>
                                
                                <p style={{ margin: '0 0 2px 0', color: '#cbd5e1', fontSize: '11px', fontFamily: 'Arial, sans-serif' }}>Business Registration No: <strong style={{ color: '#ffffff' }}>C22186278</strong></p>
                                <p style={{ margin: '0', color: '#cbd5e1', fontSize: '11px', fontFamily: 'Arial, sans-serif' }}>VAT Reg No: <strong style={{ color: '#ffffff' }}>28018844</strong></p>
                              </td>

                              {/* VERTICAL DIVIDER */}
                              <td width="2%" valign="top" style={{ padding: '0 15px' }}>
                                <table cellPadding="0" cellSpacing="0" border={0} height="100%">
                                  <tbody>
                                    <tr>
                                      <td width="1" bgcolor="#eab308" style={{ backgroundColor: '#eab308', height: '110px' }}></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>

                              {/* COLUMN 3: CONTACT INFO */}
                              <td width="35%" valign="top">
                                <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                                  <tbody>
                                    <tr>
                                      <td width="20" valign="top" style={{ paddingBottom: '6px' }}>
                                        <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" alt="WhatsApp" width="14" height="14" style={{ display: 'block', marginTop: '1px' }} referrerPolicy="no-referrer" />
                                      </td>
                                      <td valign="top" style={{ paddingBottom: '6px' }}>
                                        <a href="https://wa.me/23055096001" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>+230 5509 6001</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="20" valign="top" style={{ paddingBottom: '6px', color: '#eab308', fontWeight: 'bold', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>E</td>
                                      <td valign="top" style={{ paddingBottom: '6px' }}>
                                        <a href="mailto:mis@marinesurvey.mu" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>mis@marinesurvey.mu</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="20" valign="top" style={{ paddingBottom: '6px', color: '#eab308', fontWeight: 'bold', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>W</td>
                                      <td valign="top" style={{ paddingBottom: '6px' }}>
                                        <a href="https://www.marinesurvey.mu/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>www.marinesurvey.mu</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="20" valign="top" style={{ color: '#eab308', fontWeight: 'bold', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>A</td>
                                      <td valign="top">
                                        <span style={{ color: '#ffffff', fontSize: '13px', fontFamily: 'Arial, sans-serif', lineHeight: '1.4' }}>2 Avenue Flamboyant<br/>Residence Vallijee,<br/>11309 Port Louis</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2} style={{ paddingTop: '12px' }}>
                                        <table cellPadding="0" cellSpacing="0" border={0}>
                                          <tbody>
                                            <tr>
                                              <td style={{ paddingRight: '8px' }} valign="middle">
                                                <a href="https://www.linkedin.com/in/marine-independent-surveyors-ltd-3223a53b5/" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                                                  <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="16" height="16" style={{ display: 'block', border: 'none' }} referrerPolicy="no-referrer" />
                                                </a>
                                              </td>
                                              <td valign="middle">
                                                <a href="https://www.linkedin.com/in/marine-independent-surveyors-ltd-3223a53b5/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>
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

                        {/* HORIZONTAL DIVIDER */}
                        <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                          <tbody>
                            <tr><td height="25" style={{ fontSize: '1px', lineHeight: '1px' }}>&nbsp;</td></tr>
                            <tr><td height="1" bgcolor="#94a3b8" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}></td></tr>
                            <tr><td height="15" style={{ fontSize: '1px', lineHeight: '1px' }}>&nbsp;</td></tr>
                          </tbody>
                        </table>

                        {/* DISCLAIMER */}
                        <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                          <tbody>
                            <tr>
                              <td>
                                <p style={{ margin: '0 0 4px 0', color: '#cbd5e1', fontSize: '9px', fontFamily: 'Arial, sans-serif', lineHeight: '1.4', textAlign: 'justify' }}>
                                  Any views expressed in this email are those of the sender only. The content of this email is confidential and intended solely for the use of the recipient(s). If received in error, it should be removed from the system without being read, copied, distributed or disclosed to anyone.
                                </p>
                                <p style={{ margin: '0 0 4px 0', color: '#cbd5e1', fontSize: '9px', fontFamily: 'Arial, sans-serif', lineHeight: '1.4', textAlign: 'justify' }}>
                                  Every care has been taken for this email to reach the recipient(s) free from computer viruses. No liability will be accepted for any loss or damage which may be caused.
                                </p>
                                <p style={{ margin: '0', color: '#cbd5e1', fontSize: '9px', fontFamily: 'Arial, sans-serif', lineHeight: '1.4', textAlign: 'justify' }}>
                                  We process your personal data in accordance with the Data Protection Act 2017, which is itself aligned with the General Data Protection Regulation.
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to use this signature in Outlook:</h3>
          <ol className="list-decimal list-inside text-blue-800 space-y-2 text-sm">
            <li>Click the <strong>"Copy Signature"</strong> button above.</li>
            <li>Open Outlook and go to <strong>File &gt; Options &gt; Mail &gt; Signatures</strong> (or Settings &gt; Mail &gt; Compose and reply in New Outlook/Web).</li>
            <li>Create a new signature or edit an existing one.</li>
            <li>Click inside the signature edit box and press <strong>Ctrl+V</strong> (or right-click and Paste).</li>
            <li>Save your changes.</li>
          </ol>
          <p className="mt-4 text-sm text-blue-700">
            <strong>Note on Images:</strong> The background image uses a special fallback for older Outlook versions. For best results, ensure your company logo and background images are hosted on a publicly accessible server (like your website) and replace the placeholder URLs in the code if needed.
          </p>
        </div>
      </div>
    </div>
  );
}
