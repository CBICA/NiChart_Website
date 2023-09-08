import { useRef, useEffect } from "react";
import { Niivue } from "@niivue/niivue";
import MUSEROICompleteList from '/public/content/Portal/Visualization/Dicts/MUSE_ROI_complete_list.json';

const NiiVue = ({ subjectID, roi }) => {
  const canvas = useRef();

  useEffect(() => {
    const volumeList = [];
    // Add the original scan
    volumeList.push({
      url: `/content/Portal/Visualization/Subject_Scans/in/${subjectID}.nii.gz`,
      // url: `/path/to/in/${subjectID}.nii.gz`,
      colormap: "gray",
      opacity: 1,
    });

    volumeList.push({
      url: `/content/Portal/Visualization/Subject_Scans/out/${subjectID}_DLMUSE_${roi}.nii.gz`,
      // url: `/path/to/out/out_muse_individual_roi_masks/${subjectID}_DLMUSE_${roiId}.nii.gz`,
      colormap: "red",
      opacity: 0.5,
    });
    // // Determine which ROIs should be added based on MUSEROICompleteList
    // const roiData = MUSEROICompleteList[roi];
    // if (roiData) {
    //   const roiIds = roiData.Consisting_of_ROIS.split(", ");
    //   roiIds.forEach((roiId) => {
    //     volumeList.push({
    //       url: `/content/Portal/Visualization/Subject_Scans/out/${subjectID}_DLMUSE_${roiId}.nii.gz`,
    //       // url: `/path/to/out/out_muse_individual_roi_masks/${subjectID}_DLMUSE_${roiId}.nii.gz`,
    //       colormap: "red",
    //       opacity: 0.5,
    //     });
    //   });
    // }

    const nv = new Niivue({
      isColorbar: false,
      show3Dcrosshair: true,
    });

    nv.attachToCanvas(canvas.current);
    nv.loadVolumes(volumeList);
  }, [subjectID, roi]);

  return <canvas ref={canvas} height={480} width={640} />;
};

export default NiiVue;
