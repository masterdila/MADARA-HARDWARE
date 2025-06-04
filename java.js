import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHipBHzLZ-ULLOPU0SzckM4QnCWjNsUyA",
  authDomain: "powercallcrm.firebaseapp.com",
  projectId: "powercallcrm",
  storageBucket: "powercallcrm.appspot.com",
  messagingSenderId: "521012350596",
  appId: "1:521012350596:web:726d09157f3c70cd9370a0",
  measurementId: "G-ZFBETET9XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function: Save customer details
async function saveCustomerDetails() {
  const customerName = document.getElementById("customerName").value.trim();
  const customerEmail = document.getElementById("customerEmail").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const customerNic = document.getElementById("customerNic").value.trim();
  const customerAddress = document.getElementById("customerAddress").value.trim();
  const inquiryDetails = document.getElementById("inquiryDetails").value.trim();

  if (!customerName || !customerEmail || !customerPhone || !customerNic || !customerAddress || !inquiryDetails) {
    showCustomModal("Error", "Please fill in all required fields.");
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
  } catch (error) {
    console.error("Error saving document: ", error);
    showCustomModal("Error", "Failed to save customer details.");
  }
}

// Event listener: Lookup customer by NIC
document.getElementById("lookupButton").addEventListener("click", async () => {
  const nic = document.getElementById("nicLookup").value.trim();
  if (!nic) return;

  const docRef = doc(db, "customers", nic);
  const docSnap = await getDoc(docRef);

  const detailsDiv = document.getElementById("customerDetailsDisplay");
  const notFoundDiv = document.getElementById("noCustomerFound");

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
});

// Example modal function (you should define this or use your own modal logic)
function showCustomModal(title, message) {
  alert(${title}: ${message});
}
