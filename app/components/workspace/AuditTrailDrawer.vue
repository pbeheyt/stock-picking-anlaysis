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
        class="fixed inset-0 z-50 bg-gray-950/70 backdrop-blur-sm"
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
        class="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-gray-900 border-l border-gray-800 shadow-2xl p-6 flex flex-col justify-between space-y-6 overflow-y-auto"
      >
        <!-- Header -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-gray-800 pb-4">
            <div class="flex items-center gap-2">
              <span class="text-xl">📋</span>
              <div>
                <h3 class="text-base font-bold text-white">Audit Trail & Sources — {{ ticker }}</h3>
                <p class="text-xs text-gray-400">Consultez l'historique et injectez les données Baseline Yahoo ou Étude IA.</p>
              </div>
            </div>
            <button
              type="button"
              class="text-gray-400 hover:text-white transition p-1.5 rounded-lg hover:bg-gray-800"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>

          <!-- Tabs Switcher -->
          <div class="flex p-1 bg-gray-950 rounded-xl border border-gray-800 text-xs">
            <button
              type="button"
              class="flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2"
              :class="drawerTab === 'ai'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-gray-400 hover:text-white'"
              @click="drawerTab = 'ai'"
            >
              <span>🤖</span>
              <span>Étude IA & Justifications</span>
              <span v-if="quantAiResult" class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
            </button>
            <button
              type="button"
              class="flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2"
              :class="drawerTab === 'yahoo'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-gray-400 hover:text-white'"
              @click="drawerTab = 'yahoo'"
            >
              <span>📊</span>
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
                  <div class="text-xs font-bold text-emerald-400">Étude IA Active (DeepSeek)</div>
                  <div class="text-[11px] text-gray-400 mt-0.5">Analysée le {{ new Date(quantAiResult.analyzed_at || Date.now()).toLocaleDateString() }}</div>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow"
                  @click="emit('inject-ai')"
                >
                  <span>🚀 Injecter dans le DCF</span>
                </button>
              </div>

              <!-- Cartes des Justifications -->
              <div class="space-y-4 text-xs">
                <!-- Croissance -->
                <div class="rounded-xl bg-gray-950 border border-gray-800 p-4 space-y-2">
                  <div class="flex items-center justify-between text-emerald-400 font-bold uppercase tracking-wider">
                    <span>1. Croissance CA Projets 5Y</span>
                    <span class="font-mono text-white text-[11px]">
                      {{ quantAiResult.growth_projections?.join('%, ') }}%
                    </span>
                  </div>
                  <p class="text-gray-300 leading-relaxed italic border-t border-gray-800/80 pt-2">
                    "{{ quantAiResult.justifications?.growth }}"
                  </p>
                </div>

                <!-- Marge Nette -->
                <div class="rounded-xl bg-gray-950 border border-gray-800 p-4 space-y-2">
                  <div class="flex items-center justify-between text-sky-400 font-bold uppercase tracking-wider">
                    <span>2. Marge Nette Projets 5Y</span>
                    <span class="font-mono text-white text-[11px]">
                      {{ quantAiResult.margin_projections?.join('%, ') }}%
                    </span>
                  </div>
                  <p class="text-gray-300 leading-relaxed italic border-t border-gray-800/80 pt-2">
                    "{{ quantAiResult.justifications?.margin }}"
                  </p>
                </div>

                <!-- Multiple Exit -->
                <div class="rounded-xl bg-gray-950 border border-gray-800 p-4 space-y-2">
                  <div class="flex items-center justify-between text-amber-400 font-bold uppercase tracking-wider">
                    <span>3. Multiple P/E Exit</span>
                    <span class="font-mono text-white text-[11px]">{{ quantAiResult.target_multiple }}x</span>
                  </div>
                  <p class="text-gray-300 leading-relaxed italic border-t border-gray-800/80 pt-2">
                    "{{ quantAiResult.justifications?.multiple }}"
                  </p>
                </div>

                <!-- WACC -->
                <div class="rounded-xl bg-gray-950 border border-gray-800 p-4 space-y-2">
                  <div class="flex items-center justify-between text-purple-400 font-bold uppercase tracking-wider">
                    <span>4. Taux Actualisation WACC</span>
                    <span class="font-mono text-white text-[11px]">{{ quantAiResult.discount_rate }}%</span>
                  </div>
                  <p class="text-gray-300 leading-relaxed italic border-t border-gray-800/80 pt-2">
                    "{{ quantAiResult.justifications?.wacc }}"
                  </p>
                </div>
              </div>

              <!-- Bouton Nouvelle Analyse -->
              <button
                type="button"
                class="w-full py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs font-bold text-gray-300 hover:text-white hover:border-gray-700 transition flex items-center justify-center gap-2"
                @click="emit('open-ai-modal')"
              >
                <span>🔄 Relancer une nouvelle analyse IA</span>
              </button>
            </div>

            <!-- Cas B : Aucune étude existante -->
            <div v-else class="rounded-xl border border-gray-800 bg-gray-950 p-8 text-center space-y-4">
              <div class="text-3xl">🤖</div>
              <div>
                <h4 class="text-sm font-bold text-white">Aucune étude IA enregistrée</h4>
                <p class="text-xs text-gray-400 mt-1">Lancez une analyse Deep Research pour alimenter le modèle avec des justifications financières sur-mesure.</p>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow"
                @click="emit('open-ai-modal')"
              >
                <span>✨ Lancer l'enrichissement IA</span>
              </button>
            </div>
          </div>

          <!-- ONGLET 2 : Baseline Yahoo & Nitro -->
          <div v-else-if="drawerTab === 'yahoo'" class="space-y-6">
            <div class="flex items-center justify-between bg-sky-950/40 border border-sky-500/30 p-4 rounded-xl">
              <div>
                <div class="text-xs font-bold text-sky-400">Baseline Yahoo Finance & Cascades</div>
                <div class="text-[11px] text-gray-400 mt-0.5">Métriques brutes et cascades d'ancrage Nitro</div>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-500 transition shadow"
                @click="emit('inject-yahoo')"
              >
                <span>📊 Injecter valeurs Yahoo</span>
              </button>
            </div>

            <!-- Cascades Nitro -->
            <div v-if="parsedAuditData" class="space-y-4 text-xs">
              <!-- Croissance -->
              <div class="rounded-xl border border-gray-800 bg-gray-950 p-4 space-y-2">
                <div class="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span class="font-bold text-white">1. Croissance (g)</span>
                  <span class="text-emerald-400 font-mono font-bold">Retenu : {{ (parsedAuditData.growth?.selected * 100).toFixed(1) }}%</span>
                </div>
                <div class="space-y-1.5">
                  <div v-for="c in parsedAuditData.growth?.candidates || []" :key="c.name" class="flex justify-between p-2 rounded bg-gray-900/60 text-[11px]">
                    <span class="text-gray-300">{{ c.name }}</span>
                    <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-gray-500'">
                      {{ c.value !== null ? `${(c.value * 100).toFixed(1)}%` : '-' }} ({{ c.status }})
                    </span>
                  </div>
                </div>
              </div>

              <!-- Marge Nette -->
              <div class="rounded-xl border border-gray-800 bg-gray-950 p-4 space-y-2">
                <div class="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span class="font-bold text-white">2. Marge Nette (m)</span>
                  <span class="text-emerald-400 font-mono font-bold">Retenu : {{ (parsedAuditData.margin?.selected * 100).toFixed(1) }}%</span>
                </div>
                <div class="space-y-1.5">
                  <div v-for="c in parsedAuditData.margin?.candidates || []" :key="c.name" class="flex justify-between p-2 rounded bg-gray-900/60 text-[11px]">
                    <span class="text-gray-300">{{ c.name }}</span>
                    <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-gray-500'">
                      {{ c.value !== null ? `${(c.value * 100).toFixed(1)}%` : '-' }} ({{ c.status }})
                    </span>
                  </div>
                </div>
              </div>

              <!-- Exit Multiple -->
              <div class="rounded-xl border border-gray-800 bg-gray-950 p-4 space-y-2">
                <div class="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span class="font-bold text-white">3. Exit Multiple (P/E)</span>
                  <span class="text-emerald-400 font-mono font-bold">Retenu : {{ parsedAuditData.pe?.selected }}x</span>
                </div>
                <div class="space-y-1.5">
                  <div v-for="c in parsedAuditData.pe?.candidates || []" :key="c.name" class="flex justify-between p-2 rounded bg-gray-900/60 text-[11px]">
                    <span class="text-gray-300">{{ c.name }}</span>
                    <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-gray-500'">
                      {{ c.value !== null ? `${c.value}x` : '-' }} ({{ c.status }})
                    </span>
                  </div>
                </div>
              </div>

              <!-- Discount Rate -->
              <div class="rounded-xl border border-gray-800 bg-gray-950 p-4 space-y-2">
                <div class="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span class="font-bold text-white">4. Taux Actualisation (r)</span>
                  <span class="text-emerald-400 font-mono font-bold">Retenu : {{ (parsedAuditData.discount_rate?.selected * 100).toFixed(1) }}%</span>
                </div>
                <div class="space-y-1.5">
                  <div v-for="c in parsedAuditData.discount_rate?.candidates || []" :key="c.name" class="flex justify-between p-2 rounded bg-gray-900/60 text-[11px]">
                    <span class="text-gray-300">{{ c.name }}</span>
                    <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-gray-500'">
                      {{ c.value !== null ? `${(c.value * 100).toFixed(1)}%` : '-' }} ({{ c.status }})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div class="border-t border-gray-800 pt-4 flex justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-gray-800 text-xs font-bold text-gray-300 hover:text-white transition"
            @click="emit('close')"
          >
            Fermer Le Panneau
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
