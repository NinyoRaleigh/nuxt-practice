<template>
    <NuxtLayout name="practice-layout">
        <div class="min-h-screen flex items-center">
            <form @submit.prevent="loginUser" class="mx-auto space-y-4">
                <div class="space-y-2">
                    <Label>Email</Label>
                    <Input v-model="email" />
                </div>
                <div class="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" v-model="password" />
                </div>
                <Button type="submit">Login</Button>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

const email = ref("")
const password = ref("")

async function loginUser() {
    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value
            }
        })

        navigateTo('/');
    } catch (error) {
        console.log(error)
    }
}

</script>

<style scoped></style>