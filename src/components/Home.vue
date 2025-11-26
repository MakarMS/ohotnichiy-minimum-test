<script setup>
import HeroSection from '@components/sections/home/HeroSection.vue'
import BaseWrapper from '@components/base/BaseWrapper.vue'

import AboutExamSection from '@components/sections/home/AboutExamSection.vue'
import ExamScheduleSection from '@components/sections/home/ExamScheduleSection.vue'
import ExamContentSection from '@components/sections/home/ExamContentSection.vue'
import ExamDocumentsSection from '@components/sections/home/ExamDocumentsSection.vue'
</script>

<template>
  <HeroSection/>

  <BaseWrapper class="pt-10 pb-5">
    <AboutExamSection/>
  </BaseWrapper>

  <BaseWrapper class="py-5 py-sm-5">
    <ExamScheduleSection/>
  </BaseWrapper>

  <BaseWrapper class="py-5 py-sm-5">
    <ExamContentSection/>
  </BaseWrapper>

  <BaseWrapper class="py-5 py-sm-5">
    <ExamDocumentsSection/>
  </BaseWrapper>
</template>

