
# @abdurrahmanabid/multi-file-upload

A simple yet powerful Express.js middleware for handling **single and multiple** file uploads using Multer.  
This package supports **custom file types, directory selection, error handling, and more**.

---

## 🚀 Features
✅ **Single & Multiple File Uploads**  
✅ **Custom Upload Directories**  
✅ **File Type Restrictions**  
✅ **Multer-based Efficient Storage**  
✅ **Comprehensive Error Handling**  

---

## 📌 Installation
Before using this package, ensure you have **Node.js** and **Express.js** installed.

### **1️⃣ Install the Package**
Run the following command:
```bash
npm install @abdurrahmanabid/multi-file-upload
```

> **Note:** `express` must be installed as it's a peer dependency. If not installed, run:
```bash
npm install express
```

### **2️⃣ Import the Package**
In your Express.js app:
```javascript
const uploadHandler = require("@abdurrahmanabid/multi-file-upload");
```

---

## 🎯 **Usage Examples**

### **1️⃣ Basic Single File Upload**
```javascript
const express = require("express");
const uploadHandler = require("@abdurrahmanabid/multi-file-upload");

const app = express();

app.post("/upload", uploadHandler("single"));

app.listen(3000, () => console.log("Server running on port 3000"));
```
✅ **Now, you can upload a single file using Postman!**

---

### **2️⃣ Upload Multiple Files**
```javascript
app.post("/upload-multiple", uploadHandler("multiple"));
```
- Upload multiple files via **Postman** using `form-data` with key **file**.

---

### **3️⃣ Restrict File Types (Only Images)**
```javascript
app.post("/upload-images", uploadHandler("single", ["image/png", "image/jpeg"]));
```
- This will **only** allow `.png` and `.jpg` files.

---

### **4️⃣ Upload to a Custom Directory**
```javascript
app.post("/upload-avatar", uploadHandler("single", [], "uploads/avatars"));
```
- Files will be stored in **uploads/avatars/** instead of the default **uploads/**.

---

## 🛠 **Advanced Configuration**
| Parameter       | Type     | Description                                       | Default      |
|---------------|---------|--------------------------------------------------|-------------|
| `uploadType`  | string  | `"single"` or `"multiple"`                        | `"single"`  |
| `acceptedTypes` | array  | Allowed file types (e.g., `["image/png"]`)       | `[]` (All)  |
| `directory`   | string  | Directory where files will be stored             | `"uploads/"` |

Example:
```javascript
app.post("/custom-upload", uploadHandler("multiple", ["image/png", "image/jpeg"], "custom_dir"));
```

---

## **📜 How to Use in Postman**
1. Open **Postman**.
2. Select **POST** method.
3. Enter the API endpoint, e.g., `http://localhost:3000/upload`.
4. Go to the **Body** tab ➝ Select **form-data**.
5. Use **Key**:
   - `"file"` for **single** or **multiple** uploads.
6. Click **Select File**, upload a file.
7. Click **Send**.

---

## ❌ **Common Issues & Solutions**
| Issue | Cause | Solution |
|-------|------|-----------|
| `Cannot find module 'express'` | Express is not installed | Run `npm install express` |
| `MulterError: Unexpected field` | Incorrect field name in Postman | Use `file` for single & `files` for multiple |
| `Invalid file type` | Unsupported file format | Pass correct MIME types in `acceptedTypes` |
