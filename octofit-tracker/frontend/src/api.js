const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const frontendCodespaceName =
  typeof window === 'undefined'
    ? undefined
    : window.location.hostname.match(/^([a-z0-9-]+)-5173\.app\.github\.dev$/i)?.[1]
const codespaceName = configuredCodespaceName || frontendCodespaceName

if (codespaceName && !/^[a-z0-9-]+$/i.test(codespaceName)) {
  throw new Error('VITE_CODESPACE_NAME may contain only letters, numbers, and hyphens.')
}

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results

  throw new Error('The API returned an unsupported collection response.')
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText}).`)
  }

  return normalizeCollection(await response.json())
}
