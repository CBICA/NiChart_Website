import { useRef, useEffect, useState } from "react";
import { Niivue } from "@niivue/niivue";

const NiiVue = ({ subjectID, roi }) => {
  const canvas = useRef(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const checkFiles = async () => {

//       const originalScanURL = `/content/Portal/Visualization/Subject_Scans/in/${subjectID}.nii.gz`;
//       const overlayURL = `/content/Portal/Visualization/Subject_Scans/out/${subjectID}_DLMUSE_${roi}.nii.gz`;

      // TMP: for my internal tests
      const originalScanURL = `/tests/In/${subjectID}.nii.gz`;
      const overlayURL = `/tests/Out/${subjectID}_DLMUSE_${roi}.nii.gz`;
      
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
            
            
            // Iterate through the overlay data to find the min and max indices in each dimension
            const dx = originalData.hdr.dims[1]
            const dy = originalData.hdr.dims[2]
            const dz = originalData.hdr.dims[3]
            
            let xMin = dx;
            let xMax = 0;
            let yMin = dy;
            let yMax = 0;
            let zMin = dz;
            let zMax = 0;
            
            const isf = 0   // Tmp for DEBUG
            
            for (let i = 0; i < overlayVolume.img.length; i++) {
                  if (overlayVolume.img[i] != 0) {
                      const z = Math.floor(i / (dx * dy));
                      const y = Math.floor((i % (dx * dy)) / dx);
                      const x = ((i % (dx * dy)) % dx);
                      xMin = Math.min(xMin, x);
                      xMax = Math.max(xMax, x);
                      yMin = Math.min(yMin, y);
                      yMax = Math.max(yMax, y);
                      zMin = Math.min(zMin, z);
                      zMax = Math.max(zMax, z);
                }
            }
                        
            // Calculate the center of mass in voxel coordinates
            const xCent = (xMax + xMin)/2;
            const yCent = (yMax + yMin)/2;
            const zCent = (zMax + zMin)/2;

            const x0 = Math.floor( dx / 2)
            const y0 = Math.floor( dy / 2)
            const z0 = Math.floor( dz / 2)
            
            const xOffset = xCent - x0
            const yOffset = yCent - y0
            const zOffset = zCent - z0
            
            // Calculate the center of mass in display image coordinates
            const aff = originalData.hdr.affine
            const xOffsetImg = aff[0][0]*xOffset + aff[0][1]*yOffset + aff[0][2]*zOffset
            const yOffsetImg = aff[1][0]*xOffset + aff[1][1]*yOffset + aff[1][2]*zOffset
            const zOffsetImg = aff[2][0]*xOffset + aff[2][1]*yOffset + aff[2][2]*zOffset
            
            // Move the crosshair to the calculated center of mass
             nv.moveCrosshairInVox(xOffsetImg, yOffsetImg, zOffsetImg);

          }
        }, 2000); // Adjust the delay time as needed
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
