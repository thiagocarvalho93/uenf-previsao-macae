<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-sm">
      <div class="row q-col-gutter-md flex-center q-mb-sm">
        <!-- <div class="col-12 col-sm-4 col-md-2 fade">
          <q-select v-model="variable" :options="variables" label="Variável" />
        </div> -->
        <div class="">
          <q-icon
            @click="handlePrevious"
            :class="previousDisabled ? 'disabled' : ''"
            class="cursor-pointer"
            name="chevron_left"
            size="xl"
          />
        </div>
        <div class="">
          <q-select v-model="selectedDate" :options="dates" label="Data" />
        </div>
        <div class="">
          <q-select v-model="runHour" :options="HOURS" label="Hora" />
        </div>
        <div class="">
          <q-icon
            @click="handleNext"
            :class="nextDisabled ? 'disabled' : ''"
            class="cursor-pointer"
            name="chevron_right"
            size="xl"
          />
        </div>
      </div>
      <q-img v-touch-swipe.mouse="handleSwipe" :src="imageUrl" alt="Previsão" />
    </q-card>
    <div class="q-my-md row flex-center col-12"></div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { HOURS, VARIABLES } from 'src/constants/constants'
import { getImageUrl } from 'src/helpers/url-helper'
import { api } from 'src/boot/axios'
import { formatDateNumbersOnly, generateDatesArray } from 'src/helpers/date-helper'

// Reactive state
const variable = ref(VARIABLES[0])
const selectedDate = ref('')
const runHour = ref(HOURS[0])
const dates = ref([])

// Computed indices
const hourIndex = computed(() => HOURS.indexOf(runHour.value))
const dateIndex = computed(() => dates.value.indexOf(selectedDate.value))

// Image URL builder
const imageUrl = computed(() =>
  getImageUrl(variable.value, formatDateNumbersOnly(selectedDate.value), runHour.value),
)

// Navigation state
const previousDisabled = computed(() => hourIndex.value === 0 && dateIndex.value === 0)
const nextDisabled = computed(
  () => hourIndex.value === HOURS.length - 1 && dateIndex.value === dates.value.length - 1,
)

// Swipe handler
function handleSwipe(e) {
  if (e.direction === 'left') handleNext()
  else if (e.direction === 'right') handlePrevious()
}

// Navigation logic
function handlePrevious() {
  if (previousDisabled.value) return

  if (hourIndex.value === 0) {
    runHour.value = HOURS[HOURS.length - 1]
    selectedDate.value = dates[dateIndex.value - 1]
  } else {
    runHour.value = HOURS[hourIndex.value - 1]
  }
}

function handleNext() {
  if (nextDisabled.value) return

  if (hourIndex.value === HOURS.length - 1) {
    runHour.value = HOURS[0]
    selectedDate.value = dates.value[dateIndex.value + 1]
  } else {
    runHour.value = HOURS[hourIndex.value + 1]
  }
}

onMounted(async () => {
  try {
    const { data } = await api.get('last_updated.json')

    const text = (await data).trim()

    const [day, month, year] = text.split('-').map(Number)
    const baseDate = new Date(year, month - 1, day)

    dates.value = generateDatesArray(baseDate)

    selectedDate.value = dates.value[0]
  } catch (err) {
    console.error('Failed to load last_updated.json:', err)
  }
})
</script>
