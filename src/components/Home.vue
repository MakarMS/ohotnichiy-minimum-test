<script setup>
import bg from '@images/background.png'
import bgLazy from '@images/background.webp'
</script>

<template>
  <div class="page-wrapper">
    <section class="home-wrapper">
      <v-img
          class="home-bg"
          :src="bg"
          :lazy-src="bgLazy"
          cover
          position="center left"
      />

      <div class="home-content d-flex flex-column justify-space-between align-center text-center">
        <div class="home-top pt-12 pt-sm-14 px-4 px-sm-6">
          <h1
              class="home-title text-h3 text-sm-h2 text-white font-weight-black mb-4"
          >
            Охотничий минимум
          </h1>

          <p
              class="home-text text-body-1 text-sm-h6 text-white mx-auto"
          >
            Онлайн-тест по основам охоты, поведению диких животных, технике безопасности,
            законам и правилам обращения с оружием. Подготовься к сдаче охотничьего
            минимума и проверь свои знания в удобном формате.
          </p>
        </div>

        <div class="d-flex justify-center pb-12 pb-sm-14">
          <v-btn
              class="home-button"
              color="#d87645"
              rounded="lg"
              height="62"
              size="x-large"
          >
            Начать тест
          </v-btn>
        </div>
      </div>
    </section>

    <section class="soon-wrapper text-center py-10 py-sm-14 px-4">
      <h2 class="text-h4 text-sm-h3 font-weight-bold mb-3">
        Soon
      </h2>
    </section>
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
}

.home-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.home-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  object-position: top center;
}

.home-content {
  position: relative;
  min-height: 100vh;
}

.home-text {
  max-width: 600px;
  opacity: 0.95;
}

.home-button {
  width: 100%;
  max-width: 320px;
  font-weight: 600;
  font-size: 20px;
}

.soon-wrapper {
  background: #f6f6f6;
}
</style>
