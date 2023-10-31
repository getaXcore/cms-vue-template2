<template>
    <div v-if="isLength > 0" class="mx-auto font-semibold sm:w-auto lg:w-1/2 md:w-8/12">
		<ul class=" list-none bg-white p-2 shadow-md rounded">
			<li class=" inline-block">
				<span
					class="rounded-l rounded-sm border border-gray-100 px-3 py-2 cursor-not-allowed no-underline text-gray-600 h-10"
					v-if="isInFirstPage"
				>
					First
				</span>
				<a
					v-else
					@click.prevent="onClickFirstPage"
					class="rounded-l rounded-sm border-t border-b border-l border-gray-100 px-3 py-2 text-gray-600 hover:bg-gray-100 no-underline"
					href="#"
					role="button"
					rel="prev"
				>
					First
				</a>
			</li>

			<li class=" inline-block">
				<button
					type="button"
					@click="onClickPreviousPage"
					:disabled="isInFirstPage"
					aria-label="Go to previous page"
					class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
					:class="{'cursor-not-allowed': isInFirstPage}"
				>
					<svg fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-3">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</button>

			</li>

			<li
				v-for="page in pages"
				class=" inline-block"
				:key="page.name"
			>
				<span
					class="rounded-sm border border-blue-100 px-3 py-2 bg-blue-100 no-underline text-blue-500 cursor-not-allowed mx-2"
					v-if="isPageActive(page.name)"
				>{{ page.name }}</span>
				<a
					class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2"
					href="#"
					v-else
					@click.prevent="onClickPage(page.name)"
					role="button"
				>{{ page.name }}</a>
				<!-- <button
					type="button"
					@click="onClickPage(page.name)"
					:disabled="page.isDisabled"
					:class="{ active: isPageActive(page.name) }" 
				>{{ page.name }}</button> -->
			</li>

			<li class=" inline-block">
				<button
					type="button"
					@click="onClickNextPage"
					:disabled="isInLastPage"
					aria-label="Go to next page"
					class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
					:class="{'cursor-not-allowed': isInLastPage}"
				>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-3">
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>

				</button>
			</li>

			<li class=" inline-block">
				<!-- <button
					type="button"
					@click="onClickLastPage"
					:disabled="isInLastPage"
					aria-label="Go to last page"
				>Last</button> -->
				<a
					class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline"
					href="#"
					@click.prevent="onClickLastPage"
					rel="next"
					role="button"
					v-if="hasMorePages"
				>Last</a>
				<span
					class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline cursor-not-allowed"
					v-else
				>Last</span>
			</li>
		</ul>
	</div>
</template>
<script>
import { mbmpStore } from '../../stores/mbmp_store';
export default{
	setup(){
        const store = mbmpStore()
        return{
            store
        }
    },
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },

        totalPages: {
            type: Number,
            required: true
        },

        total: {
            type: Number,
            required: true
        },

        perPage: {
            type: Number,
            required: true
        },

        currentPage: {
            type: Number,
            required: true
        },

        hasMorePages: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        startPage() {
            if (this.currentPage === 1) {
                return 1;
            }

            // if (this.currentPage === this.totalPages) {
            //     return this.totalPages - this.maxVisibleButtons + 1;
            // }

            return this.currentPage - 1;
        },
        endPage() {
            return Math.min(
                this.startPage + this.maxVisibleButtons - 1,
                this.totalPages
            );
        },
        pages() {
            const range = [];

            for (let i = this.startPage; i <= this.endPage; i += 1) {
                range.push({
                name: i,
                isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
		isLength(){
            return this.store.history.datas.content.length
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit("pagechanged", 1);
        },
        onClickPreviousPage() {
            this.$emit("pagechanged", this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit("pagechanged", page);
        },
        onClickNextPage() {
            this.$emit("pagechanged", this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit("pagechanged", this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage === page;
        }
    }
}
</script>