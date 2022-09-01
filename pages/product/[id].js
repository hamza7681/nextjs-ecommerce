import { useRouter } from "next/router";
import baseUrl from "../../Helpers/baseUrl";

const Product = ({ product }) => {
  const router = useRouter();
  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });
    await res.json();
    router.push("/");
  };
  return (
    <>
      <div className="container center-align">
        <h3>{product.name}</h3>
        <img src={product.mediaUrl} style={{ width: "30%" }} />
        <h5>{product.price}</h5>
        <input
          type="number"
          style={{ width: "400px", margin: "10px" }}
          min="1"
          placeholder="Quantity"
        />
        <button className="btn waves-effect waves-light #1565c0 blue darken-3">
          Add<i className="material-icons right">add</i>
        </button>
        <p className="left-align">{product.description}</p>
        <button
          className="btn waves-effect waves-light #c62828 red darken-3"
          onClick={() => deleteProduct()}
        >
          Delete
          <i className="material-icons left">delete</i>
        </button>
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
}

export default Product;
