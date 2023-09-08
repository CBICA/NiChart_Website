import { useRef, useEffect, useState } from "react";
import { Niivue } from "@niivue/niivue";

const NiiVue = ({ subjectID, roi }) => {
  const canvas = useRef(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const checkFiles = async () => {
      const originalScanURL = `/content/Portal/Visualization/Subject_Scans/in/${subjectID}.nii.gz`;
      const overlayURL = `/content/Portal/Visualization/Subject_Scans/out/${subjectID}_DLMUSE_${roi}.nii.gz`;

      try {
        // Check if the original scan file exists
        const originalResponse = await fetch(originalScanURL);
        if (!originalResponse.ok) {
          throw new Error("Original scan does not exist.");
        }
        
        const volumeList = []
        volumeList.push({
          url: originalScanURL,
          colormap: "gray",
          opacity: 1,
        })
        // Check if the overlay file exists
        const overlayResponse = await fetch(overlayURL);
        if (!overlayResponse.ok) {
          console.log("Overlay doesn't exist!")
        } else {
          // If both files exist, proceed with visualization
          volumeList.push({
            url: overlayURL,
            colormap: "red",
            opacity: 0.5,
          })
        }


        const nv = new Niivue({
          isColorbar: false,
          show3Dcrosshair: true,
        });

        if (canvas.current) {
          nv.attachToCanvas(canvas.current);
          nv.loadVolumes(volumeList);
        }
      } catch (error) {
        console.error(error.message);
        setIsError(true);
      }
    };

    checkFiles();
  }, [subjectID, roi]);

  return (
    <>
      {isError ? (
        <p>Error: The original scan file (or more files) does not exist.</p>
      ) : (
        <canvas ref={canvas} height={480} width={640} />
      )}
    </>
  );
};

export default NiiVue;
