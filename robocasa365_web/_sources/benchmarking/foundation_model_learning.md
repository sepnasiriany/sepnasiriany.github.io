# Foundation Model Learning

In the foundation model learning benchmark we are interested in studying foundation model training, i.e., training with our pretraining datasets, followed by fine-tuning on our target task datasets.
There are two phases of training:
- **Pretraining**: pretraining on 2000+ hours of data across 300 tasks. The data comprises human datasets for 300 tasks (482 hours) and synthetic MimicGen data across 60 atomic tasks (1615 hours)
- **Target task fine-tuning**: fine-tuning the pretrained model on human datasets across 50 tasks (193 hours). We fine-tune the model indepdently on three separate target task split datasets:
  - **Atomic-Seen** (18 atomic tasks, also seen in pretraining)
  - **Composite-Seen** (16 composite tasks, also seen in pretraining)
  - **Composite-Unseen** (a separate set of 16 composite tasks, not seen in pretraining)

## Benchmark results and checkpoints
We perform a benchmark featruing the GR00T N1.5 algorithm. We compare pretraining only, target task training only, and pretraining following by target task fine-tuning. Here is a summary of our benchmarking results. We share the model checkpoints for reference.

<table class="docutils rc-benchmark-table">
  <thead>
    <tr>
      <th rowspan="2"><strong>Task Type</strong></th>
      <th rowspan="2"><strong>Pretraining Only</strong></th>
      <th colspan="3"><strong>Target Task Learning Only</strong></th>
      <th colspan="3"><strong>Pretraining + Target Task Learning</strong></th>
    </tr>
    <tr>
      <th><strong>10%</strong></th>
      <th><strong>30%</strong></th>
      <th><strong>100%</strong></th>
      <th><strong>10%</strong></th>
      <th><strong>30%</strong></th>
      <th><strong>100%</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="rc-benchmark-split rc-benchmark-atomic">Atomic-Seen</code></td>
      <td>41.9%</td>
      <td>38.7%</td>
      <td>50.6%</td>
      <td>60.6%</td>
      <td>56.9%</td>
      <td>59.1%</td>
      <td><strong>68.5%</strong></td>
    </tr>
    <tr>
      <td><code class="rc-benchmark-split rc-benchmark-comp-seen">Composite-Seen</code></td>
      <td>0.0%</td>
      <td>11.0%</td>
      <td>22.7%</td>
      <td>35.0%</td>
      <td>25.4%</td>
      <td>34.6%</td>
      <td><strong>40.6%</strong></td>
    </tr>
    <tr>
      <td><code class="rc-benchmark-split rc-benchmark-comp-unseen">Composite-Unseen</code></td>
      <td>0.2%</td>
      <td>11.2%</td>
      <td>27.5%</td>
      <td>33.3%</td>
      <td>22.7%</td>
      <td>30.8%</td>
      <td><strong>42.1%</strong></td>
    </tr>
    <tr>
      <td><strong>Average</strong></td>
      <td>15.1%</td>
      <td>21.0%</td>
      <td>34.3%</td>
      <td>43.7%</td>
      <td>35.9%</td>
      <td>42.2%</td>
      <td><strong>51.1%</strong></td>
    </tr>
  </tbody>
</table>

## Benchmark instructions

### GR00T

#### guidelines

#### train model

#### evaluate model

#### report evaluation results