# LLMs Training Datasets Manager

LLMs Training Datasets Manager is a web application for creating and managing training datasets
with different formats for training Large Language Models (LLMs) or for using
them in Retrieval Augmented Generation (RAG) applications.

# Features :sparkles:

- :card_index_dividers: Creating datasets and adding instructions into it.
- :gear: Managing the instructions of the datasets (updating or deleting the instructions).
- :bookmark_tabs: Browse the instructions of datasets esaly in pagination model.
- :inbox_tray: Export datasets into your machine (Actually download datasets).
- :hugs: [Huggingface](https://Huggingface.co) integration via **Huggingface OAuth flow**. And the gained features will be :point_down:
  * :outbox_tray: Linking datasets with Huggingface dataset repository and pushing local datasets to.
  * :new: Creating new Huggingface dataset repository if needed
  * :trackball: Syncing local datasets with their linked repositories after updates.
  * :electric_plug: Unlinking a local dataset with its linked repository ***(with options to delete the entire repository or just the dataset file)***

# Tech Stack

- React + Next.js
- Typescript
- Tailwind + Shadcn/ui
- [Clerk](https://clerk.com/) (for users management and authenticating)
