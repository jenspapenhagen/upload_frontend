import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PDF"];

function DragDrop() {
  const [file, setFile] = useState<File|null>(null);

  const handleChange = (file: File) => {
    setFile(file);
  };
  
  useEffect(()=> {    
    if (file) {
       upload(file);
    }   
  },[file]);

  //get URL from env
  const url:string = process.env.API_URL ?? 'http://localhost:8080/files.html';

  const upload = (file: File) => {
    const formData = new FormData()
    formData.append("fileupload", file, file.name);

    fetch(url, { 
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
    }).catch(
      error => console.log(error)
    );
  };
  
  return (
    <FileUploader handleChange={handleChange} name="fileupload" types={fileTypes} />
  );
}

export default DragDrop;