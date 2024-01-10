<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows="hover">
    <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "carousel",
  data() {
    return {
      items: [
        {
          src: '/IMG1696NwG493745980.jpg'
        },
        {
          src: '/IMG1696rCR919391000.jpg'
        },
        {
          src: '/IMG1696uuh917780793.jpg'
        },
        {
          src: '/main.jpg'
        }
      ],




      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
};
</script>

<style></style>
