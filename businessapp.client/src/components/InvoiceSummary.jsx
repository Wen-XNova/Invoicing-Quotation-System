import { forwardRef } from 'react';

const InvoiceSummary = forwardRef(({ payTerms, vat, total, onChange, safeSubtotal, totalDue }, ref) => (
    <footer className="summary-bar">
        <div className="terms-side">
            <h4>PAYMENT TERMS</h4>
            <textarea
                ref={ref}
                name="payTerms"
                value={payTerms}
                onChange={onChange}
                className="terms-input"
                placeholder="e.g., Net 30, Bank details..."
                rows={1}
            />
        </div>

        <div className="calc-side">
            <div className="calc-row">
                <span className="calc-label">Subtotal</span>
                <span className="calc-val">
                    ${safeSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
            </div>
            <div className="calc-row centered">
                <span className="calc-label">VAT (%)</span>
                <input
                    type="number"
                    name="vat"
                    value={vat}
                    onChange={onChange}
                    className="vat-input-small"
                    placeholder="0"
                />
            </div>
            <div className="total-row">
                <span>Total Due</span>
                <span>${totalDue}</span>
            </div>
        </div>
    </footer>
));

export default InvoiceSummary;