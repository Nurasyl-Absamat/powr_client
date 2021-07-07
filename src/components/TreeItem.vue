<template>
  <div>
    <div v-if="isContainer" class="container">
      <!-- Take all the methods from parent
      and use them in for loop -->
      <tree-item
        v-for="(child, index) in item.items"
        :key="index"
        :item="child"
        :parentItem="item"
        @make-container="$emit('make-container', $event)"
        @add-rectangle="$emit('add-rectangle', $event)"
      ></tree-item>
      <!-- for hover -->
      <div
        class="add-functions"
        @mouseover="addHover = true"
        @mouseout="addHover = false"
      >
        <div class="functions" v-show="addHover">
          <div class="add-btn" @click="addRectangle">Rectangle</div>
          <div class="add-btn" @click="makeContainer">Container</div>
        </div>
        <div class="add-btn">
          <div>
            <div>Add</div>
            <div @click="deleteItem" class="delete-btn" v-show="hasParent">X</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rectangle" v-else>
      <input type="color" v-model="item.color" />
      <div @click="deleteItem" class="delete-btn">X</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeItem",
  props: {
    item: Object,
    parentItem: Object,
  },
  data: function () {
    return {
      addHover: "",
    };
  },
  computed: {
    isContainer: function () {
      return this.item.type === "container";
    },
    hasParent: function () {
      return this.parentItem != null;
    }
  },
  methods: {
    makeContainer: function () {
      if (this.isContainer) {
        this.$emit("make-container", this.item);
      }
    },
    addRectangle: function () {
      this.$emit("add-rectangle", this.item);
    },
    // delete item from parent array
    deleteItem: function () {
      let index = this.$options._parentVnode.key;
      this.$delete(this.parentItem.items, index);
    },
  },
};
</script>

<style scoped>
.delete-btn {
  position: absolute;
  bottom: 2px;
  right: 3px;
  color: white;
  font-size: 9px;
  cursor: pointer;
}

input[type="color"] {
  -webkit-appearance: none;
  border: none;

  width: 100px;
  height: 100px;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
}

.add-btn {
  border: 1px solid black;
  position: relative;
  border-radius: 5px;
  padding: 5px;
  width: 100px;
  text-align: center;
  margin: 10px;
  color: white;
  background-color: gray;
  max-height: 20px;
}

.functions > .add-btn:hover {
  cursor: pointer;
  background-color: #fff;
  border-color: #444;
  color: #444;
  transition: all 0.1s ease-in-out;
}

.functions > .add-btn:active {
  transform: scale(0.9);
}

.add-functions {
  display: block;
}

.functions {
  display: inline-flex;
  position: absolute;
  margin-top: -24px;
  margin-left: -70px;
  z-index: 1;

}

.rectangle {
  margin: 20px;
  position: relative;
}
</style>