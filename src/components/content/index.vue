<template>
	<main class="admin-layout__content" :style="style">
		<slot></slot>
	</main>
</template>

<script setup lang="ts">
import { computed } from "vue-demi";
import { styleValue } from "@/utils/styles";

defineOptions({ name: "LayoutContent" });

interface Props {
	/** 顶部内边距 */
	paddingTop?: number,
	/** 侧边内边距 */
	paddingLeft?: number,
	/** 底部内边距 */
	paddingBottom?: number,
	/** 是否溢出隐藏 */
	overflowHidden?: boolean,
	/** 动画过渡时间 */
	transitionDuration?: number,
	/** 动画过渡曲线 */
	transitionTimingFunction?: string,
}

const props = withDefaults(defineProps<Props>(), {
	paddingTop: 56,
	paddingLeft: 200,
	paddingBottom: 56,
	overflowHidden: true,
	transitionDuration: 300,
	transitionTimingFunction: "ease-in-out",
});

const style = computed(() => {
	return styleValue({
		paddingTop: props.paddingTop,
		paddingLeft: props.paddingLeft,
		paddingBottom: props.paddingBottom,
		overflow: props.overflowHidden ? "hidden" : "visible",
		transitionDuration: `${props.transitionDuration}ms`,
		transitionTimingFunction: "ease-in-out",
	});
});
</script>

<style lang="css">
.admin-layout__content {
	box-sizing: border-box;
	width: 100%;
	flex-grow: 1;
	transition-property: padding-left;
}
</style>
