<template>
  <div>
    <p>MainView.vue </p>
    <CardList />
  </div>
</template>

<script>
import CardList from '@/components/CardList';

export default {
  props:["visible"],
  computed:{
    isVisible () {
      return this.$store.state.visible;
    }
  },
  components: {
    CardList,
  },
};
</script>
