import {useState, useEffect} from "react";
import axios from "axios";

const UploadedTable = ({isUpload, resetState, isStart}) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (isUpload || isStart) {
      (async () => {
        try {
          const {
            data: {data},
          } = await axios.get("http://193.148.63.79:3001/file/");
          console.log("data: ", data);
          setFiles(data);
        } catch (e) {
          console.log("e: ", e);
        }
      })();
    }
    resetState();
    console.log("isUpload: ", isUpload);
  }, [isUpload]);
  const handleDownload = async (filename, orginalName) => {
    fetch(`http://193.148.63.79:3001/${filename}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = orginalName;
        a.click();
      });
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">Server_File_Name</th>
                <th scope="col">Orginal_File_Name</th>

                <th scope="col">CreatedAt</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file._id}>
                  <td>{file.image}</td>
                  <td>{file.originalName}</td>
                  <td>{new Date(file.createdAt).toDateString()}</td>
                  <td>
                    <span
                      style={{cursor: "pointer"}}
                      onClick={() =>
                        handleDownload(file.image, file.originalName)
                      }
                    >
                      <i className="fa fa-download" aria-hidden="true"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadedTable;
