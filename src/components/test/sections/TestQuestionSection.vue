<script setup>
import {computed, ref} from 'vue'
import {useTestStore} from '@stores/testStore.js'
import {storeToRefs} from 'pinia'
import {mdiPause, mdiPlay} from '@mdi/js'

const store = useTestStore()

const {
  currentQuestion,
  totalQuestions,
  currentQuestionIndex,
  selectedAnswerId,
  formattedRemainingTime,
  hasTimeLimit,
  isPaused,
  hintsAllowed,
  showCorrectAnswer,
} = storeToRefs(store)

const showHint = ref(false)
const showExplanation = ref(false)
const isLockedForQuestion = ref(false)

function onAnswerSelect(value) {
  if (showCorrectAnswer.value && isLockedForQuestion.value) {
    return
  }

  store.answerCurrentQuestion(value)
  showHint.value = false

  const q = currentQuestion.value
  if (!q || !showCorrectAnswer.value) {
    showExplanation.value = false
    isLockedForQuestion.value = false
    return
  }

  const answer = q.answers.find(a => a.id === value)

  if (answer && answer.correct === false) {
    showExplanation.value = !!answer.reason
  } else {
    showExplanation.value = false
  }

  isLockedForQuestion.value = true
}

function handleNext() {
  if (store.isLastQuestion) {
    store.finishTest(false)
  } else {
    store.goToNextQuestion()
  }

  showHint.value = false
  showExplanation.value = false
  isLockedForQuestion.value = false
}

function handleFinish() {
  store.finishTest(false)
  showHint.value = false
  showExplanation.value = false
  isLockedForQuestion.value = false
}

function togglePause() {
  store.togglePause()
}

function toggleHint() {
  const willShow = !showHint.value
  showHint.value = willShow

  if (willShow) {
    showExplanation.value = false
    store.registerHintUse()
  }
}

const progressPercent = computed(() => {
  if (!totalQuestions.value) return 0
  return ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100
})

const overlayText = computed(() => {
  const q = currentQuestion.value
  if (!q) return ''

  if (showExplanation.value) {
    const answer = q.answers.find(a => a.id === selectedAnswerId.value)
    return answer?.reason || ''
  }

  if (showHint.value) {
    return q.hint || ''
  }

  return ''
})

function answerLabelClasses(answer) {
  const isSelected = selectedAnswerId.value === answer.id

  if (!showCorrectAnswer.value || selectedAnswerId.value == null) {
    return isSelected ? 'text-primary' : ''
  }

  if (answer.correct) {
    return 'text-success'
  }

  if (isSelected && !answer.correct) {
    return 'text-error'
  }

  return ''
}

const nextButtonLabel = computed(() => {
  if (showCorrectAnswer.value) {
    return 'Дальше'
  }
  return 'Ответить'
})
</script>

<template>
  <div class="test-wrapper">
    <div class="progress-wrapper">
      <div
          :style="{ width: progressPercent + '%' }"
          class="progress-bar"
      />
    </div>

    <div class="flex-grow-1 test-body">
      <div class="d-flex justify-space-between align-center mb-2">
        <h2 class="text-h6 text-sm-h5 font-weight-bold text-primary">
          Вопрос {{ currentQuestionIndex + 1 }} из {{ totalQuestions }}
        </h2>

        <div
            v-if="hasTimeLimit"
            class="timer-wrapper"
        >
          <p
              :class="[
              'timer-text',
              isPaused ? 'timer-paused' : 'text-primary'
            ]"
          >
            {{ formattedRemainingTime }}
          </p>
        </div>
      </div>

      <p
          v-if="currentQuestion"
          class="text-body-1 mb-4"
      >
        {{ currentQuestion.text }}
      </p>

      <transition name="fade">
        <div
            v-if="overlayText"
            class="hint-overlay"
        >
          <div class="hint-overlay-inner">
            <p class="text-body-2 text-medium-emphasis mb-0">
              {{ overlayText }}
            </p>
          </div>
        </div>
      </transition>

      <v-radio-group
          v-if="currentQuestion"
          v-model="selectedAnswerId"
          :disabled="isPaused || (showCorrectAnswer && isLockedForQuestion)"
          class="mb-6 answers-group"
          color="primary"
          @update:model-value="onAnswerSelect"
      >
        <v-radio
            v-for="answer in currentQuestion.answers"
            :key="answer.id"
            :value="answer.id"
        >
          <template #label>
            <span :class="answerLabelClasses(answer)">
              {{ answer.text }}
            </span>
          </template>
        </v-radio>
      </v-radio-group>
    </div>

    <div class="actions-row mt-3">
      <div class="actions-left">
        <v-btn
            class="btn-danger font-weight-bold"
            height="50"
            rounded="lg"
            @click="handleFinish"
        >
          Закончить
        </v-btn>
        <v-btn
            v-if="hasTimeLimit"
            class="pause-btn font-weight-bold"
            height="50"
            rounded="lg"
            @click="togglePause"
        >
          <v-icon
              :icon="isPaused ? mdiPlay : mdiPause"
              class="mr-1"
              size="22"
          />
          Пауза
        </v-btn>
      </div>

      <div class="actions-right">
        <v-btn
            :disabled="isPaused || !hintsAllowed || !currentQuestion || showExplanation"
            class="hint-btn font-weight-bold"
            color="primary"
            height="50"
            rounded="lg"
            @click="toggleHint"
        >
          {{ showHint ? 'Скрыть подсказку' : 'Подсказка' }}
        </v-btn>

        <v-btn
            :disabled="!selectedAnswerId || isPaused"
            class="btn-secondary font-weight-bold"
            height="50"
            rounded="lg"
            @click="handleNext"
        >
          {{ nextButtonLabel }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-wrapper {
  display: flex;
  flex-direction: column;
}

.progress-wrapper {
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  background: rgb(var(--v-theme-primary));
  transition: width 0.35s ease;
}

.test-body {
  position: relative;
  overflow: hidden;
  padding-bottom: 110px;
}

.hint-overlay {
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 10px;
  z-index: 5;
}

.hint-overlay-inner {
  max-width: 640px;
  margin: 0 auto;
  background: rgb(var(--v-theme-background));
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.timer-wrapper {
  min-width: 145px;
  text-align: right;
}

.timer-text {
  font-family: monospace, Bitter;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.timer-paused {
  color: rgb(var(--v-theme-warning)) !important;
}

.actions-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.actions-left,
.actions-right {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-secondary {
  background: rgb(var(--v-theme-secondary)) !important;
  color: #fff !important;
}

.btn-danger {
  background: rgb(var(--v-theme-error)) !important;
  color: #fff !important;
}

.pause-btn {
  width: 140px;
  background: rgb(var(--v-theme-warning)) !important;
  color: #fff !important;
}

.answers-group :deep(.v-radio) {
  margin-bottom: 8px;
}

.answers-group :deep(.v-radio:last-child) {
  margin-bottom: 0;
}

.answers-group :deep(.v-selection-control) {
  align-items: flex-start;
}

.answers-group :deep(.v-label) {
  white-space: normal;
  line-height: 1.4;
}

@media (max-width: 600px) {
  .test-body {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 50px;
  }

  .actions-row {
    flex-direction: column;
  }

  .actions-left,
  .actions-right {
    display: contents;
  }

  .actions-row .v-btn {
    width: 100%;
  }

  .btn-secondary {
    order: 1;
  }

  .hint-btn {
    order: 2;
  }

  .pause-btn {
    order: 3;
  }

  .btn-danger {
    order: 4;
  }

  .answers-group :deep(.v-radio) {
    margin-bottom: 10px;
  }
}
</style>
