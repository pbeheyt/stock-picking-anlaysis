<script setup lang="ts">
import { formatCurrency, formatPercent } from '~/utils/format'
import AIResearchModal from '~/components/workspace/AIResearchModal.vue'
import AuditTrailDrawer from '~/components/workspace/AuditTrailDrawer.vue'
import DualTrackSpectrum from '~/components/workspace/DualTrackSpectrum.vue'
import DCFScenarios from '~/components/workspace/DCFScenarios.vue'
import PnLModelGrid from '~/components/workspace/PnLModelGrid.vue'

const route = useRoute()
const tickerParam = computed(() => String(route.params.ticker || '').toUpperCase())

// Composables de Responsabilité Unique (SRP)
const { activeTab, switchTab, syncActiveTabFromUrlOrStorage } = useStockTabs()
const workspace = useStockWorkspace(tickerParam)

// Modals & Drawers State
const isAiModalOpen = ref(false)
const isAuditDrawerOpen = ref(false)

const copilot = useQuantCopilot(tickerParam, workspace, () => {
  isAiModalOpen.value = false
  isAuditDrawerOpen.value = false
})

onMounted(() => {
  syncActiveTabFromUrlOrStorage()
  workspace.loadStockData()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Error State -->
    <div v-if="workspace.errorMessage.value" class="rounded-xl border border-rose-500/30 bg-rose-950/40 p-6 text-xs text-rose-300 font-mono">
      {{ workspace.errorMessage.value }}
    </div>

    <!-- Loading State -->
    <div v-else-if="workspace.isLoading.value" class="py-24 text-center text-xs text-zinc-500 font-mono">
      Chargement du workspace pour {{ tickerParam }}...
    </div>

    <!-- Workspace Loaded -->
    <div v-else-if="workspace.stock.value" class="space-y-8">
      <!-- Workspace Header -->
      <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <!-- Left: Stock Meta -->
          <div class="flex items-center gap-5">
            <CompanyLogo :ticker="workspace.stock.value.ticker" :domain="(workspace.stock.value as any).domain" size="lg" />
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h1 class="text-xl font-bold tracking-tight text-white">
                  {{ workspace.stock.value.name || workspace.stock.value.ticker }}
                </h1>
                <span class="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-400">
                  Bêta {{ workspace.stock.value.beta ? workspace.stock.value.beta.toFixed(2) : '1.00' }}
                </span>
                <span
                  class="rounded-md border px-2.5 py-0.5 text-xs font-mono font-bold"
                  :class="workspace.badgeConfig.value.class"
                >
                  {{ workspace.badgeConfig.value.label }} ({{ formatPercent(workspace.marginOfSafety.value) }})
                </span>
              </div>

              <div class="mt-2 flex items-center gap-6 text-xs text-zinc-400 font-mono flex-wrap">
                <div>
                  <span class="text-zinc-500">P0:</span> <span class="font-bold text-white text-sm">{{ formatCurrency(workspace.stock.value.current_price, workspace.stock.value.currency) }}</span>
                </div>
                <div>
                  <span class="text-zinc-500">DCF Fair Value:</span> 
                  <span
                    class="font-bold text-sm ml-1"
                    :class="workspace.isUndervalued.value ? 'text-emerald-400' : 'text-rose-400'"
                  >
                    {{ formatCurrency(workspace.fairValue.value, workspace.stock.value.currency) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="border-b border-zinc-800">
        <nav class="-mb-px flex space-x-6 overflow-x-auto scrollbar-none font-mono">
          <button
            type="button"
            class="whitespace-nowrap pb-3.5 px-1 border-b-2 font-bold text-xs transition flex items-center gap-2 cursor-pointer"
            :class="activeTab === 'dcf' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'"
            @click="switchTab('dcf')"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>DCF & Thèse Quantitative</span>
          </button>

          <button
            type="button"
            class="whitespace-nowrap pb-3.5 px-1 border-b-2 font-bold text-xs transition flex items-center gap-2 cursor-pointer"
            :class="activeTab === 'quant' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'"
            @click="switchTab('quant')"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <span>Quant & Régression</span>
          </button>

          <button
            type="button"
            class="whitespace-nowrap pb-3.5 px-1 border-b-2 font-bold text-xs transition flex items-center gap-2 cursor-pointer"
            :class="activeTab === 'research' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'"
            @click="switchTab('research')"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Deep Research Qualitative</span>
          </button>
        </nav>
      </div>

      <!-- Tab Content Area -->
      <div class="space-y-8">
        <!-- TAB 1: DCF & THÈSE QUANTITATIVE -->
        <div v-if="activeTab === 'dcf'" class="space-y-8">
          
          <!-- Section 1 : PnL Model Grid Component -->
          <PnLModelGrid
            :stock="workspace.stock.value"
            :scenarios="workspace.scenarios.value"
            :revenue-projections="workspace.revenueProjections.value"
            :growth-mode="workspace.growthMode.value"
            :margin-mode="workspace.marginMode.value"
            :growth="workspace.growth.value"
            :growth-y1="workspace.growthY1.value"
            :growth-y2="workspace.growthY2.value"
            :growth-y3="workspace.growthY3.value"
            :growth-y4="workspace.growthY4.value"
            :growth-y5="workspace.growthY5.value"
            :margin="workspace.margin.value"
            :margin-y1="workspace.marginY1.value"
            :margin-y2="workspace.marginY2.value"
            :margin-y3="workspace.marginY3.value"
            :margin-y4="workspace.marginY4.value"
            :margin-y5="workspace.marginY5.value"
            :quant-ai-result="copilot.quantAiResult.value"
            @update:growth-y="workspace.handleUpdateGrowthY"
            @update:margin-y="workspace.handleUpdateMarginY"
            @update:revenue-for-year="workspace.handleUpdateRevenueForYear"
            @propagate-growth="workspace.handlePropagateGrowth"
            @propagate-margin="workspace.handlePropagateMargin"
            @open-ai-modal="isAiModalOpen = true"
            @open-audit-drawer="isAuditDrawerOpen = true"
          />

          <!-- Section 2 : Valorisation & Multiples de Sortie -->
          <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 space-y-6 shadow-xl backdrop-blur">
            <div>
              <h2 class="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-zinc-800 pb-2.5">
                Valorisation & Multiples de Sortie
              </h2>
            </div>
            <div class="grid gap-6 md:grid-cols-3">
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-zinc-400">Multiple Exit (P/E)</span>
                  <EditableValue v-model="workspace.targetMultiple.value" type="multiple" :is-decimal="false" :step="0.5" />
                </div>
                <input v-model.number="workspace.targetMultiple.value" type="range" min="5" max="120" step="0.5" class="w-full accent-emerald-500" />
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-zinc-400">Taux Actualisation / WACC (r)</span>
                  <EditableValue v-model="workspace.discountRate.value" type="percent" :is-decimal="true" :step="0.25" :digits="2" />
                </div>
                <input v-model.number="workspace.discountRate.value" type="range" min="0.05" max="0.20" step="0.0025" class="w-full accent-emerald-500" />
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-zinc-400">Spread Bêta / Scénarios</span>
                  <div class="flex items-center gap-1">
                    <span class="text-zinc-400">±</span>
                    <EditableValue v-model="workspace.riskSpread.value" type="percent" :is-decimal="true" :step="1" :digits="0" />
                  </div>
                </div>
                <input v-model.number="workspace.riskSpread.value" type="range" min="0.05" max="0.50" step="0.01" class="w-full accent-emerald-500" />
              </div>
            </div>
          </div>

          <!-- Dual-Track Spectrum Component (Encapsulé) -->
          <DualTrackSpectrum
            :stock="workspace.stock.value"
            :scenarios="workspace.scenarios.value"
            :currency="workspace.stock.value.currency"
            :analyst-count="workspace.stock.value.analyst_count"
          />

          <!-- Scénarios & Reverse DCF Component -->
          <DCFScenarios
            :scenarios="workspace.scenarios.value"
            :reverse-d-c-f="workspace.reverseDCF.value"
            :current-price="workspace.stock.value.current_price || 0"
            :currency="workspace.stock.value.currency"
            :risk-spread="workspace.riskSpread.value"
          />
        </div>

        <!-- TAB 2: QUANT & REGRESSION -->
        <div v-else-if="activeTab === 'quant'" class="space-y-6">
          <WorkspaceQuant
            :ticker="workspace.stock.value.ticker"
            :currency="workspace.stock.value.currency"
            :current-price="workspace.stock.value.current_price"
            :stock-id="workspace.stock.value.id"
            :initial-preset="workspace.stock.value.quant_preset"
            :initial-start-date="workspace.stock.value.quant_start_date"
            :initial-end-date="workspace.stock.value.quant_end_date"
          />
        </div>

        <!-- TAB 3: DEEP RESEARCH QUALITATIVE -->
        <div v-else-if="activeTab === 'research'">
          <WorkspaceResearch
            :ticker="tickerParam"
            :stock-name="workspace.stock.value.name || workspace.stock.value.ticker"
            :stock-id="workspace.stock.value.id"
          />
        </div>
      </div>
    </div>

    <!-- Modal Workflow IA -->
    <AIResearchModal
      :is-open="isAiModalOpen"
      :ticker="tickerParam"
      :stock-name="workspace.stock.value?.name || tickerParam"
      :prompt-text="copilot.quantiPromptText.value"
      :is-analyzing="copilot.isAnalyzingQuant.value"
      :error-message="copilot.quantAiErrorMessage.value"
      @close="isAiModalOpen = false"
      @analyze="copilot.handleAnalyzeQuant"
      @cancel="copilot.isAnalyzingQuant.value = false"
    />

    <!-- Drawer Audit Trail & Sources -->
    <AuditTrailDrawer
      :is-open="isAuditDrawerOpen"
      :ticker="tickerParam"
      :parsed-audit-data="workspace.parsedAuditData.value"
      :quant-ai-result="copilot.quantAiResult.value"
      @close="isAuditDrawerOpen = false"
      @inject-yahoo="copilot.injectYahooBaselineProjections"
      @inject-ai="copilot.injectAICopilotProjections"
      @open-ai-modal="isAuditDrawerOpen = false; isAiModalOpen = true"
    />
  </div>
</template>
