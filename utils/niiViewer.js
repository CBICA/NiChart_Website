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

        // Check if the overlay file exists
        const overlayResponse = await fetch(overlayURL);
        if (!overlayResponse.ok) {
          throw new Error("Overlay does not exist.");
        }

        // If both files exist, proceed with visualization
        const volumeList = [
          {
            url: originalScanURL,
            colormap: "gray",
            opacity: 1,
          },
          {
            url: overlayURL,
            colormap: "red",
            opacity: 0.5,
          },
        ];

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
        <p>Error: One or more files do not exist.</p>
      ) : (
        <canvas ref={canvas} height={480} width={640} />
      )}
    </>
  );
};

export default NiiVue;
