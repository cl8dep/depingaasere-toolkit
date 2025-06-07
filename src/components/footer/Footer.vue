<script setup lang="ts">
import global from '@/data/global.json'
</script>

<template>
    <!-- Footer -->
    <footer class="bg-white border-t py-6 text-center text-sm text-gray-600 px-4">
        <p>
            Made with ❤️ by <strong>Arael Espinosa</strong> —
            <a :href="global.repository" target="_blank" class="text-blue-600 hover:underline">
                GitHub Repository
            </a>
        </p>
        <p class="mt-1">
            Want to help? <a :href="global.repository + '#contributing'" target="_blank"
                class="text-blue-600 hover:underline">Contribute here</a>.
        </p>
        <p class="mt-1">
            Licensed under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"
                class="text-blue-600 hover:underline">
                CC BY 4.0
            </a> — Attribution required on any public use.
        </p>
    </footer>
</template>