// import { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

// const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//     alert('Login successful');
//     navigate('/dashboard'); // ✅ redirect to dashboard
//   } catch (error: any) {
//     alert(error.message);
//   }
// };

//   return (
//     <div className="container mt-5">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//     </div>
//   );
// }


import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('✅ Login successful');
      navigate('/dashboard');
    } catch (error: any) {
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">🔐 Login to Your Account</h3>
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">🚀 Login</button>
          </div>
        </form>

        <div className="mt-3 text-center text-muted" style={{ fontSize: '0.9rem' }}>
          Don’t have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}
