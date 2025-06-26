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


app.get("/registeration", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public._registeration");
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


// app.post("/postqty", (req, res) => {
// const insertRegster = "INSERT INTO ecart VALUES  (?,?,?)";
// const { price, name, img } = req.body;

// db.query(insertRegster, [price, name, img], (err, result) => {
// if (err) {
// console.log("Error fetched");
// res.status(500).json({ message: "Error fetched", error: err.message });
// } else {
// console.log("Total successfully");
// res.status(200).json({ message: "Total successfully" });
// }
// });
// });

//

app.post("/postqty", async (req, res) => {
  const { price, name, img } = req.body;

  const insertQuery = `
    INSERT INTO _ecart (price, name, img)
    VALUES ($1, $2, $3)
  `;

  try {
    await pool.query(insertQuery, [price, name, img]);
    console.log("Total successfully");
    res.status(200).json({ message: "Total successfully" });
  } catch (err) {
    console.error("Error fetched:", err.message);
    res.status(500).json({ message: "Error fetched", error: err.message });
  }
});


// app.post("/postqty", (req, res) => {
// const insertRegster = "INSERT INTO ecart VALUES  (?,?,?)";
// const { price, name, img } = req.body;

// db.query(insertRegster, [price, name, img], (err, result) => {
// if (err) {
// console.log("Error fetched");
// res.status(500).json({ message: "Error fetched", error: err.message });
// } else {
// console.log("Total successfully");
// res.status(200).json({ message: "Total successfully" });
// }
// });
// });

//

app.post("/postqty", async (req, res) => {
  const { price, name, img } = req.body;

  const insertQuery = `
    INSERT INTO _ecart (price, name, img)
    VALUES ($1, $2, $3)
  `;

  try {
    await pool.query(insertQuery, [price, name, img]);
    console.log("Total successfully");
    res.status(200).json({ message: "Total successfully" });
  } catch (err) {
    console.error("Error fetched:", err.message);
    res.status(500).json({ message: "Error fetched", error: err.message });
  }
});


// app.post("/registerationPost", (req, res) => {
// const { name, email, password, mobileno } = req.body;

// // Check for duplicate mobile

// const checkMobileQuery =
// "SELECT mobileno FROM registeration WHERE mobileno = ? LIMIT 1";
// db.query(checkMobileQuery, [mobileno], (err, mobileResults) => {
// if (err) {
// console.error("Database error (mobile):", err);
// return res.status(200).json({
// success: false,
// message: "System error. Please try later.",
// });
// }


// if (mobileResults.length > 0) {
// return res.status(200).json({
// success: false,
// message: "Mobile number already registered",
// });
// }

// // Check for duplicate email

// const checkEmailQuery =
// "SELECT email FROM registeration WHERE email = ? LIMIT 1";
// db.query(checkEmailQuery, [email], (err, emailResults) => {
// if (err) {
// console.error("Database error (email):", err);
// return res.status(200).json({
// success: false,
// message: "System error. Please try later.",
// });
// }

// if (emailResults.length > 0) {
// return res.status(200).json({
// success: false,
// message: "Email address already registered",
// });
// }

// // Insert new user

// const insertQuery =
// "INSERT INTO registeration (name, email, password, mobileno) VALUES (?, ?, ?, ?)";
// db.query(
// insertQuery,
// [name, email, password, mobileno],
// (err, result) => {
// if (err) {
// console.error("Registration error:", err);
// return res.status(200).json({
// success: false,
// message: "Registration failed. Try again.",
// });
// }
// return res.status(200).json({
// success: true,
// message: "Registered successfully",
// });
// }
// );
// });
// });
// });

//

app.post("/registerationPost", async (req, res) => {
  const { name, email, password, mobileno } = req.body;

  try {
    // Step 1: Check for duplicate mobile
    const checkMobileQuery = `
      SELECT mobileno FROM _registeration WHERE mobileno = $1 LIMIT 1
    `;
    const mobileResult = await pool.query(checkMobileQuery, [mobileno]);

    if (mobileResult.rows.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Mobile number already registered",
      });
    }

    // Step 2: Check for duplicate email
    const checkEmailQuery = `
      SELECT email FROM _registeration WHERE email = $1 LIMIT 1
    `;
    const emailResult = await pool.query(checkEmailQuery, [email]);

    if (emailResult.rows.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Email address already registered",
      });
    }

    // Step 3: Insert new user
    const insertQuery = `
      INSERT INTO _registeration (name, email, password, mobileno)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(insertQuery, [name, email, password, mobileno]);

    return res.status(200).json({
      success: true,
      message: "Registered successfully",
    });

  } catch (err) {
    console.error("❌ Registration error:", err.message);
    return res.status(500).json({
      success: false,
      message: "System error. Please try later.",
    });
  }
});



// app.get("/fetchCartGet", (req, res) => {
// const FetchQuery = "SELECT * FROM ecart";
// db.query(FetchQuery, (err, result) => {
// if (err) {
// console.log("Error fetched");
// res.status(500).json({ message: "Error fetched", error: err.message });
// } else {
// console.log(result);
// res.status(200).json(result);
// }
// });
// });

app.get("/fetchCartGet", async (req, res) => {
  const fetchQuery = "SELECT * FROM _ecart";

  try {
    const result = await pool.query(fetchQuery);
    console.log(result.rows); // .rows needed in PostgreSQL
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetched:", err.message);
    res.status(500).json({ message: "Error fetched", error: err.message });
  }
});


// ProductList

app.use(express.static(path.join(__dirname, "public")));

// Products API

// app.get("/fetchProductslistTshirt", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Mango Pickle')`;

