<template>
	<footer class="admin-layout__footer" :style="style">
		<slot></slot>
	</footer>
</template>

<script setup lang="ts">
import { computed } from "vue-demi";
import { styleValue } from "@/utils/styles";

defineOptions({ name: "LayoutFooter" });

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
	zIndex: 99,
	height: 48,
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
.admin-layout__footer {
	box-sizing: border-box;
	left: 0;
	bottom: 0;
	width: 100%;
	flex-shrink: 0;
	transition-property: padding-left;
}
</style>
