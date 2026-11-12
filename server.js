
const express = require("express");

const app = express();
app.use(express.json());

// Products directly in server.js
let products = [
  {
    productId: 1,
    productname: "Veg Rolls",
    description: "Good for vegetarains",
    Stock: true
  },
  {
    productId: 2,
    productname: "Chicken manchuria",
    description: "Preferred by Non Vegetarians",
    Stock: true
  },
  {
    productId: 3,
    productname: "Veg Biryani",
    description: "Good for Vegetarians",
    Stock: false
  }
];


app.get("/getProducts", (req, res) => {
  res.json(products);
});

app.post("/addProduct", (req, res) => {
  const { productId, productname, description, Stock } = req.body;

  const newProduct = {
    productId,
    productname,
    description,
    Stock
  };

  products.push(newProduct);

  res.json({
    message: "Product added successfully",
    products: products
  });
});

app.delete("/deleteProduct/:productId", (req, res) => {
  const productId = Number(req.params.productId);

  products = products.filter(
    (product) => product.productId !== productId
  );

  res.json({
    message: "Product deleted successfully",
    products: products
  });
});


app.put("/updateProduct/:productId", (req, res) => {
  const productId = Number(req.params.productId);

  const product = products.find(
    (product) => product.productId === productId
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  product.description = req.body.description;

  res.json({
    message: "Product updated successfully",
    products: products
  });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});


