# Using Datasets

We provide datasets in the lerobot format. There are broadly three types of datasets: **pretraining human** datasets, **pretraining MimicGen** datasets, and **target human** datasets (see [datasets overview](../datasets/datasets_overview.html) for details).

### Downloading datasets

<div class="admonition note">
<p class="admonition-title">Dataset storage location</p>

By default, all datasets are stored under `datasets/` in the root robocasa directory. You can change the location for datasets by setting `DATASET_BASE_PATH` in `robocasa/macros_private.py`.

</div>

Here are a few examples to download datasets:

```
# downloads all datasets
python -m robocasa.scripts.download_datasets --datasets all

# only download pretraining human datasets
python -m robocasa.scripts.download_datasets --datasets pretrain_human

# only download pretraining mimicgen dataasets
python -m robocasa.scripts.download_datasets --datasets pretrain_mg

# only download target human datasets
python -m robocasa.scripts.download_datasets --datasets target_human

# only download datasets for a specific task
python -m robocasa.scripts.download_datasets --datasets PickPlaceCounterToCabinet
```

Additionally you can specify the following optional arguments:
```
--overwrite: overwrites existing datasets
```

### Dataset structure
RoboCasa datasets follow the LeRobot format. Here is an overview of important elements of each dataset:

```
lerobot/
├── meta/                               # Metadata files describing the dataset
│   ├── info.json                       # Dataset info (robot type, episodes, frames, fps, features)
│   ├── tasks.jsonl                     # Language instructions with task indices
│   ├── episodes.jsonl                  # Per-episode metadata (index, instruction, length)
│   ├── episodes_stats.jsonl            # Per-episode statistics for actions/proprioception
│   ├── stats.json                      # Aggregated statistics across all episodes
│   ├── episode_stats.json              # Similar stats needed by some policy dataloaders
│   ├── modality.json                   # Info contained in observations and action vectors
│   └── embodiment.json                 # Embodiment information
│
├── data/                               # Low-dimensional trajectory data (parquet files)
│   └── chunk-<chunk_id>/
│       └── episode_<episode_id>.parquet   # Proprioception, actions, dones, timestamps
│
├── videos/                             # MP4 video files for each camera view
│   └── chunk-<chunk_id>/
│       ├── observation.images.robot0_agentview_left/
│       │   └── episode_<episode_id>.mp4   # Left third-person camera
│       ├── observation.images.robot0_agentview_right/
│       │   └── episode_<episode_id>.mp4   # Right third-person camera
│       └── observation.images.robot0_eye_in_hand/
│           └── episode_<episode_id>.mp4   # Eye-in-hand camera
│
└── extras/                             # MuJoCo/RoboCasa-specific metadata (non-standard)
    ├── dataset_meta.json               # Environment args and controller configs
    └── episode_<episode_id>/           # Per-episode extras
        ├── ep_meta.json                # Episode metadata (layout, style, fixtures, objects)
        ├── model.xml.gz                # Compressed MJCF MuJoCo model XML
        └── states.npz                  # Raw MuJoCo states for replay (not for training)
```

### Dataset registry
We track each dataset with metadata (paths, task horizon length, etc.) in the [dataset registry](https://github.com/robocasa/robocasa/blob/main/robocasa/utils/dataset_registry.py). You can use the `get_ds_meta()` function to retrieve metadata for a specific task:

```py
from robocasa.utils.dataset_registry import get_ds_meta

ds_meta = get_ds_meta(
    task="PickPlaceCounterToCabinet",
    split="target_human", # or try pretrain_human, pretrain_mg
    demo_fraction=1.0, # the fraction of available demos to use (default to 1.0)
)
```

The code above returns meta data for a single dataset. You can retrieve information for a soup of datasets using the `get_ds_soup()` function:

```py
from robocasa.utils.dataset_registry import get_ds_soup

ds_soup = get_ds_soup(
    task_soup="atomic_seen",
    split="target_human", # or try pretrain_human, pretrain_mg
    demo_fraction=1.0, # the fraction of available demos to use (default to 1.0)
)
```

### Basic usage
Here is an example script to access dataset elements:
```py
from lerobot.datasets.lerobot_dataset import LeRobotDataset
import random

ds = LeRobotDataset(repo_id="robocasa365", root=DATASET_PATH)
ep_idx = 5
start = int(ds.episode_data_index["from"][ep_idx]) 
end = int(ds.episode_data_index["to"][ep_idx])
timestep_idx = random.randint(0, end - start)

sample = ds[start + timestep_idx]                                   # Accessing a random sample from the 5th demo in the dataset
right_img = sample["observation.images.robot0_agentview_right"]     # Accessing the right camera image
action = sample["action"]                                           # Accessing the action taken    
instruction = sample["task"]                                        # Accessing the instruction for the episode
```

### Inspecting and visualizing datasets

To get dataset statistics (filter keys, objects, task language, scenes):
```
python robocasa/scripts/get_dataset_info.py --dataset <ds-path>
```

You can visualize dataset videos by looking at the `videos` folder under each lerobot dataset directory. To visualize a dataset and save a video:
```
python robocasa/scripts/playback_dataset.py --n 10 --dataset <ds-path>
```
This will save a video of 10 random demonstrations in the same path as the dataset. You can play the full dataset by removing the `--n` flag.