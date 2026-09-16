// Resolves the publicly reachable API base URL, accounting for GitHub Codespaces port forwarding.
export const PORT = Number(process.env.PORT || 8000);

const codespaceName = process.env.CODESPACE_NAME;
// Determine the API base URL based on the environment (GitHub Codespaces or localhost)
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;
