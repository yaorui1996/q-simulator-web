<script setup lang="ts">
defineProps<{ gateName: string }>()
</script>

<template>
  <div class="text-container">
    <div class="text">{{gateName !== "NULL" ? gateName : ""}}</div>
  </div>
</template>

<style scoped>
.text-container {
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: rgb(16, 185, 129);
}

.text-container .text {
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: white;
}
</style>
