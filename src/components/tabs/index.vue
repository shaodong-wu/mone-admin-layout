<template>
	<nav class="admin-layout__tabs" :style="style">
		<slot></slot>
	</nav>
</template>

<script setup lang="ts">
import { computed } from "vue-demi";
import { styleValue } from "@/utils/styles";

defineOptions({ name: "LayoutTabs" });

interface Props {
	/** 开启fixed布局 */
	fixed?: boolean;
	/** fixed布局的top距离 */
	top?: number;
	/** fixed布局的层级 */
	zIndex?: number;
	/** 是否启用最小宽度的布局 */
	useMinWidthLayout?: boolean;
	/** 高度 */
	height?: number;
	/** 左侧内边距 */
	paddingLeft?: number;
	/** 动画过渡时间 */
	transitionDuration?: number;
	/** 动画过渡时间 */
	transitionTimingFunction?: string;
}

const props = withDefaults(defineProps<Props>(), {
	fixed: true,
	top: 56,
	zIndex: 100,
	height: 44,
	paddingLeft: 240,
	transitionDuration: 300,
	transitionTimingFunction: "ease-in-out",
});

const style = computed(() => {
	return styleValue({
		position: props.fixed ? "fixed" : "static",
		top: props.top,
		zIndex: `${props.zIndex}`,
		height: props.height,
		paddingLeft: props.paddingLeft,
		transitionDuration: `${props.transitionDuration}ms`,
		transitionTimingFunction: props.transitionTimingFunction,
	});
});
</script>

<style scoped lang="less">
.admin-layout__tabs {
	box-sizing: border-box;
	width: 100%;
	left: 0;
	flex-shrink: 0;
	transition-property: padding-left;
}
</style>
