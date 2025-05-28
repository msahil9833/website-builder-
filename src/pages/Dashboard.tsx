  // import { useEffect, useState } from 'react';
  // import { onAuthStateChanged, signOut } from 'firebase/auth';
  // import { auth } from '../firebase';
  // import { useNavigate } from 'react-router-dom';
  // import TemplateCard from '../components/TemplateCard';
  // import { templates } from '../data/templatesData';

  // export default function Dashboard() {
  //   const [user, setUser] = useState<any>(null);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const unsub = onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUser(user);
  //       } else {
  //         navigate('/login'); // ✅ Not logged in → go back
  //       }
  //     });

  //     return () => unsub();
  //   }, [navigate]);

  //   const handleLogout = async () => {
  //     await signOut(auth);
  //     navigate('/login');
  //   };

  //   const handleSelect = (id: string) => {
  //   localStorage.setItem('selectedTemplate', id); // ✅ store ID
  //   navigate('/editor'); // ✅ redirect
  // };

  // return (
  //   <div className="container mt-5">
  //     <h2>Welcome, {user?.email}</h2>
  //     <button className="btn btn-danger mt-3 mb-4" onClick={handleLogout}>Logout</button>

  //     <h4>Select a Template:</h4>
  //     <div className="d-flex flex-wrap">
  //       {templates.map((temp) => (
  //         <TemplateCard key={temp.id} {...temp} onSelect={handleSelect} />
  //       ))}
  //     </div>
  //   </div>
  // );

  //   return (
  //     <div className="container mt-5">
  //       <h2>Welcome, {user?.email}</h2>
  //       <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
  //     </div>
  //   );
  // }

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard';
import { templates } from '../data/templatesData';
import logo from '../assets/image.png'
export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else navigate('/login');
    });

    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleSelect = (id: string) => {
    localStorage.setItem('selectedTemplate', id);
    navigate('/editor');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <a className="navbar-brand font-monospace" href="#">w2e</a>
        
        <button className="btn btn-outline-light ms-auto" onClick={() => setShowLogoutModal(true)}>
          Logout
        </button>
      </nav>

      {/* Banner */}
      <div className="bg-light py-4 px-4 mb-4 border-bottom shadow-sm">
        <h2 className="fw-bold text-center">Your website in minutes...</h2>
        <img src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/169249/Originals/website-la-gi-02.jpeg" alt="" />
        <h3>Odoo Website is changing how people think about website design. Thanks to its user-friendly and intuitive interface, you can create, manage, and customize your website effortlessly.</h3>
        <p className="text-muted mb-0">Logged in as <strong>{user?.email}</strong></p>
      </div>

      {/* Template Section */}
      <div className="container">
        <h4 className="mb-4">Choose a Template</h4>
        <div className="row g-4">
          {templates.map((temp) => (
            <div className="col-md-4" key={temp.id}>
              <TemplateCard {...temp} onSelect={handleSelect} />
            </div>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
