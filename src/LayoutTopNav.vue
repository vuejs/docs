<script>
import { useAppOptionStore } from '@/stores/app-option';
import highlightjs from '@/components/plugins/Highlightjs.vue';
import axios from 'axios';

const appOption = useAppOptionStore();

export default {
	data() {
		return {
			code1: ''
		}
	},
	components: {
		highlightjs: highlightjs
	},
	mounted() {
		appOption.appTopNav = true;
		appOption.appSidebarHide = true;
		
		axios.get('/assets/data/layout/top-nav-code-1.json').then((response) => {
			this.code1 = response.data;
		});
	},
	beforeUnmount() {
		appOption.appTopNav = false;
		appOption.appSidebarHide = false;
	}
}
</script>
<template>
	<ul class="breadcrumb">
		<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
		<li class="breadcrumb-item active">TOP NAV</li>
	</ul>
	
	<h1 class="page-header">
		Top Nav <small>page header description goes here...</small>
	</h1>
	
	<hr class="mb-4">
	
	<p>
		Add the following code within the <code>&lt;script&gt;</code> tag for top nav page setting.
	</p>
	
	<card>
		<highlightjs :code="code1"></highlightjs>
	</card>
</template>