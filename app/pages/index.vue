<script setup lang="ts">
const copied = ref(false)

function copyCommand() {
  navigator.clipboard.writeText('npx epic-buddy')
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const EYES = ['·', '✦', '×', '◉', '@', '°']

interface Companion {
  name: string
  species: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  eye: string
  hat: string
  sprite: string[]
  hatLine: string
  description: string
}

const hatLines: Record<string, string> = {
  none: '',
  crown: '  \\^^^/  ',
  tophat: '  [___]  ',
  propeller: '   -+-   ',
  halo: '  (   )  ',
  wizard: '   /^\\   ',
  beanie: '  (___)  ',
  tinyduck: '   ,>    ',
}

const sprites: Record<string, string[]> = {
  duck: ['   __   ', ' <({E})__ ', '  ( ._> ', "   `--' "],
  goose: ['  ({E}>   ', '  ||    ', ' _(__)_ ', '  ^^^^  '],
  blob: ['  .---.  ', ' ({E}  {E}) ', ' (     ) ', "  `---'  "],
  cat: ['  /\\_/\\  ', ' ({E}   {E}) ', ' (  w  ) ', ' (")_(") '],
  dragon: [' /^\\  /^\\ ', '<  {E}  {E}  >', '(   ~~   )', " `-vvvv-' "],
  octopus: ['  .----.  ', ' ( {E}  {E} ) ', ' (______) ', ' /\\/\\/\\/\\ '],
  owl: ['  /\\  /\\  ', ' (({E})({E})) ', ' (  ><  ) ', "  `----'  "],
  penguin: ['  .---.  ', '  ({E}>{E})  ', ' /(   )\\ ', "  `---'  "],
  turtle: ['  _,--._  ', ' ( {E}  {E} ) ', '/[______]\\', ' ``    `` '],
  snail: ['{E}   .--. ', ' \\  ( @ ) ', "  \\_`--'  ", ' ~~~~~~~  '],
  ghost: ['  .----.  ', ' / {E}  {E} \\ ', ' |      | ', ' ~`~``~`~ '],
  axolotl: ['}~(_____)~{', '}~({E} ..{E})~{', ' ( .--. ) ', ' (_/  \\_) '],
  capybara: [' n______n ', '( {E}    {E} )', '(   oo   )', " `------' "],
  cactus: [' n  __  n ', ' | |{E} {E}| | ', ' |_|  |_| ', '   |  |   '],
  robot: ['  .[||].  ', ' [ {E}  {E} ] ', ' [ ==== ] ', " `------' "],
  rabbit: ['  (\\__/)  ', ' ( {E}  {E} ) ', '=(  ..  )=', ' (")__(") '],
  mushroom: ['.-o-OO-o-.', '(_________)', '  |{E}  {E}|  ', '  |____|  '],
  chonk: [' /\\    /\\ ', '( {E}    {E} )', '(   ..   )', " `------' "],
}

function renderSprite(species: string, eye: string): string[] {
  const frames = sprites[species] || sprites.blob
  return frames.map((l) => l.replaceAll('{E}', eye))
}

const companions: Companion[] = [
  { name: 'Emberclaw', species: 'dragon', rarity: 'legendary', eye: '✦', hat: 'crown', description: 'Breathes fire into your debug sessions' },
  { name: 'Screwflap', species: 'penguin', rarity: 'legendary', eye: '◉', hat: 'wizard', description: 'Waddles through your code with arcane wisdom' },
  { name: 'Glitchpurr', species: 'cat', rarity: 'epic', eye: '×', hat: 'halo', description: 'Knocks bugs off the table' },
  { name: 'Phantombyte', species: 'ghost', rarity: 'epic', eye: '°', hat: 'none', description: 'Haunts your forgotten TODO comments' },
  { name: 'Voltsprocket', species: 'robot', rarity: 'rare', eye: '@', hat: 'propeller', description: 'Runs your tests at machine speed' },
  { name: 'Gloopsworth', species: 'blob', rarity: 'rare', eye: '·', hat: 'tophat', description: 'Absorbs complexity so you do not have to' },
  { name: 'Quackshot', species: 'duck', rarity: 'legendary', eye: '✦', hat: 'tinyduck', description: 'The original rubber duck debugger' },
  { name: 'Shroomweaver', species: 'mushroom', rarity: 'epic', eye: '◉', hat: 'none', description: 'Grows solutions from the mycorrhizal network' },
  { name: 'Shellbrain', species: 'turtle', rarity: 'rare', eye: '·', hat: 'beanie', description: 'Slow and steady ships the feature' },
  { name: 'Inkstorm', species: 'octopus', rarity: 'legendary', eye: '✦', hat: 'wizard', description: 'Eight arms, eight open PRs' },
  { name: 'Moonhoot', species: 'owl', rarity: 'epic', eye: '°', hat: 'crown', description: 'Watches your code at 3am' },
  { name: 'Gillbert', species: 'axolotl', rarity: 'rare', eye: '×', hat: 'halo', description: 'Regenerates deleted code from memory' },
  { name: 'Chompsworth', species: 'capybara', rarity: 'uncommon', eye: '·', hat: 'tophat', description: 'Unbothered by merge conflicts' },
  { name: 'Needlestack', species: 'cactus', rarity: 'uncommon', eye: '@', hat: 'none', description: 'Prickly about code quality' },
  { name: 'Bunnybuffer', species: 'rabbit', rarity: 'uncommon', eye: '°', hat: 'beanie', description: 'Hops between branches effortlessly' },
  { name: 'Honkzilla', species: 'goose', rarity: 'common', eye: '·', hat: 'none', description: 'Honks at every lint warning' },
  { name: 'Trailslime', species: 'snail', rarity: 'common', eye: '·', hat: 'none', description: 'Leaves a trail of well-documented code' },
  { name: 'Megachonk', species: 'chonk', rarity: 'rare', eye: '✦', hat: 'crown', description: 'Absolute unit of a pair programmer' },
].map((c) => ({
  ...c,
  sprite: renderSprite(c.species, c.eye),
  hatLine: hatLines[c.hat] || '',
}))

const rarityColors: Record<string, string> = {
  common: 'text-common',
  uncommon: 'text-uncommon',
  rare: 'text-rare',
  epic: 'text-epic',
  legendary: 'text-legendary',
}

const rarityBorders: Record<string, string> = {
  common: 'border-common/30',
  uncommon: 'border-uncommon/30',
  rare: 'border-rare/30',
  epic: 'border-epic/30',
  legendary: 'border-legendary/30',
}

const rarityGlows: Record<string, string> = {
  legendary: 'shadow-[0_0_20px_rgba(234,179,8,0.08)]',
  epic: 'shadow-[0_0_16px_rgba(168,85,247,0.06)]',
  rare: '',
  uncommon: '',
  common: '',
}

const rarityStars: Record<string, string> = {
  common: '★',
  uncommon: '★★',
  rare: '★★★',
  epic: '★★★★',
  legendary: '★★★★★',
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="px-6 pt-20 pb-16 max-w-3xl mx-auto text-center">
      <p class="text-legendary text-sm tracking-wide mb-4">★★★★★</p>
      <h1 class="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
        Pick your Claude Code companion
      </h1>
      <p class="text-gray-400 text-base mb-8 max-w-lg mx-auto">
        Force a legendary buddy with one command. No luck required.
      </p>

      <button
        class="group inline-flex items-center gap-3 bg-surface border border-border rounded-lg px-5 py-3 text-sm hover:border-legendary/40 transition-colors cursor-pointer"
        @click="copyCommand"
      >
        <span class="text-legendary">$</span>
        <code class="text-gray-200">npx epic-buddy</code>
        <span
          class="text-gray-500 group-hover:text-gray-300 transition-colors text-xs"
        >
          {{ copied ? 'copied' : 'copy' }}
        </span>
      </button>
    </section>

    <!-- Companions grid -->
    <section class="px-6 pb-20 max-w-5xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="c in companions"
          :key="c.species"
          class="group border rounded-lg p-5 bg-surface/50 hover:bg-surface transition-colors"
          :class="[rarityBorders[c.rarity], rarityGlows[c.rarity]]"
        >
          <!-- Rarity + species -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="text-xs" :class="rarityColors[c.rarity]">
                {{ rarityStars[c.rarity] }}
              </span>
              <span
                class="text-xs font-medium uppercase tracking-wide"
                :class="rarityColors[c.rarity]"
              >
                {{ c.rarity }}
              </span>
            </div>
            <span v-if="c.hat !== 'none'" class="text-[10px] text-gray-500">
              {{ c.hat }}
            </span>
          </div>

          <!-- ASCII sprite -->
          <div class="mb-3 flex justify-center">
            <pre
              class="text-sm leading-tight select-none"
              :class="rarityColors[c.rarity]"
            ><template v-if="c.hatLine">{{ c.hatLine }}
</template><template v-for="(line, i) in c.sprite" :key="i">{{ line }}
</template></pre>
          </div>

          <!-- Name + species -->
          <p class="text-white text-sm font-semibold mb-0.5">{{ c.name }}</p>
          <p class="text-gray-500 text-xs mb-2">{{ c.species }}</p>

          <!-- Description -->
          <p class="text-gray-400 text-xs leading-relaxed">
            {{ c.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-border px-6 py-8 text-center">
      <p class="text-gray-500 text-xs">
        <a
          href="https://github.com/vibenalytics/epic-buddy"
          class="hover:text-gray-300 transition-colors"
          target="_blank"
        >
          github.com/vibenalytics/epic-buddy
        </a>
        <span class="mx-2">·</span>
        <a
          href="https://www.npmjs.com/package/epic-buddy"
          class="hover:text-gray-300 transition-colors"
          target="_blank"
        >
          npm
        </a>
      </p>
    </footer>
  </div>
</template>
