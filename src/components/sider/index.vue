<template>
	<aside class="admin-layout__sider" :style="style">
		<slot></slot>
	</aside>
	<div
		v-if="isMobile"
		class="admin-layout__sider-mask"
		:style="maskStyle"
		@click.stop="toggleCollapsed(false)"
	></div>
</template>

<script setup lang="ts">
import { computed } from "vue-demi";
import { styleValue } from "@/utils/styles";

defineOptions({ name: "LayoutSider" });

interface Props {
	/** 是否是移动端 */
	isMobile?: boolean;
	/** 是否显示遮罩*/
	overlay?: boolean;
	/** 遮罩背景颜色 */
	overlayColor?: string;
	/** 是否锁定背景滚动 */
	lockScroll?: boolean;
	/** 是否折叠 */
	collapsed?: boolean;
	/** 宽度 */
	width?: number;
	/** 折叠宽度 */
	collapsedWidth?: number;
	/** 顶部内边距 */
	paddingTop?: number;
	/** 动画过渡时间 */
	transitionDuration?: number;
	/** 动画过渡曲线 */
	transitionTimingFunction?: string;
	/** fixed布局的层级 */
	zIndex?: number;
}

interface Emits {
	(event: "update:collapsed", collapse: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
	isMobile: false,
	overlay: true,
	overlayColor: "rgba(0, 0, 0, 0.3)",
	lockScroll: true,
	collapsed: false,
	width: 240,
	collapsedWidth: 64,
	paddingTop: 0,
	transitionDuration: 300,
	transitionTimingFunction: "ease-in-out",
	zIndex: 1000,
});

const deskStyle = computed(() => {
	return styleValue({
		width: props.collapsed ? props.collapsedWidth : props.width,
		paddingTop: props.paddingTop,
		transitionDuration: `${props.transitionDuration}ms`,
		transitionTimingFunction: props.transitionTimingFunction,
		zIndex: `${props.zIndex}`,
	});
});

const mobileStyle = computed(() => {
	const translateX = props.collapsed ? (props.width * -1) : 0;
	return styleValue({
		width: props.width,
		transform: `translateX(${translateX}px)`,
		paddingTop: props.paddingTop,
		transitionDuration: `${props.transitionDuration}ms`,
		transitionTimingFunction: props.transitionTimingFunction,
		zIndex: `${props.zIndex}`,
	});
});

const maskStyle = computed(() => {
	const visible = !props.collapsed && props.overlay && props.isMobile;
	return styleValue({
		display: visible ? "block" : "none",
		backgroundColor: visible ? props.overlayColor : "transparent",
		transitionDuration: `${props.transitionDuration}ms`,
		transitionTimingFunction: props.transitionTimingFunction,
		zIndex: `${props.zIndex - 1}`,
	});
});

const style = computed(() => {
	return props.isMobile ? mobileStyle.value : deskStyle.value;
});

const emit = defineEmits<Emits>();

function toggleCollapsed(collapsed: boolean) {
	emit("update:collapsed", collapsed);
}
</script>

<style lang="less">
.admin-layout__sider {
	box-sizing: border-box;
	position: fixed;
	left: 0;
	width: 100%;
	height: 100%;
	transition-property: all;
	overflow: hidden;

	&-mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		transition-property: background-color;
	}
}
</style>
