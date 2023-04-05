<template>
	<header class="admin-layout__header" :style="style">
		<slot></slot>
	</header>
</template>

<script setup lang="ts">
import { computed } from "vue-demi";
import { styleValue } from "@/utils/styles";

defineOptions({ name: "LayoutHeader" });

interface Props {
	/** 开启fixed布局 */
	fixed?: boolean;
	/** fixed布局的层级 */
	zIndex?: number;
	/** 高度 */
	height?: number;
	/** 左侧内边距 */
	paddingLeft?: number;
	/** 动画过渡时间 */
	transitionDuration?: number;
	/** 动画过渡曲线 */
	transitionTimingFunction?: string;
}

const props = withDefaults(defineProps<Props>(), {
	fixed: true,
	zIndex: 100,
	height: 56,
	paddingLeft: 240,
	transitionDuration: 300,
	transitionTimingFunction: "ease-in-out",
});

const style = computed(() => {
	return styleValue({
		position: props.fixed ? "fixed" : "static",
		height: props.height,
		paddingLeft: props.paddingLeft,
		transitionDuration: `${props.transitionDuration}ms`,
		transitionTimingFunction: props.transitionTimingFunction,
		zIndex: `${props.zIndex}`,
	});
});
</script>

<style lang="less">
.admin-layout__header {
	box-sizing: border-box;
	left: 0;
	top: 0;
	width: 100%;
	flex-shrink: 0;
	transition-property: padding-left;
}
</style>
