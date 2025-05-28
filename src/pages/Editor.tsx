// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../firebase';
// import { doc, setDoc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// export default function Editor() {
//   const navigate = useNavigate();
//   const [templateId, setTemplateId] = useState('');
//   const [formData, setFormData] = useState({
//     heading: '',
//     subheading: '',
//     image: '',
//   });

//   useEffect(() => {
//     const selectedId = localStorage.getItem('selectedTemplate');
//     if (!selectedId) {
//       navigate('/dashboard');
//     } else {
//       setTemplateId(selectedId);
//     }
//   }, [navigate]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//   try {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!user) {
//       alert('User not logged in');
//       return;
//     }

//     const contentRef = doc(db, 'users', user.uid, 'templates', templateId);
//     await setDoc(contentRef, {
//       ...formData,
//       savedAt: new Date()
//     });

//     alert('Content saved successfully!');
//   } catch (error) {
//     console.error('Error saving content:', error);
//     alert('Failed to save. Try again.');
//   }
// };

//   return (
//     <div className="container mt-4">
//       <h3>Editing Template: {templateId}</h3>

//       <div className="row mt-4">
//         <div className="col-md-6">
//           <form>
//             <div className="mb-3">
//               <label className="form-label">Heading</label>
//               <input
//                 type="text"
//                 name="heading"
//                 value={formData.heading}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Subheading</label>
//               <input
//                 type="text"
//                 name="subheading"
//                 value={formData.subheading}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Image URL</label>
//               <input
//                 type="text"
//                 name="image"
//                 value={formData.image}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//           </form>
//           <button
//   className="btn btn-primary mt-3"
//   onClick={handleSave}
// >
//   Save Content
// </button>

//         </div>

//         <div className="col-md-6">
//           <h4>Live Preview</h4>
//           <div className="p-4 border rounded text-center">
//             <h2>{formData.heading || 'Heading goes here'}</h2>
//             <p>{formData.subheading || 'Subheading goes here'}</p>
//             {formData.image && (
//               <img src={formData.image} alt="preview" style={{ width: '100%' }} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

      alert('✅ Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('❌ Failed to save. Try again.');
    }
  };

  const handlePreviewNewTab = () => {
    const newWindow = window.open('', '_blank');
    if (!newWindow) return alert('Popup blocked!');

    newWindow.document.write(`
      <html>
        <head>
          <title>Live Preview</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="p-5 text-center">
          <h1>${formData.heading || 'Heading goes here'}</h1>
          <p>${formData.subheading || 'Subheading goes here'}</p>
          ${formData.image ? `<img src="${formData.image}" style="max-width: 100%; height: auto;" />` : ''}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛠 Editing Template: <span className="text-primary">{templateId}</span></h2>
      <div className="row">
        {/* Form Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Enter Your Website Content</h5>
              <div className="mb-3">
                <label className="form-label">Heading</label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Welcome to My Site"
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
                  placeholder="e.g., We build awesome stuff"
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
                  placeholder="Paste image URL here"
                />
              </div>

              

              <div className="d-flex gap-3">
                <button className="btn btn-success" onClick={handleSave}>💾 Save</button>
                <button className="btn btn-outline-primary" onClick={handlePreviewNewTab}>🌐 Preview in New Tab</button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="card-title mb-4">🔍 Live Preview</h5>
              <h2>{formData.heading || 'Heading goes here'}</h2>
              <p className="text-muted">{formData.subheading || 'Subheading goes here'}</p>
              {formData.image && (
                <img src={formData.image} alt="preview" className="img-fluid rounded mt-3" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
