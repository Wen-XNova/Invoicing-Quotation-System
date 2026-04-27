import { forwardRef } from 'react';

const QuotationItems = forwardRef(({ notes, expiryDate, onChange }, ref) => (
    <section>
        <div className="list-head">
            <span>PROPOSAL / NOTES</span>
            <span>EXPIRY DATE</span>
        </div>
        <div className="item-row">
            <textarea
                ref={ref}
                name="notes"
                value={notes}
                onChange={onChange}
                placeholder="Enter quotation details..."
                className="desc-input"
                rows={1}
            />
            <div className="price-input-box">
                <input
                    type="date"
                    name="expiryDate"
                    value={expiryDate ? expiryDate.split('T')[0] : ''}
                    onChange={onChange}
                    className="price-field"
                />
            </div>
        </div>
    </section>
));

export default QuotationItems;