<template>
	<admin-layout
		:mode="mode"
		:is-mobile="theme.isMobile"
		:use-sider="theme.useSider"
		:use-tabs="theme.useTabs"
		:use-header="theme.useHeader"
		:use-footer="theme.useFooter"
		:fixed-header="theme.fixedHeader"
		:fixed-footer="theme.fixedFooter"
		:sider-collapse="theme.siderCollapse"
		@update:sider-collapse="toggleCollapse"
	>
		<template #header>
			<div class="bg-#e5e7eb wh-full flex-center relative">
				<span
					class="absolute left-6 cursor-pointer"
					@click.stop="toggleCollapse(!theme.siderCollapse)"
				>
					<svg
						t="1677413552665"
						class="icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="2926"
						width="24"
						height="24"
					>
						<path
							d="M130.901333 529.493333l149.205334 130.517334a8.533333 8.533333 0 0 0 14.122666-6.4V392.533333a8.533333 8.533333 0 0 0-14.122666-6.4L130.901333 516.608a8.533333 8.533333 0 0 0 0 12.8z"
							fill="#595959"
							p-id="2927"
						></path>
						<path
							d="M128 213.333333m42.666667 0l682.666666 0q42.666667 0 42.666667 42.666667l0 0q0 42.666667-42.666667 42.666667l-682.666666 0q-42.666667 0-42.666667-42.666667l0 0q0-42.666667 42.666667-42.666667Z"
							fill="#595959"
							p-id="2928"
						></path>
						<path
							d="M128 725.333333m42.666667 0l682.666666 0q42.666667 0 42.666667 42.666667l0 0q0 42.666667-42.666667 42.666667l-682.666666 0q-42.666667 0-42.666667-42.666667l0 0q0-42.666667 42.666667-42.666667Z"
							fill="#595959"
							p-id="2929"
						></path>
						<path
							d="M384 469.333333m42.666667 0l426.666666 0q42.666667 0 42.666667 42.666667l0 0q0 42.666667-42.666667 42.666667l-426.666666 0q-42.666667 0-42.666667-42.666667l0 0q0-42.666667 42.666667-42.666667Z"
							fill="#595959"
							p-id="2930"
						></path>
					</svg>
				</span>
				<span>Header</span>
			</div>
		</template>
		<template #tabs>
			<div class="bg-#cbcccd wh-full flex-center">
				<span>tabs</span>
			</div>
		</template>
		<template #sider>
			<div class="bg-#d9d9d9 wh-full flex-x-center pt-4">Sider</div>
		</template>
		<template #footer>
			<div class="bg-#e5e7eb wh-full flex-center">
				<span>Copyright ©2023 Mone Admin</span>
			</div>
		</template>
		<div class="bg-#fff wh-full">
			<div v-for="i in 50" :key="i" class="text-center">{{ i }}</div>
		</div>
	</admin-layout>
	<layout-setting v-model="theme" />
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import AdminLayout from "@monejs/vue-admin-layout";
import LayoutSetting from "./Setting.vue";

const theme = reactive({
	isVertical: false,
	isMobile: false,
	fixedHeader: true,
	fixedFooter: false,
	siderCollapse: false,
	useHeader: true,
	useTabs: true,
	useFooter: true,
	useSider: true,
});

const mode = computed(() => {
	return theme.isVertical ? "vertical" : "horizontal";
});

function toggleCollapse(collapse: boolean) {
	theme.siderCollapse = collapse;
}
</script>

<style lang="less">
html,
body,
#app {
	width: 100%;
	min-height: 100%;
}
</style>
