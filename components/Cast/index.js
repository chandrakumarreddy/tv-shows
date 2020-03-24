import Thumbnail from "../Thumbnail";

export default function Cast({ cast }) {
  const renderCast = () => {
    return cast.map((_cast, index) => (
      <li key={index}>
        <Thumbnail
          name={_cast?.person?.name}
          image={_cast?.person?.image}
          href={`/cast?personId=${_cast?.person?.id}`}
          as={`/cast/${_cast?.person?.id}`}
          small
        />
      </li>
    ));
  };
  return (
    <div className="cast">
      <h1>Cast</h1>
      <ul className="cast__list">{renderCast()}</ul>
      <style jsx>{`
        .cast__list {
          display: flex;
          overflow-x: scroll;
        }
        .cast__list > :global(li) {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}
