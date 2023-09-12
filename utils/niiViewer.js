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

        const volumeList = [];
        volumeList.push({
          url: originalScanURL,
          colormap: "gray",
          opacity: 1,
        });

        // Check if the overlay file exists
        const overlayResponse = await fetch(overlayURL);
        if (overlayResponse.ok) {
          // If the overlay file exists, add it to the volume list
          volumeList.push({
            url: overlayURL,
            colormap: "blue",
            opacity: 0.8,
          });
        }

        // Create a new Niivue instance
        const nv = new Niivue({
          isColorbar: false,
          show3Dcrosshair: true,
          show3Dhead: true,
        });

        if (canvas.current) {
          nv.attachToCanvas(canvas.current);
          nv.loadVolumes(volumeList);
          nv.opts.dragMode = nv.dragModes.pan;
        }

        // Delay setting the crosshair position to ensure Niivue is fully initialized
        setTimeout(() => {
          const overlayVolume = nv.volumes[1];
          const originalData = nv.volumes[0]
          if (overlayVolume) {
            const data = overlayVolume.img;
            // Print for debugging purposes:
            console.log("ORIGINAL DATA:")
            console.log(originalData);
            console.log("######################################")
            console.log("OVERLAY:")
            console.log(overlayVolume);
            console.log("######################################")
            
            
            // Initialize variables to store min and max indices in each dimension
            let xMin = overlayVolume.dimsRAS[1]; // Initialize with the maximum possible value
            let xMax = 0;
            let yMin = overlayVolume.dimsRAS[2];
            let yMax = 0;
            let zMin = overlayVolume.dimsRAS[3];
            let zMax = 0;

            // Iterate through the overlay data to find the min and max indices in each dimension
            for (let x = 0; x < overlayVolume.dimsRAS[1]; x++) {
              for (let y = 0; y < overlayVolume.dimsRAS[2]; y++) {
                for (let z = 0; z < overlayVolume.dimsRAS[3]; z++) {
                  const voxelValue = data[x + y * overlayVolume.dimsRAS[1] + z * overlayVolume.dimsRAS[1] * overlayVolume.dimsRAS[2]];
                  if (voxelValue !== 0) {
                    // Update min and max indices in each dimension
                    xMin = Math.min(xMin, x);
                    xMax = Math.max(xMax, x);
                    yMin = Math.min(yMin, y);
                    yMax = Math.max(yMax, y);
                    zMin = Math.min(zMin, z);
                    zMax = Math.max(zMax, z);
                  }
                }
              }
            }

            // Calculate the center of mass in voxel coordinates
            console.log("xMin: ", xMin);
            console.log("xMax: ", xMax);
            console.log("yMin: ", yMin);
            console.log("yMax: ", yMax);
            console.log("zMin: ", zMin);
            console.log("zMax: ", zMax);
            const xCenter = (xMax - xMin)/2;
            const yCenter = (yMax - yMin)/2;
            const zCenter = (zMax - zMin)/2;
            console.log("Calculated center point:")
            console.log([xCenter, yCenter, zCenter]);

            // TODO: Add logic to calculate correct relative xyz point, and not absolute 
            const x = xCenter;
            const y = yCenter;
            const z = zCenter;
            // console.log("Relative center point:")
            // console.log([x,y,z])

            // Move the crosshair to the calculated center of mass
            // nv.moveCrosshairInVox(x,y,z);
          }
        }, 1000); // Adjust the delay time as needed
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
