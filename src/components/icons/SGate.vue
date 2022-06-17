<script
  setup
  lang="ts"
>
  import { Display, Gate } from '../Gate'

  defineProps<{
    gate: Gate
  }>()
</script>

<template>
  <div class="svg-container">
    <svg
      viewBox="340.431 370.023 7.392 14.484"
      width="7.392"
      height="14.484"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 344.235 381.168 Q 342.711 381.168 341.379 380.592 Q 341.235 380.532 341.139 380.394 Q 341.043 380.256 341.043 380.1 Q 341.043 379.896 341.181 379.746 Q 341.319 379.596 341.535 379.596 Q 341.655 379.596 341.763 379.644 Q 342.867 380.136 344.127 380.136 Q 346.227 380.136 346.227 378.756 Q 346.227 378.396 345.957 378.156 Q 345.687 377.916 345.291 377.778 Q 344.895 377.64 344.163 377.448 Q 343.191 377.196 342.591 376.962 Q 341.991 376.728 341.559 376.26 Q 341.127 375.792 341.127 375.012 Q 341.127 374.328 341.487 373.77 Q 341.847 373.212 342.549 372.882 Q 343.251 372.552 344.235 372.552 Q 345.555 372.552 346.623 372.948 Q 346.959 373.068 346.959 373.428 Q 346.959 373.62 346.827 373.776 Q 346.695 373.932 346.479 373.932 Q 346.407 373.932 346.287 373.884 Q 345.351 373.56 344.355 373.56 Q 343.407 373.56 342.813 373.92 Q 342.219 374.28 342.219 374.928 Q 342.219 375.36 342.501 375.63 Q 342.783 375.9 343.209 376.05 Q 343.635 376.2 344.367 376.368 Q 345.315 376.596 345.897 376.824 Q 346.479 377.052 346.893 377.532 Q 347.307 378.012 347.307 378.828 Q 347.307 379.5 346.923 380.034 Q 346.539 380.568 345.843 380.868 Q 345.147 381.168 344.235 381.168 Z"
        style="fill: var(--gate-color-white); white-space: pre"
      />
    </svg>
  </div>
</template>

<style scoped>
  .svg-container {
    border-radius: var(--gate-border-radius);
    width: var(--gate-width);
    height: var(--gate-height);
    color: var(--gate-color-white);
    background-color: v-bind(
      "gate.display == Display.Drag ? 'var(--gate-background-color-purple)' : gate.valueValid ? 'var(--gate-background-color-green)' : 'var(--gate-color-gray)'"
    );
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
