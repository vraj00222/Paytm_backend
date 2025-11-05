import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client";

export function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/accounts/balance")
      .then(({ balance }) => setBalance(balance))
      .catch((err) => setError(err.message));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="page page--dashboard">
      <main className="card card--dashboard">
        <header className="card__header">
          <h1>Dashboard</h1>
          <p>Overview of your Paytm clone wallet.</p>
        </header>

        {error && <div className="alert alert--error">{error}</div>}

        <section className="dashboard-section">
          <span className="dashboard-label">Available balance</span>
          <p className="dashboard-balance">
            {balance === null ? "Loading..." : `₹${balance.toLocaleString()}`}
          </p>
        </section>

        <div className="dashboard-actions">
          <Link className="button-primary" to="/send">
            Send money
          </Link>
          <button className="button-ghost" type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </main>
    </div>
  );
}