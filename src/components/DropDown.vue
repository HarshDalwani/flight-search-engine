<template>
  <div class="dropdown">
    <input
      required
      v-if="Object.keys(selectedItem).length === 0"
      ref="dropdowninput"
      v-model.trim="inputValue"
      class="form-control"
      type="text"
      :placeholder="placeHolder"
    />
    <input
      v-else
      @click="resetSelection"
      readonly
      :value="selectedItem.name"
      class="form-control"
    />

    <div v-if="inputValue != ''" class="dropdown-list">
      <div
        @click="selectItem(item)"
        v-for="item in filteredList"
        :key="item.name"
        class="dropdown-item"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import airports from "../helpers/airports";
export default {
  props: {
    placeHolder: String,
  },
  data() {
    return {
      selectedItem: {},
      inputValue: "",
    };
  },

  methods: {
    resetSelection() {
      this.selectedItem = {};
      this.$nextTick(() => this.$refs.dropdowninput.focus());
      this.$emit("on-item-reset");
    },
    selectItem(theItem) {
      this.selectedItem = theItem;
      this.inputValue = "";
      this.$emit("on-item-selected", theItem);
    },
  },

  computed: {
    filteredList() {
      return airports.filter((airport) => {
        return airport.city.includes(this.inputValue.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  /* width: 100%; */
  /* max-width: 400px; */
  /* margin: 0 auto; */
}

.dropdown-input:focus,
.dropdown-selected:hover {
  background: #ffffff;
  border-color: #e2e8f0;
}
.dropdown-input::placeholder {
  opacity: 0.7;
}
.dropdown-selected {
  font-weight: bold;
  cursor: pointer;
}
.dropdown-list {
  width: 100%;
  max-height: 500px;
  margin-top: 4px;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}
.dropdown-item {
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}
.dropdown-item:hover {
  background: #edf2f7;
}
</style>
