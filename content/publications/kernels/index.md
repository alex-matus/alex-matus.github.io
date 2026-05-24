---
title: "Observation-Based Radiative Kernels From CloudSat/CALIPSO"
authors:
- Ryan J. Kramer
- me
- Brian J. Soden
- Tristan S. L'Ecuyer
date: "2019-05-31T00:00:00Z"

# Schedule page publish date (NOT publication's date).
publishDate: "2018-05-17T00:00:00Z"

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article-journal"]

# Publication name and optional abbreviated publication name.
publication: "Journal of Geophysical Research: Atmospheres"
publication_short: "JGR Atmospheres"

abstract: Radiative kernels describe the differential response of top-of-atmosphere and surface radiative fluxes to small perturbations in climate state variables, serving as a widely adopted method to quantify climate feedbacks. Traditionally, these kernels are constructed using simulated atmospheric states from General Circulation Models (GCMs), inherently introducing structural model biases into feedback calculations. Here, we present the first set of observation-based radiative kernels for temperature, water vapor, and surface albedo perturbations. These kernels are built directly using a data base state from the fifth release of the CloudSat level-2 fluxes and heating rates dataset (2B-FLXHR-LIDAR), which blends active radar and lidar profiles from the A-Train satellite constellation. By utilizing an empirically observed atmospheric baseline rather than a model simulation, these kernels provide a neutral benchmark for assessing climate sensitivities in observation records and model ensembles alike. Furthermore, we demonstrate that properly accounting for the vertical distribution of cloud masking within an observational framework is vital for correctly interpreting the magnitude and sign of longwave cloud feedbacks.

# Summary. An optional shortened abstract.
summary: This study introduces the first observation-based climate radiative kernels derived directly from vertical active sensor tracks (CloudSat/CALIPSO), bypassing traditional GCM base-state biases when calculating global temperature, water vapor, and albedo feedbacks.

tags:
- Radiative Kernels
- Climate Feedbacks
- CloudSat & CALIPSO
- A-Train Constellation
- Remote Sensing

featured: true

# External DOI resolution
doi: "10.1029/2018JD029021"

links:
- type: journal
  url: https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2018JD029021

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Image credit: NASA CloudSat/CALIPSO active atmospheric vertical profiling'
  focal_point: ""
  preview_only: false

projects: []
slides: ""
---

This research establishes a framework for evaluating global climate feedbacks by replacing standard model-derived radiative kernels with observational profiles constructed from the A-Train satellite track.

### Key Innovations & Framework Updates
* **Elimination of GCM Base-State Bias:** Traditional climate sensitivity diagnostics inherit systematic discrepancies from model assumptions. This tool uses empirical vertical measurements to ensure a neutral diagnostic base state.
* **Active Sensor Synergy:** Built upon high vertical-resolution measurements from the `2B-FLXHR-LIDAR` multi-sensor product, mapping distinct layers of the atmosphere simultaneously.
* **Cloud Masking Corrections:** Clarifies longwave feedback mechanics by mapping exactly how cloud layers interact with, mask, and structurally alter the flux signals of non-cloud climate variables.
