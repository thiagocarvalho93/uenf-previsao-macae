<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title class="text-weight-medium"> Previsão Macaé </q-toolbar-title>
        <!-- <q-btn flat round icon="dark_mode" @click="toggleDark" /> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// import { useQuasar } from 'quasar'
// const $q = useQuasar()

// function toggleDark() {
//   $q.dark.set(!$q.dark.isActive)
// }
</script>
