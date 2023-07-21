# niCHARTPipelines documentation

## Installation

1. create a new conda env

    ```bash
    conda create --name NCP python=3.8
    conda activate NCP
    ```

2. Clone and install niCHARTPipelines

    ```bash
    git clone  https://github.com/CBICA/niCHARTPipelines.git
    cd niCHARTPipelines
    pip install .

    ```

3. Run niCHARTPipelines. Example usage below

    ```bash
    niCHARTPipelines --indir                     /path/to/input     \
                     --outdir                    /path/to/output    \
                     --pipelinetype structural                      \
                     --derived_ROI_mappings_file /path/to/file.csv  \
                     --MUSE_ROI_mappings_file    /path/to/file.csv  \
                     --nnUNet_raw_data_base      /path/to/folder/   \
                     --nnUNet_preprocessed       /path/to/folder/   \
                     --model_folder              /path/to/folder/   \
                     --all_in_gpu True                              \
                     --mode fastest                                 \
                     --disable_tta
    ```
