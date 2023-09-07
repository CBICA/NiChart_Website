import { useRef, useEffect } from "react";
import { Niivue } from "@niivue/niivue";
import MUSEROICompleteList from '/public/content/Portal/Visualization/Reference_Data/MUSE_ROI_complete_list.json';

const NiiVue = ({ subjectID, roi }) => {
  const canvas = useRef();

  useEffect(() => {
    const volumeList = [];

    // Add the original scan
    volumeList.push({
      url: `/Users/georgeaidinis/bs/NCWebTests/T2/in/${subjectID}.nii.gz`,
      // url: `/path/to/in/${subjectID}.nii.gz`,
      colormap: "gray",
      opacity: 1,
    });

    // Determine which ROIs should be added based on MUSEROICompleteList
    const roiData = MUSEROICompleteList[roi];
    if (roiData && roiData.Consisting_of_ROIS) {
      const roiIds = roiData.Consisting_of_ROIS.split(", ");
      roiIds.forEach((roiId) => {
        volumeList.push({
          url: `/Users/georgeaidinis/bs/NCWebTests/T2/out/out_muse_individual_roi_masks/${subjectID}_DLMUSE_${roiId}.nii.gz`,
          // url: `/path/to/out/out_muse_individual_roi_masks/${subjectID}_DLMUSE_${roiId}.nii.gz`,
          colormap: "red",
          opacity: 0.5,
        });
      });
    }

    const nv = new Niivue({
      isColorbar: true,
      show3Dcrosshair: true,
    });

    nv.attachToCanvas(canvas.current);
    nv.loadVolumes(volumeList);
  }, [subjectID, roi]);

  return <canvas ref={canvas} height={480} width={640} />;
};

export default NiiVue;
