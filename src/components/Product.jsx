import Rating from "../ui/Rating";
export default function Product({
  img,
  title,
  brand,
  desc,
  discount,
  price,
  rating,
  availability,
  onAddToCart,
}) {
  return (
    <div className="product">
      <div className="discount">
        <span>{discount}%</span>
        <p>{availability}</p>
        <button onClick={onAddToCart}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="img">
        <img src={img[0]} />
      </div>
      <h6>{title}</h6>
      <span>{brand}</span>
      <h3> ${price}</h3>
      <div>
        <Rating rating={rating} />
      </div>
      {/* <p>
        Read more <i className="fa-solid fa-arrow-right"></i>
      </p> */}
    </div>
  );
}
