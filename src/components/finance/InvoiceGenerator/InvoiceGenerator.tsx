// src/components/finance/InvoiceGenerator/InvoiceGenerator.tsx
import React, { useState, useMemo, useRef } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Send,
  Save,
  Copy,
  CheckCircle,
  Eye,
  Edit3,
  Building2,
  User,
  Calendar,
  CreditCard,
  PiggyBank
} from 'lucide-react';
import { Invoice, InvoiceLineItem, InvoiceClient, BankDetails, SetAsideConfig } from '../types/finance';
import './InvoiceGenerator.css';

interface InvoiceGeneratorProps {
  defaultBankDetails?: BankDetails;
  defaultSetAside?: SetAsideConfig;
  onInvoiceSaved?: (invoice: Invoice) => void;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({
  defaultBankDetails,
  defaultSetAside,
  onInvoiceSaved
}) => {
  // Generate invoice number
  const generateInvoiceNumber = (): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV-${year}${month}-${random}`;
  };

  // State
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [invoiceNumber, setInvoiceNumber] = useState<string>(generateInvoiceNumber());
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentTerms, setPaymentTerms] = useState<'0' | '7' | '14' | '30'>('14');
  
  const [client, setClient] = useState<InvoiceClient>({
    name: '',
    email: '',
    address: '',
    company: ''
  });

  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const [notes, setNotes] = useState<string>('Thank you for your business!');
  const [isVATRegistered, setIsVATRegistered] = useState<boolean>(false);
  const [vatRate, setVatRate] = useState<number>(20);

  const [bankDetails, setBankDetails] = useState<BankDetails>(
    defaultBankDetails || {
      accountName: '',
      sortCode: '',
      accountNumber: '',
      bankName: '',
      reference: ''
    }
  );

  const [setAsideEnabled, setSetAsideEnabled] = useState<boolean>(true);
  const [setAsideConfig, setSetAsideConfig] = useState<SetAsideConfig>(
    defaultSetAside || {
      enabled: true,
      taxPercent: 20,
      niPercent: 9,
      pensionPercent: 8,
      holidayPercent: 10,
      sickPayAmount: 20
    }
  );

  const [copied, setCopied] = useState<boolean>(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Calculate due date
  const dueDate = useMemo(() => {
    const date = new Date(invoiceDate);
    date.setDate(date.getDate() + parseInt(paymentTerms));
    return date.toISOString().split('T')[0];
  }, [invoiceDate, paymentTerms]);

  // Calculate totals
  const calculations = useMemo(() => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
    const vatAmount = isVATRegistered ? subtotal * (vatRate / 100) : 0;
    const total = subtotal + vatAmount;

    // Set-aside calculations
    const taxSetAside = total * (setAsideConfig.taxPercent / 100);
    const niSetAside = total * (setAsideConfig.niPercent / 100);
    const pensionSetAside = total * (setAsideConfig.pensionPercent / 100);
    const holidaySetAside = total * (setAsideConfig.holidayPercent / 100);
    const sickPaySetAside = setAsideConfig.sickPayAmount;
    const totalSetAside = taxSetAside + niSetAside + pensionSetAside + holidaySetAside + sickPaySetAside;
    const spendable = total - totalSetAside;
    const spendablePercent = total > 0 ? Math.round((spendable / total) * 100) : 0;

    return {
      subtotal,
      vatAmount,
      total,
      setAside: {
        tax: taxSetAside,
        ni: niSetAside,
        pension: pensionSetAside,
        holiday: holidaySetAside,
        sickPay: sickPaySetAside,
        total: totalSetAside,
        spendable,
        spendablePercent
      }
    };
  }, [lineItems, isVATRegistered, vatRate, setAsideConfig]);

  // Handle line item changes
  const updateLineItem = (id: string, field: keyof InvoiceLineItem, value: string | number) => {
    setLineItems(items => 
      items.map(item => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = updated.quantity * updated.unitPrice;
        }
        return updated;
      })
    );
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0, total: 0 }
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Generate PDF (using print-to-PDF approach)
  const generatePDF = () => {
    if (invoiceRef.current) {
      const printContent = invoiceRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Invoice ${invoiceNumber}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: #1e293b;
                line-height: 1.5;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
              }
              .invoice-preview-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 40px;
                padding-bottom: 20px;
                border-bottom: 3px solid #8b5cf6;
              }
              .invoice-preview-title {
                font-size: 32px;
                font-weight: 800;
                color: #8b5cf6;
              }
              .invoice-preview-number {
                font-size: 14px;
                color: #64748b;
                margin-top: 8px;
              }
              .invoice-preview-meta span {
                display: block;
                text-align: right;
                font-size: 14px;
                color: #64748b;
                margin-bottom: 4px;
              }
              .invoice-preview-meta strong {
                color: #1e293b;
              }
              .invoice-preview-parties {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 40px;
                margin-bottom: 40px;
              }
              .invoice-preview-party h4 {
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #94a3b8;
                margin-bottom: 8px;
              }
              .invoice-preview-party strong {
                display: block;
                font-size: 16px;
                color: #1e293b;
                margin-bottom: 4px;
              }
              .invoice-preview-party p {
                font-size: 14px;
                color: #64748b;
                margin: 0;
              }
              .invoice-preview-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 24px;
              }
              .invoice-preview-table th {
                background: #f1f5f9;
                padding: 12px;
                text-align: left;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.03em;
                color: #64748b;
                border-bottom: 2px solid #e2e8f0;
              }
              .invoice-preview-table th:nth-child(2),
              .invoice-preview-table th:nth-child(3),
              .invoice-preview-table th:nth-child(4) {
                text-align: right;
              }
              .invoice-preview-table td {
                padding: 16px 12px;
                border-bottom: 1px solid #e2e8f0;
                font-size: 14px;
              }
              .invoice-preview-table td:nth-child(2),
              .invoice-preview-table td:nth-child(3),
              .invoice-preview-table td:nth-child(4) {
                text-align: right;
              }
              .invoice-preview-totals {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 40px;
              }
              .invoice-preview-totals-box {
                width: 280px;
              }
              .invoice-preview-total-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                font-size: 14px;
                color: #64748b;
              }
              .invoice-preview-total-row.total {
                border-top: 2px solid #1e293b;
                margin-top: 8px;
                padding-top: 12px;
                font-size: 18px;
                font-weight: 700;
                color: #1e293b;
              }
              .invoice-preview-bank {
                background: #f8fafc;
                padding: 24px;
                border-radius: 8px;
                margin-bottom: 24px;
              }
              .invoice-preview-bank h4 {
                font-size: 14px;
                color: #1e293b;
                margin-bottom: 12px;
              }
              .invoice-preview-bank-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
              }
              .invoice-preview-bank-item span:first-child {
                display: block;
                font-size: 11px;
                text-transform: uppercase;
                color: #94a3b8;
              }
              .invoice-preview-bank-item span:last-child {
                font-size: 14px;
                font-weight: 600;
                color: #1e293b;
              }
              .invoice-preview-notes {
                font-size: 14px;
                color: #64748b;
                font-style: italic;
              }
              .invoice-preview-footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
                font-size: 12px;
                color: #94a3b8;
                text-align: center;
              }
              @media print {
                body { padding: 0; }
                @page { margin: 20mm; }
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    }
  };

  // Copy invoice link (placeholder)
  const copyInvoiceLink = () => {
    navigator.clipboard.writeText(`https://wembleywonders.org/invoices/${invoiceNumber}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save invoice
  const saveInvoice = () => {
    const invoice: Invoice = {
      id: Date.now().toString(),
      invoiceNumber,
      createdAt: new Date(invoiceDate),
      dueDate: new Date(dueDate),
      client,
      lineItems,
      subtotal: calculations.subtotal,
      vatRate: isVATRegistered ? vatRate : undefined,
      vatAmount: isVATRegistered ? calculations.vatAmount : undefined,
      total: calculations.total,
      status: 'draft',
      notes,
      paymentTerms,
      bankDetails,
      autoSetAside: setAsideConfig
    };

    if (onInvoiceSaved) {
      onInvoiceSaved(invoice);
    }

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('ww_invoices') || '[]');
    saved.push(invoice);
    localStorage.setItem('ww_invoices', JSON.stringify(saved));
  };

