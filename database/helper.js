import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export function subirArchivo(file) {
  const imageRef = ref(storage, "images/" + Math.round(Math.random() * 10000));
  uploadString(imageRef, file, "data_url")
    .then((snapshot) => {
      console.log("Uploaded", snapshot.totalBytes, "bytes.");
      console.log("File metadata:", snapshot.metadata);
      // Let's get a download URL for the file.
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("File available at", url);
        // ...
      });
    })
    .catch((error) => {
      console.error("Upload failed", error);
      // ...
    });
}
