<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="footer-title text-primary">Охотминимум — онлайн-тест</p>
      <p class="footer-text text-medium-emphasis">
        Исходники доступны на
        <a
            class="footer-link text-primary"
            href="https://github.com/MakarMS/ohot-minimum-test"
            rel="noopener noreferrer"
            target="_blank"
        >
          <svg
              aria-hidden="true"
              class="github-icon"
              fill="currentColor"
              height="16"
              viewBox="0 0 16 16"
              width="16"
          >
            <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
              -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
              0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
              1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
              2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19
              0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          GitHub
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 48px;
  padding: 16px 0 16px;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.04);
}

.footer-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
}

.footer-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 6px;
}

.footer-text {
  font-size: 0.9rem;
  opacity: 0.85;
  line-height: 1.55;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: black;
  text-decoration: none;
  border-bottom: 1px solid rgb(var(--v-theme-primary));
  padding-bottom: 1px;
  transition: 0.2s;
  margin-left: 2px;
}

.github-icon {
  margin-bottom: -2px;
}
</style>