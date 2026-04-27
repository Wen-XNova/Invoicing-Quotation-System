import { useState, useEffect, useRef } from 'react';
import InvoiceHeader from './InvoiceHeader';
import BillTo from './BillTo';
import InvoiceItems from './InvoiceItems';
import InvoiceSummary from './InvoiceSummary';
import ActionButtons from './ActionButtons';

function Invoice({ initialData }) {
    const [formData, setFormData] = useState(initialData || {});
    const [saveStatus, setSaveStatus] = useState('');
    const [docList, setDocList] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);

    const isDirty = useRef(false);
    const notesRef = useRef(null);
    const termsRef = useRef(null);

    const {
        DocumentId, documentId, clientName = '',
        issueDate = '', notes = '', vat = '',
        payTerms = '', total = ''
    } = formData;

    const safeSubtotal = Number(total) || 0;
    const safeVatRate = Number(vat) || 0;
    const vatAmount = safeSubtotal * (safeVatRate / 100);
    const totalDue = (safeSubtotal + vatAmount).toFixed(2);

    const autoResize = (target) => {
        if (target) {
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        autoResize(notesRef.current);
        autoResize(termsRef.current);
    }, [notes, payTerms]);

    useEffect(() => {
        if (!isDirty.current) return;

        const delayDebounceFn = setTimeout(async () => {
            if (!formData.clientName || formData.clientName.trim() === '') {
                setSaveStatus('Waiting for Client Name...');
                return;
            }

            const sanitizedData = {
                ...formData,
                payTerms: formData.payTerms || "",
                notes: formData.notes || "",
                vat: parseFloat(formData.vat) || 0,
                total: parseFloat(formData.total) || 0
            };

            setSaveStatus('Saving...');
            try {
                const response = await fetch('/api/document/invoice', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': 'demo-key-123'
                    },
                    body: JSON.stringify(sanitizedData)
                });

                if (response.ok) {
                    const savedData = await response.json();
                    const newId = savedData.documentId || savedData.DocumentId;
                    if (!DocumentId && !documentId && newId) {
                        setFormData(prev => ({ ...prev, DocumentId: newId, documentId: newId }));
                    }
                    setSaveStatus('Saved');
                    setTimeout(() => setSaveStatus(''), 2000);
                } else {
                    setSaveStatus('Error saving');
                }
            } catch (err) {
                setSaveStatus('Error saving');
                console.log(err);
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [formData, DocumentId, documentId]);

    const handleChange = (e) => {
        isDirty.current = true;
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNew = () => {
        isDirty.current = false;
        setFormData({
            DocumentId: 0, documentId: 0, clientName: '',
            issueDate: new Date().toISOString(), notes: '',
            vat: 0, payTerms: 'Due on Receipt', total: 0
        });
        setSaveStatus('Blank slate started');
    };

    const handleOpenClick = async () => {
        try {
            const res = await fetch('/api/document/invoice/all');
            if (res.ok) {
                const data = await res.json();
                if (data.length === 0) return alert('No documents found.');
                setDocList(data);
                setIsSelecting(true);
            }
        } catch (err) {
            alert('Could not connect to backend.');
            console.log(err);
        }
    };

    const handleSelectDoc = async (e) => {
        const id = e.target.value;
        setIsSelecting(false);
        if (id === 'cancel' || !id) return;

        try {
            const res = await fetch(`/api/document/invoice/${id}`);
            if (res.ok) {
                const data = await res.json();
                isDirty.current = false;
                setFormData(data);
                setSaveStatus('Loaded successfully');
            }
        } catch (err) { console.error(err); }
    };

    const handleDelete = async () => {
        const id = DocumentId || documentId;
        if (!id) return handleNew();
        if (window.confirm('Delete this invoice?')) {
            try {
                const res = await fetch(`/api/document/invoice/${id}`, {
                    method: 'DELETE',
                    headers: { 'X-API-KEY': 'demo-key-123' }
                });
                if (res.ok) {
                    handleNew();
                    setSaveStatus('Deleted successfully');
                }
            } catch (err) {
                alert('Error deleting.');
                console.log(err);
            }
        }
    };

    return (
        <div className="sheet">
            <InvoiceHeader issueDate={issueDate} />

            <BillTo
                clientName={clientName}
                onChange={handleChange}
            />

            <InvoiceItems
                ref={notesRef}
                notes={notes}
                total={total}
                onChange={handleChange}
            />

            <InvoiceSummary
                ref={termsRef}
                payTerms={payTerms}
                vat={vat}
                total={total}
                onChange={handleChange}
                safeSubtotal={safeSubtotal}
                totalDue={totalDue}
            />

            <ActionButtons
                saveStatus={saveStatus}
                handleNew={handleNew}
                isSelecting={isSelecting}
                handleSelectDoc={handleSelectDoc}
                docList={docList}
                handleOpenClick={handleOpenClick}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default Invoice;