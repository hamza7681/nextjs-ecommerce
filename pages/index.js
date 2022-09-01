import Link from "next/link";
import baseUrl from "../Helpers/baseUrl";

const Home = ({ products }) => {
  const ProductList = products.map((val, index) => {
    return (
      <>
        <div className="card" key={index}>
          <div className="card-image">
            <img src={val.mediaUrl} />
            <span className="card-title">{val.name}</span>
          </div>
          <div className="card-content">
            <p>Rs {val.price}</p>
          </div>
          <div className="card-action">
            <Link href={"/product/[id]"} as={`/product/${val._id}`}>
              <a>View Product</a>
            </Link>
          </div>
        </div>
      </>
    );
  });
  return (
    <>
      <div className="rootCard">{ProductList}</div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/product`);
  const data = await res.json();
  return {
    props: {
      products: data,
    },
  };
}

export default Home;
