<script setup lang="ts">
const copied = ref(false)

function copyCommand() {
  navigator.clipboard.writeText('npx ccbuddyy')
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

interface Companion {
  name: string
  species: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  eye: string
  hat: string
  description: string
}

const hatLines: Record<string, string> = {
  none: '',
  crown: '   \\^^^/    ',
  tophat: '   [___]    ',
  propeller: '    -+-     ',
  halo: '   (   )    ',
  wizard: '    /^\\     ',
  beanie: '   (___)    ',
  tinyduck: '    ,>      ',
}

const BODIES: Record<string, string[][]> = {
  duck: [
    ['            ', '    __      ', '  <({E} )___  ', '   (  ._>   ', '    `--´    '],
    ['            ', '    __      ', '  <({E} )___  ', '   (  ._>   ', '    `--´~   '],
    ['            ', '    __      ', '  <({E} )___  ', '   (  .__>  ', '    `--´    '],
  ],
  goose: [
    ['            ', '     ({E}>    ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
    ['            ', '    ({E}>     ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
    ['            ', '     ({E}>>   ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
  ],
  blob: [
    ['            ', '   .----.   ', '  ( {E}  {E} )  ', '  (      )  ', '   `----´   '],
    ['            ', '  .------.  ', ' (  {E}  {E}  ) ', ' (        ) ', '  `------´  '],
    ['            ', '    .--.    ', '   ({E}  {E})   ', '   (    )   ', '    `--´    '],
  ],
  cat: [
    ['            ', '   /\\_/\\    ', '  ( {E}   {E})  ', '  (  ω  )   ', '  (")_(")   '],
    ['            ', '   /\\_/\\    ', '  ( {E}   {E})  ', '  (  ω  )   ', '  (")_(")~  '],
    ['            ', '   /\\-/\\    ', '  ( {E}   {E})  ', '  (  ω  )   ', '  (")_(")   '],
  ],
  dragon: [
    ['            ', '  /^\\  /^\\  ', ' <  {E}  {E}  > ', ' (   ~~   ) ', '  `-vvvv-´  '],
    ['            ', '  /^\\  /^\\  ', ' <  {E}  {E}  > ', ' (        ) ', '  `-vvvv-´  '],
    ['   ~    ~   ', '  /^\\  /^\\  ', ' <  {E}  {E}  > ', ' (   ~~   ) ', '  `-vvvv-´  '],
  ],
  octopus: [
    ['            ', '   .----.   ', '  ( {E}  {E} )  ', '  (______)  ', '  /\\/\\/\\/\\  '],
    ['            ', '   .----.   ', '  ( {E}  {E} )  ', '  (______)  ', '  \\/\\/\\/\\/  '],
    ['     o      ', '   .----.   ', '  ( {E}  {E} )  ', '  (______)  ', '  /\\/\\/\\/\\  '],
  ],
  owl: [
    ['            ', '   /\\  /\\   ', '  (({E})({E}))  ', '  (  ><  )  ', '   `----´   '],
    ['            ', '   /\\  /\\   ', '  (({E})({E}))  ', '  (  ><  )  ', '   .----.   '],
    ['            ', '   /\\  /\\   ', '  (({E})(-))  ', '  (  ><  )  ', '   `----´   '],
  ],
  penguin: [
    ['            ', '  .---.     ', '  ({E}>{E})     ', ' /(   )\\    ', '  `---´     '],
    ['            ', '  .---.     ', '  ({E}>{E})     ', ' |(   )|    ', '  `---´     '],
    ['  .---.     ', '  ({E}>{E})     ', ' /(   )\\    ', '  `---´     ', '   ~ ~      '],
  ],
  turtle: [
    ['            ', '   _,--._   ', '  ( {E}  {E} )  ', ' /[______]\\ ', '  ``    ``  '],
    ['            ', '   _,--._   ', '  ( {E}  {E} )  ', ' /[______]\\ ', '   ``  ``   '],
    ['            ', '   _,--._   ', '  ( {E}  {E} )  ', ' /[======]\\ ', '  ``    ``  '],
  ],
  snail: [
    ['            ', ' {E}    .--.  ', '  \\  ( @ )  ', '   \\_`--´   ', '  ~~~~~~~   '],
    ['            ', '  {E}   .--.  ', '  |  ( @ )  ', '   \\_`--´   ', '  ~~~~~~~   '],
    ['            ', ' {E}    .--.  ', '  \\  ( @  ) ', '   \\_`--´   ', '   ~~~~~~   '],
  ],
  ghost: [
    ['            ', '   .----.   ', '  / {E}  {E} \\  ', '  |      |  ', '  ~`~``~`~  '],
    ['            ', '   .----.   ', '  / {E}  {E} \\  ', '  |      |  ', '  `~`~~`~`  '],
    ['    ~  ~    ', '   .----.   ', '  / {E}  {E} \\  ', '  |      |  ', '  ~~`~~`~~  '],
  ],
  axolotl: [
    ['            ', '}~(______)~{', '}~({E} .. {E})~{', '  ( .--. )  ', '  (_/  \\_)  '],
    ['            ', '~}(______){~', '~}({E} .. {E}){~', '  ( .--. )  ', '  (_/  \\_)  '],
    ['            ', '}~(______)~{', '}~({E} .. {E})~{', '  (  --  )  ', '  ~_/  \\_~  '],
  ],
  capybara: [
    ['            ', '  n______n  ', ' ( {E}    {E} ) ', ' (   oo   ) ', '  `------´  '],
    ['            ', '  n______n  ', ' ( {E}    {E} ) ', ' (   Oo   ) ', '  `------´  '],
    ['    ~  ~    ', '  u______n  ', ' ( {E}    {E} ) ', ' (   oo   ) ', '  `------´  '],
  ],
  cactus: [
    ['            ', ' n  ____  n ', ' | |{E}  {E}| | ', ' |_|    |_| ', '   |    |   '],
    ['            ', '    ____    ', ' n |{E}  {E}| n ', ' |_|    |_| ', '   |    |   '],
    [' n        n ', ' |  ____  | ', ' | |{E}  {E}| | ', ' |_|    |_| ', '   |    |   '],
  ],
  robot: [
    ['            ', '   .[||].   ', '  [ {E}  {E} ]  ', '  [ ==== ]  ', '  `------´  '],
    ['            ', '   .[||].   ', '  [ {E}  {E} ]  ', '  [ -==- ]  ', '  `------´  '],
    ['     *      ', '   .[||].   ', '  [ {E}  {E} ]  ', '  [ ==== ]  ', '  `------´  '],
  ],
  rabbit: [
    ['            ', '   (\\__/)   ', '  ( {E}  {E} )  ', ' =(  ..  )= ', '  (")__(")  '],
    ['            ', '   (|__/)   ', '  ( {E}  {E} )  ', ' =(  ..  )= ', '  (")__(")  '],
    ['            ', '   (\\__/)   ', '  ( {E}  {E} )  ', ' =( .  . )= ', '  (")__(")  '],
  ],
  mushroom: [
    ['            ', ' .-o-OO-o-. ', '(__________)', '   |{E}  {E}|   ', '   |____|   '],
    ['            ', ' .-O-oo-O-. ', '(__________)', '   |{E}  {E}|   ', '   |____|   '],
    ['   . o  .   ', ' .-o-OO-o-. ', '(__________)', '   |{E}  {E}|   ', '   |____|   '],
  ],
  chonk: [
    ['            ', '  /\\    /\\  ', ' ( {E}    {E} ) ', ' (   ..   ) ', '  `------´  '],
    ['            ', '  /\\    /|  ', ' ( {E}    {E} ) ', ' (   ..   ) ', '  `------´  '],
    ['            ', '  /\\    /\\  ', ' ( {E}    {E} ) ', ' (   ..   ) ', '  `------´~ '],
  ],
}

const IDLE_SEQUENCE = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0]

function renderFrame(species: string, eye: string, hat: string, frameIdx: number): string[] {
  const frames = BODIES[species] || BODIES.blob
  const body = frames[frameIdx % frames.length].map((l) => l.replaceAll('{E}', eye))
  const lines = [...body]
  if (hat !== 'none' && !lines[0].trim()) {
    lines[0] = hatLines[hat] || lines[0]
  }
  return lines
}

const companions: Companion[] = [
  // legendary
  { name: 'Emberclaw', species: 'dragon', rarity: 'legendary', eye: '✦', hat: 'crown', description: 'Breathes fire into your debug sessions' },
  { name: 'Screwflap', species: 'penguin', rarity: 'legendary', eye: '◉', hat: 'wizard', description: 'Waddles through your code with arcane wisdom' },
  { name: 'Quackshot', species: 'duck', rarity: 'legendary', eye: '✦', hat: 'tinyduck', description: 'The original rubber duck debugger' },
  { name: 'Inkstorm', species: 'octopus', rarity: 'legendary', eye: '✦', hat: 'wizard', description: 'Eight arms, eight open PRs' },
  // epic
  { name: 'Glitchpurr', species: 'cat', rarity: 'epic', eye: '×', hat: 'halo', description: 'Knocks bugs off the table' },
  { name: 'Phantombyte', species: 'ghost', rarity: 'epic', eye: '°', hat: 'none', description: 'Haunts your forgotten TODO comments' },
  { name: 'Shroomweaver', species: 'mushroom', rarity: 'epic', eye: '◉', hat: 'none', description: 'Grows solutions from the mycorrhizal network' },
  { name: 'Moonhoot', species: 'owl', rarity: 'epic', eye: '°', hat: 'crown', description: 'Watches your code at 3am' },
  // rare
  { name: 'Voltsprocket', species: 'robot', rarity: 'rare', eye: '@', hat: 'propeller', description: 'Runs your tests at machine speed' },
  { name: 'Gloopsworth', species: 'blob', rarity: 'rare', eye: '·', hat: 'tophat', description: 'Absorbs complexity so you do not have to' },
  { name: 'Shellbrain', species: 'turtle', rarity: 'rare', eye: '·', hat: 'beanie', description: 'Slow and steady ships the feature' },
  { name: 'Gillbert', species: 'axolotl', rarity: 'rare', eye: '×', hat: 'halo', description: 'Regenerates deleted code from memory' },
  { name: 'Megachonk', species: 'chonk', rarity: 'rare', eye: '✦', hat: 'crown', description: 'Absolute unit of a pair programmer' },
  // uncommon
  { name: 'Chompsworth', species: 'capybara', rarity: 'uncommon', eye: '·', hat: 'tophat', description: 'Unbothered by merge conflicts' },
  { name: 'Needlestack', species: 'cactus', rarity: 'uncommon', eye: '@', hat: 'none', description: 'Prickly about code quality' },
  { name: 'Bunnybuffer', species: 'rabbit', rarity: 'uncommon', eye: '°', hat: 'beanie', description: 'Hops between branches effortlessly' },
  // common
  { name: 'Honkzilla', species: 'goose', rarity: 'common', eye: '·', hat: 'none', description: 'Honks at every lint warning' },
  { name: 'Trailslime', species: 'snail', rarity: 'common', eye: '·', hat: 'none', description: 'Leaves a trail of well-documented code' },
]

const tick = ref(0)
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    tick.value++
  }, 500)
})

