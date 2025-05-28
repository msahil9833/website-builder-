// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

// const handleSignup = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//     alert('Signup successful');
//     navigate('/login'); // ✅ redirect to login
//   } catch (error: any) {
//     alert(error.message);
//   }
// };

//   return (
//     <div className="container py-5" style={{ maxWidth: "400px" }}>
//       <h2 className="mb-4">Signup</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSignup}>
//   <div className="mb-3">
//     <label>Name</label>
//     <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
//   </div>
//   <div className="mb-3">
//     <label>Email</label>
//     <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
//   </div>
//   <div className="mb-3">
//     <label>Password</label>
//     <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
//   </div>
//   <button type="submit" className="btn btn-primary">Sign Up</button>
// </form>
//     </div>
//   );
// }

// export default Signup;

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('✅ Signup successful');
      navigate('/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">📝 Create Your Account</h3>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">👤 Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">📧 Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">🔑 Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">🚀 Sign Up</button>
          </div>
        </form>

        <div className="mt-3 text-center text-muted" style={{ fontSize: '0.9rem' }}>
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
}
