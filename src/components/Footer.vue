<template>
    <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        router :to="link.route"
      >
        {{ link.text }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
      <strong>&nbsp;Kelompok A © </strong> {{ new Date().getFullYear() }}  
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
    export default {
        name: 'Footer',
         
    }
</script>
