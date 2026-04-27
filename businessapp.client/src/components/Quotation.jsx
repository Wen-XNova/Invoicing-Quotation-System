import { useState, useEffect, useRef } from 'react';
import QuotationHeader from './QuotationHeader';
import BillTo from './BillTo';
import QuotationItems from './QuotationItems';
import QuotationSummary from './QuotationSummary';
import ActionButtons from './ActionButtons';

function Quotation({ initialData }) {
    const [formData, setFormData] = useState(initialData || {});
    const [saveStatus, setSaveStatus] = useState('');
    const [docList, setDocList] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);

    const [hideDiscount, setHideDiscount] = useState(false);
    const isDirty = useRef(false);

    const notesRef = useRef(null);
    const discRef = useRef(null);

    const {
        DocumentId,
        documentId,
        clientName = '',
        expiryDate = '',
        discount = '',
        disclaimer = '',
        notes = ''
    } = formData;

    const autoResize = (target) => {
        if (target) {
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        autoResize(notesRef.current);
        autoResize(discRef.current);
    }, [notes, disclaimer]);

    useEffect(() => {
        if (!isDirty.current) return;

        const delayDebounceFn = setTimeout(async () => {
            if (!formData.clientName || formData.clientName.trim() === '') {
                setSaveStatus('Waiting for Client Name...');
                return;
            }

            setSaveStatus('Saving...');
            try {
                const response = await fetch('/api/document/quotation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': 'demo-key-123'
                    },
                    body: JSON.stringify(formData)
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
                console.error(err);
                setSaveStatus('Error saving');
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
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        isDirty.current = false;

        setFormData({
            DocumentId: 0,
            documentId: 0,
            clientName: '',
            expiryDate: futureDate.toISOString(),
            discount: '',
            disclaimer: '',
            notes: ''
        });
        setSaveStatus('Blank slate started');
    };

    const handleOpenClick = async () => {
        try {
            const res = await fetch('/api/document/quotation/all');
            if (res.ok) {
                const data = await res.json();
                if (data.length === 0) {
                    alert('No documents found in database.');
                    return;
                }
                setDocList(data);
                setIsSelecting(true);
            } else {
                alert('Backend route failed. Did you rebuild/restart the C# server?');
            }
        } catch (err) {
            console.error('Error fetching list:', err);
            alert('Could not connect to backend.');
        }
    };

    const handleSelectDoc = async (e) => {
        const id = e.target.value;
        if (id === 'cancel') {
            setIsSelecting(false);
            return;
        }

        setIsSelecting(false);
        if (!id) return;

        try {
            const res = await fetch(`/api/document/quotation/${id}`);
            if (res.ok) {
                const data = await res.json();
                isDirty.current = false;
                setFormData(data);
                setSaveStatus('Loaded successfully');
            } else {
                alert('Failed to load quotation.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        const id = DocumentId || documentId;
        if (!id) {
            handleNew();
            return;
        }

        if (window.confirm('Are you sure you want to delete this quotation?')) {
            try {
                const res = await fetch(`/api/document/quotation/${id}`, {
                    method: 'DELETE',
                    headers: { 'X-API-KEY': 'demo-key-123' }
                });
                if (res.ok) {
                    handleNew();
                    setSaveStatus('Deleted successfully');
                } else {
                    alert('Failed to delete quotation.');
                }
            } catch (err) {
                console.error(err);
                alert('Error deleting quotation.');
            }
        }
    };

    return (
        <div className="sheet">
            <QuotationHeader
                expiryDate={expiryDate}
            />

            <form onSubmit={(e) => e.preventDefault()}>
                <BillTo
                    clientName={clientName}
                    onChange={handleChange}
                    label="QUOTED TO"
                    required={true}
                />

                <QuotationItems
                    ref={notesRef}
                    notes={notes}
                    expiryDate={expiryDate}
                    onChange={handleChange}
                />

                <QuotationSummary
                    ref={discRef}
                    disclaimer={disclaimer}
                    discount={discount}
                    hideDiscount={hideDiscount}
                    setHideDiscount={setHideDiscount}
                    onChange={handleChange}
                />
            </form>

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

export default Quotation;