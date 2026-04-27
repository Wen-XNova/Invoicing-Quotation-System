const ActionButtons = ({
    saveStatus,
    handleNew,
    isSelecting,
    handleSelectDoc,
    docList,
    handleOpenClick,
    handleDelete
}) => (
    <div className="no-print actions-bar">
        <span className="save-status-msg">{saveStatus}</span>
        <div className="action-buttons-grid">
            <button type="button" onClick={handleNew} className="btn-print">New...</button>
            {isSelecting ? (
                <select className="select-btn" onChange={handleSelectDoc} autoFocus>
                    <option value="cancel">Open...</option>
                    {docList.map(doc => (
                        <option key={doc.documentId || doc.DocumentId} value={doc.documentId || doc.DocumentId}>
                            {doc.clientName || doc.ClientName || 'Unnamed'}
                        </option>
                    ))}
                </select>
            ) : (
                <button type="button" onClick={handleOpenClick} className="btn-print">Open</button>
            )}
            <button type="button" onClick={handleDelete} className="btn-print">Delete</button>
            <button type="button" onClick={() => window.print()} className="btn-print">Print as PDF</button>
        </div>
    </div>
);

export default ActionButtons;