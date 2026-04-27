const InvoiceHeader = ({ issueDate }) => (
    <header className="top-bar">
        <div className="meta-info">
            <h2 className="doc-type">INVOICE</h2>
            <div className="meta-data">
                <span className="meta-key">DATE:</span>
                <span className="meta-val">
                    {issueDate ? new Date(issueDate).toLocaleDateString() : 'N/A'}
                </span>
            </div>
        </div>
        <div className="org-info">
            <h1 className="org-name">YOUR COMPANY</h1>
            <div className="org-addr">
                <p>123 Business Street</p>
                <p>Digital City, 10101</p>
            </div>
        </div>
    </header>
);

export default InvoiceHeader;