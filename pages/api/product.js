import mongoConnection from "../../Helpers/mongoConnection";
import Product from "../../models/productSchema";

mongoConnection();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      getAllProducts(req, res);
      break;
    case "POST":
      saveProduct(req, res);
      break;
  }
};

const getAllProducts = async (req, res) => {
  Product.find().then((products) => {
    res.status(200).json(products);
  });
};

const saveProduct = async (req, res) => {
  const { name, price, description, mediaUrl } = req.body;
  if (!name || !price || !description || !mediaUrl) {
    return res.status(422).json({ error: "Please add all fields" });
  }
  const product = new Product({
    name,
    price,
    description,
    mediaUrl,
  }).save();
  res.status(201).json(product);
};
