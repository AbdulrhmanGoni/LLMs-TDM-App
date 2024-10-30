export default function openHuggingfaceOAuth(datasetId?: string) {
  const authUrl =
    `https://huggingface.co/oauth/authorize?` +
    `client_id=${process.env.NEXT_PUBLIC_HUGGINGFACE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(
      `${window.location.origin}/huggingface/oauth-callback`
    )}` +
    `&scope=write-repos%20manage-repos%20email` +
    `&state=${datasetId}` +
    `&response_type=code`;

  window.location.replace(authUrl);
}
