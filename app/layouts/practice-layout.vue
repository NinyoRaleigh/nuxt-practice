<script setup lang="ts">
const { clear } = useUserSession();

async function logout() {
  await clear();
  navigateTo("/auth/login");
}

</script>

<template>
  <div>
    <nav class="flex items-center justify-evenly fixed w-full bg-neutral-700 h-10">
      <NuxtLink to="/">Home</NuxtLink>

      <div class="space-x-10">
      <NuxtLink to="/auth/register">Register</NuxtLink> 
      <NuxtLink to="/auth/login">Login</NuxtLink>
      <Button @click="logout">Logout</Button>
      </div>
    
    </nav>
    <slot />
  </div>
</template>

