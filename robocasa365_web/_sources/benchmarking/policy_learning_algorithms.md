# Policy Learning Algorithms

We provide official support for benchmarking the following policy learning algorithms: [Diffusion Policy](https://github.com/robocasa/diffusion_policy), [Openpi](https://github.com/robocasa/openpi), and [GR00T](https://github.com/robocasa/groot).

-------
## Diffusion Policy
We fork the official Diffusion Policy code base, hosted at [https://github.com/robocasa/diffusion_policy](https://github.com/robocasa/diffusion_policy).
### Recommended system specs
For training we recommend a GPU with at least 24 Gb of memory, but 48 Gb+ is prefered.
For inference we recommend a GPU with at least 8 Gb of memory.

### Installation
```
git clone https://github.com/robocasa/diffusion_policy
cd diffusion_policy
pip install -e .
```

### Key files
- Training: [train.py](train.py)
- Evaluation: [eval_robocasa.py](eval_robocasa.py)

### Experiment workflow
```
# train model
python train.py \
--config-name=train_diffusion_transformer_bs192 \
task=robocasa/<dataset-soup>

# Evaluate model
python eval_robocasa.py \
--checkpoint <checkpoint-path> \
--task_soup <task-soup> \
--split <split>

# Report evaluation results
python diffusion_policy/scripts/get_eval_stats.py \
--dir <outputs-dir>
```


-------
## Openpi
We fork the official Openpi code base, hosted at [https://github.com/robocasa/openpi](https://github.com/robocasa/openpi). Our fork support training for **pi0 and pi0.5**.

### Recommended system specs
For training we recommend a GPU with at least 80 Gb of memory (H100, H200, etc).
For inference we recommend a GPU with at least 8 Gb of memory.


### Installation
```
git clone https://github.com/robocasa/openpi
cd openpi
pip install -e .
pip install -e packages/openpi-client/
```

### Key files
- Training: [scripts/train.py](scripts/train.py)
- Evaluation: [scripts/serve_policy.py](scripts/serve_policy.py) and [examples/robocasa/main.py](examples/robocasa/main.py)
- Setting up configs: [src/openpi/training/config.py](src/openpi/training/config.py)

### Experiment workflow
```
# train model
XLA_PYTHON_CLIENT_MEM_FRACTION=1.0 python scripts/train.py \
<dataset-soup> \
--exp-name=<exp-name>

# evaluate model
# part a: start inference server
python scripts/serve_policy.py \
--port=8000 policy:checkpoint \
--policy.config=<dataset-soup> \
--policy.dir=<checkpoint-path>

# part b: run evals on server
python examples/robocasa/main.py \
--args.port 8000 \
--args.task_soup <task-soup> \
--args.split <split> \
--args.log_dir <checkpoint-path>

# report evaluation results
python examples/robocasa/get_eval_stats.py \
--dir <checkpoint-path>
```

-------
## GR00T
We fork the official GR00T code base, hosted at [https://github.com/robocasa/groot](https://github.com/robocasa/groot). Our fork support training for **GR00T N1.5**.

### Recommended system specs
For training we recommend a GPU with at least 80 Gb of memory (H100, H200, etc).
For inference we recommend a GPU with at least 8 Gb of memory.


### Installation
```
git clone https://github.com/robocasa/groot
cd groot
pip install -e .
```

### Key files
- Training: [scripts/gr00t_finetune.py](scripts/gr00t_finetune.py)
- Evaluation: [scripts/run_eval.py](scripts/run_eval.py)

### Experiment workflow
```
# train model
python scripts/gr00t_finetune.py \
--output-dir <experiment-path> \
--dataset_soup <dataset-soup> \
--max_steps <num-training-steps>

# evaluate model
python scripts/run_eval.py \
--model_path <checkpoint-path> \
--task_soup <task-soup> \
--split <split>

# report evaluation results
python gr00t/eval/get_eval_stats.py \
--dir <checkpoint-path>
```
