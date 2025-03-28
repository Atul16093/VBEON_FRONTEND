import { useEffect, useRef } from "react";

const FileComponent = ({isTrue , attachFalse})=>{
    const fileInputRef = useRef();
    useEffect(() => {
        if (isTrue && fileInputRef.current) {
          console.log("Triggering file input:", fileInputRef.current);
          fileInputRef.current.click();
          attachFalse(false);
        }
      }, [isTrue]); 
    return <>
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </>
}
export default FileComponent;