onUnmounted(() => {
  clearInterval(interval)
})

function currentSprite(c: Companion, index: number): string[] {
  const seqIdx = (tick.value + index * 3) % IDLE_SEQUENCE.length
  const frame = IDLE_SEQUENCE[seqIdx]
  return renderFrame(c.species, c.eye, c.hat, frame)
}

const rarityColor: Record<string, string> = {
  common: 'text-common',
  uncommon: 'text-uncommon',
  rare: 'text-rare',
  epic: 'text-epic',
  legendary: 'text-legendary',
}

const rarityBorder: Record<string, string> = {
  common: 'border-common/20',
  uncommon: 'border-uncommon/20',
  rare: 'border-rare/20',
  epic: 'border-epic/20',
  legendary: 'border-legendary/25',
}

const rarityStars: Record<string, string> = {
  common: '★',
  uncommon: '★★',
  rare: '★★★',
  epic: '★★★★',
  legendary: '★★★★★',
}

// Rainbow colors from Claude Code theme (shimmer variant)
const RAINBOW = [
  'rgb(250,155,147)', // red
  'rgb(255,185,137)', // orange
  'rgb(255,225,155)', // yellow
  'rgb(185,230,180)', // green
  'rgb(180,205,240)', // blue
  'rgb(195,180,230)', // indigo
  'rgb(230,180,210)', // violet
]

