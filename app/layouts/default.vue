<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 antialiased">
    <header class="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <h1 class="text-lg font-semibold tracking-tight text-white">
          StockPick
        </h1>
        <slot name="header-actions" />
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>
