import './App.css';
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ImageUploading from 'react-images-uploading';
import axios from 'axios';


export default function App() {
  return (
    <Router>
      <div className='App'>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/object-detection">Object Detection</Link>
            </li>
          </ul>
        </nav>
        <div className='App-body'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/object-detection" element={<ObjectDetection/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="Home">
        <header className="Home-header">
            <h1>
                React ML Test App
            </h1>
            <p>
                This is a React ML test app, a front-end connecting to various machine learning models and other data analysis backends that are expose through a REST API.
            </p>
        </header>
    </div>
  );
}

function ImageObjToB64Str(imageObj) {
  let imageObjStr = imageObj["data_url"];
  let idx = imageObjStr.indexOf(",");
  if (idx > 0) {
    imageObjStr = imageObjStr.slice(idx+1);
  }
  return imageObjStr;
}
function B64StrToImageObj(b64Str, imageTypeStr) {
  let imageTypePrefix = `data:image/${imageTypeStr};base64,`;
  return {data_url:`${imageTypePrefix}${b64Str}`};
}

function ObjectDetection() {
  // State
  const maxNumber = 1;
  const [stagedImages, setStagedImages] = React.useState([]);
  const [resultImages, setResultImages] = React.useState([]);

  // Functions
  const putImage = (imageObj) => {
    axios.put("http://127.0.0.1:5000/object-detector/image", {image:ImageObjToB64Str(imageObj)})
    .then((response) => {
      getImage();
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const getImage = () => {
    return axios.get("http://127.0.0.1:5000//object-detector/image")
    .then((response) => {
      let b64Str = response.data["image"];
      if (b64Str === "") {
        // console.log(`NO Server image`);
        setStagedImages([]);
      }
      else if (b64Str) {
        let serverImage = B64StrToImageObj(b64Str, "bmp");
        // console.log(`Server image: ${serverImage}`);
        if (serverImage !== undefined){
          setStagedImages([serverImage]);
        }
      }
    })
    .catch((error) => {
      console.log(`Error when getting staged image: ${error}`);
    });
  };
  const deleteImage = () => {
    return axios.delete("http://127.0.0.1:5000//object-detector/image")
    .then((response) => {
      getImage();
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const predictImage = () => {
    return axios.get("http://127.0.0.1:5000//object-detector")
    .then((response) => {
      let b64Str = response.data["result_image"];
      if (b64Str === "") {
        // console.log(`NO Server image`);
        setResultImages([]);
      }
      else if (b64Str) {
        let serverImage = B64StrToImageObj(b64Str, "bmp");
        // console.log(`Server image: ${serverImage}`);
        if (serverImage !== undefined){
          setResultImages([serverImage]);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // Hooks
  const onChange = (imageList, addUpdateIdx) => {
    if (stagedImages.length === 0 && imageList.length === 1){ // Image added
      putImage(imageList[0]);
    } else if (stagedImages.length === 1 && imageList.length === 1) { // Image updated
      putImage(imageList[0]);
    } else if (stagedImages.length === 1 && imageList.length === 0) { // Image removed
      deleteImage();
    }
  };
  useEffect(() => {
    getImage();
  }, []);

  // Render
  return (
    <div className="ObjectDetection">
      <header className="ObjectDetection-header">
          <h1>
              Object Detection
          </h1>
      </header>

      <div className='ObjectDetection-body'>
        <fieldset className='ObjectDetection-body-ImageUploading'>
          <legend>Upload Image</legend>
          <ImageUploading
            multiple
            value={stagedImages}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              errors,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                { errors && <div>
                {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
                {errors.acceptType && <span>Your selected file type is not allow</span>}
                {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                {errors.resolution && <span>Selected file is not match your desired resolution</span>}
                </div> }
                <button
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove all images</button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image["data_url"]} alt=""/>
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>Update</button>
                      <button onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </fieldset>
        <fieldset className='ObjectDetection-body-ObjectDetectionPredict'>
          <legend>Detect Objects</legend>
          <button onClick={predictImage}>Detect Objects</button>
          &nbsp;
          <img src={resultImages[0] ? resultImages[0]["data_url"] : undefined} alt=""/>
        </fieldset>
      </div>
    </div>
  );
}