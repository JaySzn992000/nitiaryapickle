import React, { useState } from "react";
import AddProductImg from "./Images_ToolsSymbols/addProduct.jpg";
import "./AddProducts.css";


function AddProducts({ Product_relativeCon, dashboard_containerCon }) {

const [productCategory, setProductCategory] = useState("");
const [productName, setProductName] = useState("");
const [productPrice, setProductPrice] = useState("");
const [productStock, setProductStock] = useState("");
const [productDescription, setProductDescription] = useState("");
const [RateProducts, setRateProducts] = useState("");
const [productImage, setProductImage] = useState(null);
const [productImageOne, setProductImageOne] = useState(null);
const [productImageTwo, setProductImageTwo] = useState(null);
const [productImageThree, setProductImageThree] = useState(null);
const [productSizes, setProductSizes] = useState("");


const handleImageChange = (event) => setProductImage(event.target.files[0]);
const handleImageChangeOne = (event) =>
setProductImageOne(event.target.files[0]);
const handleImageChangeTwo = (event) =>
setProductImageTwo(event.target.files[0]);
const handleImageChangeThree = (event) =>
setProductImageThree(event.target.files[0]);

const handleAddProduct = async (e) => {
e.preventDefault();

const formData = new FormData();

formData.append("category", productCategory);
formData.append("name", productName);
formData.append("price", productPrice);
formData.append("sizes", productSizes);
formData.append("stock", productStock);
formData.append("description", productDescription);
formData.append("review", RateProducts);

formData.append("image", productImage);
formData.append("imageone", productImageOne);
formData.append("imagetwo", productImageTwo);
formData.append("imagethree", productImageThree);

try {
const response = await fetch("https://nitiaryapickle.onrender.com/api/add-product", {
method: "POST",
body: formData,
});

if (response.ok) {
alert("Product added successfully!");

setProductCategory("");
setProductName("");
setProductPrice("");
setProductStock("");
setProductDescription("");
setRateProducts("")
setProductImage(null);
setProductImageOne(null);
setProductImageTwo(null);
setProductImageThree(null);
setProductSizes("");

document.getElementById("file-upload").value = "";
document.getElementById("file-upload-one").value = "";
document.getElementById("file-upload-two").value = "";
document.getElementById("file-upload-three").value = "";

} else {
alert("Error adding product!");
}
} catch (error) {
console.error("Error uploading product:", error);
alert("Error uploading product!");
}
};


return (

<div>

<div
className={`Product_relative ${
Product_relativeCon ? "Product_relativeConinside" : ""
}`}
>
``
<div
className={`dashboard-container ${
dashboard_containerCon ? "dashboard-containerConinside" : ""
}`}
>

<section>

<form onSubmit={handleAddProduct} 

className="addProduct_form">


<div className="Flx_IconPrct">
<img  className="IconUpdatePrdct"
src="https://cdn-icons-png.flaticon.com/128/5444/5444684.png"></img>
<h3 id="addTag">ADD PRODUCTS</h3>
</div>


<section>

<div className="addProductDiv">

<label>Product Name:</label>

<input
type="text"
value={productCategory}
onChange={(e) => setProductCategory(e.target.value)}
required
placeholder="Category Name"
maxLength={30}
/>

<label>Product Sizes:</label>

<input
type="text"
value={productSizes}
onChange={(e) => setProductSizes(e.target.value)}
required
placeholder="Product Sizes"
/>
</div>


<div className="addProductDiv">

<label>Product Name:</label>

<input
type="text"
value={productName}
onChange={(e) => setProductName(e.target.value)}
required
placeholder="Product Name"
maxLength={50}
/>

<label>Product Price:</label>

<input
type="number"
value={productPrice}

onChange={(e) => {
if (e.target.value.length <= 5) {
setProductPrice(e.target.value);
}

}}

required
placeholder="Price"

/>

</div>


{/*  */}

<div className="addProductDiv">

<label>Stock:</label>

<input
type="number"
value={productStock}
required
placeholder="Stock"
onChange={(e) => {
if (e.target.value.length <= 4) {
setProductStock(e.target.value);
}
}}
/>

<label>Rate Product:</label>

<input
type="text"
value={RateProducts}
onChange={(e) => setRateProducts(e.target.value)}
required
placeholder="Rate Product"
maxLength={10}
/>

</div>


{/*  */}

<label>Description:</label>

<textarea
className="textArea_Add"
type="text"
value={productDescription}
onChange={(e) => setProductDescription(e.target.value)}
required
placeholder="Description"
maxLength={500}
/>


<input
style={{ display: "none" }}
type="file"
name="image"
onChange={handleImageChange}
required
id="file-upload"
/>

<input
style={{ display: "none" }}
type="file"
name="imageone"
onChange={handleImageChangeOne}
required
id="file-upload-one"
/>

<input
style={{ display: "none" }}
type="file"
name="imagetwo"
onChange={handleImageChangeTwo}
required
id="file-upload-two"
/>

<input
style={{ display: "none" }}
type="file"
name="imagethree"
onChange={handleImageChangeThree}
required
id="file-upload-three"
/>
<br></br>


<button className="btn_product" type="submit">
Add Product
</button>

</section>

<img className="ImgAddPdct" src={AddProductImg}></img>

</form>

<div className="container_upload">
<h4>Add Thumbnail Photo's</h4>

<section className="upload_container">

<div className="upload-box">

<button
type="button"
className="browse-btn"
onClick={() =>
document.getElementById("file-upload").click()
}
>
<img src="https://cdn-icons-png.flaticon.com/128/17112/17112563.png"></img>
<h4 className="up_ph4">Main Upload Photo</h4>
<h3>
{" "}
<span>Drop your images here, or</span> Click to browse
</h3>

<p>
1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are
allowed
</p>

</button>

<button
type="button"
className="browse-btn"
onClick={() =>
document.getElementById("file-upload-one").click()
}
>
<p>Upload Photo 2</p>
</button>

<button
type="button"
className="browse-btn"
onClick={() =>
document.getElementById("file-upload-two").click()
}
>
<p>Upload Photo 3</p>
</button>

<button
type="button"
className="browse-btn"
onClick={() =>
document.getElementById("file-upload-three").click()
}
>
<p>Upload Photo 4</p>
</button>
</div>

</section>
</div>
</section>
</div>

</div>
</div>

);

}

export default AddProducts;
