// DOM Elements
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const documentsList = document.getElementById("documentsList");

// Upload button click event
uploadBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (file) {
    uploadFileToCloudinary(file);
  } else {
    alert("Please select a file first!");
  }
});

// Upload file to Cloudinary
function uploadFileToCloudinary(file) {
  const url = "https://api.cloudinary.com/v1_1/db7r6pqcg/upload";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fileshare_preset");

  // Show uploading status
  const uploadingText = document.createElement("p");
  uploadingText.innerText = "Uploading...";
  documentsList.appendChild(uploadingText);

  fetch(url, {
    method: "POST",
    body: formData
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.secure_url) {
        console.log("File uploaded: ", data.secure_url);
        uploadingText.innerText = "Upload Complete!";
        saveDocumentMetadata(data.secure_url);
      } else {
        uploadingText.innerText = "Upload failed!";
        console.error("Upload failed. No URL returned.");
      }
    })
    .catch((err) => {
      console.error("Upload error: ", err);
      uploadingText.innerText = "Upload failed!";
    });
}

// Save document metadata to localStorage
function saveDocumentMetadata(url) {
  const currentDocument = {
    fileURL: url,
    uploadedAt: new Date().toISOString()
  };
  // Store only the current document
  localStorage.setItem("currentDocument", JSON.stringify(currentDocument));
  loadCurrentDocument();
}


// Load documents list
function loadCurrentDocument() {
  const documentsList = document.getElementById("documentsList");
  documentsList.innerHTML = "";  // Clear old list
  
  const currentDocument = JSON.parse(localStorage.getItem("currentDocument"));
  
  if (currentDocument) {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${currentDocument.fileURL}" target="_blank">
        Current Uploaded Document
      </a> 
      (Uploaded: ${new Date(currentDocument.uploadedAt).toLocaleString()})
    `;
    documentsList.appendChild(li);
  } else {
    documentsList.innerHTML = "<li>No file uploaded yet.</li>";
  }
}
      
window.onload = loadCurrentDocument;
