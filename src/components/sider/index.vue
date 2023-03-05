<template>
  <aside class="admin-layout__sider" :style="style">
    <div
			v-if="isMobile"
      class="admin-layout__sider-mask"
      :style="maskStyle"
      @click.stop="toggleOverlay(false)"
    ></div>
    <slot></slot>
  </aside>
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
  /** fixed布局的层级 */
  zIndex?: number;
  /** 宽度 */
  width?: number;
  /** 顶部内边距 */
  paddingTop?: number;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡曲线 */
  transitionTimingFunction?: string;
}

const props = withDefaults(defineProps<Props>(), {
  overlay: false,
  overlayColor: "rgba(0, 0, 0, 0.3)",
  lockScroll: true,
  zIndex: 1000,
  width: 200,
  paddingTop: 0,
  transitionDuration: 300,
  transitionTimingFunction: "ease-in-out",
});

const style = computed(() => {
  return styleValue({
    width: props.width,
    paddingTop: props.paddingTop,
    transitionDuration: `${props.transitionDuration}ms`,
    transitionTimingFunction: props.transitionTimingFunction,
    zIndex: `${props.zIndex}`,
  });
});

const maskStyle = computed(() => {
  return styleValue({
		display: props.overlay ? "block" : "none",
    backgroundColor: props.overlay ? props.overlayColor : "transparent",
    transitionDuration: `${props.transitionDuration}ms`,
    transitionTimingFunction: props.transitionTimingFunction,
  });
});

interface Emits {
  (event: "update:overlay", collapse: boolean): void;
}

const emit = defineEmits<Emits>();

function toggleOverlay(overlay: boolean) {
  emit("update:overlay", overlay);
}
</script>

<style lang="css">
.admin-layout__sider {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  transition-property: all;
  overflow: hidden;
}

.admin-layout__sider-mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	transition-property: background-color;
	z-index: -1;
}
</style>