  return (
    <div className="invoice-generator">
      <div className="invoice-gen-header">
        <div className="invoice-gen-header-icon">
          <FileText size={28} />
        </div>
        <div className="invoice-gen-header-text">
          <h2>Invoice Generator</h2>
          <p>Create professional invoices in 60 seconds</p>
        </div>
        <div className="invoice-gen-mode-toggle">
          <button 
            className={mode === 'edit' ? 'active' : ''}
            onClick={() => setMode('edit')}
          >
            <Edit3 size={16} />
            Edit
          </button>
          <button 
            className={mode === 'preview' ? 'active' : ''}
            onClick={() => setMode('preview')}
          >
            <Eye size={16} />
            Preview
          </button>
        </div>
      </div>

      {mode === 'edit' ? (
        <div className="invoice-gen-body">
          {/* Invoice Details */}
          <div className="invoice-gen-section">
            <h3><Calendar size={18} /> Invoice Details</h3>
            <div className="invoice-gen-row">
              <div className="invoice-gen-field">
                <label>Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
              <div className="invoice-gen-field">
                <label>Invoice Date</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
              <div className="invoice-gen-field">
                <label>Payment Terms</label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value as any)}
                >
                  <option value="0">Due on receipt</option>
                  <option value="7">Net 7 days</option>
                  <option value="14">Net 14 days</option>
                  <option value="30">Net 30 days</option>
                </select>
              </div>
            </div>
            <p className="invoice-gen-due">Due date: <strong>{formatDate(dueDate)}</strong></p>
          </div>

          {/* Client Details */}
          <div className="invoice-gen-section">
            <h3><Building2 size={18} /> Client Details</h3>
            <div className="invoice-gen-row">
              <div className="invoice-gen-field">
                <label>Client/Company Name *</label>
                <input
                  type="text"
                  value={client.name}
                  onChange={(e) => setClient({ ...client, name: e.target.value })}
                  placeholder="e.g., Bright Events Ltd"
                />
              </div>
              <div className="invoice-gen-field">
                <label>Email *</label>
                <input
                  type="email"
                  value={client.email}
                  onChange={(e) => setClient({ ...client, email: e.target.value })}
                  placeholder="accounts@example.com"
                />
              </div>
            </div>
            <div className="invoice-gen-field invoice-gen-field-full">
              <label>Address (optional)</label>
              <textarea
                value={client.address}
                onChange={(e) => setClient({ ...client, address: e.target.value })}
                placeholder="123 Business Street, London, SW1A 1AA"
                rows={2}
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="invoice-gen-section">
            <h3><FileText size={18} /> Items & Services</h3>
            <div className="invoice-gen-items">
              <div className="invoice-gen-items-header">
                <span>Description</span>
                <span>Qty</span>
                <span>Price</span>
                <span>Total</span>
                <span></span>
              </div>
              {lineItems.map((item, index) => (
                <div key={item.id} className="invoice-gen-item-row">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                    placeholder="Service or item description"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))}
                    min={1}
                  />
                  <div className="invoice-gen-price-input">
                    <span>£</span>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))}
                      min={0}
                      step={0.01}
                    />
                  </div>
                  <span className="invoice-gen-item-total">{formatCurrency(item.total)}</span>
                  <button
                    className="invoice-gen-remove-btn"
                    onClick={() => removeLineItem(item.id)}
                    disabled={lineItems.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button className="invoice-gen-add-btn" onClick={addLineItem}>
                <Plus size={16} />
                Add Line Item
              </button>
            </div>

            {/* VAT Toggle */}
            <div className="invoice-gen-vat">
              <label className="invoice-gen-checkbox">
                <input
                  type="checkbox"
                  checked={isVATRegistered}
                  onChange={(e) => setIsVATRegistered(e.target.checked)}
                />
                <span className="invoice-gen-checkbox-mark"></span>
                <span>I'm VAT registered</span>
              </label>
              {isVATRegistered && (
                <div className="invoice-gen-vat-rate">
                  <label>VAT Rate</label>
                  <select value={vatRate} onChange={(e) => setVatRate(Number(e.target.value))}>
                    <option value={20}>20% (Standard)</option>
                    <option value={5}>5% (Reduced)</option>
                    <option value={0}>0% (Zero)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="invoice-gen-totals">
              <div className="invoice-gen-total-row">
                <span>Subtotal</span>
                <span>{formatCurrency(calculations.subtotal)}</span>
              </div>
              {isVATRegistered && (
                <div className="invoice-gen-total-row">
                  <span>VAT ({vatRate}%)</span>
                  <span>{formatCurrency(calculations.vatAmount)}</span>
                </div>
              )}
              <div className="invoice-gen-total-row invoice-gen-total-final">
                <span>Total</span>
                <span>{formatCurrency(calculations.total)}</span>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="invoice-gen-section">
            <h3><CreditCard size={18} /> Payment Details</h3>
            <div className="invoice-gen-row">
              <div className="invoice-gen-field">
                <label>Account Name</label>
                <input
                  type="text"
                  value={bankDetails.accountName}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                  placeholder="Your name or business name"
                />
              </div>
              <div className="invoice-gen-field">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  placeholder="e.g., Monzo, Starling, Barclays"
                />
              </div>
            </div>
            <div className="invoice-gen-row">
              <div className="invoice-gen-field">
                <label>Sort Code</label>
                <input
                  type="text"
                  value={bankDetails.sortCode}
                  onChange={(e) => setBankDetails({ ...bankDetails, sortCode: e.target.value })}
                  placeholder="00-00-00"
                />
              </div>
              <div className="invoice-gen-field">
                <label>Account Number</label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  placeholder="00000000"
                />
              </div>
              <div className="invoice-gen-field">
                <label>Reference</label>
                <input
                  type="text"
                  value={bankDetails.reference || invoiceNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, reference: e.target.value })}
                  placeholder={invoiceNumber}
                />
              </div>
            </div>
          </div>

          {/* Auto Set-Aside */}
          <div className="invoice-gen-section invoice-gen-setaside">
            <h3><PiggyBank size={18} /> Auto Set-Aside</h3>
            <p className="invoice-gen-setaside-desc">
              When this invoice is paid, Maya can automatically set aside money for tax and other obligations.
            </p>

            <label className="invoice-gen-checkbox">
              <input
                type="checkbox"
                checked={setAsideEnabled}
                onChange={(e) => setSetAsideEnabled(e.target.checked)}
              />
              <span className="invoice-gen-checkbox-mark"></span>
              <span>Enable auto set-aside</span>
            </label>

            {setAsideEnabled && (
              <div className="invoice-gen-setaside-breakdown">
                <div className="invoice-gen-setaside-row">
                  <span>💰 Tax reserve ({setAsideConfig.taxPercent}%)</span>
                  <span>{formatCurrency(calculations.setAside.tax)}</span>
                </div>
                <div className="invoice-gen-setaside-row">
                  <span>🏛️ NI reserve ({setAsideConfig.niPercent}%)</span>
                  <span>{formatCurrency(calculations.setAside.ni)}</span>
                </div>
                <div className="invoice-gen-setaside-row">
                  <span>👴 Pension ({setAsideConfig.pensionPercent}%)</span>
                  <span>{formatCurrency(calculations.setAside.pension)}</span>
                </div>
                <div className="invoice-gen-setaside-row">
                  <span>🏖️ Holiday fund ({setAsideConfig.holidayPercent}%)</span>
                  <span>{formatCurrency(calculations.setAside.holiday)}</span>
                </div>
                <div className="invoice-gen-setaside-row">
                  <span>🏥 Sick pay circle</span>
                  <span>{formatCurrency(calculations.setAside.sickPay)}</span>
                </div>
                <div className="invoice-gen-setaside-row invoice-gen-setaside-total">
                  <span>Total set aside</span>
                  <span>{formatCurrency(calculations.setAside.total)}</span>
                </div>
                <div className="invoice-gen-setaside-row invoice-gen-setaside-spendable">
                  <span>✨ Your spendable income</span>
                  <span>{formatCurrency(calculations.setAside.spendable)} ({calculations.setAside.spendablePercent}%)</span>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="invoice-gen-section">
            <h3>Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes for the client..."
              rows={2}
            />
          </div>

          {/* Actions */}
          <div className="invoice-gen-actions">
            <button className="invoice-gen-action-btn invoice-gen-action-preview" onClick={() => setMode('preview')}>
              <Eye size={18} />
              Preview Invoice
            </button>
            <button className="invoice-gen-action-btn invoice-gen-action-save" onClick={saveInvoice}>
              <Save size={18} />
              Save Draft
            </button>
          </div>
        </div>
      ) : (
        /* Preview Mode */
        <div className="invoice-gen-preview-container">
          <div className="invoice-preview" ref={invoiceRef}>
            <div className="invoice-preview-header">
              <div>
                <h1 className="invoice-preview-title">INVOICE</h1>
                <p className="invoice-preview-number">{invoiceNumber}</p>
              </div>
              <div className="invoice-preview-meta">
                <span>Date: <strong>{formatDate(invoiceDate)}</strong></span>
                <span>Due: <strong>{formatDate(dueDate)}</strong></span>
              </div>
            </div>

            <div className="invoice-preview-parties">
              <div className="invoice-preview-party">
                <h4>From</h4>
                <strong>{bankDetails.accountName || 'Your Name'}</strong>
                <p>Wembley Wonders Creator</p>
              </div>
              <div className="invoice-preview-party">
                <h4>Bill To</h4>
                <strong>{client.name || 'Client Name'}</strong>
                <p>{client.email}</p>
                {client.address && <p>{client.address}</p>}
              </div>
            </div>

            <table className="invoice-preview-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.filter(item => item.description).map(item => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.unitPrice)}</td>
                    <td>{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="invoice-preview-totals">
              <div className="invoice-preview-totals-box">
                <div className="invoice-preview-total-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(calculations.subtotal)}</span>
                </div>
                {isVATRegistered && (
                  <div className="invoice-preview-total-row">
                    <span>VAT ({vatRate}%)</span>
                    <span>{formatCurrency(calculations.vatAmount)}</span>
                  </div>
                )}
                <div className="invoice-preview-total-row total">
                  <span>Total Due</span>
                  <span>{formatCurrency(calculations.total)}</span>
                </div>
              </div>
            </div>

            <div className="invoice-preview-bank">
              <h4>Payment Details</h4>
              <div className="invoice-preview-bank-grid">
                <div className="invoice-preview-bank-item">
                  <span>Account Name</span>
                  <span>{bankDetails.accountName}</span>
                </div>
                <div className="invoice-preview-bank-item">
                  <span>Bank</span>
                  <span>{bankDetails.bankName}</span>
                </div>
                <div className="invoice-preview-bank-item">
                  <span>Sort Code</span>
                  <span>{bankDetails.sortCode}</span>
                </div>
                <div className="invoice-preview-bank-item">
                  <span>Account Number</span>
                  <span>{bankDetails.accountNumber}</span>
                </div>
                <div className="invoice-preview-bank-item">
                  <span>Reference</span>
                  <span>{bankDetails.reference || invoiceNumber}</span>
                </div>
              </div>
            </div>

            {notes && <p className="invoice-preview-notes">{notes}</p>}

            <div className="invoice-preview-footer">
              Created with Wembley Wonders Creator Finance
            </div>
          </div>

          {/* Preview Actions */}
          <div className="invoice-gen-preview-actions">
            <button className="invoice-gen-action-btn invoice-gen-action-edit" onClick={() => setMode('edit')}>
              <Edit3 size={18} />
              Edit
            </button>
            <button className="invoice-gen-action-btn invoice-gen-action-pdf" onClick={generatePDF}>
              <Download size={18} />
              Download PDF
            </button>
            <button className="invoice-gen-action-btn invoice-gen-action-send">
              <Send size={18} />
              Send to Client
            </button>
            <button 
              className={`invoice-gen-action-btn invoice-gen-action-copy ${copied ? 'copied' : ''}`}
              onClick={copyInvoiceLink}
            >
              {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;