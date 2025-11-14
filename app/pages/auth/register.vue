<script setup lang="ts">


const username = ref("")
const email = ref("")
const password = ref("")


const toast = useToast();


async function addUser() {
  try {
    const user = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: username.value,
        email: email.value,
        password: password.value
      }
    })
    toast.add({
      color: 'success',
      title: 'Registration successful',
      description: 'User Registered Successfully'
    }) 
  } catch (error: any) {
    toast.add({
      color: 'error',
      title: 'Registration failed',
      description: 'User Registration Failed'
    })
    console.log(error)
  }
}


</script>

<template>
  <NuxtLayout name="practice-layout">
  <div class="min-h-screen flex items-center">
    <form @submit.prevent="addUser" class="mx-auto space-y-4">
      <div class="space-y-2">
          <Label>Username</Label>
          <Input v-model="username"/>
      </div>
      <div class="space-y-2">
          <Label>Email</Label>
          <Input v-model="email"/>
      </div>
      <div class="space-y-2">
          <Label>Password</Label>
          <Input v-model="password"/>
      </div>
      <Button type="submit">Register</Button>
    </form>
  </div>
  </NuxtLayout>
</template>

<style scoped></style>
