<template>
  <div class="admin-layout" :style="style">
    <layout-header
      v-if="visible.header"
      v-bind="headerProps"
    >
      <slot name="header"></slot>
    </layout-header>
    <layout-tabs
      v-if="visible.tabs"
      v-bind="tabsProps"
    >
      <slot name="tabs"></slot>
    </layout-tabs>
    <layout-sider
      v-if="visible.sider"
      v-bind="siderProps"
      :padding-top="paddingProps.siderTop"
			@update:overlay="toggleCollapse"
    >
      <slot name="sider"></slot>
    </layout-sider>
    <layout-content
      v-bind="contentProps"
      :padding-top="paddingProps.headerTop"
      :padding-left="paddingProps.siderLeft"
      :padding-bottom="paddingProps.footerBottom"
    >
      <slot v-if="!visible.content"></slot>
      <slot v-if="!visible.default" name="content"></slot>
    </layout-content>
    <layout-footer
      v-if="visible.footer"
      v-bind="footerProps"
      :padding-left="paddingProps.siderLeft"
    >
      <slot name="footer"></slot>
    </layout-footer>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, computed } from "vue-demi";
import {
  LayoutHeader,
  LayoutFooter,
  LayoutContent,
  LayoutSider,
	LayoutTabs
} from "@/components/index";
import { styleValue } from "@/utils/styles";

defineOptions({ name: "AdminLayout" });

interface Props {
  /** 布局模式 */
  mode?: "vertical" | "horizontal";
  /** 是否是移动端 */
  isMobile?: boolean;
  /** 移动端时遮罩背景颜色 */
  maskColor?: string;
  /** 最小宽度 */
  minWidth?: number;
	/** 标签可见 */
	useTabs?: boolean;
  /** 标签高度 */
  tabsHeight?: number;
	/** 头部可见 */
	useHeader?: boolean;
  /** 头部高度 */
  headerHeight?: number;
  /** 固定头部 */
  fixedHeader?: boolean;
  /** 主体内容是否溢出 */
  overflowHidden?: boolean;
	/** 底部可见 */
	useFooter?: boolean;
  /** 底部高度 */
  footerHeight?: number;
  /** 固定底部 */
  fixedFooter?: boolean;
	/** 侧边可见 */
	useSider?: boolean;
  /** 侧边栏高度 */
  siderWidth?: number;
  /** 侧边栏折叠宽度 */
  siderCollapsedWidth?: number;
  /** 侧边栏折叠状态 */
  siderCollapse?: boolean;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡曲线 */
  transitionTimingFunction?: string;
}

interface Emits {
  (event: "update:sider-collapse", collapse: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "horizontal",
  isMobile: false,
  maskColor: "rgba(0, 0, 0, 0.3)",
	minWidth: undefined,
	useTabs: true,
	tabsHeight: 44,
	useHeader: true,
  headerHeight: 56,
  fixedHeader: true,
  overflowHidden: false,
	useFooter: true,
  footerHeight: 48,
  fixedFooter: false,
	useSider: true,
  siderWidth: 200,
  siderCollapsedWidth: 64,
  siderCollapse: false,
  transitionDuration: 300,
  transitionTimingFunction: "ease-in-out",
});

/** 获取当前实例判断插槽状态 */
const visible = computed(() => {
  const instance = getCurrentInstance();
  return {
    default: !!instance?.slots.default,
    content: !!instance?.slots.content,
    header: props.useHeader && !!instance?.slots.header,
    tabs: props.useTabs && !!instance?.slots.tabs,
    sider: props.useSider && !!instance?.slots.sider,
    footer: props.useFooter && !!instance?.slots.footer,
  };
});

const style = computed(() => {
  return styleValue({
    minWidth: props.minWidth,
  });
});

const isVertical = computed(() => props.mode === "vertical");

const siderProps = computed(() => {
	const foldWidth = props.isMobile ? 0 : props.siderCollapsedWidth;
  const normalWidth = props.isMobile ? props.siderWidth : props.siderWidth;
  return {
    isMobile: props.isMobile,
    overlay: !props.siderCollapse,
    overlayColor: props.maskColor,
    lockScroll: true,
    zIndex: props.isMobile || isVertical.value ? 999 : 100,
    width: props.siderCollapse ? foldWidth : normalWidth,
    transitionDuration: props.transitionDuration,
    transitionTimingFunction: props.transitionTimingFunction,
  };
});

const headerProps = computed(() => {
  return {
    fixed: props.fixedHeader,
    zIndex: isVertical.value && !props.isMobile ? 1000 : 100,
    height: props.headerHeight,
		paddingLeft: !visible.value.sider || props.isMobile || isVertical.value ? 0 : siderProps.value.width,
    transitionDuration: props.transitionDuration,
    transitionTimingFunction: props.transitionTimingFunction,
  };
});

const tabsProps = computed(() => {
  return {
    fixed: props.fixedHeader,
		top: visible.value.header ? headerProps.value.height : 0,
    zIndex: isVertical.value && !props.isMobile ? 1000 : 100,
    height: props.tabsHeight,
		paddingLeft: !visible.value.sider || props.isMobile || isVertical.value ? 0 : siderProps.value.width,
    transitionDuration: props.transitionDuration,
    transitionTimingFunction: props.transitionTimingFunction,
  };
});

const footerProps = computed(() => {
  return {
    fixed: props.fixedFooter,
    zIndex: 99,
    height: props.footerHeight,
    transitionDuration: props.transitionDuration,
    transitionTimingFunction: props.transitionTimingFunction,
  };
});

const contentProps = computed(() => {
  return {
    overflowHidden: props.overflowHidden,
    transitionDuration: props.transitionDuration,
    transitionTimingFunction: props.transitionTimingFunction,
  };
});

const paddingProps = computed(() => {
	const tabsHeight = visible.value.tabs ? tabsProps.value.height : 0;
	const headerHeight = visible.value.header ? headerProps.value.height : 0;
  return {
    headerTop: props.fixedHeader ? tabsHeight + headerHeight : 0,
    siderTop: props.isMobile || !isVertical.value ? 0 : tabsHeight + headerHeight,
    siderLeft: !visible.value.sider || props.isMobile ? 0 : siderProps.value.width,
    footerBottom: footerProps.value.fixed ? footerProps.value.height : 0,
  };
});

const emit = defineEmits<Emits>();

function toggleCollapse(collapse: boolean) {
  emit("update:sider-collapse", !collapse);
}
</script>

<style lang="css">
.admin-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
