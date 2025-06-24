const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const path = require("path");
const Razorpay = require("razorpay");
const fs = require("fs");



const app = express();


require("dotenv").config();
const pool = require("./config"); 

app.use(cors());
app.use(bodyParser.json());
const PORT = 3001;


const db = mysql.createConnection({
host: "localhost",
database: "ecomweb1",
user: "root",
password: "jay992000",
});


app.get("/", async (req, res) => {
  res.send("✅ Backend is Live & Working");
});


app.get("/registration", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.registration"); // 👈 yahi tera table hai
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ DB Error:", err.message);
    res.status(500).send("Database error");
  }
});


app.post("/postqty", (req, res) => {
const insertRegster = "INSERT INTO ecart VALUES  (?,?,?)";
const { price, name, img } = req.body;

db.query(insertRegster, [price, name, img], (err, result) => {
if (err) {
console.log("Error fetched");
res.status(500).json({ message: "Error fetched", error: err.message });
} else {
console.log("Total successfully");
res.status(200).json({ message: "Total successfully" });
}
});
});

//

app.post("/postqty", (req, res) => {
const insertRegster = "INSERT INTO ecart VALUES  (?,?,?)";
const { price, name, img } = req.body;

db.query(insertRegster, [price, name, img], (err, result) => {
if (err) {
console.log("Error fetched");
res.status(500).json({ message: "Error fetched", error: err.message });
} else {
console.log("Total successfully");
res.status(200).json({ message: "Total successfully" });
}
});
});

//

app.post("/registerationPost", (req, res) => {
const { name, email, password, mobileno } = req.body;

// Check for duplicate mobile

const checkMobileQuery =
"SELECT mobileno FROM registeration WHERE mobileno = ? LIMIT 1";
db.query(checkMobileQuery, [mobileno], (err, mobileResults) => {
if (err) {
console.error("Database error (mobile):", err);
return res.status(200).json({
success: false,
message: "System error. Please try later.",
});
}

if (mobileResults.length > 0) {
return res.status(200).json({
success: false,
message: "Mobile number already registered",
});
}

// Check for duplicate email

const checkEmailQuery =
"SELECT email FROM registeration WHERE email = ? LIMIT 1";
db.query(checkEmailQuery, [email], (err, emailResults) => {
if (err) {
console.error("Database error (email):", err);
return res.status(200).json({
success: false,
message: "System error. Please try later.",
});
}

if (emailResults.length > 0) {
return res.status(200).json({
success: false,
message: "Email address already registered",
});
}

// Insert new user

const insertQuery =
"INSERT INTO registeration (name, email, password, mobileno) VALUES (?, ?, ?, ?)";
db.query(
insertQuery,
[name, email, password, mobileno],
(err, result) => {
if (err) {
console.error("Registration error:", err);
return res.status(200).json({
success: false,
message: "Registration failed. Try again.",
});
}
return res.status(200).json({
success: true,
message: "Registered successfully",
});
}
);
});
});
});

//

app.get("/fetchCartGet", (req, res) => {
const FetchQuery = "SELECT * FROM ecart";
db.query(FetchQuery, (err, result) => {
if (err) {
console.log("Error fetched");
res.status(500).json({ message: "Error fetched", error: err.message });
} else {
console.log(result);
res.status(200).json(result);
}
});
});

// ProductList

app.use(express.static(path.join(__dirname, "public")));

// Products API

