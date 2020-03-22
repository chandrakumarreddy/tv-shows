import Link from "next/link";

export default function Thumbnail({
  name,
  image,
  as = "",
  href = "",
  small = false
}) {
  return (
    <div className="thumbnail">
      <Link href={href} as={as}>
        <a>
          <img
            src={
              image?.medium ?? `http://via.placeholder.com/210x295?text=${name}`
            }
            alt={name}
            className="thumbnail__image"
          />
          <h3 className="thumbnail__caption">{name}</h3>
        </a>
      </Link>
      <style jsx>{`
        .thumbnail {
          cursor: pointer;
        }
        .thumbnail__image {
          width: ${small ? "100px" : "100%"};
        }
        .thumbnail__caption {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
