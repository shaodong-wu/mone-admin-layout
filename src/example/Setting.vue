<template>
	<div class="layout-setting" :class="collapse ? 'collapse' : 'expand'">
		<div class="layout-setting__mask" @click.stop="toggleSettingCollapse"></div>
		<div class="layout-setting__body">
			<div class="handle" @click.stop="toggleSettingCollapse">
				<span class="anticon anticon-setting" v-show="collapse">
					<svg
						viewBox="64 64 896 896"
						focusable="false"
						data-icon="setting"
						width="1em"
						height="1em"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"
						></path>
					</svg>
				</span>
				<span class="anticon anticon-cancel" v-show="!collapse">
					<svg
						viewBox="64 64 896 896"
						focusable="false"
						data-icon="close"
						width="1em"
						height="1em"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
						></path>
					</svg>
				</span>
			</div>
			<div class="content p-5">
				<div class="font-sans pb-4">
					<div class="text-4 color-#000000d9 mb-3">导航模式</div>
					<label class="flex-between text-3.4 color-#000000d9 mb-3"
						>折叠 Sider<input
							type="checkbox"
							name="siderCollapse"
							v-model="props.modelValue.siderCollapse"
					/></label>
					<label class="flex-between text-3.4 color-#000000d9 mb-3"
						>是否 Mobile<input
							type="checkbox"
							name="isMobile"
							v-model="props.modelValue.isMobile"
					/></label>
					<label class="flex-between text-3.4 color-#000000d9 mb-3"
						>是否 Vertical<input
							type="checkbox"
							name="isVertical"
							v-model="props.modelValue.isVertical"
					/></label>
					<label class="flex-between text-3.4 color-#000000d9 mb-3"
						>固定 Header<input
							type="checkbox"
							name="fixedHeader"
							v-model="props.modelValue.fixedHeader"
					/></label>
					<label class="flex-between text-3.4 color-#000000d9 mb-3"
						>固定 Footer<input
							type="checkbox"
							name="fixedFooter"
							v-model="props.modelValue.fixedFooter"
					/></label>
				</div>
				<div class="font-sans border-t-1 pt-4">
					<div class="text-4 color-#000000d9 mb-3">内容区域</div>
					<label class="flex-between text-3.4 color-#000000d9 mb-3"
						>顶栏<input
							type="checkbox"
							name="fixedFooter"
							v-model="props.modelValue.useHeader"
					/></label>
					<label class="flex-between text-3.4 color-#000000d9 mb-3"
						>标签<input
							type="checkbox"
							name="fixedFooter"
							v-model="props.modelValue.useTabs"
					/></label>
					<label class="flex-between text-3.4 color-#000000d9 mb-3"
						>页脚<input
							type="checkbox"
							name="fixedFooter"
							v-model="props.modelValue.useFooter"
					/></label>
					<label class="flex-between text-3.4 color-#000000d9 mb-3"
						>菜单<input
							type="checkbox"
							name="fixedFooter"
							v-model="props.modelValue.useSider"
					/></label>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";

defineOptions({ name: "LayoutSetting" });

interface Setting {
	isVertical: boolean;
	isMobile: boolean;
	fixedHeader: boolean;
	fixedFooter: boolean;
	siderCollapse: boolean;
	useHeader: boolean;
	useTabs: boolean;
	useFooter: boolean;
	useSider: boolean;
}

interface Props {
	modelValue: Setting;
}
const props = defineProps<Props>();

const collapse = ref(true);
function toggleSettingCollapse() {
	collapse.value = !unref(collapse);
}
</script>

<style lang="less" scoped>
.layout-setting {
	position: fixed;
	top: 0;
	right: 0;
	width: 0;
	height: 100%;
	overflow: hidden;
	z-index: 1000;

	&.expand {
		width: 100%;
	}

	&.collapse {
		width: 0;
	}

	&__mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.45);
		transition: opacity 0.3s linear;
		pointer-events: none;
		opacity: 0;
	}

	&.expand &__mask {
		opacity: 1;
		pointer-events: auto;
	}

	&.collapse &__mask {
		opacity: 0;
		pointer-events: none;
	}

	&__body {
		position: fixed;
		top: 0;
		right: 0;
		width: 300px;
		height: 100%;
		transition-duration: 300ms;
		transition-property: transform;
		z-index: 999;

		.handle {
			position: absolute;
			top: 240px;
			right: 300px;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 48px;
			height: 48px;
			font-size: 16px;
			text-align: center;
			background-color: rgb(24, 144, 255);
			border-radius: 4px 0 0 4px;
			cursor: pointer;

			.anticon {
				display: inline-block;
				color: rgb(255, 255, 255);
				font-size: 20px;
				font-style: normal;
				line-height: 0;
				text-align: center;
				text-transform: none;
				vertical-align: -0.125em;
				text-rendering: optimizelegibility;
			}
		}

		.content {
			height: 100%;
			background: #fff;
		}
	}

	&.expand &__body {
		transform: translateX(0%);
		box-shadow: -6px 0 16px -8px rgb(0 0 0 / 8%), -9px 0 28px 0 rgb(0 0 0 / 5%),
			-12px 0 48px 16px rgb(0 0 0 / 3%);
	}

	&.collapse &__body {
		transform: translateX(100%);
		box-shadow: none;
	}
}
</style>
