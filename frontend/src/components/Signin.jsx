import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../api/client";

export function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await apiRequest("/user/signin", {
        method: "POST",
        body: JSON.stringify(form)
      });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page page--auth">
      <main className="card card--auth">
        <header className="card__header">
          <h1>Welcome back</h1>
          <p>Sign in to review balances, payments and activity.</p>
        </header>

        {error && <div className="alert alert--error">{error}</div>}

        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            name="userName"
            autoComplete="username"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="button-primary" type="submit">
            Sign in
          </button>
        </form>

        <footer className="card__footer">
          <span>New here?</span>{" "}
          <Link to="/signup">Create an account</Link>
        </footer>
      </main>
    </div>
  );
}