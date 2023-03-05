import type { App } from "vue-demi";
import MoneAdminLayout from "@/index.vue";

function install(app: App) {
	app.component('MoneAdminLayout', MoneAdminLayout);
}

MoneAdminLayout.install = install;

export default MoneAdminLayout;
