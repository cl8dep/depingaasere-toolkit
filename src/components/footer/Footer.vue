<script setup lang="ts">
import global from '@/data/global.json'
</script>

<template>
    <!-- Footer -->
    <footer class="bg-white border-t py-6 text-center text-sm text-gray-600 px-4">
        <p>
            Hecho con ❤️ por <strong>Arael Espinosa</strong> —
            <a :href="global.repository" target="_blank" class="text-blue-600 hover:underline">
                Repositorio en GitHub
            </a>
        </p>
        <p class="mt-1">
            ¿Querés colaborar? <a :href="global.repository + '#contributing'" target="_blank"
                class="text-blue-600 hover:underline">Contribuí acá</a>.
        </p>
        <p class="mt-1">
            Licenciado bajo
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"
                class="text-blue-600 hover:underline">
                CC BY 4.0
            </a> — Se requiere atribución para cualquier uso público.
        </p>
    </footer>
</template>