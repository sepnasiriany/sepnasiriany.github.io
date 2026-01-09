# Policy Learning Algorithms

We provide official support for benchmarking the following policy learning algorithms: [Diffusion Policy](https://github.com/robocasa/diffusion_policy_dev), [openpi](https://github.com/robocasa/openpi-dev), and [GR00T N1.5](https://github.com/robocasa/groot).

-------
## Diffusion Policy
### Installation
```
git clone https://github.com/robocasa/diffusion_policy_dev
cd diffusion_policy
pip install -e .
```

### Training
HYDRA_FULL_ERROR=1 python train.py --config-name=train_diffusion_transformer_xl_im256_bs256 task=robocasa/pretrain/pretrain_atomic60h_37mg

### Evaluation
TODO

-------
## openpi
### Installation
```
git clone https://github.com/robocasa/openpi-dev
cd openpi
pip install -e .
```

### Training
TODO

### Evaluation
TODO

-------
## GR00T
### Installation
```
git clone https://github.com/robocasa/groot
cd gr00t
pip install -e .
```

### Training
TODO

### Evaluation
TODO