import { forwardRef } from 'react';

const InvoiceItems = forwardRef(({ notes, total, onChange }, ref) => (
    <section>
        <div className="list-head">
            <span>DESCRIPTION / NOTES</span>
            <span>AMOUNT</span>
        </div>
        <div className="item-row">
            <textarea
                ref={ref}
                name="notes"
                value={notes}
                onChange={onChange}
                placeholder="Enter description..."
                className="desc-input"
                rows={1}
            />
            <div className="price-input-box">
                <span className="curr-sym">$</span>
                <input
                    type="number"
                    name="total"
                    value={total}
                    onChange={onChange}
                    className="price-field"
                    placeholder="0.00"
                />
            </div>
        </div>
    </section>
));

export default InvoiceItems;