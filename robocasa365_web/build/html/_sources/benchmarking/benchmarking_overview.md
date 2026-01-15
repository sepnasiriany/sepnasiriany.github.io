# Overview of Benchmarking
We evaluate learning across three distinct settings. Multi-task learning studies large-scale pretraining from diverse human demonstrations across many tasks. Foundation model learning builds on this by fine-tuning pretrained models to master specific target tasks, including both seen and unseen task compositions. Lifelong learning further generalizes this setting by requiring models to continually acquire more complex, long-horizon tasks over time while retaining competence on previously learned tasks.

## Policy Learning Algorithms

We provide official support for benchmarking the following policy learning algorithms: [Diffusion Policy](https://github.com/robocasa/diffusion_policy_dev), [Openpi](https://github.com/robocasa/openpi-dev), and [GR00T](https://github.com/robocasa/groot).

-------
### Diffusion Policy
#### Installation
```
git clone https://github.com/robocasa/diffusion_policy
cd diffusion_policy
pip install -e .
```

-------
### Openpi
#### Installation
```
git clone https://github.com/robocasa/openpi
cd openpi
pip install -e .
```

-------
### GR00T
#### Installation
```
git clone https://github.com/robocasa/groot
cd gr00t
pip install -e .
```