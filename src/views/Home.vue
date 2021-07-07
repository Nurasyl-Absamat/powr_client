<template>
  <div class="home">
    <p v-show="haveError">{{ this.error }}</p>
    <tree-item
      style="max-width: fit-content"
      :item="treeData"
      @make-container="makeContainer"
      @add-rectangle="addRectangle"
    ></tree-item>

    <div class="container field">
      <pre>{{ treeData | pretty }}</pre>
      <button @click="saveState" class="button">Save</button>
    </div>
    <div class="container field">
      <textarea v-model="buildData" cols="100" rows="20"></textarea>
      <button @click="buildTree" class="button">Build</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TreeItem from "@/components/TreeItem";
import axios from "axios";
// import Vue from "vue";

export default {
  name: "Home",
  components: {
    TreeItem,
  },
  data: function () {
    return {
      treeData: {},
      id: "",
      error: "",
      buildData: "",
    };
  },
  computed: {
    haveError: function () {
      return this.error !== "";
    },
  },
  mounted() {
    this.treeData = {
      type: "container",
      items: [],
    };

    if (this.$route.params.id) {
      axios.get("apps/" + this.$route.params.id).then((response) => {
        this.id = response.data.id;
        try {
          this.treeData = JSON.parse(response.data.value);
        } catch (e) {
          this.error = e;
        }
      });
    }
  },
  filters: {
    pretty: function (value) {
      return JSON.stringify(value, null, 2);
    },
  },
  methods: {
    saveState: function () {
      // stringify to save it as longtext in database
      let val = { value: JSON.stringify(this.treeData) };
      // update by id instead of create
      if (this.id) {
        axios.put("apps/" + this.id, val);
      } else {
        axios.post("apps", val);
      }
    },
    makeContainer: function (item) {
      item.items.push({
        type: "container",
        items: [],
      });
    },
    addRectangle: function (item) {
      item.items.push({
        type: "box",
      });
    },
    
    buildTree: function () {
      this.treeData = JSON.parse(this.buildData);
    },
  },
};
</script>

<style>
.field {
  justify-content: space-between;
  padding: 50px;
}

.button {
  position: relative;
  display: block;
  width: 200px;
  height: 36px;
  border-radius: 18px;
  background-color: #390096;
  border: solid 1px #444;
  color: #fff;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.button:hover {
  background-color: #444;
  border-color: #fff;
  transition: all 0.1s ease-in-out;
}
.container {
  border: 2px solid #444;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 20px;
}
</style>