<template>
  <div 
    :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)" 
    :style="getCardStyle()"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  style?: string | Record<string, string>
}>()

function getCardStyle() {
  const baseStyle = {
    borderColor: 'hsl(var(--border))',
    backgroundColor: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))'
  }
  
  if (props.style) {
    if (typeof props.style === 'string') {
      return props.style
    } else {
      return { ...baseStyle, ...props.style }
    }
  }
  
  return baseStyle
}
</script>

