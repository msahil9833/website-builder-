import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
export default function Editor() {
  const navigate = useNavigate();
  const [templateId, setTemplateId] = useState('');
  const [formData, setFormData] = useState({
    heading: '',
    subheading: '',
    image: '',
  });

  useEffect(() => {
    const selectedId = localStorage.getItem('selectedTemplate');
    if (!selectedId) {
      navigate('/dashboard');
    } else {
      setTemplateId(selectedId);
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('User not logged in');
      return;
    }

    const contentRef = doc(db, 'users', user.uid, 'templates', templateId);
    await setDoc(contentRef, {
      ...formData,
      savedAt: new Date()
    });

    alert('Content saved successfully!');
  } catch (error) {
    console.error('Error saving content:', error);
    alert('Failed to save. Try again.');
  }
};

  return (
    <div className="container mt-4">
      <h3>Editing Template: {templateId}</h3>

      <div className="row mt-4">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label className="form-label">Heading</label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Subheading</label>
              <input
                type="text"
                name="subheading"
                value={formData.subheading}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </form>
          <button
  className="btn btn-primary mt-3"
  onClick={handleSave}
>
  Save Content
</button>

        </div>

        <div className="col-md-6">
          <h4>Live Preview</h4>
          <div className="p-4 border rounded text-center">
            <h2>{formData.heading || 'Heading goes here'}</h2>
            <p>{formData.subheading || 'Subheading goes here'}</p>
            {formData.image && (
              <img src={formData.image} alt="preview" style={{ width: '100%' }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
