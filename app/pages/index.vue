<script setup lang="ts">
const { builderOpened, builderStep: trackStep, builderCopied: trackBuilderCopy, cardCopied: trackCardCopy, githubClicked } = useTrack()
const copied = ref(false)
const builderCopied = ref(false)
const showBuilder = ref(false)
const cardCopied = ref('')
const showStarPopup = ref(false)

function maybeShowStar() {
  if (!showStarPopup.value) {
    showStarPopup.value = true
  }
}

function copyCommand() {
  navigator.clipboard.writeText('npx ccbuddyy')
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function copyBuilderCommand() {
  navigator.clipboard.writeText(builderCommand.value)
  builderCopied.value = true
  setTimeout(() => (builderCopied.value = false), 2000)
  trackBuilderCopy(bSpecies.value, bRarity.value, bEye.value, bHat.value)
  maybeShowStar()
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
  common: 'border-common/20 hover:border-common/50 hover:bg-common/5',
  uncommon: 'border-uncommon/20 hover:border-uncommon/50 hover:bg-uncommon/5',
  rare: 'border-rare/20 hover:border-rare/50 hover:bg-rare/5',
  epic: 'border-epic/20 hover:border-epic/50 hover:bg-epic/5',
  legendary: 'border-legendary/25 hover:border-legendary/50 hover:bg-legendary/5',
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

// --- Random Generator Widget ---
const RARITIES_WEIGHTED = ['common','common','common','common','common','common','uncommon','uncommon','uncommon','rare','rare','epic','legendary'] as const
const ALL_SPECIES = [
  'duck', 'goose', 'blob', 'cat', 'dragon', 'octopus', 'owl', 'penguin',
  'turtle', 'snail', 'ghost', 'axolotl', 'capybara', 'cactus', 'robot',
  'rabbit', 'mushroom', 'chonk',
]
const ALL_EYES = ['·', '✦', '×', '◉', '@', '°']
const ALL_HATS = ['none', 'crown', 'tophat', 'propeller', 'halo', 'wizard', 'beanie', 'tinyduck']

function pick<T>(arr: readonly T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function rollRandom() {
  const rarity = pick(RARITIES_WEIGHTED) as string
  const species = pick(ALL_SPECIES)
  const eye = pick(ALL_EYES)
  const hat = rarity === 'common' ? 'none' : pick(ALL_HATS)
  return { species, rarity, eye, hat }
}

const randResult = ref(rollRandom())
const randScrambling = ref(true)
const randCopied = ref(false)
let scrambleTimer: ReturnType<typeof setInterval>

function startScramble() {
  randScrambling.value = true
  let count = 0
  clearInterval(scrambleTimer)
  scrambleTimer = setInterval(() => {
    randResult.value = rollRandom()
    count++
    if (count >= 12) {
      clearInterval(scrambleTimer)
      randScrambling.value = false
    }
  }, 80)
}

function regenRandom() {
  startScramble()
}

function copyRandom() {
  const r = randResult.value
  const parts = ['npx ccbuddyy build']
  parts.push(`-species ${r.species}`)
  parts.push(`-rarity ${r.rarity}`)
  parts.push(`-eye ${EYE_NAMES[r.eye] || 'dot'}`)
  if (r.hat !== 'none') parts.push(`-hat ${r.hat}`)
  navigator.clipboard.writeText(parts.join(' ') + ' ...')
  randCopied.value = true
  setTimeout(() => (randCopied.value = false), 2000)
  maybeShowStar()
}

const randSprite = computed(() => {
  const r = randResult.value
  return renderFrame(r.species, r.eye, r.hat, 0)
})

const RARITY_CHANCE: Record<string, number> = {
  common: 60, uncommon: 25, rare: 10, epic: 4, legendary: 1,
}

const randOdds = computed(() => {
  const r = randResult.value
  const rarityDenom = 100 / RARITY_CHANCE[r.rarity]
  const speciesDenom = 18
  const eyeDenom = 6
  const hatDenom = r.rarity === 'common' ? 1 : 8
  return Math.round(rarityDenom * speciesDenom * eyeDenom * hatDenom)
})

onMounted(() => {
  startScramble()
})

onUnmounted(() => {
  clearInterval(scrambleTimer)
})

// --- Builder (multi-step) ---
const SPECIES_LIST = [
  'duck', 'goose', 'blob', 'cat', 'dragon', 'octopus', 'owl', 'penguin',
  'turtle', 'snail', 'ghost', 'axolotl', 'capybara', 'cactus', 'robot',
  'rabbit', 'mushroom', 'chonk',
]
const RARITY_LIST: Array<{ value: string; label: string; stars: string; color: string; border: string; borderHover: string; bgSelected: string }> = [
  { value: 'legendary', label: 'legendary', stars: '★★★★★', color: 'text-legendary', border: 'border-legendary/30', borderHover: 'hover:border-legendary/50 hover:bg-legendary/5', bgSelected: 'border-legendary/60 bg-legendary/15' },
  { value: 'epic', label: 'epic', stars: '★★★★', color: 'text-epic', border: 'border-epic/30', borderHover: 'hover:border-epic/50 hover:bg-epic/5', bgSelected: 'border-epic/60 bg-epic/15' },
  { value: 'rare', label: 'rare', stars: '★★★', color: 'text-rare', border: 'border-rare/30', borderHover: 'hover:border-rare/50 hover:bg-rare/5', bgSelected: 'border-rare/60 bg-rare/15' },
  { value: 'uncommon', label: 'uncommon', stars: '★★', color: 'text-uncommon', border: 'border-uncommon/30', borderHover: 'hover:border-uncommon/50 hover:bg-uncommon/5', bgSelected: 'border-uncommon/60 bg-uncommon/15' },
  { value: 'common', label: 'common', stars: '★', color: 'text-common', border: 'border-common/30', borderHover: 'hover:border-common/50 hover:bg-common/5', bgSelected: 'border-common/60 bg-common/15' },
]
const EYE_LIST = ['·', '✦', '×', '◉', '@', '°']
const EYE_NAMES: Record<string, string> = { '·': 'dot', '✦': 'star', '×': 'x', '◉': 'circle', '@': 'at', '°': 'degree' }
const HAT_LIST = ['none', 'crown', 'tophat', 'propeller', 'halo', 'wizard', 'beanie', 'tinyduck']

const builderStep = ref(0) // 0=species, 1=rarity, 2=eyes, 3=hat, 4=result
const STEPS = ['species', 'rarity', 'eyes', 'hat', 'result']

const bSpecies = ref('duck')
const bRarity = ref('legendary')
const bEye = ref('·')
const bHat = ref('none')

function openBuilder() {
  builderStep.value = 0
  bSpecies.value = SPECIES_LIST[0]
  bRarity.value = RARITY_LIST[0].value
  bEye.value = EYE_LIST[0]
  bHat.value = HAT_LIST[0]
  showBuilder.value = true
  builderOpened()
}

function companionCommand(c: Companion): string {
  const parts = ['npx ccbuddyy build']
  parts.push(`-species ${c.species}`)
  parts.push(`-rarity ${c.rarity}`)
  parts.push(`-eye ${EYE_NAMES[c.eye] || 'dot'}`)
  if (c.hat !== 'none') parts.push(`-hat ${c.hat}`)
  return parts.join(' ') + ' ...'
}

function copyCard(c: Companion) {
  navigator.clipboard.writeText(companionCommand(c))
  cardCopied.value = c.species
  setTimeout(() => (cardCopied.value = ''), 2000)
  trackCardCopy(c.species, c.rarity)
  maybeShowStar()
}

const canNext = computed(() => {
  if (builderStep.value === 0) return !!bSpecies.value
  if (builderStep.value === 1) return !!bRarity.value
  if (builderStep.value === 2) return !!bEye.value
  if (builderStep.value === 3) return !!bHat.value
  return false
})

function nextStep() {
  if (!canNext.value || builderStep.value >= STEPS.length - 1) return
  const step = STEPS[builderStep.value]
  const vals: Record<string, string> = { species: bSpecies.value, rarity: bRarity.value, eyes: bEye.value, hat: bHat.value }
  trackStep(step, vals[step] || '')
  builderStep.value++
}

function prevStep() {
  if (builderStep.value > 0) builderStep.value--
  else showBuilder.value = false
}

function selectSpecies(s: string) {
  bSpecies.value = s
}

function selectRarity(r: string) {
  bRarity.value = r
}

function selectEye(e: string) {
  bEye.value = e
}

function selectHat(h: string) {
  bHat.value = h
}

// Mini sprite for species picker (frame 0, default eye)
function miniSprite(species: string): string[] {
  return renderFrame(species, '·', 'none', 0)
}

const builderSprite = computed(() => {
  return renderFrame(bSpecies.value, bEye.value, bHat.value, 0)
})

// Preview at current step (show what's been selected so far)
const stepPreview = computed(() => {
  const eye = builderStep.value >= 2 ? bEye.value : '·'
  const hat = builderStep.value >= 3 ? bHat.value : 'none'
  return renderFrame(bSpecies.value, eye, hat, 0)
})

const builderCommand = computed(() => {
  const parts = ['npx ccbuddyy build']
  parts.push(`-species ${bSpecies.value}`)
  parts.push(`-rarity ${bRarity.value}`)
  parts.push(`-eye ${EYE_NAMES[bEye.value] || 'dot'}`)
  if (bHat.value !== 'none') parts.push(`-hat ${bHat.value}`)
  return parts.join(' ') + ' ...'
})


const builderOdds = computed(() => {
  if (!bRarity.value || !bSpecies.value) return { odds: 0, label: '' }
  const rarityDenom = 100 / RARITY_CHANCE[bRarity.value]
  const speciesDenom = 18
  const eyeDenom = 6
  const hatDenom = bRarity.value === 'common' ? 1 : 8
  let odds = rarityDenom * speciesDenom // rarity + species always
  let label = `${bRarity.value} + ${bSpecies.value}`

  // step 2+: eyes
  if (builderStep.value >= 2) {
    odds *= eyeDenom
    label += ` + ${EYE_NAMES[bEye.value] || 'eye'}`
  }

  // step 3+: hat
  if (builderStep.value >= 3 && bHat.value !== 'none') {
    odds *= hatDenom
    label += ` + ${bHat.value}`
  }

  return { odds: Math.round(odds), label }
})

const ogBuddyHtml = computed(() => {
  return '/buddy'
    .split('')
    .map((ch, i) => {
      const color = RAINBOW[(i + rainbowOffset.value) % RAINBOW.length]
      return `<span style="color:${color}">${ch}</span>`
    })
    .join('')
})

const ogCompanions = [
  { species: 'dragon', eye: '✦', hat: 'crown', rarity: 'legendary' },
  { species: 'cat', eye: '×', hat: 'halo', rarity: 'epic' },
  { species: 'octopus', eye: '✦', hat: 'wizard', rarity: 'legendary' },
  { species: 'ghost', eye: '°', hat: 'none', rarity: 'epic' },
]

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="px-4 sm:px-6 pt-6 sm:pt-8 pb-10 max-w-5xl mx-auto overflow-hidden">
      <!-- Mobile: companions row above title -->
      <div class="flex justify-center gap-4 mb-6 sm:hidden">
        <pre
          v-for="(oc, i) in ogCompanions"
          :key="'mob'+i"
          class="text-[10px] leading-[1.2] select-none opacity-50"
          :class="rarityColor[oc.rarity]"
        ><template v-for="(line, li) in renderFrame(oc.species, oc.eye, oc.hat, IDLE_SEQUENCE[(tick + i * 4) % IDLE_SEQUENCE.length])" :key="li">{{ line }}
</template></pre>
      </div>

      <div class="relative flex items-center justify-center sm:min-h-[20rem]">
        <!-- Left companions (desktop) -->
        <div class="absolute left-0 sm:left-8 top-1/2 -translate-y-1/2 flex-col gap-4 hidden sm:flex">
          <pre
            v-for="(oc, i) in ogCompanions.slice(0, 2)"
            :key="'hl'+i"
            class="text-base leading-[1.3] select-none opacity-40"
            :class="rarityColor[oc.rarity]"
          ><template v-for="(line, li) in renderFrame(oc.species, oc.eye, oc.hat, IDLE_SEQUENCE[(tick + i * 4) % IDLE_SEQUENCE.length])" :key="li">{{ line }}
</template></pre>
        </div>

        <!-- Center -->
        <div class="text-center z-10">
          <p class="text-3xl sm:text-5xl font-bold text-term-white leading-tight">generate your</p>
          <p class="text-4xl sm:text-6xl font-bold leading-tight mt-2" v-html="ogBuddyHtml" />

          <!-- Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              class="inline-flex items-center gap-2 bg-legendary border border-legendary rounded-md px-4 py-2 text-xs transition-all cursor-pointer text-[#0c0c0c] font-medium hover:brightness-110 hover:shadow-[0_0_12px_rgba(243,249,157,0.3)]"
              @click="openBuilder()"
            >
              generate your /buddy
            </button>
            <a
              href="https://github.com/vibenalytics/ccbuddyy"
              target="_blank"
              class="inline-flex items-center gap-2 bg-term-surface border border-term-border rounded-md px-4 py-2 text-xs hover:border-term-muted hover:bg-term-surface/80 transition-colors text-term-bright"
              @click="githubClicked()"
            >
              <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              star on github
            </a>
          </div>

          <p class="text-term-muted text-xs mt-4">
            pick a legendary companion. no luck required.
          </p>
        </div>

        <!-- Right companions (desktop) -->
        <div class="absolute right-0 sm:right-8 top-1/2 -translate-y-1/2 flex-col gap-4 hidden sm:flex">
          <pre
            v-for="(oc, i) in ogCompanions.slice(2, 4)"
            :key="'hr'+i"
            class="text-base leading-[1.3] select-none opacity-40"
            :class="rarityColor[oc.rarity]"
          ><template v-for="(line, li) in renderFrame(oc.species, oc.eye, oc.hat, IDLE_SEQUENCE[(tick + (i + 2) * 4) % IDLE_SEQUENCE.length])" :key="li">{{ line }}
</template></pre>
        </div>
      </div>
    </section>

    <!-- Builder fullscreen -->
    <Teleport to="body">
      <div
        v-if="showBuilder"
        class="fixed inset-0 z-50 bg-[#0c0c0c] overflow-y-auto"
      >
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-term-border">
          <button
            class="text-term-muted hover:text-term-bright text-sm cursor-pointer"
            @click="prevStep()"
          >
            {{ builderStep === 0 ? '← close' : '← back' }}
          </button>
          <div class="flex gap-2">
            <span
              v-for="(s, i) in STEPS"
              :key="s"
              class="w-2 h-2 rounded-full"
              :class="i === builderStep ? 'bg-prompt' : i < builderStep ? 'bg-term-muted' : 'bg-term-border'"
            />
          </div>
          <button
            class="text-term-dim hover:text-term-muted text-sm cursor-pointer"
            @click="showBuilder = false"
          >
            esc
          </button>
        </div>

        <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8">

          <!-- Preview (always visible after step 0) -->
          <div v-if="builderStep > 0" class="flex justify-center mb-8">
            <div class="text-center">
              <pre
                class="text-xl leading-[1.3] select-none mb-2 inline-block"
                :class="builderStep >= 1 ? rarityColor[bRarity] : 'text-term-muted'"
              ><template v-for="(line, i) in stepPreview" :key="i">{{ line }}
</template></pre>
              <p class="text-sm text-term-dim">
                <span v-if="builderStep >= 1" :class="rarityColor[bRarity]">{{ bRarity }}</span>
                {{ bSpecies }}
                <span v-if="builderStep >= 3 && bHat !== 'none'">+{{ bHat }}</span>
              </p>
              <p class="text-xs text-term-dim mt-1">
                1 in {{ builderOdds.odds.toLocaleString() }} · ~{{ formatNumber(builderOdds.odds) }} iterations
              </p>
            </div>
          </div>

          <!-- Step 0: Species -->
          <div v-if="builderStep === 0">
            <p class="text-term-muted text-sm mb-5">choose your species</p>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <button
                v-for="s in SPECIES_LIST"
                :key="s"
                class="flex flex-col items-center border rounded-md py-4 px-2 cursor-pointer transition-colors"
                :class="bSpecies === s ? 'border-legendary/60 bg-legendary/10' : 'border-term-border hover:border-term-muted hover:bg-term-surface bg-term-surface/50'"
                @click="selectSpecies(s)"
              >
                <pre class="text-[11px] leading-[1.2] select-none mb-2" :class="bSpecies === s ? 'text-legendary' : 'text-term-bright'"><template v-for="(line, i) in miniSprite(s)" :key="i">{{ line }}
</template></pre>
                <span class="text-xs" :class="bSpecies === s ? 'text-legendary' : 'text-term-dim'">{{ s }}</span>
              </button>
            </div>
            <div class="flex justify-between mt-6">
              <button class="text-sm text-term-dim hover:text-term-bright border border-term-border hover:border-term-muted rounded-md px-5 py-2.5 cursor-pointer transition-colors" @click="prevStep()">← back</button>
              <button class="text-sm rounded-md px-5 py-2.5 transition-all font-medium" :class="canNext ? 'bg-legendary text-[#0c0c0c] cursor-pointer hover:brightness-110' : 'bg-term-border text-term-dim cursor-not-allowed'" :disabled="!canNext" @click="nextStep()">next →</button>
            </div>
          </div>

          <!-- Step 1: Rarity -->
          <div v-if="builderStep === 1">
            <p class="text-term-muted text-sm mb-5">choose color</p>
            <div class="flex flex-wrap gap-2 justify-center">
              <button
                v-for="r in RARITY_LIST"
                :key="r.value"
                class="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer transition-colors"
                :class="bRarity === r.value ? r.bgSelected : [r.border, r.borderHover]"
                @click="selectRarity(r.value)"
              >
                <span class="text-xs" :class="r.color">{{ r.stars }}</span>
                <span class="text-xs" :class="r.color">{{ r.label }}</span>
              </button>
            </div>
            <div class="flex justify-between mt-6">
              <button class="text-sm text-term-dim hover:text-term-bright border border-term-border hover:border-term-muted rounded-md px-5 py-2.5 cursor-pointer transition-colors" @click="prevStep()">← back</button>
              <button class="text-sm rounded-md px-5 py-2.5 transition-all font-medium" :class="canNext ? 'bg-legendary text-[#0c0c0c] cursor-pointer hover:brightness-110' : 'bg-term-border text-term-dim cursor-not-allowed'" :disabled="!canNext" @click="nextStep()">next →</button>
            </div>
          </div>

          <!-- Step 2: Eyes -->
          <div v-if="builderStep === 2">
            <p class="text-term-muted text-sm mb-5">choose eyes</p>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <button
                v-for="e in EYE_LIST"
                :key="e"
                class="flex flex-col items-center border rounded-md py-6 cursor-pointer transition-colors"
                :class="bEye === e ? 'border-legendary/60 bg-legendary/10' : 'border-term-border hover:border-term-muted hover:bg-term-surface bg-term-surface/50'"
                @click="selectEye(e)"
              >
                <span class="text-3xl mb-2" :class="bEye === e ? 'text-legendary' : 'text-term-bright'">{{ e }}</span>
                <span class="text-xs" :class="bEye === e ? 'text-legendary' : 'text-term-dim'">{{ EYE_NAMES[e] }}</span>
              </button>
            </div>
            <div class="flex justify-between mt-6">
              <button class="text-sm text-term-dim hover:text-term-bright border border-term-border hover:border-term-muted rounded-md px-5 py-2.5 cursor-pointer transition-colors" @click="prevStep()">← back</button>
              <button class="text-sm rounded-md px-5 py-2.5 transition-all font-medium" :class="canNext ? 'bg-legendary text-[#0c0c0c] cursor-pointer hover:brightness-110' : 'bg-term-border text-term-dim cursor-not-allowed'" :disabled="!canNext" @click="nextStep()">next →</button>
            </div>
          </div>

          <!-- Step 3: Hat -->
          <div v-if="builderStep === 3">
            <p class="text-term-muted text-sm mb-5">choose hat</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                v-for="h in HAT_LIST"
                :key="h"
                class="flex flex-col items-center border rounded-md py-5 px-3 cursor-pointer transition-colors"
                :class="bHat === h ? 'border-legendary/60 bg-legendary/10' : 'border-term-border hover:border-term-muted hover:bg-term-surface bg-term-surface/50'"
                @click="selectHat(h)"
              >
                <pre v-if="h !== 'none'" class="text-sm leading-tight mb-2 select-none" :class="bHat === h ? 'text-legendary' : 'text-term-bright'">{{ hatLines[h] }}</pre>
                <span v-else class="text-base mb-2" :class="bHat === h ? 'text-legendary' : 'text-term-dim'">—</span>
                <span class="text-xs" :class="bHat === h ? 'text-legendary' : 'text-term-dim'">{{ h }}</span>
              </button>
            </div>
            <div class="flex justify-between mt-6">
              <button class="text-sm text-term-dim hover:text-term-bright border border-term-border hover:border-term-muted rounded-md px-5 py-2.5 cursor-pointer transition-colors" @click="prevStep()">← back</button>
              <button class="text-sm rounded-md px-5 py-2.5 transition-all font-medium" :class="canNext ? 'bg-legendary text-[#0c0c0c] cursor-pointer hover:brightness-110' : 'bg-term-border text-term-dim cursor-not-allowed'" :disabled="!canNext" @click="nextStep()">next →</button>
            </div>
          </div>

          <!-- Step 4: Result -->
          <div v-if="builderStep === 4">
            <!-- Command + Copy -->
            <div class="bg-term-surface border border-term-border rounded-md px-5 py-4 mb-4 flex items-center gap-3">
              <pre class="text-sm text-term-text overflow-x-auto flex-1"><span class="text-prompt">$</span> {{ builderCommand }}</pre>
              <button
                class="shrink-0 bg-legendary text-[#0c0c0c] font-medium rounded-md px-4 py-2 text-sm cursor-pointer transition-colors hover:bg-legendary/80"
                @click="copyBuilderCommand"
              >
                {{ builderCopied ? '✓ copied' : 'copy' }}
              </button>
            </div>

            <p class="text-center text-term-dim text-xs">
              run this inside of your terminal with claude installed
            </p>
            <p class="text-center text-term-dim text-xs mt-3">
              don't forget to <a href="https://github.com/vibenalytics/ccbuddyy" target="_blank" class="text-legendary hover:text-legendary/80 transition-colors">star our repo</a>
            </p>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Random roll -->
    <section class="px-4 sm:px-6 pb-8 max-w-5xl mx-auto">
      <div class="max-w-xs mx-auto">
        <div class="group relative bg-term-surface border border-legendary/30 rounded-md overflow-hidden transition-all hover:brightness-125">
          <!-- Title bar -->
          <div class="flex items-center justify-between px-3 py-1.5 border-b border-term-border">
            <div class="flex items-center gap-1.5">
              <span class="text-[11px] text-legendary">⚡</span>
              <span class="text-[11px] uppercase text-legendary">random roll</span>
            </div>
            <span class="text-term-dim text-[10px]">1 in {{ randOdds.toLocaleString() }}</span>
          </div>

          <!-- Sprite -->
          <div class="px-4 pt-4 pb-3 flex justify-center">
            <pre
              class="text-lg leading-[1.3] select-none"
              :class="[rarityColor[randResult.rarity], randScrambling ? 'opacity-50' : 'opacity-100']"
              style="transition: opacity 0.15s"
            ><template v-for="(line, i) in randSprite" :key="i">{{ line }}
</template></pre>
          </div>

          <!-- Info -->
          <div class="px-3 pb-3">
            <div class="border-t border-term-border pt-2">
              <div class="flex items-center gap-1.5 mb-1">
                <span class="text-[11px]" :class="rarityColor[randResult.rarity]">{{ rarityStars[randResult.rarity] }}</span>
                <span class="text-term-bright text-xs font-medium">{{ randResult.rarity }} {{ randResult.species }}</span>
                <span v-if="randResult.hat !== 'none'" class="text-term-dim text-[11px]">+{{ randResult.hat }}</span>
              </div>
              <div class="flex gap-2 mt-2">
                <button
                  class="flex-1 text-[11px] border border-term-border rounded px-2 py-1.5 text-term-muted hover:text-term-bright hover:border-term-muted transition-colors cursor-pointer"
                  @click="regenRandom()"
                >
                  ↻ reroll
                </button>
                <button
                  class="flex-1 text-[11px] bg-legendary text-[#0c0c0c] font-medium rounded px-2 py-1.5 transition-all cursor-pointer hover:brightness-110"
                  @click="copyRandom()"
                >
                  {{ randCopied ? '✓ copied' : 'copy command' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Companions grid -->
    <section class="px-4 sm:px-6 pb-16 max-w-5xl mx-auto">
      <p class="text-term-muted text-sm mb-4">most favourite</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="(c, idx) in companions"
          :key="c.species"
          class="group relative bg-term-surface border rounded-md overflow-hidden transition-all hover:brightness-125 cursor-pointer"
          :class="rarityBorder[c.rarity]"
          @click="copyCard(c)"
        >
          <!-- Copied overlay -->
          <Transition name="fade">
            <div
              v-if="cardCopied === c.species"
              class="absolute inset-0 z-10 bg-[#0c0c0c]/90 flex flex-col items-center justify-center gap-2"
            >
              <span class="text-prompt text-sm">copied</span>
              <span class="text-term-dim text-xs">paste in terminal</span>
            </div>
          </Transition>

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
          <div class="px-4 pt-4 pb-3 flex justify-center">
            <pre
              class="text-lg leading-[1.3] select-none"
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


    <!-- Star popup -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showStarPopup"
          class="fixed inset-0 z-[60] flex items-center justify-center bg-[#0c0c0c]/80"
          @click.self="showStarPopup = false"
        >
          <div class="bg-[#0c0c0c] border border-term-border rounded-md p-6 max-w-sm mx-4 text-center">
            <!-- Meme placeholder -->
            <div class="bg-term-border rounded-md w-full aspect-square flex items-center justify-center mb-5">
              <img src="/meme.webp" alt="meme" class="w-full h-full object-cover rounded-md" />
            </div>

            <p class="text-term-bright text-sm font-medium mb-2">command copied!</p>
            <p class="text-term-muted text-xs mb-5">if this helped you, consider starring the repo</p>

            <div class="flex gap-3">
              <button
                class="flex-1 text-xs border border-term-border rounded-md px-3 py-2 text-term-muted hover:text-term-bright hover:border-term-muted transition-colors cursor-pointer"
                @click="showStarPopup = false"
              >
                maybe later
              </button>
              <a
                href="https://github.com/vibenalytics/ccbuddyy"
                target="_blank"
                class="flex-1 inline-flex items-center justify-center gap-2 bg-legendary text-[#0c0c0c] font-medium text-xs rounded-md px-3 py-2 transition-all hover:brightness-110"
                @click="showStarPopup = false; githubClicked()"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                star on github
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Footer -->
    <footer class="border-t border-term-border px-6 py-6 text-center">
      <p class="text-term-dim text-[11px]">
        <a
          href="https://github.com/vibenalytics/ccbuddyy"
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
