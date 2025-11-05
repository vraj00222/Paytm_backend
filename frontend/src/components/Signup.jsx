import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../api/client";

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: "", password: "", firstName: "", lastName: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await apiRequest("/user/signup", {
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
          <h1>Create your account</h1>
          <p>Manage balances, send payments and keep track of transfers in one place.</p>
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
            autoComplete="new-password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="form-grid form-grid--split">
            <input
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
          <button className="button-primary" type="submit">
            Sign up
          </button>
        </form>

        <footer className="card__footer">
          <span>Already have an account?</span>{" "}
          <Link to="/signin">Sign in</Link>
        </footer>
      </main>
    </div>
  );
}