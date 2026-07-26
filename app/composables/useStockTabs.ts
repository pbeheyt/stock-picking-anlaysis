export type StockTab = 'dcf' | 'quant' | 'research'

export function useStockTabs() {
  const route = useRoute()
  const router = useRouter()
  const activeTab = ref<StockTab>('dcf')

  const switchTab = (tab: StockTab) => {
    activeTab.value = tab
    if (import.meta.client) {
      localStorage.setItem('last_active_stock_tab', tab)
    }
    router.replace({ query: { ...route.query, tab } })
  }

  const syncActiveTabFromUrlOrStorage = () => {
    const queryTab = route.query.tab as string
    if (['dcf', 'quant', 'research'].includes(queryTab)) {
      activeTab.value = queryTab as StockTab
    } else if (import.meta.client) {
      const savedTab = localStorage.getItem('last_active_stock_tab')
      if (savedTab && ['dcf', 'quant', 'research'].includes(savedTab)) {
        activeTab.value = savedTab as StockTab
      }
    }
  }

  watch(() => route.query.tab, (newTab) => {
    if (newTab && ['dcf', 'quant', 'research'].includes(String(newTab))) {
      activeTab.value = String(newTab) as StockTab
    }
  })

  return {
    activeTab,
    switchTab,
    syncActiveTabFromUrlOrStorage,
  }
}