app.get("/fetchProductslistTshirt", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Mango Pickle')`;

// Execute the query
db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

app.get("/fetchProductslistChilli", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Chilli')`;

// Execute the query
db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

app.get("/fetchProductslistJeans", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Jeans')`;

// Execute the query
db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

app.get("/fetchProductslistShirt", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Carrot')`;

// Execute the query
db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

app.get("/fetchProductslistJeans", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Jeans')`;

// Execute the query

db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

app.get("/fetchProductslistPants", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Lemon')`;

// Execute the query

db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

app.get("/fetchProductslistSweatshirt", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Bitter')`;

// Execute the query
db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

app.get("/fetchProductslistShorts", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Garlic')`;

// Execute the query
db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

app.get("/fetchProductslistTrouser", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Ghee')`;

// Execute the query
db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

app.get("/fetchProductslistBlazers", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Aavla')`;

// Execute the query
db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

// ..

app.get("/fetchProductslistHoodies", (req, res) => {
const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER('Mixed')`;

// Execute the query
db.query(exactMatchQuery, (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(results);
});
});

// from here

app.get("/fetchProductslist", (req, res) => {
const searchQuery = req.query.search || "";

const keywords = searchQuery.toLowerCase().split(/\s+/);
const conditions = keywords
.map((keyword) => `LOWER(name) LIKE ?`)
.join(" AND ");
const advancedSearchQuery = `
SELECT *
FROM imgproduct
WHERE ${conditions}
`;
const advancedSearchValues = keywords.map((keyword) => `%${keyword}%`);

db.query(
advancedSearchQuery,
advancedSearchValues,
(err, advancedResults) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

if (advancedResults.length > 0) {
return res.json(advancedResults);
}

// If no advanced results,
// check exact match

const exactMatchQuery = `
SELECT *
FROM imgproduct
WHERE LOWER(img) = LOWER(?)
`;
const values = [searchQuery];

db.query(exactMatchQuery, values, (err, exactResults) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}

res.json(exactResults);
});
}
);
});

app.get("/fetchProductslist", (req, res) => {
db.query("SELECT * FROM imgproduct", (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}
res.json(results);
});
});

//

app.get("/fetchProductDetails", (req, res) => {
const Insertproductlist = "SELECT * FROM imgproduct";
db.query(Insertproductlist, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
console.log(result);
res.status(200).json(result);
}
});
});

//

app.post("/fetchlogin", (req, res) => {
const FetchQuery = "SELECT * FROM registeration";
db.query(FetchQuery, (err, result) => {
if (err) {
console.log("Error fetched");
res.status(500).json({ message: "Error fetched", error: err.message });
} else {
console.log(result);
res.status(200).json(result);
}
});
});

//

// Forget Pass Login ,,

// Verify Email Endpoint
app.post("/verifyemail", (req, res) => {
const { email } = req.body;

if (!email) {
return res.status(400).json({ message: "Email is required" });
}

const CheckEmailQuery = "SELECT * FROM registeration WHERE email = ?";

db.query(CheckEmailQuery, [email], (err, result) => {
if (err) {
console.log("Error fetching email");
return res
.status(500)
.json({ message: "Error fetching email", error: err.message });
}

if (result.length === 0) {
return res.status(404).json({ message: "Email not found" });
}

return res.status(200).json({ message: "Email verified" });
});
});

// Reset Password Endpoint
app.post("/resetpassword", (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
return res.status(400).json({ message: "Email and password are required" });
}

const UpdatePasswordQuery =
"UPDATE registeration SET password = ? WHERE email = ?";

db.query(
UpdatePasswordQuery,
[password, email],
(updateErr, updateResult) => {
if (updateErr) {
console.log("Error updating password");
return res
.status(500)
.json({
message: "Error updating password",
error: updateErr.message,
});
}

console.log("Password updated successfully");
return res
.status(200)
.json({ message: "Password updated successfully !" });
}
);
});

app.post("/dletprdct", (req, res) => {
const queryDltproudct = "DELETE FROM ecart WHERE price = ?";
const { price } = req.body;

if (!price) {
return res.status(400).json({ message: "Price is required" });
}

db.query(queryDltproudct, [price], (err, result) => {
if (err) {
console.error("Error deleting product:", err);
return res.status(500).json({ message: "Database error" });
}
res
.status(200)
.json({
message: "Product deleted successfully",
affectedRows: result.affectedRows,
});
});
});

app.post("/addtocart", (req, res) => {
const { userId, userName, userMobile, userEmail, cart } = req.body;
const values = cart.map((item) => [
userId,
item.price,
item.name,
item.img,
item.quantity,
userName,
userMobile,
userEmail,
]);

const query =
"INSERT INTO carts (user_id, price, name, img, quantity, user_name, user_mobile, user_email) VALUES ?";
db.query(query, [values], (err, result) => {
if (err) {
console.log("Error adding items to cart", err.message);
return res
.status(500)
.json({ message: "Error adding items to cart", error: err.message });
}
console.log(result);
res.status(200).json({ message: "Items added to cart", result });
});
});

app.get("/fetchProductDetails", (req, res) => {
const Insertproductlist = "SELECT * FROM imgproduct";
db.query(Insertproductlist, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
console.log(result);
res.status(200).json(result);
}
});
});

//

app.get("/fetchProductHistory", (req, res) => {
const productHistorycarts = "SELECT * FROM carts";
db.query(productHistorycarts, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
console.log(result);
res.status(200).json(result);
}
});
});

app.get("/historyfetchcustomer", (req, res) => {
const historyItemscust = "SELECT * FROM custorder";
db.query(historyItemscust, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
console.log(result);
res.status(200).json(result);
}
});
});

//

app.post("/resetAdminPassword", (req, res) => {
const { adminuser, newPassword } = req.body;

if (!adminuser || !newPassword) {
return res
.status(400)
.json({
success: false,
message: "Username and new password are required",
});
}

// SQL query to
// check if the user exists
const checkUserQuery = "SELECT * FROM admindashboard WHERE adminuser = ?";
const updatePasswordQuery =
"UPDATE admindashboard SET adminpass = ? WHERE adminuser = ?";

db.query(checkUserQuery, [adminuser], (err, result) => {
if (err) {
console.log("Error fetching user:", err.message);
return res.status(500).json({
success: false,
message: "Error fetching data",
error: err.message,
});
}

if (result.length === 0) {
return res
.status(404)
.json({ success: false, message: "User not found!" });
}

// Update the password
db.query(updatePasswordQuery, [newPassword, adminuser], (updateErr) => {
if (updateErr) {
console.log("Error updating password:", updateErr.message);
return res.status(500).json({
success: false,
message: "Error updating password",
error: updateErr.message,
});
}

console.log("Password updated successfully!");
return res
.status(200)
.json({ success: true, message: "Password updated successfully!" });
});
});
});

//

// Admin_Update

app.post("/updateAdminSimple", (req, res) => {
const { olduser, adminuser, adminpass } = req.body;

if (!olduser || !adminuser || !adminpass) {
return res
.status(400)
.json({ success: false, message: "All fields are required." });
}

const updateQuery = `
UPDATE admindashboard
SET adminuser = ?, adminpass = ?
WHERE adminuser = ?
`;

db.query(updateQuery, [adminuser, adminpass, olduser], (err, result) => {
if (err) {
console.log("Update error:", err.message);
return res
.status(500)
.json({
success: false,
message: "Server error while updating admin.",
});
}

if (result.affectedRows === 0) {
return res
.status(404)
.json({ success: false, message: "Admin not found." });
}

return res
.status(200)
.json({ success: true, message: "Admin updated successfully." });
});
});


// Admin
//  Registeration ...

app.post("/fetchAdmin", (req, res) => {
const { adminuser, adminpass } = req.body;

// SQL query to check
// if the credentials match
const insertQueryLogin =
"SELECT * FROM admindashboard WHERE adminuser = ? AND adminpass = ?";

db.query(insertQueryLogin, [adminuser, adminpass], (err, result) => {
if (err) {
console.log("Error fetching user:", err);
res
.status(500)
.json({
success: false,
message: "Error fetching data",
error: err.message,
});
return;
}

if (result.length > 0) {
// User found,
// login successful
console.log("Login successful");
res.status(200).json({ success: true, message: "Login successful" });
} else {
// No user found with
//  the provided credentials
console.log("Invalid credentials");
res.status(401).json({ success: false, message: "Invalid credentials" });
}
});
});

app.post("/registerAdmin", (req, res) => {
const { adminuser, adminpass } = req.body;

if (!adminuser || !adminpass) {
return res
.status(400)
.json({ success: false, message: "Username and password are required" });
}

// Check if the
// admin already exists

const checkAdminQuery = "SELECT * FROM admindashboard WHERE adminuser = ?";
const insertAdminQuery =
"INSERT INTO admindashboard (adminuser, adminpass) VALUES (?, ?)";

db.query(checkAdminQuery, [adminuser], (err, result) => {
if (err) {
console.log("Error checking admin:", err.message);
return res.status(500).json({
success: false,
message: "Error checking admin",
error: err.message,
});
}

if (result.length > 0) {
return res
.status(409)
.json({ success: false, message: "Admin username already exists!" });
}

// Insert
// the new admin
db.query(insertAdminQuery, [adminuser, adminpass], (insertErr) => {
if (insertErr) {
console.log("Error inserting admin:", insertErr.message);
return res.status(500).json({
success: false,
message: "Error inserting admin",
error: insertErr.message,
});
}

console.log("Admin registered successfully!");
return res
.status(201)
.json({ success: true, message: "Admin registered successfully!" });
});
});
});

app.post("/addcartaddress", (req, res) => {
const { user, cartItems, addressDetails, paymentDetails } = req.body;

if (
!user ||
!cartItems ||
!cartItems.length ||
!addressDetails ||
!paymentDetails
) {
return res.status(400).json({ message: "Invalid data" });
}

const insertQuery = `
INSERT INTO custorder (
name, mob, email, id, productname, price, quantity, gender, add_name, country, pincode, address, state,
mobilenumber, alternativenumber, emailid, date, amount, payment_status, razorpay_order_id,
razorpay_payment_id, file_path
) VALUES ?
`;

const values = cartItems.map((item) => [
user.name,
user.mob,
user.email,
item.id,
item.productName,
item.price,
item.quantity || 1,
addressDetails.gender,
addressDetails.add_name,
addressDetails.country,
addressDetails.pincode,
addressDetails.address,
addressDetails.state,
addressDetails.mobilenumber,
addressDetails.alternativenumber,
addressDetails.emailid,
new Date(),
paymentDetails.amount,
paymentDetails.payment_status,
paymentDetails.razorpay_order_id,
paymentDetails.razorpay_payment_id,
item.file_path,
]);

db.query(insertQuery, [values], (err, result) => {
if (err) {
console.error("Error occurred:", err);
return res
.status(500)
.json({ message: "Error occurred", error: err.message });
}
console.log("Order successfully placed");
res.status(200).json({ message: "Order successfully placed" });
});
});

//

app.post("/updateform", (req, res) => {
const QueryUpdate =
"UPDATE registeration SET name = ?, email = ?, password = ?, mobileno = ? WHERE id = ?";
const { name, email, password, mobileno, id } = req.body;

if (!name || !email || !password || !mobileno || !id) {
return res.status(400).json({ message: "All fields are required" });
}

db.query(
QueryUpdate,
[name, email, password, mobileno, id],
(err, result) => {
if (err) {
console.log("Database update error:", err);
return res.status(500).json({ message: "Database update error" });
}
console.log("Updated Successfully");
res.status(200).json({ message: "Updated Successfully" });
}
);
});

//


// for Laptop ..

app.listen(PORT, () => {
console.log(`Server is running PORT on ${PORT}`);
});


// for mobile ..

// app.listen(3001, '0.0.0.0', () => {
// console.log("Backend running on port 3001");
// });

//

// Razorpay
// configuration

// rzp_live_Zm7uF61IDcY0t9
// FgZimfWqOEOLs4ejcIZHO7yc


const razorpayInstance = new Razorpay({
key_id: "rzp_live_Kh5Fut1EpwDwF5", //  Razorpay key_id
key_secret: "zV2WqzWm6CTf3qH5i0xnO1La", // Razorpay key_secret
});

app.post("/create-order", async (req, res) => {
const { amount } = req.body;

if (!amount || amount <= 0) {
return res.status(400).json({ error: "Invalid amount" });
}

const options = {
amount: amount * 100, // Amount in
// paise (multiply by 100)
currency: "INR",
receipt: `receipt#${Date.now()}`, // Unique receipt ID
payment_capture: 1, // Auto-capture payments
};

try {
const order = await razorpayInstance.orders.create(options);
res.json(order); // Return
// the created order
} catch (err) {
console.error("Error creating Razorpay order:", err);
res.status(500).json({ error: "Failed to create order" });
}
});

app.post("/verify-payment", (req, res) => {
const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
req.body;

const crypto = require("crypto");
const hmac = crypto.createHmac("sha256", razorpayInstance.key_secret);

hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
const generated_signature = hmac.digest("hex");

if (generated_signature === razorpay_signature) {
// Payment is verified
res.json({ success: true });
} else {
// Payment verification failed
res.status(400).json({ error: "Payment verification failed" });
}
});

// Dashboard

// Setting up
// Multer for file uploads

// Multer
// storage configuration

const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, "public/Images");
},
filename: (req, file, cb) => {
cb(null, Date.now() + path.extname(file.originalname));
},
});

// Configure
// multer for multiple fields

const upload = multer({
storage: storage,
});

app.post(
"/api/add-product",
upload.fields([
{ name: "image", maxCount: 1 },
{ name: "imageone", maxCount: 1 },
{ name: "imagetwo", maxCount: 1 },
{ name: "imagethree", maxCount: 1 },
]),
(req, res) => {
const { category, name, price, sizes, stock, description, review } =
req.body;

const imagePath = req.files.image
? `/Images/${req.files.image[0].filename}`
: null;
const imagePathOne = req.files.imageone
? `/Images/${req.files.imageone[0].filename}`
: null;
const imagePathTwo = req.files.imagetwo
? `/Images/${req.files.imagetwo[0].filename}`
: null;
const imagePathThree = req.files.imagethree
? `/Images/${req.files.imagethree[0].filename}`
: null;

const query =
"INSERT INTO imgproduct (img, name, price, file_path, sizes, file_path1, file_path2, file_path3, stock, description, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?)";

db.query(
query,
[
category,
name,
price,
imagePath,
sizes,
imagePathOne,
imagePathTwo,
imagePathThree,
stock,
description,
review,
],
(err, result) => {
if (err) {
console.error("Error inserting product into database:", err);
return res.status(500).send("Error adding product");
}
res.status(200).send("Product added successfully");
}
);
}
);

//

app.post("/api/update-product", upload.single("image"), (req, res) => {
const { oldName, newName, price } = req.body;
const imagePath = req.file ? `/Images/${req.file.filename}` : null;

// Query to
// update product data

let query = "UPDATE imgproduct SET name = ?, price = ?";
let queryParams = [newName, price];

if (imagePath) {
query += ", file_path = ?";
queryParams.push(imagePath);
}

query += " WHERE name = ?";
queryParams.push(oldName);

db.query(query, queryParams, (err, result) => {
if (err) {
console.error("Error updating product in database:", err);
return res.status(500).send("Error updating product");
}
res.status(200).send("Product updated successfully");
});
});

// Delete Product

app.post("/deletebyname", (req, res) => {
const { name } = req.body;

const deleteQuery = "DELETE FROM imgproduct WHERE name = ?";
db.query(deleteQuery, [name], (err, result) => {
if (err) {
console.error("Error deleting product:", err.message);
return res.status(500).json({ error: "Failed to delete product." });
}
if (result.affectedRows > 0) {
res.status(200).json({ message: "Product deleted successfully!" });
} else {
res.status(404).json({ error: "Product not found." });
}
});
});

app.get("/fetchDB", (req, res) => {
const productQuery = "SELECT * FROM imgproduct";

db.query(productQuery, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
const totalProducts = result.length;
res.status(200).json({ products: result, total: totalProducts });
}
});
});

app.get("/adminusersDeatils", (req, res) => {
const productQuery = "SELECT * FROM admindashboard";

db.query(productQuery, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
const totalProducts = result.length;
res.status(200).json({ products: result, total: totalProducts });
}
});
});

app.get("/usersDetails", (req, res) => {
const productQuery = "SELECT * FROM registeration";

db.query(productQuery, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
const totalProducts = result.length;
res.status(200).json({ products: result, total: totalProducts });
}
});
});

