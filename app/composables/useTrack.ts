import { event } from 'vue-gtag-next'

export function useTrack() {
  return {
    builderOpened: () => event('builder_opened'),
    builderStep: (step: string, value: string) => event('builder_step', { step, value }),
    builderCopied: (species: string, rarity: string, eye: string, hat: string) =>
      event('builder_copied', { species, rarity, eye, hat }),
    cardCopied: (species: string, rarity: string) =>
      event('card_copied', { species, rarity }),
    githubClicked: () => event('github_clicked'),
  }
}
