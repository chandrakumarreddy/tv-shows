import "./style.scss";

export default function Thumbnail({ show }) {
  const { image } = show;
  return (
    <div className="thumbnail">
      <img src={image?.medium} alt={show.name} className="thumbnail__image" />
      <h3 className="thumbnail__caption">{show.name}</h3>
    </div>
  );
}
