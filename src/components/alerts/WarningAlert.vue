<template>
    <div class="toast-md flex items-center p-4 mb-4 text-sm text-yellow-600 border border-yellow-200 rounded-lg bg-yellow-100 shadow-md" role="alert">
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
</template>
<script>
export default{
    props:{
        message: String,
        closeAlert: Function
    }
}
</script>