<script setup>
import {useTestStore} from '@stores/testStore.js'
import {storeToRefs} from 'pinia'

const emit = defineEmits(['try-again', 'close'])

const store = useTestStore()
const {
  totalQuestions,
  correctCount,
  incorrectCount,
  hintsAllowed,
  hintsUsedCount,
  scorePercent,
  formattedElapsedTime,
} = storeToRefs(store)

function tryAgain() {
  emit('try-again')
}

function close() {
  emit('close')
}
</script>

<template>
  <div class="flex-grow-1 d-flex flex-column">
    <div class="flex-grow-1">
      <h2 class="text-h5 text-sm-h4 font-weight-bold mb-4 text-primary">
        Результаты теста
      </h2>

      <p class="text-body-1 mb-2">
        Всего вопросов: <strong>{{ totalQuestions }}</strong>
      </p>
      <p class="text-body-1 mb-2">
        Правильных ответов: <strong>{{ correctCount }}</strong>
      </p>
      <p class="text-body-1 mb-2">
        Неправильных ответов: <strong>{{ incorrectCount }}</strong>
      </p>

      <p
          v-if="hintsAllowed && hintsUsedCount > 0"
          class="text-body-1 mb-2"
      >
        Вопросов с подсказкой: <strong>{{ hintsUsedCount }}</strong>
      </p>

      <p
          :class="[
          scorePercent < 75
            ? 'result-bad'
            : scorePercent < 85
              ? 'result-medium'
              : 'text-primary'
        ]"
          class="text-body-1 mb-4"
      >
        Успешность: <strong>{{ scorePercent }}%</strong>
      </p>

      <p
          v-if="formattedElapsedTime"
          class="text-body-2 text-medium-emphasis mb-6"
      >
        Время прохождения: {{ formattedElapsedTime }}.
      </p>
    </div>

    <div class="actions-row mt-4">
      <div class="actions-left">
        <v-btn
            class="btn-danger font-weight-bold"
            height="50"
            rounded="lg"
            @click="close"
        >
          Закрыть
        </v-btn>
      </div>

      <div class="actions-center"/>

      <div class="actions-right">
        <v-btn
            class="btn-secondary font-weight-bold"
            height="50"
            rounded="lg"
            @click="tryAgain"
        >
          Попробовать ещё раз
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.actions-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.actions-left,
.actions-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.actions-center {
  flex: 1;
}

.btn-secondary {
  background-color: rgb(var(--v-theme-secondary)) !important;
  color: #ffffff !important;
}

.btn-danger {
  background-color: rgb(var(--v-theme-error)) !important;
  color: #ffffff !important;
}

.result-bad {
  color: rgb(var(--v-theme-error)) !important;
}

.result-medium {
  color: rgb(var(--v-theme-warning)) !important;
}

@media (max-width: 600px) {
  .actions-row {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .actions-left,
  .actions-right,
  .actions-center {
    width: 100%;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
  }

  .actions-row .v-btn {
    width: 100%;
  }

  .actions-center {
    display: none;
  }
}
</style>
