import { createRepo, whoAmI, RepoDesignation } from "@huggingface/hub";

export default class HuggingFace {
  constructor() {}

  private readonly HUGGINGFACE_HF_TOKEN = process.env
    .NEXT_PUBLIC_HUGGINGFACE_HF_TOKEN as string;

  private readonly credentials = { accessToken: this.HUGGINGFACE_HF_TOKEN };

  async whoAmI() {
    return await whoAmI({ credentials: this.credentials });
  }

  async createRepo(repo: RepoDesignation) {
    return await createRepo({
      repo: repo,
      credentials: this.credentials,
      license: "mit",
    });
  }
}
