import { trackEvent } from 'vue-gtag-next'

export function useTrack() {
  return {
    builderOpened: () => trackEvent('builder_opened'),
    builderStep: (step: string, value: string) => trackEvent('builder_step', { step, value }),
    builderCopied: (species: string, rarity: string, eye: string, hat: string) =>
      trackEvent('builder_copied', { species, rarity, eye, hat }),
    cardCopied: (species: string, rarity: string) =>
      trackEvent('card_copied', { species, rarity }),
    githubClicked: () => trackEvent('github_clicked'),
  }
}
