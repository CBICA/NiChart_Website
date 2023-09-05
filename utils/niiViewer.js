import { useRef, useEffect } from "react";
import { Niivue } from "@niivue/niivue";

const NiiVue = ({ imageUrl }) => {
  const canvas = useRef();
  useEffect(() => {
    const volumeList = [
      {
        // ORIGINAL
        //url and urlImgData should be both specified if header and data are 
        // different files
        url: "/content/Portal/Visualization/Reference_Data/T1_0000.nii.gz",
        colormap: "gray", // or "jet", "freesurfer"... https://niivue.github.io/niivue/features/colormaps.html
        opacity: 1, // 0 to 1
      },
      {
        // OVERLAY
        url: "/content/Portal/Visualization/Reference_Data/T1_0000_muse_orig_orient.nii.gz",
        colormap: "jet",
        opacity: 0.5, // This is for the overlay.
        cal_min: 47,
        cal_max: 49,
        // alphaThreshold: false
      },
    ];
    const nv = new Niivue({
      isColorbar: true, // show colorbar
      show3Dcrosshair: true, // show crosshair in 3D view      
    });
    nv.attachToCanvas(canvas.current);
    nv.loadVolumes(volumeList);
  }, [imageUrl]);

  return <canvas ref={canvas} height={480} width={640} />;
};

export default NiiVue;


