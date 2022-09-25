import { useState, useEffect, useId } from "react";
import { db } from "./firebase_config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newtitle, setnewtitle] = useState("");
  const [newdescription, setnewdescription] = useState("");
  const [newcategory, setnewcategory] = useState("");
  const [newimage, setnewimage] = useState("");
  const [newprice, setnewprice] = useState(0);
  const [newrating, setnewrating] = useState(0);
  const [newstock, setnewstock] = useState(0);

  const [products, setProducts] = useState([]);

  const usersCollectionRef = collection(db, "products");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      id: Math.random(),
      title: newtitle,
      description: newdescription,
      category: newcategory,
      image: newimage,
      price: newprice,
      rating: newrating,
      stock: newstock,
    });
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "products", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [products]);

  return (
    <div className="App">
      <input
        placeholder="title..."
        onChange={(event) => {
          setnewtitle(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(event) => {
          setnewdescription(event.target.value);
        }}
      />
      <input
        placeholder="category.."
        onChange={(event) => {
          setnewcategory(event.target.value);
        }}
      />
      <input
        placeholder="img url"
        onChange={(event) => {
          setnewimage(event.target.value);
        }}
      />{" "}
      <input
        type="number"
        placeholder="price..."
        onChange={(event) => {
          setnewprice(event.target.value);
        }}
      />{" "}
      <input
        type="number"
        placeholder="rating..."
        onChange={(event) => {
          setnewrating(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="stock..."
        onChange={(event) => {
          setnewstock(event.target.value);
        }}
      />
      <button onClick={createUser}> Create User</button>
      {products.map((product) => {
        return (
          <div>
            {" "}
            <h1>Title: {product.title}</h1>
            <h1>Description: {product.description}</h1>
            <h2>category{product.category}</h2>
            <p>
              {" "}
              <img src={product.image} alt="" /> image
            </p>
            <h2>price: {product.price} </h2>
            <h2>rating:{product.rating} </h2>
            <h2>stock: {product.stock} </h2>
            <button
              onClick={() => {
                deleteUser(product.id);
              }}
            >
              {" "}
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
