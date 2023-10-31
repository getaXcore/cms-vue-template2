<template>
    <!-- Alert Info -->
    <div v-if="message && variant==='info' || variant===''" v-for="div in components" :key="div.id" class="toast-md flex items-center p-4 mb-4 text-sm text-blue-500 border border-blue-100 rounded-lg bg-blue-50 shadow-md" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-semibold">{{ message }}</span>
        </div>
        <div class=" ml-3">
            <svg v-on:click="closeAlert()" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    </div>

    <!-- Alert Warning -->
    <div v-if="message && variant==='warning'" v-for="div in components" :key="div.id" class="toast-md flex items-center p-4 mb-4 text-sm text-yellow-600 border border-yellow-200 rounded-lg bg-yellow-100 shadow-md" role="alert">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <span class="sr-only">Warning</span>
        <div>
            <span class="font-semibold">{{ message }}</span>
        </div>
        <div class=" ml-3">
            <svg v-on:click="closeAlert()" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    </div>

    <!-- Alert Danger -->
    <div v-if="message && variant==='danger'" v-for="div in components" :key="div.id" class="toast-md flex items-center p-4 mb-4 text-sm text-red-600 border border-red-200 rounded-lg bg-red-100 shadow-md" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <span class="sr-only">Danger</span>
        <div>
            <span class="font-semibold">{{ message }}</span>
        </div>
        <div class=" ml-3">
            <svg v-on:click="closeAlert()" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    </div>
</template>
<script>
import WarningAlert from './WarningAlert.vue';

export default{
    props: {
        message: String,
        components: Object,
        variant: {
            validator(value) {
                return ['info', 'warning', 'danger'].includes(value);
            }
        }
    },
    data() {
        return {
            index: 0,
        };
    },
    methods: {
        closeAlert() {
            //remove component by id
            this.components.splice(this.index, 1);
        }
    },
    components: { WarningAlert }
}
</script>