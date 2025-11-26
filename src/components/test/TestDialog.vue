<script setup>
import {computed, nextTick, ref, watch} from 'vue'
import {useTestStore} from '@stores/testStore'
import {storeToRefs} from 'pinia'

import TestSettingsSection from '@components/test/sections/TestSettingsSection.vue'
import TestQuestionSection from '@components/test/sections/TestQuestionSection.vue'
import TestResultsSection from '@components/test/sections/TestResultsSection.vue'
import {ymGoal} from "@utils/ym.js";

const props = defineProps({
  modelValue: {type: Boolean, required: true},
})

const emit = defineEmits(['update:modelValue'])

const dialog = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

const store = useTestStore()
const {status, totalQuestions} = storeToRefs(store)

const mode = ref('settings')

watch(
    () => dialog.value,
    val => {
      if (val) {
        mode.value = 'settings'
        store.resetToSettings()
      }
    },
)

watch(
    () => status.value,
    val => {
      if (val === 'finished') {
        mode.value = 'results'
      }
    },
)

async function handleStartTest() {
  await nextTick()
  store.initTest()
  if (!totalQuestions.value) {
    return
  }
  mode.value = 'test'
  ymGoal('click_start_test_button', {page: window.location.pathname})
}

function handleTryAgain() {
  store.resetToSettings()
  mode.value = 'settings'
  ymGoal('click_try_again_button', {page: window.location.pathname})
}

function handleCloseFromResults() {
  dialog.value = false
  ymGoal('click_close_from_results_button', {page: window.location.pathname})
}

function handleCloseFromSettings() {
  dialog.value = false
  ymGoal('click_close_from_settings_button', {page: window.location.pathname})
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      class="test-dialog"
      max-width="650px"
  >
    <v-card class="pa-4 d-flex flex-column">
      <TestSettingsSection
          v-if="mode === 'settings'"
          @close="handleCloseFromSettings"
          @start-test="handleStartTest"
      />

      <TestQuestionSection
          v-else-if="mode === 'test'"
      />

      <TestResultsSection
          v-else
          @close="handleCloseFromResults"
          @try-again="handleTryAgain"
      />
    </v-card>
  </v-dialog>
</template>

<style scoped>
.test-dialog .v-card {
  border-radius: 16px;
}
</style>
