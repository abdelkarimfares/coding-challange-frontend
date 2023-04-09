<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <ul class="links">
      <li>
        <router-link class="link" to="/users">Users</router-link>
      </li>
      <li>
        <router-link class="link" to="/groups">Groups</router-link>
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<style scoped>
.links{
  list-style: none;
  margin: 0;
  display: flex;
  padding: 0 15px;
  background-color: #DDD;
  margin-bottom: 20px;
}

.link{
  display: inline-block;
  padding: 10px;
  font-weight: 500;
  text-align: center;
  border-radius: 5px;
  margin: 0 8px;
}
</style>
