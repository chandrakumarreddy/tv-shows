export default function Thumbnail({ show }) {
  const { image } = show;
  return (
    <div>
      <img src={image?.medium} alt={show.name} />
      <h3>{show.name}</h3>
    </div>
  );
}
