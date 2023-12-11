<script setup lang="ts">

</script>

<template>
    <div class="not-found">
        <h1>404</h1>
        <p>Page Not Found</p>
        <RouterLink to="/" class="btn" >
            вернуться на главную
        </RouterLink>
    </div>
</template>

<style scoped lang="scss">
.not-found {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;

    h1 {
        font-size: 54px;
        line-height: 1.3;
    }

    p {
        font-size: 34px;
        line-height: 1.3;
    }


}
</style>
