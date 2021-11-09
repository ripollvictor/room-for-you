import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export async function subirArchivo(uri) {

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const storage = getStorage();
  const nombreImagen = Math.round(Math.random() * 100000000000);
  const imageRef = ref(storage, "images/" + nombreImagen);
  const result = await uploadBytes(imageRef, blob);
  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(imageRef);
}
