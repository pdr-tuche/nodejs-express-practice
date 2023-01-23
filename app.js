const express = require("express");
const { randomUUID } = require("crypto");

const app = express();

//midlewares
app.use(express.json());

const products = [
  {
    name: "caneta azul",
    price: 2,
    id: "434bdeda-b117-44b4-ae3a-8c16ba4389b1",
  },
  {
    name: "mouse gamer",
    price: 200,
    id: "5444dbe0-0461-4236-a51e-7f709dd91298",
  },
];

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);
  return res.json(product);
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.get("/products/:id", (req, res) => {
  //let id = req.params.id;
  const { id } = req.params;
  /*
  let product;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      product = products[i];
    }
  }
  return res.json(product);
  */
  const product = products.find((elem) => elem.id === id);
  return res.json(product);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex((elem) => elem.id === id);
  /*products[productIndex] = {
    id: products[productIndex].id,
    name,
    price
  }*/
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  return res.json({ message: "produto alterado com sucesso =)" });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((elem) => elem.id === id);
  products.splice(productIndex, 1); //remove uma posicao do array começando pelo products[productIndex], ou seja remove ele mesmo
  return res.json({ message: "produto removido com sucesso =)" });
});

app.listen(3000, () => console.log("server is runnin at port 3000"));
