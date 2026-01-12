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

<table class="docutils rc-benchmark-table">
  <thead>
    <tr>
      <th><strong>Task Split</strong></th>
      <th><strong>Diffusion Policy</strong></th>
      <th><strong>π₀</strong></th>
      <th><strong>π₀<span class="rc-pi-subdot">.</span>₅</strong></th>
      <th><strong>GR00T N1.5</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="rc-benchmark-split rc-benchmark-atomic">Atomic-Seen</code></td>
      <td>15.7%</td>
      <td>34.6%</td>
      <td>48.0%</td>
      <td>43.0%</td>
    </tr>
    <tr>
      <td><code class="rc-benchmark-split rc-benchmark-comp-seen">Composite-Seen</code></td>
      <td>0.2%</td>
      <td>6.1%</td>
      <td>16.5%</td>
      <td>9.6%</td>
    </tr>
    <tr>
      <td><code class="rc-benchmark-split rc-benchmark-comp-unseen">Composite-Unseen</code></td>
      <td>1.25%</td>
      <td>1.1%</td>
      <td>5.0%</td>
      <td>4.4%</td>
    </tr>
    <tr>
      <td><strong>Average</strong></td>
      <td>6.1%</td>
      <td>14.8%</td>
      <td>24.2%</td>
      <td>20.0%</td>
    </tr>
    <tr>
      <td><strong>Model Checkpoint</strong></td>
      <td><a href="">TODO Link</a></td>
      <td><a href="">TODO Link</a></td>
      <td><a href="">TODO Link</a></td>
      <td><a href="">TODO Link</a></td>
    </tr>
  </tbody>
</table>