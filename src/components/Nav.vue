<template>
        <v-toolbar flat app>
           <v-tabs right>
            <v-tab
            v-for="link in links"
            :key="link"
            class="mx-4"
            color="white"
            router :to="link.route"> {{link.text}}</v-tab>
            
    </v-tabs> 
        </v-toolbar>
</template>

<style>

</style>

<script>
    export default {
        name: 'Nav',
        data: () => ({
            links: [
                {text: "Login", route: "/login"},
                {text: "Register", route: "/register"},
            ],
        }),
    }
</script>
