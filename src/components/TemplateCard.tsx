interface TemplateCardProps {
  id: string;
  name: string;
  image: string;
  onSelect: (id: string) => void;
}

export default function TemplateCard({ id, name, image, onSelect }: TemplateCardProps) {
  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <button className="btn btn-primary" onClick={() => onSelect(id)}>Select</button>
      </div>
    </div>
  );
}
