const BillTo = ({ clientName, onChange, label = "BILLED TO", required = false }) => (
    <section className="bill-to">
        <label>{label}</label>
        <input
            type="text"
            name="clientName"
            value={clientName}
            onChange={onChange}
            className="client-field"
            placeholder="Client Name or Company"
            required={required}
        />
    </section>
);

export default BillTo;