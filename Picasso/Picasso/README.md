

# Picasso — AI art with StyleGAN2-ADA




I fine-tuned **StyleGAN2-ADA** (the [NVlabs StyleGAN2-ADA PyTorch](https://github.com/NVlabs/stylegan2-ada-pytorch) implementation) on a curated set of artwork images. StyleGAN2-ADA is well suited to smaller or domain-specific image collections because its adaptive discriminator augmentation reduces overfitting while training.

After training, we analyzed **W-space** (the intermediate latent space of the generator), embedded latent codes with **UMAP**, grouped them with **KMeans**, and constructed smooth **latent walks** that move through the learned manifold—particularly paths that respect the discovered clusters. Those walks drive frame-by-frame generation, which we assembled into a video and lightly post-processed for temporal continuity.

The full runnable workflow lives in **`AI_art.ipynb`**.

## Sample output

GitHub renders **GIFs** inline in READMEs; **`.mp4` links** only show as downloads. Below is a short preview (~16s of the walk at reduced resolution and frame rate); full quality with sound is in the linked videos.

![Latent walk preview (GIF)](./supervised_output-2_preview.gif)

| File | Notes |
|------|--------|
| **[`supervised_output-2.mp4`](./supervised_output-2.mp4)** | Full export (~25 MB). |
| **[`supervised_output-2_readme.mp4`](./supervised_output-2_readme.mp4)** | H.264 re-encode under 10 MB (for GitHub attachment URL / local playback). |
| **`supervised_output-2_preview.gif`** | README preview only; generated with `ffmpeg` from the readme-sized MP4. |

For an **inline HTML5 player** on the repo home page (not just a GIF), upload **`supervised_output-2_readme.mp4`** via drag-and-drop in the README editor on **github.com** so GitHub inserts a `user-attachments` URL.

## Where we ran it

The experiment was executed in **Google Colab**, using a **CUDA** GPU runtime. Checkpoints, packaged datasets, training runs, intermediate frames, and the final video were stored under **Google Drive** so work persisted across Colab sessions (the notebook mounts Drive and writes outputs to a dedicated folder there).

## Dataset

Training images come from the **ArtWiki** dataset: a wiki-based collection of artwork images (organized with metadata such as style or movement). In our pipeline those images were prepared for StyleGAN’s tooling by resizing and **center-cropping** to a fixed resolution (256×256 in the notebook), then packaged into the ZIP format expected by `dataset_tool.py` before calling the official `train.py` entry point.

If you reuse this project, place your ArtWiki-derived image folder where the notebook expects it (or update the paths in the configuration cell) before packaging and training.

## Repository contents

| Item | Purpose |
|------|---------|
| `AI_art.ipynb` | End-to-end Colab-oriented notebook: environment setup, StyleGAN repo clone and small compatibility patches, dataset packaging, training, latent analysis, and video export. |
| `supervised_output-2.mp4` | Full-resolution example output video (latent walk). |
| `supervised_output-2_readme.mp4` | Smaller H.264 export for sharing and GitHub upload limits. |
| `supervised_output-2_preview.gif` | Short animated preview for the README (GitHub shows GIFs inline). |

## Website storefront

A simple one-page storefront is included:

- `index.html`
- `styles.css`
- `script.js`
- `clips/clip-01.mp4`, `clips/clip-02.mp4`, `clips/clip-03.mp4`

Open `index.html` in your browser to view the site.

### Re-generate clip sections

If you want different moments from the film:

1. Edit clip timestamps in `make_clips.sh`
2. Run:

```bash
./make_clips.sh
```

## Acknowledgments

- [StyleGAN2-ADA (PyTorch)](https://github.com/NVlabs/stylegan2-ada-pytorch) — NVIDIA Research  
- **ArtWiki** — source of the training images  

Refer to ArtWiki’s own terms and citation guidance if you publish or redistribute derived work.
