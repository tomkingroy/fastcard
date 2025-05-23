<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, onBeforeMount, computed } from 'vue'
import type { PropType } from 'vue'

const turnstileSrc = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
const turnstileLoadFunction = 'cfTurnstileOnLoad'

declare global {
  interface Window {
    turnstile: any;
    [turnstileLoadFunction]: any;
  }
}

declare interface VueTurnstileData {
  resetTimeout?: ReturnType<typeof setTimeout>;
  widgetId?: string;
}

const emit = defineEmits([ 'update:modelValue', 'error', 'unsupported', 'expired', 'before-interactive', 'after-interactive' ])
const props = defineProps({
  siteKey: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  resetInterval: {
    type: Number,
    required: false,
    default: 295 * 1000
  },
  size: {
    type: String as PropType<'normal' | 'flexible' | 'compact'>,
    required: false,
    default: 'normal'
  },
  language: {
    type: String,
    required: false,
    default: 'auto'
  },
  action: {
    type: String,
    required: false,
    default: ''
  },
  appearance: {
    type: String as PropType<'always' | 'execute' | 'interaction-only'>,
    required: false,
    default: 'always'
  },
  renderOnMount: {
    type: Boolean,
    required: false,
    default: true
  }
})

let turnstileState = typeof window !== 'undefined' ? (window.turnstile !== undefined ? 'ready' : 'unloaded') : 'unloaded'
let turnstileLoad: {
  resolve: (value?: unknown) => void;
  reject: (value?: unknown) => void;
}

const resetTimeout = ref()
const widgetId = ref()
const turnstile = ref()

const turnstileOptions = computed(() => {
  return {
    sitekey: props.siteKey,
    theme: 'dark',
    language: props.language,
    size: props.size,
    action: props.action,
    appearance: props.appearance,
    // A JavaScript callback that is called when the challenge succeeds. The callback is passed a token that can be verified.
    callback: callback,
    // A JavaScript callback that is called when an error occurs, such as a network error or challenge failure. See Client-side Errors. https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/
    'error-callback': errorCallback,
    // A JavaScript callback that is called when the token expires without resetting the widget.
    'expired-callback': expiredCallback,
    // JavaScript callback called when Turnstile does not support a particular client/browser.
    'unsupported-callback': unsupportedCallback,
    // A JavaScript callback called before the challenge enters interactive mode.
    'before-interactive-callback': beforeInteractiveCallback,
    // JavaScript callback called when the challenge leaves interactive mode.
    'after-interactive-callback': afterInteractiveCallback
  }
})

const afterInteractiveCallback = () => {
  emit('after-interactive')
}

const beforeInteractiveCallback = () => {
  emit('before-interactive')
}

const expiredCallback = () => {
  emit('expired')
}

const unsupportedCallback = () => {
  emit('unsupported')
}

const errorCallback = (code: string) => {
  emit('error', code)
}

const callback = (token: string) => {
  emit('update:modelValue', token)
  startResetTimeout()
}

const reset = () => {
  if (window.turnstile) {
    emit('update:modelValue', '')
    window.turnstile.reset()
  }
}

const remove = () => {
  if (widgetId.value) {
    window.turnstile.remove(widgetId.value)
    widgetId.value = undefined
  }
}

const render = () => {
  widgetId.value = window.turnstile.render(turnstile.value, turnstileOptions.value)
}

const startResetTimeout = () => {
  resetTimeout.value = setTimeout(() => {
    reset()
  }, props.resetInterval)
}

onMounted(async () => {
  const turnstileLoadPromise = new Promise((resolve, reject) => {
    turnstileLoad = {resolve, reject}
    if (turnstileState === 'ready') resolve(undefined)
  })

  window[turnstileLoadFunction] = () => {
    turnstileLoad.resolve()
    turnstileState = 'ready'
  }

  const ensureTurnstile = () => {
    if (turnstileState === 'unloaded') {
      turnstileState = 'loading'
      const url = `${ turnstileSrc }?onload=${ turnstileLoadFunction }&render=explicit`
      const script = document.createElement('script')
      script.src = url
      script.async = true
      script.addEventListener('error', () => {
        turnstileLoad.reject('Failed to load Turnstile.')
      })
      document.head.appendChild(script)
    }
    return turnstileLoadPromise
  }

  await ensureTurnstile()

  if (props.renderOnMount) {
    render()
  }
})

onBeforeMount(() => {
  remove()
  clearTimeout(resetTimeout.value)
})
</script>

<template>
  <div ref="turnstile"></div>
</template>

<style scoped lang="less">

</style>
