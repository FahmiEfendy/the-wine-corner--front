import { useEffect, useRef, useState } from "react";

import { Button } from "@mui/material";

const style = {
  preview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  previewCentered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  previewContainer: {
    width: "13rem",
    height: "13rem",
    border: "1px solid #ccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "2rem 0rem .5rem 0rem",
  },
};

const ImageUpload = ({ id, setProductImage }) => {
  const filePickedRef = useRef();

  const [file, setFile] = useState();
  const [previewFile, setPreviewFile] = useState();

  const imagePickerHandler = () => {
    filePickedRef.current.click();
  };

  const imageChangeHandler = (event) => {
    let uploadedFile;

    if (event.target.files && event.target.files.length === 1) {
      uploadedFile = event.target.files[0];
      setFile(uploadedFile);
    }

    setProductImage(uploadedFile);
  };

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewFile(fileReader.result);
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="form-control">
      <input
        id={id}
        type="file"
        style={{ display: "none" }}
        accept=".jpg, .png, .jpeg"
        ref={filePickedRef}
        onChange={imageChangeHandler}
        onClick={imagePickerHandler}
      />
      <div style={style.previewCentered}>
        <div style={style.previewContainer}>
          {previewFile ? (
            <img src={previewFile} alt="Preview" style={style.preview} />
          ) : (
            <p>Please upload an image.</p>
          )}
        </div>
        <Button type="button" onClick={imagePickerHandler}>
          Input Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
