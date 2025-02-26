<script>
import highlightjs from '@/components/plugins/Highlightjs.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import datepicker from '@/components/plugins/Datepicker.vue';
import typeahead from '@/components/plugins/Typeahead.vue';
import tagsInput from '@/components/plugins/TagsInput.vue';
import quillEditor from '@/components/plugins/QuillEditor.vue';
import vueSelect from '@/components/plugins/VueSelect.vue';
import colorPicker from '@caohenghu/vue-colorpicker';
import { useAppVariableStore } from '@/stores/app-variable';
import { vMaska } from 'maska/vue';
import { ScrollSpy, Dropdown } from 'bootstrap';
import axios from 'axios';

const appVariable = useAppVariableStore();

export default {
	data () {
		return {
			code1: '',
			code2: '',
			code3: '',
			code4: '',
			code5: '',
			code6: '',
			code7: '',
			code8: '',
			code9: '',
			color: 'rgba(0, 122, 255, 1)',
      tag: '',
      tags: [],
      tagsAutocomplete: [{ text: 'javascript'}, { text: 'css'}, { text: 'html'}]
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto,
		datepicker: datepicker,
		typeahead: typeahead,
		tagsInput: tagsInput,
		quillEditor: quillEditor,
		colorPicker: colorPicker,
		vueSelect: vueSelect
	},
	directives: { maska: vMaska },
	methods: {
		changeColor(color) {
			const { r, g, b, a } = color.rgba
			this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
		}
	},
	mounted() {
		axios.get('/assets/data/form/plugin-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		axios.get('/assets/data/form/plugin-code-2.json').then((response) => {
			this.code2 = response.data;
		});
		axios.get('/assets/data/form/plugin-code-3.json').then((response) => {
			this.code3 = response.data;
		});
		axios.get('/assets/data/form/plugin-code-4.json').then((response) => {
			this.code4 = response.data;
		});
		axios.get('/assets/data/form/plugin-code-5.json').then((response) => {
			this.code5 = response.data;
		});
		axios.get('/assets/data/form/plugin-code-6.json').then((response) => {
			this.code6 = response.data;
		});
		axios.get('/assets/data/form/plugin-code-7.json').then((response) => {
			this.code7 = response.data;
		});
		axios.get('/assets/data/form/plugin-code-8.json').then((response) => {
			this.code8 = response.data;
		});
		axios.get('/assets/data/form/plugin-code-9.json').then((response) => {
			this.code9 = response.data;
		});
		
		new ScrollSpy(document.body, {
			target: '#sidebar-bootstrap',
			offset: 200
		})
	}
}
</script>
<template>
	<!-- BEGIN container -->
	<div class="container">
		<!-- BEGIN row -->
		<div class="row justify-content-center">
			<!-- BEGIN col-10 -->
			<div class="col-xl-10">
				<!-- BEGIN row -->
				<div class="row">
					<!-- BEGIN col-9 -->
					<div class="col-xl-9">
						<ul class="breadcrumb">
							<li class="breadcrumb-item"><a href="#">FORMS</a></li>
							<li class="breadcrumb-item active">FORM PLUGINS</li>
						</ul>
						
						<h1 class="page-header">
							Form Plugins <small>page header description goes here...</small>
						</h1>
						
						<hr class="mb-4">
						
						<!-- BEGIN #datepicker -->
						<div id="datepicker" class="mb-5">
							<h4>Datepicker</h4>
							<p>Vue 3 date time picker is a lightweight yet powerful and reusable datepicker component. It aims to provide a high level of customization to fit within any project. Please read the <a href="https://vue3datepicker.com/" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body class="pb-2">
									<form>
										<div class="row">
											<div class="col-xl-6">
												<div class="mb-3">
													<label class="form-label">Default <span class="text-danger">*</span></label>
													<datepicker></datepicker>
												</div>
											</div>
										</div>
									</form>
								</card-body>
								<highlightjs :code="code1"></highlightjs>
							</card>
						</div>
						<!-- END #vue3Datepicker -->
						
						<!-- BEGIN #daterangepicker -->
						<div id="daterangepicker" class="mb-5">
							<h4>Daterangepicker</h4>
							<p>Vue 3 date time picker is a lightweight yet powerful and reusable datepicker component. It aims to provide a high level of customization to fit within any project. Please read the <a href="https://vue3datepicker.com/" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body class="pb-2">
									<form>
										<div class="row">
											<div class="col-xl-6">
												<div class="mb-3">
													<label class="form-label">Default Date Range</label>
													<datepicker range></datepicker>
												</div>
											</div>
											<div class="col-xl-6">
												<div class="mb-3">
													<label class="form-label">Predefined Range</label>
													<datepicker range auto-range="5"></datepicker>
												</div>
											</div>
											<div class="col-xl-6">
												<div class="mb-3">
													<label class="form-label">Multi Calendars</label>
													<datepicker range multiCalendars></datepicker>
												</div>
											</div>
										</div>
									</form>
								</card-body>
								<highlightjs :code="code2"></highlightjs>
							</card>
						</div>
						<!-- END #daterangepicker -->
						
						<!-- BEGIN #timepicker -->
						<div id="timepicker" class="mb-5">
							<h4>Timepicker</h4>
							<p>Vue 3 date time picker is a lightweight yet powerful and reusable datepicker component. It aims to provide a high level of customization to fit within any project. Please read the <a href="https://vue3datepicker.com/" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body class="pb-2">
									<form>
										<div class="row">
											<div class="col-xl-6">
												<div class="mb-3">
													<label class="form-label">Default <span class="text-danger">*</span></label>
													<datepicker timePicker></datepicker>
												</div>
											</div>
										</div>
									</form>
								</card-body>
								<highlightjs :code="code3"></highlightjs>
							</card>
						</div>
						<!-- END #bootstrapTimepicker -->
						
						<!-- BEGIN #typeahead -->
						<div id="typeahead" class="mb-5">
							<h4>Typeahead</h4>
							<p>A Vue3 component for a simple typeahead component. It will show a list of suggested items based on the user input. Please read the <a href="https://github.com/frikinside/vue3-simple-typeahead" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body class="pb-2">
									<form>
										<div class="row">
											<div class="col-md-6">
												<div class="mb-3">
													<label class="form-label">Default <span class="text-danger">*</span></label>
													<typeahead :items="['One','Two','Three']" :minInputLength="1"></typeahead>
													<div class="small pt-1 text-white text-opacity-35">Enter 'one', 'two' or 'three' for typeahead preview</div>
												</div>
											</div>
										</div>
									</form>
								</card-body>
								<highlightjs :code="code4"></highlightjs>
							</card>
						</div>
						<!-- END #typeahead -->
						
						<!-- BEGIN #tagsInput -->
						<div id="tagsInput" class="mb-5">
							<h4>Tags Input</h4>
							<p>A tags input component for VueJS with autocompletion, custom validation, templating and much more. Please read the <a href="https://github.com/JohMun/vue-tags-input" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body>
									<form>
										<div class="row">
											<div class="col-xl-8">
												<div class="mb-0">
													<label class="form-label">Default <span class="text-danger">*</span></label>
													<div>
														<tags-input v-model="tag" :tags="tags" :autocomplete-items="tagsAutocomplete"></tags-input>
													</div>
													<div class="small pt-1 text-white text-opacity-35">Enter 'javascript', 'css' for autocomplete preview</div>
												</div>
											</div>
										</div>
									</form>
								</card-body>
								<highlightjs :code="code5"></highlightjs>
							</card>
						</div>
						<!-- END #tagsInput -->
						
						<!-- BEGIN #maskedInput -->
						<div id="maskedInput" class="mb-5">
							<h4>Masked Input</h4>
							<p>Simple zero-dependency input mask for Vue.js and vanilla JS. Please read the <a href="https://github.com/beholdr/maska" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body class="pb-2">
									<form>
										<div class="row">
											<div class="col-xl-6">
												<div class="mb-3">
													<label class="form-label">Default <span class="text-danger">*</span></label>
													<input class="form-control" v-maska="'(###) ###-####'" placeholder="(999) 999-9999">
												</div>
											</div>
										</div>
									</form>
								</card-body>
								<highlightjs :code="code6"></highlightjs>
							</card>
						</div>
						<!-- END #maskedInput -->
						
						<!-- BEGIN #quillEditor -->
						<div id="quillEditor" class="mb-5">
							<h4>Quill Editor</h4>
							<p>VueQuill is a Vue Component for building rich text editors, this package is a thin wrapper around Quill, to make it easier to use in a Vue 3 application. Please read the <a href="https://github.com/vueup/vue-quill" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body>
									<form>
										<quill-editor theme="snow"></quill-editor>
									</form>
								</card-body>
								<highlightjs :code="code7"></highlightjs>
							</card>
						</div>
						<!-- END #quillEditor -->
						
						<!-- BEGIN #vueSelect -->
						<div id="vueSelect" class="mb-5">
							<h4>Vue Select</h4>
							<p>Vue Select is a feature rich select/dropdown/typeahead component. It provides a default template that fits most use cases for a filterable select dropdown. Please read the <a href="https://vue-select.org/" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body class="pb-2">
									<form>
										<div class="row">
											<div class="col-xl-6">
												<div class="mb-3">
													<label class="form-label">Default <span class="text-danger">*</span></label>
													<vue-select :options="['Mustard', 'Ketchup', 'Relish']" placeholder="-- Select Option --"></vue-select>
												</div>
											</div>
											<div class="col-xl-6">
												<div class="mb-3">
													<label class="form-label">Multiple SelectBox <span class="text-danger">*</span></label>
													<vue-select :options="['Mustard', 'Ketchup', 'Relish']" placeholder="-- Select Multiple Options --" multiple></vue-select>
												</div>
											</div>
										</div>
									</form>
								</card-body>
								<highlightjs :code="code8"></highlightjs>
							</card>
						</div>
						<!-- END #vueSelect -->
						
						<!-- BEGIN #vueColorpicker -->
						<div id="vueColorpicker" class="mb-5">
							<h4>Vue Colorpicker</h4>
							<p>Vue Colorpicker is a colorpicker of Vue Components. Please read the <a href="https://github.com/caohenghu/vue-colorpicker" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body class="pb-2">
									<form>
										<div class="row">
											<div class="col-xl-6">
												<div class="mb-3">
													<label class="form-label">Default <span class="text-danger">*</span></label>
													<div class="input-group position-relative">
														<span class="input-group-text p-1">
															<span class="h-20px w-20px rounded d-block mx-3px" v-bind:style="{ backgroundColor: color }"></span>
														</span>
														<a href="#" class="stretched-link" data-bs-toggle="dropdown" data-bs-auto-close="outside"></a>
														<div class="dropdown-menu p-2">
															<color-picker :color="color" @changeColor="changeColor"></color-picker>
														</div>
														<input type="text" v-model="color" class="form-control">
													</div>
												</div>
											</div>
										</div>
									</form>
								</card-body>
								<highlightjs :code="code9"></highlightjs>
							</card>
						</div>
						<!-- END #vueColorpicker -->
					</div>
					<!-- END col-9-->
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebar-bootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav text-nowrap">
								<nav-scroll-to class="nav-link" target="#datepicker" data-toggle="scroll-to">Datepicker</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#daterangepicker" data-toggle="scroll-to">Daterangepicker</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#timepicker" data-toggle="scroll-to">Timepicker</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#typeahead" data-toggle="scroll-to">Typeahead</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#tagsInput" data-toggle="scroll-to">Tags Input</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#maskedInput" data-toggle="scroll-to">Masked Input</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#quillEditor" data-toggle="scroll-to">Quill Editor</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#vueSelect" data-toggle="scroll-to">Vue Select</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#vueColorpicker" data-toggle="scroll-to">Vue Colorpicker</nav-scroll-to>
							</nav>
						</nav>
						<!-- END #sidebar-bootstrap -->
					</div>
					<!-- END col-3 -->
				</div>
				<!-- END row -->
			</div>
			<!-- END col-10 -->
		</div>
		<!-- END row -->
	</div>
	<!-- END container -->
</template>