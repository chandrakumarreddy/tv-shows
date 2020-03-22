import "./style.scss";

export default function Thumbnail({ show }) {
  const { name, image } = show;
  return (
    <div className="thumbnail">
      <img
        src={image?.medium ?? `http://via.placeholder.com/210x295?text=${name}`}
        alt={show.name}
        className="thumbnail__image"
      />
      <h3 className="thumbnail__caption">{name}</h3>
    </div>
  );
}
