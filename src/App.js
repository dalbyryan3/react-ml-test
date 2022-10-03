import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ImageUploading from 'react-images-uploading';


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

function ObjectDetection() {
  const maxNumber = 1;
  const [images, setImages] = React.useState([]);
  const onChange = (imageList, addUpdateIdx) => {
    console.log(imageList, addUpdateIdx);
    setImages(imageList)
  };

  return (
    <div className="ObjectDetection">
      <header className="ObjectDetection-header">
          <h1>
              Object Detection
          </h1>
      </header>

      <div className='ObjectDetection-body'>
        <ImageUploading
          multiple
          value={images}
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
              {/* {<div {...dragProps}>
                {isDragging ? "Drop here please" : "Upload space"}
                {imageList.map((image, index) => (
                  <img key={index} src={image.data_url} />
                ))}
              </div>} */}
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
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
}