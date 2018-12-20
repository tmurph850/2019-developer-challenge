<template>
  <div>
    <form autocomplete="off">
      <div class="autocomplete">
        <input v-model="selectedBreed" v-on:input="filterBreeds($event)" id="select-breed" type="text" name="select-breed" placeholder="Select A Breed">
      </div>
      <div v-for="(breed) in matches" :key="breed.breedId">
        <div>{{breed.breedName}}</div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Autosuggest',
  data() {
    return {
      breeds: null,
      selectedBreed: "",
      matches: []
    }
  },
  mounted() {
    axios
      .get('https://ra-api.adoptapet.com/v1/pet-utilities/2/breeds')
      .then(response => {this.breeds = response.data.body; console.log(this.breeds)});
  },
  methods: {
    filterBreeds: function() {
      this.matches = [];
      this.breeds.forEach(breed => {
        if ( breed.breedName.includes(event.target.value) ) {
          let obj = {};
          obj.breedName = breed.breedName;
          obj.breedId = breed.breedId;
          this.matches.push(obj);
        }
      });
      console.log(this.matches);
    }
  }
};
</script>

<style lang="scss">

</style>