// Rainbow animation offset
const rainbowOffset = ref(0)

onMounted(() => {
  setInterval(() => {
    rainbowOffset.value++
  }, 120)
})

const bannerText = '/buddy'
const line2 = 'Pick your /buddy companion'

const terminalHtml = computed(() => {
  const rb = bannerText
    .split('')
    .map((ch, i) => {
      const color = RAINBOW[(i + rainbowOffset.value) % RAINBOW.length]
      return `<span style="color:${color}">${ch}</span>`
    })
    .join('')

  const w = 38
  const pad1 = ' '.repeat(w - 2 - bannerText.length)
  const pad2 = ' '.repeat(w - 2 - line2.length)
  const line2Html = '<span class="text-term-text">Pick your</span> <span class="text-term-bright">/buddy</span> <span class="text-term-text">companion</span>'

  return `<span class="text-term-muted">$ npx ccbuddyy</span>

  ╭${'─'.repeat(w)}╮
  │  ${rb}${pad1}│
  │  ${line2Html}${pad2}│
  ╰${'─'.repeat(w)}╯<span class="cursor-blink text-term-bright">█</span>`
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Terminal hero -->
    <section class="px-4 sm:px-6 pt-12 sm:pt-16 pb-10 max-w-3xl mx-auto">
      <div class="bg-term-surface border border-term-border rounded-md overflow-hidden">
        <!-- Title bar -->
        <div class="flex items-center gap-2 px-3 py-2 border-b border-term-border">
          <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span class="text-term-dim text-[11px] ml-2">ccbuddyy</span>
        </div>
        <!-- Terminal body -->
        <div class="p-4 sm:p-5">
          <pre class="text-sm leading-relaxed whitespace-pre" v-html="terminalHtml" />
        </div>
      </div>

      <!-- Copy command -->
      <div class="mt-6 flex justify-center">
        <button
          class="group inline-flex items-center gap-3 bg-term-surface border border-term-border rounded-md px-4 py-2.5 text-sm hover:border-prompt/40 transition-colors cursor-pointer"
          @click="copyCommand"
        >
          <span class="text-prompt">$</span>
          <code class="text-term-bright">npx ccbuddyy</code>
          <span class="text-term-dim group-hover:text-term-muted transition-colors text-xs ml-1">
            {{ copied ? '✓ copied' : 'copy' }}
          </span>
        </button>
      </div>

      <p class="text-term-muted text-xs text-center mt-4">
        Force a legendary companion. No luck required.
      </p>
    </section>

    <!-- Companions grid -->
    <section class="px-4 sm:px-6 pb-16 max-w-5xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="(c, idx) in companions"
          :key="c.species"
          class="group bg-term-surface border rounded-md overflow-hidden transition-colors hover:border-opacity-40"
          :class="rarityBorder[c.rarity]"
        >
          <!-- Card title bar -->
          <div class="flex items-center justify-between px-3 py-1.5 border-b border-term-border">
            <div class="flex items-center gap-1.5">
              <span class="text-[11px]" :class="rarityColor[c.rarity]">
                {{ rarityStars[c.rarity] }}
              </span>
              <span
                class="text-[11px] uppercase"
                :class="rarityColor[c.rarity]"
              >
                {{ c.rarity }}
              </span>
            </div>
            <span class="text-term-dim text-[10px]">
              {{ c.species }}{{ c.hat !== 'none' ? ` +${c.hat}` : '' }}
            </span>
          </div>

          <!-- Sprite area -->
          <div class="px-3 pt-3 pb-2 flex justify-center">
            <pre
              class="text-[13px] leading-[1.3] select-none"
              :class="rarityColor[c.rarity]"
            ><template v-for="(line, i) in currentSprite(c, idx)" :key="i">{{ line }}
</template></pre>
          </div>

          <!-- Info -->
          <div class="px-3 pb-3">
            <div class="border-t border-term-border pt-2">
              <p class="text-term-bright text-xs font-medium">{{ c.name }}</p>
              <p class="text-term-dim text-[11px] mt-0.5">{{ c.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-term-border px-6 py-6 text-center">
      <p class="text-term-dim text-[11px]">
        <a
          href="https://github.com/vibenalytics/ccbuddy"
          class="hover:text-term-muted transition-colors"
          target="_blank"
        >
          github
        </a>
        <span class="mx-2">·</span>
        <a
          href="https://www.npmjs.com/package/ccbuddyy"
          class="hover:text-term-muted transition-colors"
          target="_blank"
        >
          npm
        </a>
        <span class="mx-2">·</span>
        <span>vibenalytics</span>
      </p>
    </footer>
  </div>
</template>
