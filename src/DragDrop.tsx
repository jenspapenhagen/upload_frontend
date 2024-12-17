import { useCallback, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PDF"];

function DragDrop() {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (file: File) => {
    setFile(file);
    if (file) {
      upload();
    }
  };


  //get URL from env
  const url: string = process.env.API_URL ?? 'http://localhost:8080/files.html';

  const upload = useCallback(async () => {
    const formData = new FormData()
    if(!file) {
      console.log("file is not set");
      return;
    } 
    
    formData.append("fileupload", file, file.name);

    const response = await fetch(url, {
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
    });

    const { data, error } = await response.json();

    if (response.ok) {
      const payload = data?.payload;
      if (payload) {
        // validate payload       
        return payload
      } else {
        return Promise.reject(new Error(`No payload in the response`))
      }
    } else {
      // handle the errors
      return Promise.reject(error)
    }
    
  }, [file, url]);

  return (
    <FileUploader handleChange={handleChange} name="fileupload" types={fileTypes} data-testid="fileuploader" />
  );
}

export default DragDrop;