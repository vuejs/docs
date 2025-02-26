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
		appOption.appSidebarHide = true;
		
		axios.get('/assets/data/layout/full-width-code-1.json').then((response) => {
			this.code1 = response.data;
		});
	},
	beforeUnmount() {
		appOption.appSidebarHide = false;
	}
}
</script>
<template>
	<ul class="breadcrumb">
		<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
		<li class="breadcrumb-item active">FULL WIDTH</li>
	</ul>

	<h1 class="page-header">
		Full Width <small>page header description goes here...</small>
	</h1>

	<hr class="mb-4">

	<p>
		Add the following code within the <code>&lt;script&gt;</code> tag for full with page setting.
	</p>

	<card class="mb-3">
		<highlightjs :code="code1"></highlightjs>
	</card>
	
	<p>
		<a href="javascript:history.back(-1);" class="btn btn-outline-theme"><i class="bi bi-chevron-left fa-fw ms-n1"></i> Back to previous Page</a>
	</p>
</template>