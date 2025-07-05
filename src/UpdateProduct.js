import React, { useState } from "react";
import uploadProductImg from "./Images_ToolsSymbols/uploadProduct.jpg";
import "./UpdateProduct.css";


function UpdateProduct({ Update_relativeCon, update_containerCon }) {

const [oldName, setOldName] = useState("");
const [newName, setNewName] = useState("");
const [productPrice, setProductPrice] = useState("");
const [productImage, setProductImage] = useState(null);

const handleImageChange = (event) => {
setProductImage(event.target.files[0]);
};

const handleUpdateProduct = async (e) => {
e.preventDefault();

const formData = new FormData();
formData.append("oldName", oldName);
formData.append("newName", newName);
formData.append("price", productPrice);

if (productImage) {
formData.append("image", productImage);
}

try {
const response = await fetch("https://nitiaryapickle.onrender.com/api/update-product", {
method: "POST",
body: formData,
});

if (response.ok) {
alert("Product updated successfully!");

setOldName("");
setNewName("");
setProductPrice("");
setProductImage(null);

} else {
alert("Error updating product!");
}
} catch (error) {
console.error("Error updating product:", error);
alert("Error updating product!");
}
};

return (

<div>

<div
className={`Update_relative ${
Update_relativeCon ? "Update_relativeConinside" : ""
}`}
>
<div
className={`update-product-container ${
update_containerCon ? "update_containerConinside" : ""
}`}
>
<section>

<form
onSubmit={handleUpdateProduct}
className="update-product-form"
>


<div className="Flx_IconPrct">
<img className="IconAddPrdct"
src="https://cdn-icons-png.flaticon.com/128/9404/9404720.png"></img>
<h3 id="addTag">UPDATE PRODUCTS</h3>
</div>


<section>

<div className="addProductDiv">
<label>Old Product Name :</label>
<input
type="text"
value={oldName}
onChange={(e) => setOldName(e.target.value)}
required
placeholder="Old Product Name"
maxLength={30}
/>

<label>New Product Name :</label>
<input
type="text"
value={newName}
onChange={(e) => setNewName(e.target.value)}
required
placeholder="New Product Name"
maxLength={30}
/>

</div>

<img src={uploadProductImg}></img>

</section>

<label>Price :</label>

<input

type="number"
value={productPrice}
required
placeholder="Price"
className="priceInput"
onChange={(e) => {
if (e.target.value.length <= 5) {
setProductPrice(e.target.value);
}
}}

/>


<input
style={{ display: "none" }}
type="file"
onChange={handleImageChange}
/>

<button type="submit" className="update-product-btn">
{" "}
Update Product{" "}
</button>
</form>

</section>

</div>

</div>
</div>

);

}

export default UpdateProduct;
