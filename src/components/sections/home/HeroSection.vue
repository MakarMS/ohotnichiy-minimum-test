<script setup>
import {ref} from 'vue'
import bg from '@images/background.png'
import TestDialog from '@components/test/TestDialog.vue'
import {ymGoal} from "@utils/ym.js";

const dialog = ref(false)

function onStartClick() {
  dialog.value = true
  ymGoal('click_open_test_button', {page: window.location.pathname})
}

</script>

<template>
  <section class="home-wrapper">
    <v-parallax
        :src="bg"
        class="home-bg"
        height="100vh"
    />

    <div class="home-center d-flex flex-column align-center text-center px-4 px-sm-6">
      <h1 class="text-h3 text-sm-h2 text-white font-weight-black mb-4">
        Охотминимум
      </h1>

      <p class="home-text text-body-1 text-sm-h6 text-white mx-auto mb-8">
        Онлайн-тест по основам охоты, поведению диких животных, технике безопасности, законам и правилам обращения с
        оружием. Подготовься к сдаче охотничьего минимума и проверь свои знания в удобном формате.
      </p>

      <v-btn
          class="home-button"
          color="#d87645"
          height="62"
          rounded="lg"
          size="x-large"
          @click="onStartClick"
      >
        Начать тест
      </v-btn>
    </div>

    <TestDialog v-model="dialog"/>
  </section>
</template>

<style scoped>
.home-wrapper {
  position: relative;
  min-height: 100vh;
}

.home-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.home-bg :deep(img) {
  object-position: left !important;
}

.home-center {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
}

.home-text {
  max-width: 600px;
  opacity: 0.95;
}

.home-button {
  width: 100%;
  max-width: 320px;
  font-size: 20px;
  font-weight: 600;
}
</style>
