import { useEffect, useState } from 'react';
import Invoice from './components/Invoice';
import Quotation from './components/Quotation';
import './App.css';

function App() {
    const [view, setView] = useState('invoice');
    const [invoiceData, setInvoiceData] = useState(null);
    const [quotationData, setQuotationData] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch('/api/document/invoice').then(res => res.json()),
            fetch('/api/document/quotation').then(res => res.json())
        ])
            .then(([inv, quo]) => {
                setInvoiceData(inv);
                setQuotationData(quo);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="app-container">
            <nav className="main-nav">
                <button
                    className={view === 'invoice' ? 'active' : ''}
                    onClick={() => setView('invoice')}>Invoices</button>
                <button
                    className={view === 'quotation' ? 'active' : ''}
                    onClick={() => setView('quotation')}>Quotations</button>
            </nav>

            <main className="content-area">
                {view === 'invoice' && invoiceData && (
                    <Invoice
                        key={invoiceData.documentId || 'new'}
                        initialData={invoiceData}
                    />
                )}
                {view === 'quotation' && quotationData && (
                    <Quotation
                        key={quotationData.documentId || 'new'}
                        initialData={quotationData}
                    />
                )}
            </main>
        </div>
    );
}

export default App;