app.get("/amdinprofile", (req, res) => {
const productQuery = "SELECT * FROM admindashboard";

db.query(productQuery, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
const totalProducts = result.length;
res.status(200).json({ products: result, total: totalProducts });
}
});
});

app.get("/fetchCutomerOrder", (req, res) => {
const productQuery = "SELECT * FROM custorder";
db.query(productQuery, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
const totalProducts = result.length;
res.status(200).json({ products: result, total: totalProducts });
}
});
});

app.post("/fetchCutomerOrder", (req, res) => {
const { date } = req.body;

let query = "SELECT * FROM custorder";
let params = [];

if (date) {
query += " WHERE DATE(date) = ?";
params.push(date);
}

db.query(query, params, (err, results) => {
if (err) {
return res.status(500).json({ error: "DB error", details: err.message });
}

res.json({ products: results, total: results.length });
});
});



app.post("/updateOrderStatus", (req, res) => {

const { razorpay_order_id } = req.body;

const updateQuery = `
UPDATE custorder 
SET status_order = 'Order Delivered' 
WHERE razorpay_order_id = ?
`;


db.query(updateQuery, [razorpay_order_id], (err, result) => {
if (err) {
console.log("Update error:", err);
return res.status(500).json({ success: false, message: "DB error" });
}

if (result.affectedRows === 0) {
return res.status(404).json({ success: false, message: "Order not found" });
}

res.status(200).json({ success: true, message: "Order status updated" });

});
});



app.get("/usertotalnofo", (req, res) => {
const productQuery = "SELECT * FROM registeration";

db.query(productQuery, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
const totalProducts = result.length;
res.status(200).json({ products: result, total: totalProducts });
}
});
});
