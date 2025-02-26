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
			code3: '',
			code4: '',
			code5: '',
			code6: '',
			code7: '',
			code8: '',
			code9: '',
			code10: '',
			code11: ''
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto
	},
	mounted() {
		axios.get('/assets/data/ui/buttons-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		axios.get('/assets/data/ui/buttons-code-2.json').then((response) => {
			this.code2 = response.data;
		});
		axios.get('/assets/data/ui/buttons-code-3.json').then((response) => {
			this.code3 = response.data;
		});
		axios.get('/assets/data/ui/buttons-code-4.json').then((response) => {
			this.code4 = response.data;
		});
		axios.get('/assets/data/ui/buttons-code-5.json').then((response) => {
			this.code5 = response.data;
		});
		axios.get('/assets/data/ui/buttons-code-6.json').then((response) => {
			this.code6 = response.data;
		});
		axios.get('/assets/data/ui/buttons-code-7.json').then((response) => {
			this.code7 = response.data;
		});
		axios.get('/assets/data/ui/buttons-code-8.json').then((response) => {
			this.code8 = response.data;
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
							<li class="breadcrumb-item"><a href="#">UI KITS</a></li>
							<li class="breadcrumb-item active">BUTTONS</li>
						</ul>
						
						<h1 class="page-header">
							Buttons <small>page header description goes here...</small>
						</h1>
						
						<hr class="mb-4">
						
						<!-- BEGIN #classes -->
						<div id="classes" class="mb-5">
							<h4>Classes</h4>
							<p>
								Bootstrap includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control.
								Please read the <a href="https://getbootstrap.com/docs/5.3/components/buttons/" target="_blank">official Bootstrap documentation</a> for the full list of options.
							</p>
							<card>
								<card-body>
									<button type="button" class="btn btn-theme">Theme</button>
									<hr>
									<button type="button" class="btn btn-default mb-1 me-1">Default</button>
									<button type="button" class="btn btn-secondary mb-1 me-1">Secondary</button>
									<button type="button" class="btn btn-light mb-1 me-1">Light</button>
									<button type="button" class="btn btn-dark mb-1 me-1">Dark</button>
									<button type="button" class="btn btn-info mb-1 me-1">Info</button>
									<button type="button" class="btn btn-primary mb-1 me-1">Primary</button>
									<button type="button" class="btn btn-purple mb-1 me-1">Purple</button>
									<button type="button" class="btn btn-indigo mb-1 me-1">Indigo</button>
									<button type="button" class="btn btn-link mb-1">Link</button>
									<span class="d-lg-inline d-none"><br></span>
									<button type="button" class="btn btn-danger mb-1 me-1">Danger</button>
									<button type="button" class="btn btn-pink mb-1 me-1">Pink</button>
									<button type="button" class="btn btn-warning mb-1 me-1">Warning</button>
									<button type="button" class="btn btn-yellow mb-1 me-1">Yellow</button>
									<button type="button" class="btn btn-lime mb-1 me-1">Lime</button>
									<button type="button" class="btn btn-green mb-1 me-1">Green</button>
									<button type="button" class="btn btn-success mb-1 me-1">Success</button>
								</card-body>
								<highlightjs :code="code1"></highlightjs>
							</card>
						</div>
						<!-- END #classes -->
						
						<!-- BEGIN #outlineButtons -->
						<div id="outlineButtons" class="mb-5">
							<h4>Outline buttons</h4>
							<p>
								In need of a button, but not the hefty background colors they bring? Replace the default modifier classes with the <code>.btn-outline-*</code> ones to remove all background images and colors on any button.
							</p>
							<card>
								<card-body>
									<button type="button" class="btn btn-outline-theme">Theme</button>
									<hr>
									<button type="button" class="btn btn-outline-default mb-1 me-1">Default</button>
									<button type="button" class="btn btn-outline-secondary mb-1 me-1">Secondary</button>
									<button type="button" class="btn btn-outline-light mb-1 me-1">Light</button>
									<button type="button" class="btn btn-outline-dark mb-1 me-1">Dark</button>
									<button type="button" class="btn btn-outline-info mb-1 me-1">Info</button>
									<button type="button" class="btn btn-outline-primary mb-1 me-1">Primary</button>
									<button type="button" class="btn btn-outline-purple mb-1 me-1">Purple</button>
									<button type="button" class="btn btn-outline-indigo mb-1 me-1">Indigo</button>
									<button type="button" class="btn btn-outline-link mb-1 me-1">Link</button>
									<br>
									<button type="button" class="btn btn-outline-danger mb-1 me-1">Danger</button>
									<button type="button" class="btn btn-outline-pink mb-1 me-1">Pink</button>
									<button type="button" class="btn btn-outline-warning mb-1 me-1">Warning</button>
									<button type="button" class="btn btn-outline-yellow mb-1 me-1">Yellow</button>
									<button type="button" class="btn btn-outline-lime mb-1 me-1">Lime</button>
									<button type="button" class="btn btn-outline-green mb-1 me-1">Green</button>
									<button type="button" class="btn btn-outline-success mb-1 me-1">Success</button>
								</card-body>
								<highlightjs :code="code2"></highlightjs>
							</card>
						</div>
						<!-- END #outlineButtons -->
						
						<!-- BEGIN #sizes -->
						<div id="sizes" class="mb-5">
							<h4>Sizes</h4>
							<p>
								Fancy larger or smaller buttons? Add <code>.btn-lg</code> or <code>.btn-sm</code> for additional sizes.
							</p>
							<card>
								<card-body class="pb-0">
									<div class="mb-4">
										<div class="mb-2 small text-inverse text-opacity-50">
											<b class="fw-bold">LARGE BUTTON</b>
										</div>
										<button type="button" class="btn btn-outline-theme btn-lg me-1">Large button</button>
										<button type="button" class="btn btn-outline-secondary btn-lg me-1">Large button</button>
									</div>
									<div class="mb-4">
										<div class="mb-2 small text-inverse text-opacity-50">
											<b class="fw-bold">SMALL BUTTON</b>
										</div>
										<button type="button" class="btn btn-outline-theme btn-sm me-1">Small button</button>
										<button type="button" class="btn btn-outline-secondary btn-sm me-1">Small button</button>
									</div>
								</card-body>
								<highlightjs :code="code3"></highlightjs>
							</card>
						</div>
						<!-- END #sizes -->
						
						<!-- BEGIN #states -->
						<div id="states" class="mb-5">
							<h4>States</h4>
							<p>
								Buttons will appear pressed when active or you can still force the same active appearance by adding <code>.active</code> class.
								Make buttons look inactive by adding the <code>disabled</code> boolean attribute to any <code>&lt;button&gt;</code> element.
							</p>
							<card>
								<card-body class="pb-0">
									<div class="mb-4">
										<div class="mb-2 small text-inverse text-opacity-50">
											<b class="fw-bold">ACTIVE STATE</b>
										</div>
										<a href="#" class="btn btn-outline-theme btn-lg active me-1">Primary link</a>
										<a href="#" class="btn btn-outline-secondary btn-lg active me-1">Link</a>
									</div>
									<div class="mb-4">
										<div class="mb-2 small text-inverse text-opacity-50">
											<b class="fw-bold">DISABLED STATE</b>
										</div>
										<button type="button" class="btn btn-lg btn-outline-theme me-1" disabled>Primary button</button>
										<button type="button" class="btn btn-outline-secondary btn-lg me-1" disabled>Button</button>
									</div>
								</card-body>
								<highlightjs :code="code4"></highlightjs>
							</card>
						</div>
						<!-- END #states -->
						
						<!-- BEGIN #buttonGroup -->
						<div id="buttonGroup" class="mb-5">
							<h4>Button group</h4>
							<p>
								Group a series of buttons together on a single line with the button group, and super-power them with JavaScript.
							</p>
							<card>
								<card-body>
									<div class="btn-group">
										<button type="button" class="btn btn-outline-secondary">Left</button>
										<button type="button" class="btn btn-outline-secondary">Middle</button>
										<button type="button" class="btn btn-outline-secondary">Right</button>
									</div>
								</card-body>
								<highlightjs :code="code5"></highlightjs>
							</card>
						</div>
						<!-- END #buttonGroup -->
						
						<!-- BEGIN #groupSize -->
						<div id="groupSize" class="mb-5">
							<h4>Group size</h4>
							<p>
								Instead of applying button sizing classes to every button in a group, just add <code>.btn-group-*</code> to each <code>.btn-group</code>, including each one when nesting multiple groups.
							</p>
							<card>
								<card-body>
									<div class="mb-3">
										<div class="btn-group btn-group-lg">
											<button type="button" class="btn btn-outline-secondary">Left</button>
											<button type="button" class="btn btn-outline-secondary">Middle</button>
											<button type="button" class="btn btn-outline-secondary">Right</button>
										</div>
									</div>
									<div class="mb-3">
										<div class="btn-group">
											<button type="button" class="btn btn-outline-secondary">Left</button>
											<button type="button" class="btn btn-outline-secondary">Middle</button>
											<button type="button" class="btn btn-outline-secondary">Right</button>
										</div>
									</div>
									<div class="mb-0">
										<div class="btn-group btn-group-sm">
											<button type="button" class="btn btn-outline-secondary">Left</button>
											<button type="button" class="btn btn-outline-secondary">Middle</button>
											<button type="button" class="btn btn-outline-secondary">Right</button>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code6"></highlightjs>
							</card>
						</div>
						<!-- END #groupSize -->
						
						<!-- BEGIN #verticalGroup -->
						<div id="verticalGroup" class="mb-5">
							<h4>Vertical Group</h4>
							<p>
								Make a set of buttons appear vertically stacked rather than horizontally. Split button dropdowns are not supported here.
							</p>
							<card>
								<card-body>
									<div class="btn-group-vertical">
										<button type="button" class="btn btn-outline-secondary">Button</button>
										<button type="button" class="btn btn-outline-secondary">Button</button>
										<button type="button" class="btn btn-outline-secondary">Button</button>
									</div>
								</card-body>
								<highlightjs :code="code7"></highlightjs>
							</card>
						</div>
						<!-- END #verticalGroup -->
						
						<!-- BEGIN #buttonToolbar -->
						<div id="buttonToolbar" class="mb-5">
							<h4>Button toolbar</h4>
							<p>
								Combine sets of button groups into button toolbars for more complex components. Use utility classes as needed to space out groups, buttons, and more.
							</p>
							<card>
								<card-body>
									<div class="btn-toolbar">
										<div class="btn-group me-2">
											<button type="button" class="btn btn-outline-secondary">1</button>
											<button type="button" class="btn btn-outline-secondary">2</button>
											<button type="button" class="btn btn-outline-secondary">3</button>
											<button type="button" class="btn btn-outline-secondary">4</button>
										</div>
										<div class="btn-group me-2">
											<button type="button" class="btn btn-outline-secondary">5</button>
											<button type="button" class="btn btn-outline-secondary">6</button>
											<button type="button" class="btn btn-outline-secondary">7</button>
										</div>
										<div class="btn-group">
											<button type="button" class="btn btn-outline-secondary">8</button>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code8"></highlightjs>
							</card>
						</div>
						<!-- END #buttonToolbar -->
					</div>
					<!-- END col-9-->
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebar-bootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav">
								<nav-scroll-to target="#classes" data-toggle="scroll-to">Classes</nav-scroll-to>
								<nav-scroll-to target="#outlineButtons" data-toggle="scroll-to">Outline buttons</nav-scroll-to>
								<nav-scroll-to target="#sizes" data-toggle="scroll-to">Sizes</nav-scroll-to>
								<nav-scroll-to target="#states" data-toggle="scroll-to">States</nav-scroll-to>
								<nav-scroll-to target="#buttonGroup" data-toggle="scroll-to">Button group</nav-scroll-to>
								<nav-scroll-to target="#groupSize" data-toggle="scroll-to">Group size</nav-scroll-to>
								<nav-scroll-to target="#verticalGroup" data-toggle="scroll-to">Vertical group</nav-scroll-to>
								<nav-scroll-to target="#buttonToolbar" data-toggle="scroll-to">Button toolbar</nav-scroll-to>
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