const socket = io();

socket.emit("getProds");

socket.on("dataProds", (prods) => {
  console.log(prods);
  let listProds = prods;
});
