export type StockTab = 'dcf' | 'regression' | 'qualitative'

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
    if (['dcf', 'regression', 'qualitative'].includes(queryTab)) {
      activeTab.value = queryTab as StockTab
    } else if (import.meta.client) {
      const savedTab = localStorage.getItem('last_active_stock_tab')
      if (savedTab && ['dcf', 'regression', 'qualitative'].includes(savedTab)) {
        activeTab.value = savedTab as StockTab
      }
    }
  }

  watch(() => route.query.tab, (newTab) => {
    if (newTab && ['dcf', 'regression', 'qualitative'].includes(String(newTab))) {
      activeTab.value = String(newTab) as StockTab
    }
  })

  return {
    activeTab,
    switchTab,
    syncActiveTabFromUrlOrStorage,
  }
}
