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

# Installation & Getting Started

> Note !
> You must have [Node.js](https://nodejs.org) installed on your machine to be able to run LLMs TDM Application

1. Clone the repository and open project's directory
```
git clone https://github.com/AbdulrhmanGoni/LLMs-TDM-App.git
cd LLMs-TDM-App
```

2. Install dependencies
```
npm install
```

3. Copy `.env.example` file into `.env.development` file and modify the variables in this file by following the guidelines inside `.env.example` file.
```
cp .env.example .env.development
```

4. Run LLMs TDM in development mode
```
npm run dev
```
