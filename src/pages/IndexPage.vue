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
          <q-select v-model="runHour" :options="hours" label="Hora" />
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
import { BUCKET_URL, FILE_PREFIX_MAP } from 'src/constants/constants'
import { ref, computed } from 'vue'

const variable = ref('Temperatura')
const selectedDate = ref('2025-05-03')
const runHour = ref('00Z')

// const variables = ['Temperatura', 'Vento', 'Pressao', 'Precipitacao', 'Radiacao']
const dates = ['2025-05-03', '2025-05-04', '2025-05-05']
const hours = ['00Z', '03Z', '06Z', '09Z', '12Z', '15Z', '18Z', '21Z']

const imageUrl = computed(
  () =>
    `${BUCKET_URL}/${variable.value}/${FILE_PREFIX_MAP.get(variable.value)}_g1_${selectedDate.value.replaceAll('-', '')}_${runHour.value}.png`,
)

const hourIndex = computed(() => hours.findIndex((x) => x == runHour.value))
const dateIndex = computed(() => dates.findIndex((x) => x == selectedDate.value))

const previousDisabled = computed(() => hourIndex.value == 0 && dateIndex.value == 0)
const nextDisabled = computed(
  () => hourIndex.value + 1 >= hours.length && dateIndex.value + 1 >= dates.length,
)

function handleSwipe(e) {
  console.log('swiped')

  if (e.direction == 'left') {
    handleNext()
  }

  if (e.direction == 'right') {
    handlePrevious()
  }
}

function handlePrevious() {
  if (previousDisabled.value) return

  const isFirstHour = hourIndex.value == 0
  const isFirstDay = dateIndex.value == 0

  if (isFirstHour) {
    const nextHourIndex = isFirstDay ? hourIndex : hours.length - 1
    const nextDateIndex = isFirstDay ? dateIndex : dateIndex.value - 1

    runHour.value = hours[nextHourIndex]
    selectedDate.value = dates[nextDateIndex]
  } else {
    runHour.value = hours[hourIndex.value - 1]
  }
}

function handleNext() {
  if (nextDisabled.value) return
  const isLastHour = hourIndex.value + 1 >= hours.length
  const isLastDate = dateIndex.value + 1 >= dates.length

  if (isLastHour) {
    const nextHourIndex = isLastDate ? hourIndex.value : 0
    const nextDateIndex = isLastDate ? dateIndex.value : dateIndex.value + 1
    runHour.value = hours[nextHourIndex]
    selectedDate.value = dates[nextDateIndex]
  } else {
    runHour.value = hours[hourIndex.value + 1]
  }
}
</script>

<style></style>
