import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client";

export function SendMoney() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ to: "", amount: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      await apiRequest("/accounts/transfer", {
        method: "POST",
        body: JSON.stringify({
          to: form.to,
          amount: Number(form.amount)
        })
      });
      setSuccess("Transfer complete!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page page--auth">
      <main className="card card--auth">
        <header className="card__header">
          <h1>Send money</h1>
          <p>Enter the recipient user ID and amount to transfer.</p>
        </header>

        {error && <div className="alert alert--error">{error}</div>}
        {success && <div className="alert alert--success">{success}</div>}

        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            name="to"
            placeholder="Recipient user ID"
            value={form.to}
            onChange={handleChange}
            required
          />
          <input
            name="amount"
            type="number"
            min="1"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <button className="button-primary" type="submit">
            Send now
          </button>
        </form>
      </main>
    </div>
  );
}