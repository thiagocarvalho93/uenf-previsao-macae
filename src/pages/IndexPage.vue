<template>
  <q-page class="q-pa-md">
    <span>Último update: {{ lastUpdate }}</span>
    <q-card flat bordered class="q-pa-sm">
      <!-- <div class="row q-row-gutter-md flex-center q-mb-md">
        <div v-for="item in GRIDS" :key="item">
          <q-radio size="sm" v-model="selectedGrid" :val="item" :label="item" />
        </div>
      </div> -->
      <div class="row q-col-gutter-md flex-center q-mb-sm">
        <q-icon
          @click="handlePrevious"
          :class="previousDisabled ? 'disabled' : ''"
          class="cursor-pointer"
          name="chevron_left"
          size="xl"
        />
        <q-select dense v-model="selectedDate" :options="dates" label="Data" />
        <q-select dense v-model="selectedHour" :options="hours" label="Hora" />
        <q-icon
          @click="handleNext"
          :class="nextDisabled ? 'disabled' : ''"
          class="cursor-pointer"
          name="chevron_right"
          size="xl"
        />
      </div>
      <q-img no-transition v-touch-swipe.mouse="handleSwipe" :src="imageUrl" alt="Previsão" />
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-fab hide-icon label="Variável" direction="up" color="primary">
        <q-fab-action
          v-for="item in VARIABLES"
          :key="item"
          @click="handleChangeVariable(item)"
          color="blue"
          hide-icon
          :label="item"
        />
      </q-fab>
    </q-page-sticky>

    <q-page-sticky position="bottom-left" :offset="[30, 30]">
      <q-fab hide-icon label="Grid" direction="up" color="primary">
        <q-fab-action
          v-for="item in GRIDS"
          :key="item"
          @click="handleChangeGrid(item)"
          color="blue"
          hide-icon
          :label="item"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { GRIDS, HOURS, HOURS_RADIATION, VARIABLES } from 'src/constants/constants'
import { getImageUrl } from 'src/helpers/url-helper'
import { api } from 'src/boot/axios'
import { formatDateNumbersOnly, generateDatesArray } from 'src/helpers/date-helper'

// Reactive state
const selectedVariable = ref(VARIABLES[0])
const selectedDate = ref('')
const selectedHour = ref(HOURS[0])
const selectedGrid = ref(GRIDS[2])
const dates = ref([])
const hours = ref(HOURS)
const lastUpdate = ref('')

// Computed indices
const hourIndex = computed(() => hours.value.indexOf(selectedHour.value))
const dateIndex = computed(() => dates.value.indexOf(selectedDate.value))

// Image URL builder
const imageUrl = computed(() =>
  getImageUrl(
    selectedVariable.value,
    formatDateNumbersOnly(selectedDate.value),
    selectedHour.value,
    selectedGrid.value,
  ),
)

// Navigation state
const previousDisabled = computed(() => hourIndex.value === 0 && dateIndex.value === 0)
const nextDisabled = computed(
  () => hourIndex.value === hours.value.length - 1 && dateIndex.value === dates.value.length - 1,
)

function handleChangeGrid(item) {
  selectedGrid.value = item
}

function handleChangeVariable(item) {
  if (item == 'Radiacao') {
    hours.value = HOURS_RADIATION
    selectedHour.value = HOURS_RADIATION.includes(selectedHour.value)
      ? selectedHour.value
      : HOURS_RADIATION[0]
  } else {
    hours.value = HOURS
  }
  selectedVariable.value = item
}

// Swipe handler
function handleSwipe(e) {
  if (e.direction === 'left') handleNext()
  else if (e.direction === 'right') handlePrevious()
}

// Navigation logic
function handlePrevious() {
  if (previousDisabled.value) return

  if (hourIndex.value === 0) {
    selectedHour.value = hours.value[hours.value.length - 1]
    selectedDate.value = dates.value[dateIndex.value - 1]
  } else {
    selectedHour.value = hours.value[hourIndex.value - 1]
  }
}

function handleNext() {
  if (nextDisabled.value) return

  if (hourIndex.value === hours.value.length - 1) {
    selectedHour.value = hours.value[0]
    selectedDate.value = dates.value[dateIndex.value + 1]
  } else {
    selectedHour.value = hours.value[hourIndex.value + 1]
  }
}

onMounted(async () => {
  try {
    const { data } = await api.get('last_updated.json')

    const text = (await data).trim()
    lastUpdate.value = text

    const [day, month, year] = text.split('-').map(Number)
    const baseDate = new Date(year, month - 1, day)

    dates.value = generateDatesArray(baseDate)

    selectedDate.value = dates.value[0]
  } catch (err) {
    console.error('Failed to load last_updated.json:', err)
  }
})
</script>
