import { useRef, useEffect, useState } from "react";
import { Niivue } from "@niivue/niivue";

const NiiVue = ({ subjectID, roi }) => {
  const canvas = useRef(null); // Initialize with null to avoid errors
  const [originalFileExists, setOriginalFileExists] = useState(true); // Initialize as true
  const [overlayExists, setOverlayExists] = useState(true); // Initialize as true

  useEffect(() => {
    // Function to check if a file exists
    const checkOriginalFileExists = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setOriginalFileExists(false); // File doesn't exist
        }
      } catch (error) {
        setOriginalFileExists(false); // Error occurred, file doesn't exist
      }
    };

    const checkOverlayExists = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setOverlayExists(false); // File doesn't exist
        }
      } catch (error) {
        setOverlayExists(false); // Error occurred, file doesn't exist
      }
    };

    // Check if original scan exists
    const originalScanURL = `/content/Portal/Visualization/Subject_Scans/in/${subjectID}.nii.gz`;
    checkOriginalFileExists(originalScanURL);

    // Check if overlay exists
    const overlayURL = `/content/Portal/Visualization/Subject_Scans/out/${subjectID}_DLMUSE_${roi}.nii.gz`;
    checkOverlayExists(overlayURL);
  }, [subjectID, roi]);

  // Conditionally render the error message or canvas
  if (!originalFileExists) {
    // Display an error message if the original file does not exist
    return <p>Error: Original scan does not exist.</p>;
  }

  const volumeList = [];
  // Add the original scan
  const originalScan = {
    url: `/content/Portal/Visualization/Subject_Scans/in/${subjectID}.nii.gz`,
    colormap: "gray",
    opacity: 1,
  };
  volumeList.push(originalScan);

  // Add the overlay, if it exists
  if (overlayExists) {
    const overlay = {
      url: `/content/Portal/Visualization/Subject_Scans/out/${subjectID}_DLMUSE_${roi}.nii.gz`,
      colormap: "red",
      opacity: 0.5,
    };
    volumeList.push(overlay);
  }

  const nv = new Niivue({
    isColorbar: false,
    show3Dcrosshair: true,
  });

  // Ensure canvas.current is defined before attaching
  if (canvas.current) {
    nv.attachToCanvas(canvas.current);
    nv.loadVolumes(volumeList);
  }

  return (
    <>
      {!originalFileExists && <p>Error: Original scan does not exist.</p>}
      <canvas ref={canvas} height={480} width={640} />
    </>
  );
};

export default NiiVue;