// // Execute the query
// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });


app.get("/fetchProductslistTshirt", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Mango Pickle']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});



// app.get("/fetchProductslistChilli", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Chilli')`;

// // Execute the query
// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });


app.get("/fetchProductslistChilli", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Chilli']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});



// app.get("/fetchProductslistJeans", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Jeans')`;

// // Execute the query
// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });


app.get("/fetchProductslistJeans", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Jeans']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});


// app.get("/fetchProductslistShirt", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Carrot')`;

// // Execute the query
// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });



app.get("/fetchProductslistShirt", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Carrot']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});


// app.get("/fetchProductslistJeans", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Jeans')`;

// // Execute the query

// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });


app.get("/fetchProductslistJeans", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Jeans']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});


// app.get("/fetchProductslistPants", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Lemon')`;

// // Execute the query

// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });


app.get("/fetchProductslistPants", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Lemon']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});



// app.get("/fetchProductslistSweatshirt", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Bitter')`;

// // Execute the query
// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });


app.get("/fetchProductslistSweatshirt", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Bitter']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});


// app.get("/fetchProductslistShorts", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Garlic')`;

// // Execute the query
// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });


app.get("/fetchProductslistShorts", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Garlic']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});


// app.get("/fetchProductslistTrouser", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Ghee')`;

// // Execute the query
// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });


app.get("/fetchProductslistTrouser", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Ghee']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});


// app.get("/fetchProductslistBlazers", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Aavla')`;

// // Execute the query
// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });

// ..


app.get("/fetchProductslistBlazers", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Aavla']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});


// app.get("/fetchProductslistHoodies", (req, res) => {
// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER('Mixed')`;

// // Execute the query
// db.query(exactMatchQuery, (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(results);
// });
// });

app.get("/fetchProductslistHoodies", async (req, res) => {
  const exactMatchQuery = `
    SELECT *
    FROM _imgproduct
    WHERE LOWER(img) = LOWER($1)
  `;

  try {
    const result = await pool.query(exactMatchQuery, ['Mixed']);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});


// from here

// app.get("/fetchProductslist", (req, res) => {
// const searchQuery = req.query.search || "";

// const keywords = searchQuery.toLowerCase().split(/\s+/);
// const conditions = keywords
// .map((keyword) => `LOWER(name) LIKE ?`)
// .join(" AND ");
// const advancedSearchQuery = `
// SELECT *
// FROM imgproduct
// WHERE ${conditions}
// `;
// const advancedSearchValues = keywords.map((keyword) => `%${keyword}%`);

// db.query(
// advancedSearchQuery,
// advancedSearchValues,
// (err, advancedResults) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// if (advancedResults.length > 0) {
// return res.json(advancedResults);
// }

// // If no advanced results,
// // check exact match

// const exactMatchQuery = `
// SELECT *
// FROM imgproduct
// WHERE LOWER(img) = LOWER(?)
// `;
// const values = [searchQuery];

// db.query(exactMatchQuery, values, (err, exactResults) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }

// res.json(exactResults);
// });
// }
// );
// });



// fetchProductslist PostGreSQL 

app.get("/fetchProductslist", async (req, res) => {
  const searchQuery = req.query.search || "";
  const keywords = searchQuery.toLowerCase().split(/\s+/);

  try {
    const conditions = keywords.map((_, index) => `LOWER(name) ILIKE $${index + 1}`).join(" AND ");
    const values = keywords.map((keyword) => `%${keyword}%`);

    const query = `
      SELECT * FROM _imgproduct
      WHERE ${conditions}
    `;

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      return res.json(result.rows);
    }

    const exactMatchQuery = `
      SELECT * FROM _imgproduct
      WHERE LOWER(img) = LOWER($1)
    `;
    const exactResult = await pool.query(exactMatchQuery, [searchQuery]);

    res.json(exactResult.rows);
  } catch (err) {
    console.error("❌ Database query failed:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});



// app.get("/fetchProductslist", (req, res) => {
// db.query("SELECT * FROM imgproduct", (err, results) => {
// if (err) {
// console.error("Error fetching data:", err.stack);
// return res.status(500).json({ error: "Database query failed" });
// }
// res.json(results);
// });
// });

//

app.get("/fetchProductslist", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM _imgproduct");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});



// app.get("/fetchProductDetails", (req, res) => {
// const Insertproductlist = "SELECT * FROM imgproduct";
// db.query(Insertproductlist, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// console.log(result);
// res.status(200).json(result);
// }
// });
// });

//


app.get("/fetchProductDetails", async (req, res) => {
  const fetchQuery = "SELECT * FROM _imgproduct";

  try {
    const result = await pool.query(fetchQuery);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
});


// app.post("/fetchlogin", (req, res) => {
// const FetchQuery = "SELECT * FROM registeration";
// db.query(FetchQuery, (err, result) => {
// if (err) {
// console.log("Error fetched");
// res.status(500).json({ message: "Error fetched", error: err.message });
// } else {
// console.log(result);
// res.status(200).json(result);
// }
// });
// });

//

app.post("/fetchlogin", async (req, res) => {
  const fetchQuery = "SELECT * FROM _registeration";

  try {
    const result = await pool.query(fetchQuery);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetched:", err.message);
    res.status(500).json({ message: "Error fetched", error: err.message });
  }
});


// Forget Pass Login ,,

// Verify Email Endpoint
// app.post("/verifyemail", (req, res) => {
// const { email } = req.body;

// if (!email) {
// return res.status(400).json({ message: "Email is required" });
// }

// const CheckEmailQuery = "SELECT * FROM registeration WHERE email = ?";

// db.query(CheckEmailQuery, [email], (err, result) => {
// if (err) {
// console.log("Error fetching email");
// return res
// .status(500)
// .json({ message: "Error fetching email", error: err.message });
// }

// if (result.length === 0) {
// return res.status(404).json({ message: "Email not found" });
// }

// return res.status(200).json({ message: "Email verified" });
// });
// });

app.post("/verifyemail", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const checkEmailQuery = "SELECT * FROM _registeration WHERE email = $1";

  try {
    const result = await pool.query(checkEmailQuery, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    return res.status(200).json({ message: "Email verified" });
  } catch (err) {
    console.error("Error fetching email:", err.message);
    return res
      .status(500)
      .json({ message: "Error fetching email", error: err.message });
  }
});

// Reset Password Endpoint
// app.post("/resetpassword", (req, res) => {
// const { email, password } = req.body;

// if (!email || !password) {
// return res.status(400).json({ message: "Email and password are required" });
// }

// const UpdatePasswordQuery =
// "UPDATE registeration SET password = ? WHERE email = ?";

// db.query(
// UpdatePasswordQuery,
// [password, email],
// (updateErr, updateResult) => {
// if (updateErr) {
// console.log("Error updating password");
// return res
// .status(500)
// .json({
// message: "Error updating password",
// error: updateErr.message,
// });
// }

// console.log("Password updated successfully");
// return res
// .status(200)
// .json({ message: "Password updated successfully !" });
// }
// );
// });


app.post("/resetpassword", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  const updatePasswordQuery =
    "UPDATE _registeration SET password = $1 WHERE email = $2";

  try {
    await pool.query(updatePasswordQuery, [password, email]);

    console.log("Password updated successfully");
    return res
      .status(200)
      .json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("Error updating password:", err.message);
    return res.status(500).json({
      message: "Error updating password",
      error: err.message,
    });
  }
});


// app.post("/dletprdct", (req, res) => {
// const queryDltproudct = "DELETE FROM ecart WHERE price = ?";
// const { price } = req.body;

// if (!price) {
// return res.status(400).json({ message: "Price is required" });
// }

// db.query(queryDltproudct, [price], (err, result) => {
// if (err) {
// console.error("Error deleting product:", err);
// return res.status(500).json({ message: "Database error" });
// }
// res
// .status(200)
// .json({
// message: "Product deleted successfully",
// affectedRows: result.affectedRows,
// });
// });
// });


app.post("/dletprdct", async (req, res) => {
  const { price } = req.body;

  if (!price) {
    return res.status(400).json({ message: "Price is required" });
  }

  const deleteQuery = "DELETE FROM _ecart WHERE price = $1";

  try {
    const result = await pool.query(deleteQuery, [price]);

    res.status(200).json({
      message: "Product deleted successfully",
      affectedRows: result.rowCount, // PostgreSQL uses rowCount
    });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ message: "Database error", error: err.message });
  }
});


// app.post("/addtocart", (req, res) => {
// const { userId, userName, userMobile, userEmail, cart } = req.body;
// const values = cart.map((item) => [
// userId,
// item.price,
// item.name,
// item.img,
// item.quantity,
// userName,
// userMobile,
// userEmail,
// ]);

// const query =
// "INSERT INTO carts (user_id, price, name, img, quantity, user_name, user_mobile, user_email) VALUES ?";
// db.query(query, [values], (err, result) => {
// if (err) {
// console.log("Error adding items to cart", err.message);
// return res
// .status(500)
// .json({ message: "Error adding items to cart", error: err.message });
// }
// console.log(result);
// res.status(200).json({ message: "Items added to cart", result });
// });
// });


app.post("/addtocart", async (req, res) => {
  const { userId, userName, userMobile, userEmail, cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

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

  const insertQuery = `
    INSERT INTO _carts (
      user_id, price, name, img, quantity, user_name, user_mobile, user_email
    ) VALUES 
    ${values.map((_, i) => `($${i * 8 + 1}, $${i * 8 + 2}, $${i * 8 + 3}, $${i * 8 + 4}, $${i * 8 + 5}, $${i * 8 + 6}, $${i * 8 + 7}, $${i * 8 + 8})`).join(", ")}
  `;

  // Flatten the values array for query parameters
  const flatValues = values.flat();

  try {
    const result = await pool.query(insertQuery, flatValues);
    console.log("Items added to cart");
    res.status(200).json({ message: "Items added to cart", rowCount: result.rowCount });
  } catch (err) {
    console.error("Error adding items to cart:", err.message);
    res.status(500).json({ message: "Error adding items to cart", error: err.message });
  }
});


// app.get("/fetchProductDetails", (req, res) => {
// const Insertproductlist = "SELECT * FROM imgproduct";
// db.query(Insertproductlist, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// console.log(result);
// res.status(200).json(result);
// }
// });
// });

//


app.get("/fetchProductDetails", async (req, res) => {
  const fetchQuery = "SELECT * FROM _imgproduct";

  try {
    const result = await pool.query(fetchQuery);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
});


// app.get("/fetchProductHistory", (req, res) => {
// const productHistorycarts = "SELECT * FROM carts";
// db.query(productHistorycarts, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// console.log(result);
// res.status(200).json(result);
// }
// });
// });

app.get("/fetchProductHistory", async (req, res) => {
  const fetchQuery = "SELECT * FROM _carts";

  try {
    const result = await pool.query(fetchQuery);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
});



// app.get("/historyfetchcustomer", (req, res) => {
// const historyItemscust = "SELECT * FROM custorder";
// db.query(historyItemscust, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// console.log(result);
// res.status(200).json(result);
// }
// });
// });

//


app.get("/historyfetchcustomer", async (req, res) => {
  const fetchQuery = "SELECT * FROM _custorder";

  try {
    const result = await pool.query(fetchQuery);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
});


// app.post("/resetAdminPassword", (req, res) => {
// const { adminuser, newPassword } = req.body;

// if (!adminuser || !newPassword) {
// return res
// .status(400)
// .json({
// success: false,
// message: "Username and new password are required",
// });
// }

// // SQL query to
// // check if the user exists
// const checkUserQuery = "SELECT * FROM admindashboard WHERE adminuser = ?";
// const updatePasswordQuery =
// "UPDATE admindashboard SET adminpass = ? WHERE adminuser = ?";

// db.query(checkUserQuery, [adminuser], (err, result) => {
// if (err) {
// console.log("Error fetching user:", err.message);
// return res.status(500).json({
// success: false,
// message: "Error fetching data",
// error: err.message,
// });
// }

// if (result.length === 0) {
// return res
// .status(404)
// .json({ success: false, message: "User not found!" });
// }

// // Update the password
// db.query(updatePasswordQuery, [newPassword, adminuser], (updateErr) => {
// if (updateErr) {
// console.log("Error updating password:", updateErr.message);
// return res.status(500).json({
// success: false,
// message: "Error updating password",
// error: updateErr.message,
// });
// }

// console.log("Password updated successfully!");
// return res
// .status(200)
// .json({ success: true, message: "Password updated successfully!" });
// });
// });
// });

//


app.post("/resetAdminPassword", async (req, res) => {
  const { adminuser, newPassword } = req.body;

  if (!adminuser || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Username and new password are required",
    });
  }

  const checkUserQuery = "SELECT * FROM _admindashboard WHERE _adminuser = $1";
  const updatePasswordQuery =
    "UPDATE _admindashboard SET _adminpass = $1 WHERE _adminuser = $2";

  try {
    const result = await pool.query(checkUserQuery, [adminuser]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    await pool.query(updatePasswordQuery, [newPassword, adminuser]);

    console.log("Password updated successfully!");
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully!" });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while processing your request",
      error: err.message,
    });
  }
});


// Admin_Update

// app.post("/updateAdminSimple", (req, res) => {
// const { olduser, adminuser, adminpass } = req.body;

// if (!olduser || !adminuser || !adminpass) {
// return res
// .status(400)
// .json({ success: false, message: "All fields are required." });
// }

// const updateQuery = `
// UPDATE admindashboard
// SET adminuser = ?, adminpass = ?
// WHERE adminuser = ?
// `;

// db.query(updateQuery, [adminuser, adminpass, olduser], (err, result) => {
// if (err) {
// console.log("Update error:", err.message);
// return res
// .status(500)
// .json({
// success: false,
// message: "Server error while updating admin.",
// });
// }

// if (result.affectedRows === 0) {
// return res
// .status(404)
// .json({ success: false, message: "Admin not found." });
// }

// return res
// .status(200)
// .json({ success: true, message: "Admin updated successfully." });
// });
// });


app.post("/updateAdminSimple", async (req, res) => {
  const { olduser, adminuser, adminpass } = req.body;

  if (!olduser || !adminuser || !adminpass) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const updateQuery = `
    UPDATE _admindashboard
    SET _adminuser = $1, _adminpass = $2
    WHERE _adminuser = $3
  `;

  try {
    const result = await pool.query(updateQuery, [adminuser, adminpass, olduser]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Admin updated successfully." });
  } catch (err) {
    console.error("Update error:", err.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error while updating admin.",
        error: err.message,
      });
  }
});

// Admin
//  Registeration ...


// app.post("/fetchAdmin", (req, res) => {
// const { adminuser, adminpass } = req.body;

// // SQL query to check
// // if the credentials match
// const insertQueryLogin =
// "SELECT * FROM admindashboard WHERE adminuser = ? AND adminpass = ?";

// db.query(insertQueryLogin, [adminuser, adminpass], (err, result) => {
// if (err) {
// console.log("Error fetching user:", err);
// res
// .status(500)
// .json({
// success: false,
// message: "Error fetching data",
// error: err.message,
// });
// return;
// }

// if (result.length > 0) {
// // User found,
// // login successful
// console.log("Login successful");
// res.status(200).json({ success: true, message: "Login successful" });
// } else {
// // No user found with
// //  the provided credentials
// console.log("Invalid credentials");
// res.status(401).json({ success: false, message: "Invalid credentials" });
// }
// });
// });

app.post("/fetchAdmin", async (req, res) => {
  const { adminuser, adminpass } = req.body;

  const loginQuery = `
    SELECT * FROM _admindashboard
    WHERE _adminuser = $1 AND _adminpass = $2
  `;

  try {
    const result = await pool.query(loginQuery, [adminuser, adminpass]);

    if (result.rows.length > 0) {
      // User found
      console.log("Login successful");
      return res.status(200).json({ success: true, message: "Login successful" });
    } else {
      // No match
      console.log("Invalid credentials");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error fetching user:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: err.message,
    });
  }
});


// app.post("/registerAdmin", (req, res) => {
// const { adminuser, adminpass } = req.body;

// if (!adminuser || !adminpass) {
// return res
// .status(400)
// .json({ success: false, message: "Username and password are required" });
// }

// // Check if the
// // admin already exists

// const checkAdminQuery = "SELECT * FROM admindashboard WHERE adminuser = ?";
// const insertAdminQuery =
// "INSERT INTO admindashboard (adminuser, adminpass) VALUES (?, ?)";

// db.query(checkAdminQuery, [adminuser], (err, result) => {
// if (err) {
// console.log("Error checking admin:", err.message);
// return res.status(500).json({
// success: false,
// message: "Error checking admin",
// error: err.message,
// });
// }

// if (result.length > 0) {
// return res
// .status(409)
// .json({ success: false, message: "Admin username already exists!" });
// }

// // Insert
// // the new admin
// db.query(insertAdminQuery, [adminuser, adminpass], (insertErr) => {
// if (insertErr) {
// console.log("Error inserting admin:", insertErr.message);
// return res.status(500).json({
// success: false,
// message: "Error inserting admin",
// error: insertErr.message,
// });
// }

// console.log("Admin registered successfully!");
// return res
// .status(201)
// .json({ success: true, message: "Admin registered successfully!" });
// });
// });
// });


app.post("/registerAdmin", async (req, res) => {
  const { adminuser, adminpass } = req.body;

  if (!adminuser || !adminpass) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  const checkAdminQuery = "SELECT * FROM _admindashboard WHERE adminuser = $1";
  const insertAdminQuery = "INSERT INTO _admindashboard (adminuser, adminpass) VALUES ($1, $2)";
  
  try {
    const result = await pool.query(checkAdminQuery, [adminuser]);

    if (result.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Admin username already exists!",
      });
    }

    await pool.query(insertAdminQuery, [adminuser, adminpass]);

    console.log("Admin registered successfully!");
    return res.status(201).json({
      success: true,
      message: "Admin registered successfully!",
    });
  } catch (err) {
    console.error("Error inserting admin:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error while registering admin",
      error: err.message,
    });
  }
});


// app.post("/addcartaddress", (req, res) => {
// const { user, cartItems, addressDetails, paymentDetails } = req.body;

// if (
// !user ||
// !cartItems ||
// !cartItems.length ||
// !addressDetails ||
// !paymentDetails
// ) {
// return res.status(400).json({ message: "Invalid data" });
// }

// const insertQuery = `
// INSERT INTO custorder (
// name, mob, email, id, productname, price, quantity, gender, add_name, country, pincode, address, state,
// mobilenumber, alternativenumber, emailid, date, amount, payment_status, razorpay_order_id,
// razorpay_payment_id, file_path
// ) VALUES ?
// `;

// const values = cartItems.map((item) => [
// user.name,
// user.mob,
// user.email,
// item.id,
// item.productName,
// item.price,
// item.quantity || 1,
// addressDetails.gender,
// addressDetails.add_name,
// addressDetails.country,
// addressDetails.pincode,
// addressDetails.address,
// addressDetails.state,
// addressDetails.mobilenumber,
// addressDetails.alternativenumber,
// addressDetails.emailid,
// new Date(),
// paymentDetails.amount,
// paymentDetails.payment_status,
// paymentDetails.razorpay_order_id,
// paymentDetails.razorpay_payment_id,
// item.file_path,
// ]);

// db.query(insertQuery, [values], (err, result) => {
// if (err) {
// console.error("Error occurred:", err);
// return res
// .status(500)
// .json({ message: "Error occurred", error: err.message });
// }
// console.log("Order successfully placed");
// res.status(200).json({ message: "Order successfully placed" });
// });
// });


app.post("/addcartaddress", async (req, res) => {
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
    new Date(), // auto date
    paymentDetails.amount,
    paymentDetails.payment_status,
    paymentDetails.razorpay_order_id,
    paymentDetails.razorpay_payment_id,
    item.file_path,
  ]);

  // Prepare dynamic placeholders like ($1,$2,...), ($23,$24,...)
  const valuePlaceholders = values
    .map(
      (_, i) =>
        `(${Array.from({ length: 22 }, (_, j) => `$${i * 22 + j + 1}`).join(", ")})`
    )
    .join(", ");

  const insertQuery = `
    INSERT INTO _custorder (
      name, mob, email, id, productname, price, quantity, gender,
      add_name, country, pincode, address, state,
      mobilenumber, alternativenumber, emailid, date, amount,
      payment_status, razorpay_order_id, razorpay_payment_id, file_path
    )
    VALUES ${valuePlaceholders}
  `;

  const flatValues = values.flat();

  try {
    await pool.query(insertQuery, flatValues);
    console.log("Order successfully placed");
    res.status(200).json({ message: "Order successfully placed" });
  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});

//


// app.post("/updateform", (req, res) => {
// const QueryUpdate =
// "UPDATE registeration SET name = ?, email = ?, password = ?, mobileno = ? WHERE id = ?";
// const { name, email, password, mobileno, id } = req.body;

// if (!name || !email || !password || !mobileno || !id) {
// return res.status(400).json({ message: "All fields are required" });
// }

// db.query(
// QueryUpdate,
// [name, email, password, mobileno, id],
// (err, result) => {
// if (err) {
// console.log("Database update error:", err);
// return res.status(500).json({ message: "Database update error" });
// }
// console.log("Updated Successfully");
// res.status(200).json({ message: "Updated Successfully" });
// }
// );
// });

app.post("/updateform", async (req, res) => {
  const { name, email, password, mobileno, id } = req.body;

  if (!name || !email || !password || !mobileno || !id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const updateQuery = `
    UPDATE _registeration
    SET name = $1, email = $2, password = $3, mobileno = $4
    WHERE id = $5
  `;

  try {
    await pool.query(updateQuery, [name, email, password, mobileno, id]);
    console.log("Updated Successfully");
    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    console.error("Database update error:", err.message);
    res.status(500).json({ message: "Database update error", error: err.message });
  }
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

// const storage = multer.diskStorage({
// destination: (req, file, cb) => {
// cb(null, "public/Images");
// },
// filename: (req, file, cb) => {
// cb(null, Date.now() + path.extname(file.originalname));
// },
// });

// // Configure
// // multer for multiple fields

// const upload = multer({
// storage: storage,
// });

// app.post(
// "/api/add-product",
// upload.fields([
// { name: "image", maxCount: 1 },
// { name: "imageone", maxCount: 1 },
// { name: "imagetwo", maxCount: 1 },
// { name: "imagethree", maxCount: 1 },
// ]),
// (req, res) => {
// const { category, name, price, sizes, stock, description, review } =
// req.body;

// const imagePath = req.files.image
// ? `/Images/${req.files.image[0].filename}`
// : null;
// const imagePathOne = req.files.imageone
// ? `/Images/${req.files.imageone[0].filename}`
// : null;
// const imagePathTwo = req.files.imagetwo
// ? `/Images/${req.files.imagetwo[0].filename}`
// : null;
// const imagePathThree = req.files.imagethree
// ? `/Images/${req.files.imagethree[0].filename}`
// : null;

// const query =
// "INSERT INTO imgproduct (img, name, price, file_path, sizes, file_path1, file_path2, file_path3, stock, description, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?)";

// db.query(
// query,
// [
// category,
// name,
// price,
// imagePath,
// sizes,
// imagePathOne,
// imagePathTwo,
// imagePathThree,
// stock,
// description,
// review,
// ],
// (err, result) => {
// if (err) {
// console.error("Error inserting product into database:", err);
// return res.status(500).send("Error adding product");
// }
// res.status(200).send("Product added successfully");
// }
// );
// }
// );

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post(
  "/api/add-product",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "imageone", maxCount: 1 },
    { name: "imagetwo", maxCount: 1 },
    { name: "imagethree", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      category,
      name,
      price,
      sizes,
      stock,
      description,
      review,
    } = req.body;

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

    const query = `
      INSERT INTO _imgproduct (
        img, name, price, file_path, sizes, file_path1, file_path2,
        file_path3, stock, description, review
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;

    const values = [
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
    ];

    try {
      await pool.query(query, values);
      res.status(200).send("Product added successfully");
    } catch (err) {
      console.error("Error inserting product into database:", err.message);
      res.status(500).send("Error adding product");
    }
  }
);

//

// app.post("/api/update-product", upload.single("image"), (req, res) => {
// const { oldName, newName, price } = req.body;
// const imagePath = req.file ? `/Images/${req.file.filename}` : null;

// // Query to
// // update product data

// let query = "UPDATE imgproduct SET name = ?, price = ?";
// let queryParams = [newName, price];

// if (imagePath) {
// query += ", file_path = ?";
// queryParams.push(imagePath);
// }

// query += " WHERE name = ?";
// queryParams.push(oldName);

// db.query(query, queryParams, (err, result) => {
// if (err) {
// console.error("Error updating product in database:", err);
// return res.status(500).send("Error updating product");
// }
// res.status(200).send("Product updated successfully");
// });
// });

app.post("/api/update-product", upload.single("image"), async (req, res) => {
  const { oldName, newName, price } = req.body;
  const imagePath = req.file ? `/Images/${req.file.filename}` : null;

  try {
    let query = "UPDATE _imgproduct SET name = $1, price = $2";
    let queryParams = [newName, price];
    let paramIndex = 3;

    if (imagePath) {
      query += `, file_path = $${paramIndex}`;
      queryParams.push(imagePath);
      paramIndex++;
    }

    query += ` WHERE name = $${paramIndex}`;
    queryParams.push(oldName);

    await pool.query(query, queryParams);
    res.status(200).send("Product updated successfully");
  } catch (err) {
    console.error("Error updating product in database:", err.message);
    res.status(500).send("Error updating product");
  }
});


// Delete Product

// app.post("/deletebyname", (req, res) => {
// const { name } = req.body;

// const deleteQuery = "DELETE FROM imgproduct WHERE name = ?";
// db.query(deleteQuery, [name], (err, result) => {
// if (err) {
// console.error("Error deleting product:", err.message);
// return res.status(500).json({ error: "Failed to delete product." });
// }
// if (result.affectedRows > 0) {
// res.status(200).json({ message: "Product deleted successfully!" });
// } else {
// res.status(404).json({ error: "Product not found." });
// }
// });
// });


app.post("/deletebyname", async (req, res) => {
  const { name } = req.body;

  const deleteQuery = "DELETE FROM _imgproduct WHERE name = $1";

  try {
    const result = await pool.query(deleteQuery, [name]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Product deleted successfully!" });
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ error: "Failed to delete product." });
  }
});


// app.get("/fetchDB", (req, res) => {
// const productQuery = "SELECT * FROM imgproduct";

// db.query(productQuery, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// const totalProducts = result.length;
// res.status(200).json({ products: result, total: totalProducts });
// }
// });
// });

app.get("/fetchDB", async (req, res) => {
  const productQuery = "SELECT * FROM _imgproduct";

  try {
    const result = await pool.query(productQuery);
    const totalProducts = result.rows.length;

    res.status(200).json({ products: result.rows, total: totalProducts });
  } catch (err) {
    console.log("Fetch error:", err.message);
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
});

// app.get("/adminusersDeatils", (req, res) => {
// const productQuery = "SELECT * FROM admindashboard";

// db.query(productQuery, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// const totalProducts = result.length;
// res.status(200).json({ products: result, total: totalProducts });
// }
// });
// });

app.get("/adminusersDeatils", async (req, res) => {
  const productQuery = "SELECT * FROM _admindashboard";

  try {
    const result = await pool.query(productQuery);
    const totalProducts = result.rows.length;

    res.status(200).json({ products: result.rows, total: totalProducts });
  } catch (err) {
    console.log("Fetch error:", err.message);
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
});


// app.get("/usersDetails", (req, res) => {
// const productQuery = "SELECT * FROM registeration";

// db.query(productQuery, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// const totalProducts = result.length;
// res.status(200).json({ products: result, total: totalProducts });
// }
// });
// });


app.get("/usersDetails", async (req, res) => {
  const productQuery = "SELECT * FROM _registeration";

  try {
    const result = await pool.query(productQuery);
    const totalProducts = result.rows.length;

    res.status(200).json({ products: result.rows, total: totalProducts });
  } catch (err) {
    console.log("Fetch error:", err.message);
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
});


// app.get("/amdinprofile", (req, res) => {
// const productQuery = "SELECT * FROM admindashboard";

// db.query(productQuery, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// const totalProducts = result.length;
// res.status(200).json({ products: result, total: totalProducts });
// }
// });
// });


app.get("/amdinprofile", (req, res) => {
const productQuery = "SELECT * FROM _admindashboard";

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


// app.get("/fetchCutomerOrder", (req, res) => {
// const productQuery = "SELECT * FROM custorder";
// db.query(productQuery, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// const totalProducts = result.length;
// res.status(200).json({ products: result, total: totalProducts });
// }
// });
// });


app.get("/fetchCutomerOrder", async (req, res) => {
  const productQuery = "SELECT * FROM _custorder";

  try {
    const result = await pool.query(productQuery);
    const totalProducts = result.rows.length;

    res.status(200).json({ products: result.rows, total: totalProducts });
  } catch (err) {
    console.log("Fetch error:", err.message);
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
});


// app.post("/fetchCutomerOrder", (req, res) => {
// const { date } = req.body;

// let query = "SELECT * FROM custorder";
// let params = [];

// if (date) {
// query += " WHERE DATE(date) = ?";
// params.push(date);
// }

// db.query(query, params, (err, results) => {
// if (err) {
// return res.status(500).json({ error: "DB error", details: err.message });
// }

// res.json({ products: results, total: results.length });
// });
// });


app.post("/fetchCutomerOrder", async (req, res) => {
  const { date } = req.body;

  let query = "SELECT * FROM _custorder";
  let params = [];

  if (date) {
    query += " WHERE DATE(date) = $1";
    params.push(date);
  }

  try {
    const result = await pool.query(query, params);
    res.json({ products: result.rows, total: result.rows.length });
  } catch (err) {
    res.status(500).json({ error: "DB error", details: err.message });
  }
});


// app.post("/updateOrderStatus", (req, res) => {

// const { razorpay_order_id } = req.body;

// const updateQuery = `
// UPDATE custorder 
// SET status_order = 'Order Delivered' 
// WHERE razorpay_order_id = ?
// `;


// db.query(updateQuery, [razorpay_order_id], (err, result) => {
// if (err) {
// console.log("Update error:", err);
// return res.status(500).json({ success: false, message: "DB error" });
// }

// if (result.affectedRows === 0) {
// return res.status(404).json({ success: false, message: "Order not found" });
// }

// res.status(200).json({ success: true, message: "Order status updated" });

// });
// });


app.post("/updateOrderStatus", (req, res) => {

const { razorpay_order_id } = req.body;

const updateQuery = `
UPDATE _custorder 
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


// app.get("/usertotalnofo", (req, res) => {
// const productQuery = "SELECT * FROM registeration";

// db.query(productQuery, (err, result) => {
// if (err) {
// console.log("Fetch error");
// res.status(500).json({ message: "Fetch error", error: err.message });
// } else {
// const totalProducts = result.length;
// res.status(200).json({ products: result, total: totalProducts });
// }
// });
// });


app.get("/usertotalnofo", async (req, res) => {
  const productQuery = "SELECT * FROM _registeration";

  try {
    const result = await pool.query(productQuery);
    const totalProducts = result.rowCount;
    res.status(200).json({ products: result.rows, total: totalProducts });
  } catch (err) {
    console.log("Fetch error:", err.message);
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
});

