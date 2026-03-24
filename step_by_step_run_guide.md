# 📘 Step-by-Step Guide: Running the Bookstore Project

Follow these steps to get your full-stack bookstore application running from scratch.

---

## 📋 Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (Local or Atlas connection string in [.env](file:///c:/Users/Admin/Desktop/project/backend/.env))

---

## 🚀 Step 1: Prepare the Backend

1.  **Open a Terminal** (PowerShell or Command Prompt).
2.  **Navigate to the Backend Folder**:
    ```powershell
    cd "c:\Users\Admin\Desktop\project\backend"
    ```
3.  **Install Dependencies**:
    ```powershell
    npm install
    ```
4.  **Configure Environment**:
    Check the [.env](file:///c:/Users/Admin/Desktop/project/backend/.env) file to ensure your `MONGODB_URI` and `PORT` are correct.
5.  **Start the Server**:
    ```powershell
    npm run dev
    ```
    *Wait for the message: `🚀 Server running on http://localhost:5000`*

---

## 🎨 Step 2: Prepare the Frontend

1.  **Open a NEW Terminal Window**.
2.  **Navigate to the Frontend Folder**:
    ```powershell
    cd "c:\Users\Admin\Desktop\project\frontend"
    ```
3.  **Install Dependencies**:
    ```powershell
    npm install
    ```
4.  **Start the Application**:
    ```powershell
    npm start
    ```
    *This will automatically open your browser to `http://localhost:3000`.*

---

## ✅ Step 3: Verification

| Step | Action | Expected Result |
| :--- | :--- | :--- |
| **1** | Open `http://localhost:5000/api/health` | You should see `{"success": true, ...}` |
| **2** | Open `http://localhost:3000` | The Bookstore homepage should load. |
| **3** | Check Books | You should see a grid of books fetched from the API. |

---

## 🛠 Troubleshooting: Port Conflicts

If you see an error saying "Port already in use":

1.  **Find the PID (Process ID)**:
    ```powershell
    # For Backend (Port 5000)
    netstat -ano | findstr :5000
    # For Frontend (Port 3000)
    netstat -ano | findstr :3000
    ```
2.  **Kill the Process**:
    ```powershell
    taskkill /F /PID <THE_PID_FROM_PREVIOUS_STEP>
    ```

---

> [!TIP]
> **How to save as PDF:**
> 1. Open this file in **VS Code**.
> 2. Right-click anywhere and select **"Open Preview"**.
> 3. Use the command palette (`Ctrl+Shift+P`) and type **"Markdown: Export as PDF"** (requires an extension) OR simply **Print** the preview page from your browser.
