<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-md q-mb-md fade">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-4 col-md-2 fade">
          <q-select v-model="variable" :options="variables" label="Variável" />
        </div>
        <div class="col-12 col-sm-4 col-md-2 fade">
          <q-select v-model="selectedDate" :options="dates" label="Data" />
        </div>
        <div class="col-12 col-sm-2 col-md-1 fade">
          <q-select v-model="runHour" :options="hours" label="Hora" />
        </div>
      </div>
    </q-card>

    <q-card v-touch-swipe.mouse="handleSwipe" flat bordered class="fade">
      <q-img :src="imageUrl" alt="Previsão" />
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

const variables = ['Temperatura', 'Vento', 'Pressao', 'Precipitacao', 'Radiacao']
const dates = ['2025-05-03', '2025-05-04', '2025-05-05']
const hours = ['00Z', '03Z', '06Z', '09Z', '12Z', '15Z', '18Z', '21Z']

const imageUrl = computed(
  () =>
    `${BUCKET_URL}/${variable.value}/${FILE_PREFIX_MAP.get(variable.value)}_g1_${selectedDate.value.replaceAll('-', '')}_${runHour.value}.png`,
)

function handleSwipe(e) {
  const indiceHora = hours.findIndex((x) => x == runHour.value)

  if (e.direction == 'left') {
    const proximoIndice = indiceHora + 1 >= hours.length ? indiceHora : indiceHora + 1
    runHour.value = hours[proximoIndice]
  }

  if (e.direction == 'right') {
    const proximoIndice = indiceHora - 1 < 0 ? indiceHora : indiceHora - 1
    runHour.value = hours[proximoIndice]
  }
}
</script>

<style></style>
