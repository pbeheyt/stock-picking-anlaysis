export function getApiHeaders(): Record<string, string> {
  const headers: Record<string, string> = {}
  if (import.meta.client) {
    const deepseekKey = localStorage.getItem('deepseek_api_key')
    const openrouterKey = localStorage.getItem('openrouter_api_key')
    if (deepseekKey) headers['x-deepseek-api-key'] = deepseekKey.trim()
    if (openrouterKey) headers['x-openrouter-api-key'] = openrouterKey.trim()
  }
  return headers
}
