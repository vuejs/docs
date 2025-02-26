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
		appOption.appContentFullHeight = true;
		appOption.appContentClass = 'p-0';
		
		axios.get('/assets/data/layout/full-height-code-1.json').then((response) => {
			this.code1 = response.data;
		});
	},
	beforeUnmount() {
		appOption.appContentFullHeight = false;
		appOption.appContentClass = '';
	}
}
</script>
<template>
	<perfect-scrollbar class="app-content-inner-padding h-100">
		<ul class="breadcrumb">
			<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
			<li class="breadcrumb-item active">FULL HEIGHT</li>
		</ul>
	
		<h1 class="page-header">
			Full Height <small>page header description goes here...</small>
		</h1>
	
		<hr class="mb-4">
	
		<p>
			Add the following code within the <code>&lt;script&gt;</code> tag for full height page setting.
		</p>
	
		<card class="mb-3">
			<highlightjs :code="code1"></highlightjs>
		</card>
	
		<div>
			Content Area with scrollbar. Try to scroll down. <i class="bi bi-chevron-down text-theme"></i>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			You got the bottom
		</div>
	</perfect-scrollbar>
</template>