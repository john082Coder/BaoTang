import {useState, useEffect} from "react";
import axios from "axios";
import "./UploadFile.css";
import swal from "sweetalert";
import {
  SpectrumVisualizer,
  SpectrumVisualizerTheme,
} from "react-audio-visualizers";

var a;

const UploadFile = (props) => {
  const [preview, setPreview] = useState(false);
  const [audio, setAudio] = useState(null);

  function imgHandler(e) {
    setAudio(e.target.files[0]);
    setPreview(true);
  }

  const resetHandler = (event) => {
    setPreview(null);
    setAudio(null);
  };

  const submitImageForm = async () => {
    try {
      if (!audio) {
        return swal("Ops!", "Please select an audio file", "error");
      }
      const fd = new FormData();
      fd.append("myFile", audio);
      console.log("audio: ", audio);

      let response = await axios.post("http://193.148.63.79:3001/file/", fd);
      console.log("response: ", response);
      resetHandler(fd);
      props.handleState();
      swal("Success!", "File is uploded successfully", "success");
    } catch (error) {
      console.log("error: ", error);
      swal("Error!", "Something went wrong", "error");
    }
  };

  return (
    <div className="center">
      <div className="file-upload">
        {preview ? (
          <>
            <SpectrumVisualizer
              audio={audio}
              theme={SpectrumVisualizerTheme.line}
              colors={["red", "yellow"]}
              iconsColor="#1b82d6"
              backgroundColor="white"
              showMainActionIcon
              showLoaderIcon
              highFrequency={8000}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "5px 0px",
              }}
            >
              <p
                style={{
                  flex: 1,
                }}
              >
                {audio.name}
              </p>

              <button
                type="button"
                className="btn-close btn btn-danger "
                onClick={resetHandler}
              />
            </div>
          </>
        ) : (
          <div>
            <div className="image-upload-wrap">
              <input
                className="file-upload-input"
                type="file"
                accept=".mp3,audio/*"
                onChange={imgHandler}
              />

              <div className="drag-text">
                <h3>Drag and drop or select a file</h3>
              </div>
            </div>
            <div className="file-upload-content">
              <img className="file-upload-image" src={audio} alt="cook note" />
              <div className="image-title-wrap"></div>
            </div>
          </div>
        )}
        <button
          className="file-upload-btn"
          type="button"
          onClick={submitImageForm}
        >
          Upload file
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
