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
  let docs = JSON.parse(localStorage.getItem("documents")) || [];
  docs.push({
    fileURL: url,
    uploadedAt: new Date().toISOString()
  });
  localStorage.setItem("documents", JSON.stringify(docs));
  loadDocuments();
}

// Load documents list
function loadDocuments() {
  documentsList.innerHTML = "";
  let docs = JSON.parse(localStorage.getItem("documents")) || [];
  docs.forEach((doc, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "mb-3", "shadow-sm");
    li.innerHTML = `
      <div>
        <h5>📄 Document ${index + 1}</h5>
        <p>Uploaded: ${new Date(doc.uploadedAt).toLocaleString()}</p>
        <div class="d-flex gap-2">
          <a href="${doc.fileURL}" target="_blank" class="btn btn-success btn-sm">
            <i class="bi bi-eye"></i> View
          </a>
          <a href="${doc.fileURL}?download=true" class="btn btn-primary btn-sm" download>
            <i class="bi bi-download"></i> Download
          </a>
        </div>
      </div>
    `;
    documentsList.appendChild(li);
  });
}
