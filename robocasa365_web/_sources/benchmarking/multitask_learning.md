# Multi-Task Learning

In the multi-task learning benchmark, we study training on multitask pretraining datasets.
We do policy learning on the [Human Pretraining Datasets](../datasets/pretraining_posttraining_datasets.html#human-datasets), which comprise 482 hours of data across 300 tasks (100 task demonstrations per task).

## Benchmark instructions
We provide support for benchmarking across Diffusion Policy, pi0, and GR00T N1.5:

### Diffusion Policy
```
# train model
HYDRA_FULL_ERROR=1 python train.py \
--config-name=train_diffusion_transformer_xl_bs192 \
task=robocasa/pretrain/pretrain300

# evaluate model
TODO

# report statistics
TODO
```

### pi0
```
# train model
XLA_PYTHON_CLIENT_MEM_FRACTION=1.0 python scripts/train.py \
<your-ds-soup> \
--exp-name=<your-exp-name> \
--overwrite

# evaluate model
TODO

# report statistics
TODO
```

### GR00T N1.5
```
# train model
python scripts/gr00t_finetune.py \
--output-dir <your-output-dir> \
--dataset_soup <your-ds-soup>

# evaluate model
python scripts/run_eval.py \
--model_path <your-output-dir>/checkpoint-120000/ \
--split pretrain

# report statistics
python gr00t/eval/get_eval_stats.py \
--dir expdata/pretrain_human300/checkpoint-120000/
```

## Benchmark results and checkpoints

Here is a summary of our benchmarking results. We have released the model checkpoints for reference.

| **Task Split**          | **Diffusion Policy** | **π₀** | **GR00T N1.5** |
|-------------------------|----------------------|--------|----------------|
| `Atomic`                | 15.7                 | 36.3   | **43.0**       |
| `Composite-Seen`        | 0.2                  | 5.2    | **9.6**        |
| `Composite-Unseen`      | 1.25                 | 0.7    | **4.4**        |
| **Average**             | 6.1                  | 15.0   | **20.0**       |
| **Model Checkpoint**             | [TODO Link]()                  | [TODO Link]()   | [TODO Link]()       |