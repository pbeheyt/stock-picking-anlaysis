<script setup lang="ts">
import type { AuditData } from '~/types/database.types'
import type { QuantitativeAIResult } from '~/server/api/stock/[ticker]/quantitative.post'

const props = defineProps<{
  isOpen: boolean
  ticker: string
  parsedAuditData?: AuditData | null
  quantAiResult?: QuantitativeAIResult | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'inject-yahoo'): void
  (e: 'inject-ai'): void
  (e: 'open-ai-modal'): void
}>()

const drawerTab = ref<'yahoo' | 'ai'>('ai')

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    drawerTab.value = props.quantAiResult ? 'ai' : 'yahoo'
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm"
        @click="emit('close')"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-zinc-950 border-l border-zinc-800 shadow-2xl p-6 flex flex-col justify-between space-y-6 overflow-y-auto"
      >
        <!-- Header -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div class="flex items-center gap-2.5">
              <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white font-mono tracking-tight">Audit Trail & Sources — {{ ticker }}</h3>
                <p class="text-xs text-zinc-400">Consultez l'historique et injectez les données Baseline Yahoo ou Étude IA.</p>
              </div>
            </div>
            <button
              type="button"
              class="text-zinc-400 hover:text-white transition p-1.5 rounded-lg hover:bg-zinc-900"
              @click="emit('close')"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Tabs Switcher -->
          <div class="flex p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-xs font-mono">
            <button
              type="button"
              class="flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2"
              :class="drawerTab === 'ai'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'"
              @click="drawerTab = 'ai'"
            >
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Étude IA & Justifications</span>
              <span v-if="quantAiResult" class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
            </button>
            <button
              type="button"
              class="flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2"
              :class="drawerTab === 'yahoo'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'"
              @click="drawerTab = 'yahoo'"
            >
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Baseline Yahoo & Nitro</span>
            </button>
          </div>
        </div>

        <!-- Body Content -->
        <div class="flex-1 overflow-y-auto space-y-6 pr-1">

          <!-- ONGLET 1 : Étude IA & Justifications -->
          <div v-if="drawerTab === 'ai'" class="space-y-6">
            <!-- Cas A : Étude existante -->
            <div v-if="quantAiResult" class="space-y-6">
              <div class="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl">
                <div>
                  <div class="text-xs font-bold text-emerald-400 font-mono">Étude IA Active (DeepSeek)</div>
                  <div class="text-[11px] text-zinc-400 mt-0.5 font-mono">Analysée le {{ new Date(quantAiResult.analyzed_at || Date.now()).toLocaleDateString() }}</div>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow"
                  @click="emit('inject-ai')"
                >
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Injecter dans le DCF</span>
                </button>
              </div>

              <!-- Cartes des Justifications -->
              <div class="space-y-4 text-xs font-mono">
                <!-- Croissance -->
                <div class="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-2">
                  <div class="flex items-center justify-between text-emerald-400 font-bold uppercase tracking-wider">
                    <span>1. Croissance CA Projets 5Y</span>
                    <span class="text-white text-[11px]">
                      {{ quantAiResult.growth_projections?.join('%, ') }}%
                    </span>
                  </div>
                  <p class="text-zinc-300 leading-relaxed italic border-t border-zinc-800/80 pt-2 font-sans">
                    "{{ quantAiResult.justifications?.growth }}"
                  </p>
                </div>

                <!-- Marge Nette -->
                <div class="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-2">
                  <div class="flex items-center justify-between text-sky-400 font-bold uppercase tracking-wider">
                    <span>2. Marge Nette Projets 5Y</span>
                    <span class="text-white text-[11px]">
                      {{ quantAiResult.margin_projections?.join('%, ') }}%
                    </span>
                  </div>
                  <p class="text-zinc-300 leading-relaxed italic border-t border-zinc-800/80 pt-2 font-sans">
                    "{{ quantAiResult.justifications?.margin }}"
                  </p>
                </div>

                <!-- Multiple Exit -->
                <div class="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-2">
                  <div class="flex items-center justify-between text-amber-400 font-bold uppercase tracking-wider">
                    <span>3. Multiple P/E Exit</span>
                    <span class="text-white text-[11px]">{{ quantAiResult.target_multiple }}x</span>
                  </div>
                  <p class="text-zinc-300 leading-relaxed italic border-t border-zinc-800/80 pt-2 font-sans">
                    "{{ quantAiResult.justifications?.multiple }}"
                  </p>
                </div>

                <!-- WACC -->
                <div class="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-2">
                  <div class="flex items-center justify-between text-purple-400 font-bold uppercase tracking-wider">
                    <span>4. Taux Actualisation WACC</span>
                    <span class="text-white text-[11px]">{{ quantAiResult.discount_rate }}%</span>
                  </div>
                  <p class="text-zinc-300 leading-relaxed italic border-t border-zinc-800/80 pt-2 font-sans">
                    "{{ quantAiResult.justifications?.wacc }}"
                  </p>
                </div>
              </div>

              <!-- Bouton Nouvelle Analyse -->
              <button
                type="button"
                class="w-full py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition flex items-center justify-center gap-2"
                @click="emit('open-ai-modal')"
              >
                <svg class="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Relancer une nouvelle analyse IA</span>
              </button>
            </div>

            <!-- Cas B : Aucune étude existante -->
            <div v-else class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 text-center space-y-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 mx-auto">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 class="text-xs font-bold text-white font-mono uppercase">Aucune étude IA enregistrée</h4>
                <p class="text-xs text-zinc-400 mt-1">Lancez une analyse Deep Research pour alimenter le modèle avec des justifications financières sur-mesure.</p>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow"
                @click="emit('open-ai-modal')"
              >
                <span>Lancer l'enrichissement IA</span>
              </button>
            </div>
          </div>

          <!-- ONGLET 2 : Baseline Yahoo & Nitro -->
          <div v-else-if="drawerTab === 'yahoo'" class="space-y-6">
            <div class="flex items-center justify-between bg-sky-950/40 border border-sky-500/30 p-4 rounded-xl">
              <div>
                <div class="text-xs font-bold text-sky-400 font-mono">Baseline Yahoo Finance & Cascades</div>
                <div class="text-[11px] text-zinc-400 mt-0.5 font-mono">Métriques brutes et cascades d'ancrage Nitro</div>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-sky-500 transition shadow"
                @click="emit('inject-yahoo')"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Injecter valeurs Yahoo</span>
              </button>
            </div>

            <!-- Cascades Nitro -->
            <div v-if="parsedAuditData" class="space-y-4 text-xs font-mono">
              <!-- Croissance -->
              <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
                <div class="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span class="font-bold text-white">1. Croissance (g)</span>
                  <span class="text-emerald-400 font-bold">Retenu : {{ (parsedAuditData.growth?.selected * 100).toFixed(1) }}%</span>
                </div>
                <div class="space-y-1.5">
                  <div v-for="c in parsedAuditData.growth?.candidates || []" :key="c.name" class="flex justify-between p-2 rounded bg-zinc-900/60 text-[11px]">
                    <span class="text-zinc-300">{{ c.name }}</span>
                    <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-zinc-500'">
                      {{ c.value !== null ? `${(c.value * 100).toFixed(1)}%` : '-' }} ({{ c.status }})
                    </span>
                  </div>
                </div>
              </div>

              <!-- Marge Nette -->
              <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
                <div class="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span class="font-bold text-white">2. Marge Nette (m)</span>
                  <span class="text-emerald-400 font-bold">Retenu : {{ (parsedAuditData.margin?.selected * 100).toFixed(1) }}%</span>
                </div>
                <div class="space-y-1.5">
                  <div v-for="c in parsedAuditData.margin?.candidates || []" :key="c.name" class="flex justify-between p-2 rounded bg-zinc-900/60 text-[11px]">
                    <span class="text-zinc-300">{{ c.name }}</span>
                    <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-zinc-500'">
                      {{ c.value !== null ? `${(c.value * 100).toFixed(1)}%` : '-' }} ({{ c.status }})
                    </span>
                  </div>
                </div>
              </div>

              <!-- Exit Multiple -->
              <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
                <div class="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span class="font-bold text-white">3. Exit Multiple (P/E)</span>
                  <span class="text-emerald-400 font-bold">Retenu : {{ parsedAuditData.pe?.selected }}x</span>
                </div>
                <div class="space-y-1.5">
                  <div v-for="c in parsedAuditData.pe?.candidates || []" :key="c.name" class="flex justify-between p-2 rounded bg-zinc-900/60 text-[11px]">
                    <span class="text-zinc-300">{{ c.name }}</span>
                    <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-zinc-500'">
                      {{ c.value !== null ? `${c.value}x` : '-' }} ({{ c.status }})
                    </span>
                  </div>
                </div>
              </div>

              <!-- Discount Rate -->
              <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
                <div class="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span class="font-bold text-white">4. Taux Actualisation (r)</span>
                  <span class="text-emerald-400 font-bold">Retenu : {{ (parsedAuditData.discount_rate?.selected * 100).toFixed(1) }}%</span>
                </div>
                <div class="space-y-1.5">
                  <div v-for="c in parsedAuditData.discount_rate?.candidates || []" :key="c.name" class="flex justify-between p-2 rounded bg-zinc-900/60 text-[11px]">
                    <span class="text-zinc-300">{{ c.name }}</span>
                    <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-zinc-500'">
                      {{ c.value !== null ? `${(c.value * 100).toFixed(1)}%` : '-' }} ({{ c.status }})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div class="border-t border-zinc-800 pt-4 flex justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition"
            @click="emit('close')"
          >
            Fermer le panneau
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
