<script setup lang="ts">
const RAINBOW = [
  'rgb(250,155,147)',
  'rgb(255,185,137)',
  'rgb(255,225,155)',
  'rgb(185,230,180)',
  'rgb(180,205,240)',
  'rgb(195,180,230)',
  'rgb(230,180,210)',
]

const offset = ref(0)

onMounted(() => {
  setInterval(() => { offset.value++ }, 120)
})

const rainbow404 = computed(() => {
  return '404'
    .split('')
    .map((ch, i) => {
      const color = RAINBOW[(i + offset.value) % RAINBOW.length]
      return `<span style="color:${color}">${ch}</span>`
    })
    .join('')
})

const ghost = [
  '   .----.   ',
  '  / °  ° \\  ',
  '  |      |  ',
  '  ~`~``~`~  ',
]
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <pre class="text-lg leading-[1.3] text-epic select-none mb-6"><template v-for="(line, i) in ghost" :key="i">{{ line }}
</template></pre>

    <p class="text-6xl sm:text-8xl font-bold mb-4" v-html="rainbow404" />

    <p class="text-term-muted text-sm mb-8">this companion wandered off</p>

    <a
      href="/"
      class="inline-flex items-center gap-2 bg-legendary border border-legendary rounded-md px-5 py-3 text-sm transition-all text-[#0c0c0c] font-medium hover:brightness-110 hover:shadow-[0_0_12px_rgba(243,249,157,0.3)]"
    >
      go home
    </a>
  </div>
</template>
