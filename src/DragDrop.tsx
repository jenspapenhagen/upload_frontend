import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PDF"];

function DragDrop() {
  const [file, setFile] = useState<File|null>(null);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const upload = (file: File) => {
    fetch('localhost:8080/upload', { 
      method: 'POST',
      headers: {
        "Content-Type": "You will perhaps need to define a content-type here"
      },
      body: file // This is your file object
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
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default DragDrop;