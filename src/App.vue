<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        SESAME
      </div>
    </v-app-bar>

    <v-main>
      <WorkTimes/>
    </v-main>
  </v-app>
</template>

<script>
import WorkTimes from './components/WorkTimes'

export default {
  name: 'App',

  components: {
    WorkTimes,
  },

  data: () => ({
    //
  }),
};
</script>
