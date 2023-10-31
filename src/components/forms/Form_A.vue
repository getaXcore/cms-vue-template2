<template>
    <div class="mx-auto space-y-3 w-1/3">
        <div class="flex flex-row max-md:flex-col">
            <div class="basis-1/3 text-left"><label>Dari Tanggal <span class=" text-red-500">*</span></label></div>
            <div class="basis-1/2"><input type="date" :value="startdateValue" @input="$emit('update:startdateValue',$event.target.value)" class="mt-1 block w-full rounded-md"></div>
        </div>
        <div class="flex flex-row max-md:flex-col">
            <div class="basis-1/3 text-left"><label>Sampai <span class=" text-red-500">*</span></label></div>
            <div class="basis-1/2"><input type="date" :value="enddateValue" @input="$emit('update:enddateValue',$event.target.value)" class="mt-1 block w-full rounded-md"></div>
        </div>
        <div class="flex flex-row max-md:flex-col">
            <div class="basis-1/3">&nbsp;</div>
            <div class="basis-1/2 text-left">
                <button class=" border rounded-md border-blue-600 p-1.5 w-uto bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700" v-on:click="submit">Search</button>&nbsp;
                <button class=" border rounded-md border-red-600 p-1.5 w-auto bg-red-600 text-white hover:bg-red-700 hover:border-red-700" v-on:click="reset">Reset</button>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    props:{
        submit: Function,
        reset: Function,
        startdateValue: String,
        enddateValue: String
    }
}
</script>