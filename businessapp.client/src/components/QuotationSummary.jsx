import { forwardRef } from 'react';

const QuotationSummary = forwardRef(({
    disclaimer,
    discount,
    hideDiscount,
    setHideDiscount,
    onChange
}, ref) => (
    <footer className="summary-bar">
        <div className="terms-side">
            <h4>DISCLAIMER</h4>
            <textarea
                ref={ref}
                name="disclaimer"
                value={disclaimer}
                onChange={onChange}
                className="terms-input"
                placeholder="Not a demand for payment..."
                rows={1}
            />
        </div>

        <div className="calc-side">
            <div className="calc-row">
                <div className="calc-col">
                    {hideDiscount ? (<span className="calc-label">Full price shown</span>)
                        : (<span className="calc-label">Offered Discount</span>)}
                    <label className="no-print checkbox-label">
                        <input
                            type="checkbox"
                            checked={hideDiscount}
                            onChange={(e) => setHideDiscount(e.target.checked)}
                            className="checkbox-input"
                        />
                        Hide Option
                    </label>
                </div>
                <div className="flex-center">
                    {hideDiscount ? (
                        <span className="placeholder-text">Standard rates</span>
                    ) : (
                        <input
                            type="text"
                            name="discount"
                            value={discount}
                            onChange={onChange}
                            className="vat-input-small discount-input"
                            placeholder="0%"
                        />
                    )}
                </div>
            </div>
        </div>
    </footer>
));

export default QuotationSummary;