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

### Relevant scripts
- Training: [train.py](train.py)
- Evaluation: [eval_robocasa.py](eval_robocasa.py)


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
```

### Relevant scripts
- Training: [scripts/train.py](scripts/train.py)
- Evaluation: [scripts/serve_policy.py](scripts/serve_policy.py) and [examples/robocasa/main.py](examples/robocasa/main.py)

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

### Relevant scripts
- Training: [scripts/gr00t_finetune.py](scripts/gr00t_finetune.py)
- Evaluation: [scripts/run_eval.py](scripts/run_eval.py)