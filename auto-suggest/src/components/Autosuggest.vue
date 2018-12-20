<template>
  <div>
    <form autocomplete="off">
      <label for="select-breed">Breed</label>
      <div class="autosuggest">
        <input v-model="selectedBreed.breedName" v-on:click="displayMatches()" v-on:input="filterBreeds($event)"  id="select-breed" type="text" name="select-breed" placeholder="Select A Breed">
      </div>
      <div v-if="showMatches" v-for="(breed) in matches" :key="breed.breedId">
        <div class="autosuggest-item" v-on:click="showSelectedInfo($event)">{{breed.breedName}}</div>
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
      selectedBreed: {
        breedName: ""
      },
      matches: null,
      showMatches: false
    }
  },
  mounted() {
    axios
      .get('https://ra-api.adoptapet.com/v1/pet-utilities/2/breeds')
      .then(response => {
        this.breeds = response.data.body;
        this.matches = response.data.body;
      });
  },
  methods: {
    filterBreeds: function() {
      this.matches = [];
      this.breeds.forEach(breed => {
        if ( breed.breedName.toLowerCase().includes(event.target.value.toLowerCase()) ) {
          if ( breed.breedName.indexOf("'") !== -1 || breed.breedName.indexOf('"') !== -1 ) {
            breed.breedName = this.removeQuotes(breed.breedName);
          }
          let obj = {};
          obj.breedName = breed.breedName;
          obj.breedId = breed.breedId;
          this.matches.push(obj);
        }
      });
    },
    showSelectedInfo: function() {
      this.breeds.some(breed => {
        if ( breed.breedName.toLowerCase() === event.target.innerHTML.toLowerCase() ) {
          this.selectedBreed.breedName = breed.breedName;
        }
      });
    },
    removeQuotes: function(s) {
     let newString = s.replace(/["']/g, "").trim();
     return newString;
    },
    displayMatches: function() {
      this.showMatches = true;
    },
    hideMatches: function() {
      this.showMatches = false;
    }
  }
};
</script>

<style lang="scss">
.autosuggest {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}
.autosuggest-item {
  width: 170px;
  margin: 0 auto;
}
.autosuggest-item:hover {
  cursor: pointer;
}
label {
  font-size: 20px;
  display: block;
  margin: 0 auto;
}
</style>
