import {useState} from "react";
import UploadFile from "./components/UploadFile";
import UploadedTable from "./components/UploadedTable";
function App() {
  const [isUpload, setUpload] = useState(false);
  const [isStart, setStart] = useState(true);

  const handleState = () => {
    setUpload(true);
  };
  const resetState = () => {
    setUpload(false);
  };
  return (
    <div style={{backgroundColor: "#a3e1ec"}}>
      <UploadFile handleState={handleState} />
      <UploadedTable
        isStart={isStart}
        isUpload={isUpload}
        resetState={resetState}
      />
    </div>
  );
}

export default App;
