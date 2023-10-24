
# QSIprep: Preprocessing and analysis of q-space images

Full documentation at <https://qsiprep.readthedocs.io>

## About

`qsiprep` configures pipelines for processing diffusion-weighted MRI
(dMRI) data. The main features of this software are

> 1. A BIDS-app approach to preprocessing nearly all kinds of modern
>     diffusion MRI data.
> 2. Automatically generated preprocessing pipelines that correctly
>     group, distortion correct, motion correct, denoise, coregister and
>     resample your scans, producing visual reports and QC metrics.
> 3. A system for running state-of-the-art reconstruction pipelines
>     that include algorithms from [Dipy](), [MRTrix](), [DSI Studio]()
>     and others.
> 4. A novel motion correction algorithm that works on DSI and random
>     q-space sampling schemes

![image](/images/Components/DTI_workflow_full.png)

### Preprocessing 

The preprocessing pipelines are built based on the available BIDS
inputs, ensuring that fieldmaps are handled correctly. The preprocessing
workflow performs head motion correction, susceptibility distortion
correction, MP-PCA denoising, coregistration to T1w images, spatial
normalization using [ANTs]() and tissue segmentation.

### Reconstruction 

The outputs from the `preprocessing_def`{.interpreted-text role="ref"}
pipelines can be reconstructed in many other software packages. We
provide a curated set of `recon_workflows`{.interpreted-text role="ref"}
in `qsiprep` that can run ODF/FOD reconstruction, tractography, Fixel
estimation and regional connectivity.

## Note

The `qsiprep` pipeline uses much of the code from `FMRIPREP`. It is
critical to note that the similarities in the code **do not imply that
the authors of FMRIPREP in any way endorse or support this code or its
pipelines**.
