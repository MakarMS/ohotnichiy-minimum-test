import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import questionsData from '@data/questions.json'

const QUESTION_COUNTS = [50, 100, 200]

const TIME_LIMITS = [
    {value: '30', label: '30 минут', minutes: 30},
    {value: '60', label: '1 час', minutes: 60},
    {value: '120', label: '2 часа', minutes: 120},
    {value: 'none', label: 'Без ограничения', minutes: null},
]

function decl(n, one, few, many) {
    const n10 = n % 10
    const n100 = n % 100
    if (n10 === 1 && n100 !== 11) return one
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few
    return many
}

function formatSecondsVerbose(seconds) {
    if (seconds == null || seconds < 0) return ''
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    const parts = []

    if (h > 0) {
        parts.push(`${h} ${decl(h, 'час', 'часа', 'часов')}`)
    }
    if (m > 0) {
        parts.push(`${m} ${decl(m, 'минута', 'минуты', 'минут')}`)
    }
    if (s > 0 || parts.length === 0) {
        parts.push(`${s} ${decl(s, 'секунда', 'секунды', 'секунд')}`)
    }

    return parts.join(' ')
}

let timerId = null

export const useTestStore = defineStore('test', () => {
    const questionCount = ref(50)
    const timeLimit = ref('120')
    const shuffleEnabled = ref(true)
    const hintsAllowed = ref(true)
    const showCorrectAnswer = ref(true)

    const questions = ref([])
    const currentQuestionIndex = ref(0)
    const selectedAnswerId = ref(null)
    const answersLog = ref([])

    const remainingSeconds = ref(null)
    const elapsedSeconds = ref(0)
    const isPaused = ref(false)
    const status = ref('idle')

    const hintsUsedCount = ref(0)
    const hintsUsedQuestionIds = ref([])

    const hasTimeLimit = computed(() => timeLimit.value !== 'none')
    const totalQuestions = computed(() => questions.value.length)

    const currentQuestion = computed(() => {
        if (!questions.value.length) return null
        return questions.value[currentQuestionIndex.value] || null
    })

    const isLastQuestion = computed(
        () => currentQuestionIndex.value >= questions.value.length - 1,
    )

    const formattedRemainingTime = computed(() => {
        if (!hasTimeLimit.value || remainingSeconds.value == null) return ''
        const total = remainingSeconds.value
        const h = Math.floor(total / 3600)
        const m = Math.floor((total % 3600) / 60)
        const s = total % 60
        const hh = String(h).padStart(2, '0')
        const mm = String(m).padStart(2, '0')
        const ss = String(s).padStart(2, '0')
        return `${hh}:${mm}:${ss}`
    })

    const formattedElapsedTime = computed(() => {
        if (!elapsedSeconds.value) return ''
        return formatSecondsVerbose(elapsedSeconds.value)
    })

    const correctCount = computed(
        () => answersLog.value.filter(r => r.isCorrect).length,
    )

    const incorrectCount = computed(
        () => answersLog.value.filter(r => !r.isCorrect).length,
    )

    const scorePercent = computed(() => {
        if (!totalQuestions.value) return 0
        return Math.round((correctCount.value / totalQuestions.value) * 100)
    })

    function shuffleArray(arr) {
        return [...arr].sort(() => Math.random() - 0.5)
    }

    function stopTimer() {
        if (timerId !== null) {
            clearInterval(timerId)
            timerId = null
        }
        remainingSeconds.value = null
        isPaused.value = false
    }

    function startTimer() {
        stopTimer()

        if (!hasTimeLimit.value) {
            elapsedSeconds.value = 0
            return
        }

        const meta = TIME_LIMITS.find(t => t.value === timeLimit.value)
        if (!meta || !meta.minutes) {
            elapsedSeconds.value = 0
            return
        }

        remainingSeconds.value = meta.minutes * 60
        elapsedSeconds.value = 0
        isPaused.value = false

        timerId = setInterval(() => {
            if (isPaused.value) return
            if (remainingSeconds.value == null) return

            if (remainingSeconds.value > 0) {
                remainingSeconds.value -= 1
                elapsedSeconds.value += 1
            } else {
                finishTest(true)
            }
        }, 1000)
    }

    function togglePause() {
        if (!hasTimeLimit.value || remainingSeconds.value == null) return
        isPaused.value = !isPaused.value
    }

    function prepareQuestions() {
        let pool = questionsData.slice()

        if (shuffleEnabled.value) {
            pool = shuffleArray(pool)
        }

        const count = Math.min(questionCount.value, pool.length)
        let slice = pool.slice(0, count)

        if (shuffleEnabled.value) {
            slice = slice.map(q => ({
                ...q,
                answers: shuffleArray(q.answers),
            }))
        }

        return slice
    }

    function initTest() {
        answersLog.value = []
        selectedAnswerId.value = null
        currentQuestionIndex.value = 0
        questions.value = prepareQuestions()
        elapsedSeconds.value = 0

        hintsUsedCount.value = 0
        hintsUsedQuestionIds.value = []

        if (hasTimeLimit.value) {
            startTimer()
        } else {
            stopTimer()
        }

        status.value = 'running'
    }

    function answerCurrentQuestion(answerId) {
        selectedAnswerId.value = answerId
        const q = currentQuestion.value
        if (!q) return

        const correctAnswer = q.answers.find(a => a.correct)
        const isCorrect = !!(correctAnswer && correctAnswer.id === answerId)

        const existingIndex = answersLog.value.findIndex(
            r => r.questionId === q.id,
        )

        const entry = {
            questionId: q.id,
            selectedAnswerId: answerId,
            isCorrect,
        }

        if (existingIndex === -1) {
            answersLog.value.push(entry)
        } else {
            answersLog.value.splice(existingIndex, 1, entry)
        }
    }

    function goToNextQuestion() {
        if (isLastQuestion.value) return
        currentQuestionIndex.value += 1
        selectedAnswerId.value = null
    }

    function registerHintUse() {
        const q = currentQuestion.value
        if (!q) return
        if (!hintsAllowed.value) return

        if (!hintsUsedQuestionIds.value.includes(q.id)) {
            hintsUsedQuestionIds.value.push(q.id)
            hintsUsedCount.value += 1
        }
    }

    function finishTest() {
        stopTimer()
        status.value = 'finished'
    }

    function resetToSettings() {
        stopTimer()
        questions.value = []
        currentQuestionIndex.value = 0
        selectedAnswerId.value = null
        answersLog.value = []
        elapsedSeconds.value = 0
        hintsUsedCount.value = 0
        hintsUsedQuestionIds.value = []
        status.value = 'idle'
    }

    return {
        QUESTION_COUNTS,
        TIME_LIMITS,

        questionCount,
        timeLimit,
        shuffleEnabled,
        hintsAllowed,
        showCorrectAnswer,

        questions,
        currentQuestionIndex,
        selectedAnswerId,
        answersLog,
        remainingSeconds,
        elapsedSeconds,
        isPaused,
        status,
        hintsUsedCount,

        hasTimeLimit,
        totalQuestions,
        currentQuestion,
        isLastQuestion,
        formattedRemainingTime,
        formattedElapsedTime,
        correctCount,
        incorrectCount,
        scorePercent,

        initTest,
        answerCurrentQuestion,
        goToNextQuestion,
        finishTest,
        resetToSettings,
        togglePause,
        registerHintUse,
    }
})
