<template>
  <div>
    <CardList />
  </div>
</template>

<script>
import CardList from '@/components/CardList';

export default {
  computed:{
    //if we ever need to bring in data from the store
  },
  components: {
    CardList,
  },
};
</script>
