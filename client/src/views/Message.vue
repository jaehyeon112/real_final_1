
<template>
  <v-sheet
    class="position-relative"
    min-height="450"
  >
   

    <v-fade-transition hide-on-leave > 
      <v-card
        v-if="dialog"
        append-icon="$close"
        class="mx-auto"
        elevation="16"
        max-width="500"
        font-weight-bold
        title="Congratulations!"
      >
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="dialog = true"></v-btn>
        </template>

        <v-divider></v-divider>

        <div class="py-12 text-center">
          <v-icon
            class="mb-6"
            color="success"
            icon="mdi-check-circle-outline"
            size="128"
          ></v-icon>

          <div class="text-h4 font-weight-bold">회원가입이 완료되었습니다.</div>
        </div>

        <v-divider></v-divider>

        <div class="pa-4 text-end">
 
          <router-link to="/login"><v-btn
            class="text-none"
            color="medium-emphasis"
            min-width="92"
            rounded
            variant="outlined"
            @click="dialog = true"
          >
            Login
          </v-btn></router-link>

        <router-link to="/main"><v-btn
            class="text-none"
            color="medium-emphasis"
            min-width="92"
            rounded
            variant="outlined"
            @click="dialog = true"
          >
            Home
          </v-btn></router-link>
        </div>
      </v-card>
    </v-fade-transition>
  </v-sheet>
</template>




<script setup>
  import { ref } from 'vue'

  const dialog = ref(true)
</script>


<style scoped>

</style>

