import { useCallback, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PDF"];

function DragDrop() {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (file: File | File[]) => {
    if (!Array.isArray(file)) {
      setFile(file);
      if (file) {
        uploadFile();
      }
    }

  };


  //get URL from env
  const url: string = process.env.API_URL ?? 'http://localhost:8080/files.html';

  const uploadFile = useCallback(async () => {
    if (!file) {
      console.log("file is not set");
      return;
    }

    getPayLoad(file)
      .catch((error: Error) => {
        console.log("payload can not be loaded");
        return Promise.reject(error);
      })
      .then((response: Response) => {
        response.json()
          .catch((error: Error) => {
            console.log("payload can not be conv. to JSON");
            return Promise.reject(error);
          })
          .then((data) => {
            const payload = data?.payload;
            // validate payload    
            if (payload) {
              return payload
            } else {
              return Promise.reject(new Error(`No payload in the response`))
            }
          })
      })

  }, [file, url]);

  const getPayLoad = async (file: File): Promise<Response> => {
    const formData = new FormData();
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

    return response;
  }

  return (
    <FileUploader handleChange={handleChange} name="fileupload" types={fileTypes} data-testid="fileuploader" />
  );
}

export default DragDrop;