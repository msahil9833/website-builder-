import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard';
import { templates } from '../data/templatesData';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login'); // ✅ Not logged in → go back
      }
    });

    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleSelect = (id: string) => {
  localStorage.setItem('selectedTemplate', id); // ✅ store ID
  navigate('/editor'); // ✅ redirect
};

return (
  <div className="container mt-5">
    <h2>Welcome, {user?.email}</h2>
    <button className="btn btn-danger mt-3 mb-4" onClick={handleLogout}>Logout</button>

    <h4>Select a Template:</h4>
    <div className="d-flex flex-wrap">
      {templates.map((temp) => (
        <TemplateCard key={temp.id} {...temp} onSelect={handleSelect} />
      ))}
    </div>
  </div>
);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.email}</h2>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
}
