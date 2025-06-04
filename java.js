// Import Firebase SDKs (make sure to add these in your HTML before this script)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Firebase config (replace with your own)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    // Add other values if needed
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save customer details
async function saveCustomerDetails() {
    const customerName = document.getElementById("name").value.trim();
    const customerEmail = document.getElementById("email").value.trim();
    const customerPhone = document.getElementById("phone").value.trim();
    const customerNic = document.getElementById("nic").value.trim();
    const customerAddress = document.getElementById("address").value.trim();
    const inquiryDetails = document.getElementById("inquiry").value.trim();

    if (!customerNic) {
        alert("NIC is required");
        return;
    }

    try {
        await setDoc(doc(db, "customers", customerNic), {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            nic: customerNic,
            address: customerAddress,
            inquiry: inquiryDetails,
            timestamp: Date.now()
        });
        showCustomModal("Success", "Customer details saved successfully!");
        document.getElementById("customerForm").reset();
    } catch (err) {
        console.error("Error saving customer:", err);
        showCustomModal("Error", "Failed to save customer.");
    }
}

// Lookup by NIC
document.getElementById("lookupButton").addEventListener("click", async () => {
    const nic = document.getElementById("nicLookup").value.trim();
    const detailsDiv = document.getElementById("customerDetailsDisplay");
    const notFoundDiv = document.getElementById("noCustomerFound");
    const lookupBtn = document.getElementById("lookupButton");

    if (!nic) return;

    lookupBtn.disabled = true;
    lookupBtn.innerHTML = <span class="loader"></span>;

    try {
        const docRef = doc(db, "customers", nic);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById("displayCustomerName").textContent = data.name || "";
            document.getElementById("displayCustomerEmail").textContent = data.email || "";
            document.getElementById("displayCustomerPhone").textContent = data.phone || "";
            document.getElementById("displayCustomerNic").textContent = data.nic || "";
            document.getElementById("displayCustomerAddress").textContent = data.address || "";
            document.getElementById("displayInquiryDetails").textContent = data.inquiry || "";

            detailsDiv.classList.remove("hidden");
            notFoundDiv.classList.add("hidden");
        } else {
            detailsDiv.classList.add("hidden");
            notFoundDiv.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error looking up customer:", error);
        alert("Failed to lookup customer. Check console.");
    } finally {
        lookupBtn.disabled = false;
        lookupBtn.innerHTML = Lookup;
    }
});
