// interface TemplateCardProps {
//   id: string;
//   name: string;
//   image: string;
//   onSelect: (id: string) => void;
// }

// export default function TemplateCard({ id, name, image, onSelect }: TemplateCardProps) {
//   return (
//     <div className="card m-2" style={{ width: '18rem' }}>
//       <img src={image} className="card-img-top" alt={name} />
//       <div className="card-body">
//         <h5 className="card-title">{name}</h5>
//         <button className="btn btn-primary" onClick={() => onSelect(id)}>Select</button>
//       </div>
//     </div>
//   );
// }

interface TemplateCardProps {
  id: string;
  name: string;
  image: string;
  onSelect: (id: string) => void;
}

export default function TemplateCard({ id, name, image, onSelect }: TemplateCardProps) {
  return (
    <div
      className="card m-2 shadow-sm border-0 hover-shadow"
      style={{ width: '100%', maxWidth: '20rem', cursor: 'pointer', transition: 'transform 0.2s' }}
      onClick={() => onSelect(id)}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/169249/Originals/website-la-gi-02.jpeg"

        className="card-img-top"
        alt={name}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
        <button className="btn btn-outline-primary mt-2" onClick={(e) => { e.stopPropagation(); onSelect(id); }}>
          Select
        </button>
      </div>
    </div>
  );
}
