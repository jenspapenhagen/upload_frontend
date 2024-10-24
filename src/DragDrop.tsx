import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PDF"];

function DragDrop() {
  const [file, setFile] = useState<File|null>(null);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const upload = (file: File) => {
    const formData = new FormData()
    formData.append("fileupload", file, file.name);

    fetch('http://localhost:8080/files.html', { 
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'omit',
      referrer: 'no-referrer',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0',
      },
      body: formData
    }).then(
      response => response.json() // if the response is a JSON object
    ).then(
      success => console.log(success) // Handle the success response object
    ).catch(
      error => console.log(error) // Handle the error response object
    );
  };
  

  useEffect(()=> {    
    if (file) {
       upload(file);
    }   
  },[file]);

  return (
    <FileUploader handleChange={handleChange} name="fileupload" types={fileTypes} />
  );
}

export default DragDrop;