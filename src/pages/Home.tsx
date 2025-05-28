// function Home() {
//   return (
//     <div className="container py-5">
//       <h1>Welcome to WebForge</h1>
//       <p>Select a template and start building!</p>
//     </div>
//   );
// }
// export default Home;

import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="text-center p-5 shadow rounded bg-white" style={{ maxWidth: '600px' }}>
        <h1 className="display-4 fw-bold mb-3"> Welcome to <span className="text-primary">W2e</span></h1>
        <p className="lead text-muted mb-4">
          Build stunning websites effortlessly. Choose a template and start customizing now.
        </p>
        <button className="btn btn-primary btn-lg px-4" onClick={goToDashboard}>
          Get Started
        </button>
        <p className="mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
          No coding required. Just your vision. ✨
        </p>
      </div>
    </div>
  );
}
