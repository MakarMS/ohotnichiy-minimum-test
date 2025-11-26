<script setup>
import {useTestStore} from '@stores/testStore.js'
import {storeToRefs} from 'pinia'

const emit = defineEmits(['start-test', 'close'])

const store = useTestStore()
const {
  questionCount,
  timeLimit,
  shuffleEnabled,
  hintsAllowed,
  showCorrectAnswer,
} = storeToRefs(store)

const QUESTION_COUNTS = store.QUESTION_COUNTS
const TIME_LIMITS = store.TIME_LIMITS

function start() {
  emit('start-test')
}

function close() {
  emit('close')
}
</script>

<template>
  <div class="flex-grow-1 d-flex flex-column">
    <div class="settings-body flex-grow-1">
      <h2 class="text-h5 text-sm-h4 font-weight-bold mb-4 text-primary">
        Настройки теста
      </h2>

      <p class="text-subtitle-2 font-weight-medium mb-1 text-primary">
        Количество вопросов
      </p>

      <v-btn-toggle
          v-model="questionCount"
          class="mb-4"
          color="primary"
          density="comfortable"
      >
        <v-btn
            v-for="count in QUESTION_COUNTS"
            :key="count"
            :value="count"
        >
          {{ count }}
        </v-btn>
      </v-btn-toggle>

      <p class="text-subtitle-2 font-weight-medium mb-1 text-primary">
        Ограничение по времени
      </p>

      <v-select
          v-model="timeLimit"
          :items="TIME_LIMITS"
          class="mb-4"
          color="primary"
          density="compact"
          item-title="label"
          item-value="value"
          variant="outlined"
      />

      <v-switch
          v-model="shuffleEnabled"
          color="primary"
          inset
          label="Перемешивать вопросы и варианты ответов"
      />

      <v-switch
          v-model="hintsAllowed"
          color="primary"
          inset
          label="Разрешить подсказки"
      />

      <v-switch
          v-model="showCorrectAnswer"
          color="primary"
          inset
          label="Показывать верный ответ и объяснение сразу"
      />
    </div>

    <div class="actions-row mt-6">
      <v-btn
          class="btn-danger font-weight-bold"
          height="50"
          rounded="lg"
          @click="close"
      >
        Закрыть
      </v-btn>

      <v-btn
          class="btn-secondary font-weight-bold"
          height="50"
          rounded="lg"
          @click="start"
      >
        Начать
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.settings-body {
  padding-bottom: 12px;
}

.actions-row {
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.btn-secondary {
  background-color: rgb(var(--v-theme-secondary)) !important;
  color: #fff !important;
}

.btn-danger {
  background-color: rgb(var(--v-theme-error)) !important;
  color: #fff !important;
}

@media (max-width: 600px) {
  .actions-row {
    flex-direction: column-reverse;
    gap: 8px;
  }

  .actions-row .v-btn {
    width: 100%;
  }
}
</style>
