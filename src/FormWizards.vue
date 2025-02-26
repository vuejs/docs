<script>
import highlightjs from '@/components/plugins/Highlightjs.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import { useAppVariableStore } from '@/stores/app-variable';
import { ScrollSpy } from 'bootstrap';

const appVariable = useAppVariableStore();

export default {
	data () {
		return {
			code1: '',
			code2: '',
			code3: ''
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto
	},
	mounted() {
		axios.get('/assets/data/form/wizard-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		axios.get('/assets/data/form/wizard-code-2.json').then((response) => {
			this.code2 = response.data;
		});
		axios.get('/assets/data/form/wizard-code-3.json').then((response) => {
			this.code3 = response.data;
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
							<li class="breadcrumb-item active">FORM WIZARDS</li>
						</ul>
					
						<h1 class="page-header">
							Form Wizards <small>page header description goes here...</small>
						</h1>
					
						<hr class="mb-4" />
					
						<!-- BEGIN #wizardLayout1 -->
						<div id="wizardLayout1" class="mb-5">
							<h4>Wizard layout 1</h4>
							<p>Wizard layout include the number of step and text. Please do note that all the wizard is for uxui ONLY but do not include any javascript or backend logic.</p>
							<card>
								<card-body>
									<div class="nav-wizards-container">
										<nav class="nav nav-wizards-1 mb-2">
											<div class="nav-item col">
												<a class="nav-link completed" href="#">
													<div class="nav-no">1</div>
													<div class="nav-text">Completed step</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link completed" href="#">
													<div class="nav-no">2</div>
													<div class="nav-text">Second step</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link active" href="#">
													<div class="nav-no">3</div>
													<div class="nav-text">Active step</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link disabled" href="#">
													<div class="nav-no">4</div>
													<div class="nav-text">Disabled step</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link disabled" href="#">
													<div class="nav-no">5</div>
													<div class="nav-text">Last step</div>
												</a>
											</div>
										</nav>
									</div>
									<card>
										<card-body>
											wizard content here
										</card-body>
									</card>
								</card-body>
								<highlightjs :code="code1" />
							</card>
						</div>
						<!-- END #wizardLayout1 -->
					
						<!-- BEGIN #wizardLayout2 -->
						<div id="wizardLayout2" class="mb-5">
							<h4>Wizard layout 2</h4>
							<p>Wizard layout include the number of step and text. Please do note that all the wizard is for uxui ONLY but do not include any javascript or backend logic.</p>
							<card>
								<card-body>
									<div class="nav-wizards-container">
										<nav class="nav nav-wizards-2 mb-3">
											<div class="nav-item col">
												<a class="nav-link completed" href="#">
													<div class="nav-text">1. Completed step</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link active" href="#">
													<div class="nav-text">2. Active step text</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link disabled" href="#">
													<div class="nav-text">3. Disabled step text</div>
												</a>
											</div>
										</nav>
									</div>
									<card>
										<card-body>
											wizard content here
										</card-body>
									</card>
								</card-body>
								<highlightjs :code="code2" />
							</card>
						</div>
						<!-- END #wizardLayout2 -->
					
						<!-- BEGIN #wizardLayout3 -->
						<div id="wizardLayout3" class="mb-5">
							<h4>Wizard layout 3</h4>
							<p>Wizard layout include the number of step and text. Please do note that all the wizard is for uxui ONLY but do not include any javascript or backend logic.</p>
							<card>
								<card-body>
									<div class="nav-wizards-container">
										<nav class="nav nav-wizards-3 mb-2">
											<div class="nav-item col">
												<a class="nav-link completed" href="#">
													<div class="nav-dot"></div>
													<div class="nav-title">Step 1</div>
													<div class="nav-text">Completed step</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link completed" href="#">
													<div class="nav-dot"></div>
													<div class="nav-title">Step 2</div>
													<div class="nav-text">Second step</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link active" href="#">
													<div class="nav-dot"></div>
													<div class="nav-title">Step 3</div>
													<div class="nav-text">Active step</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link disabled" href="#">
													<div class="nav-dot"></div>
													<div class="nav-title">Step 4</div>
													<div class="nav-text">Disabled step</div>
												</a>
											</div>
											<div class="nav-item col">
												<a class="nav-link disabled" href="#">
													<div class="nav-dot"></div>
													<div class="nav-title">Step 5</div>
													<div class="nav-text">Last step</div>
												</a>
											</div>
										</nav>
									</div>
									<card>
										<card-body>
											wizard content here
										</card-body>
									</card>
								</card-body>
								<highlightjs :code="code3" />
							</card>
						</div>
						<!-- END #wizardLayout3 -->
					</div>
					<!-- END col-9-->
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebar-bootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav">
								<nav-scroll-to target="#wizardLayout1" class="nav-link" data-toggle="scroll-to">Wizard layout 1</nav-scroll-to>
								<nav-scroll-to target="#wizardLayout2" class="nav-link" data-toggle="scroll-to">Wizard layout 2</nav-scroll-to>
								<nav-scroll-to target="#wizardLayout3" class="nav-link" data-toggle="scroll-to">Wizard layout 3</nav-scroll-to>
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
