<script>
import highlightjs from '@/components/plugins/Highlightjs.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import Masonry from 'masonry-layout';
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
			code10: ''
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto
	},
	mounted() {
		const msnry = new Masonry('[data-masonry]');
		
		axios.get('/assets/data/ui/card-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		axios.get('/assets/data/ui/card-code-2.json').then((response) => {
			this.code2 = response.data;
		});
		axios.get('/assets/data/ui/card-code-3.json').then((response) => {
			this.code3 = response.data;
		});
		axios.get('/assets/data/ui/card-code-4.json').then((response) => {
			this.code4 = response.data;
		});
		axios.get('/assets/data/ui/card-code-5.json').then((response) => {
			this.code5 = response.data;
		});
		axios.get('/assets/data/ui/card-code-6.json').then((response) => {
			this.code6 = response.data;
		});
		axios.get('/assets/data/ui/card-code-7.json').then((response) => {
			this.code7 = response.data;
		});
		axios.get('/assets/data/ui/card-code-8.json').then((response) => {
			this.code8 = response.data;
		});
		axios.get('/assets/data/ui/card-code-9.json').then((response) => {
			this.code9 = response.data;
		});
		axios.get('/assets/data/ui/card-code-10.json').then((response) => {
			this.code10 = response.data;
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
							<li class="breadcrumb-item active">CARD</li>
						</ul>
						
						<h1 class="page-header">
							Card <small>page header description goes here...</small>
						</h1>
						
						<hr class="mb-4" />
						
						<!-- BEGIN #basicUsage -->
						<div id="basicUsage" class="mb-5">
							<h4>Basic Usage</h4>
							<p>
								Bootstrap’s cards provide a flexible and extensible content container with multiple variants and options.
								Please read the <a href="https://getbootstrap.com/docs/5.3/components/card/" target="_blank">official Bootstrap documentation</a> for the full list of options.
							</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-6">
											<card>
												<card-header class="fw-bold small">
													CARD HEADER HERE
												</card-header>
												<card-body>
													<h5 class="card-title">Card title</h5>
													<h6 class="card-subtitle mb-3 text-inverse text-opacity-50">Card subtitle</h6>
													<p class="card-text mb-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
													<a href="#" class="card-link">Card link</a>
													<a href="#" class="card-link">Another link</a>
												</card-body>
											</card>
										</div>
										<div class="col-xl-6">
											<card>
												<card-header class="fw-bold small">
													CARD WITH LIST GROUP
												</card-header>
												<card-header class="bg-none p-0">
													<ul class="list-group list-group-flush">
														<li class="list-group-item">Cras justo odio</li>
														<li class="list-group-item">Dapibus ac facilisis in</li>
														<li class="list-group-item">Vestibulum at eros</li>
													</ul>
												</card-header>
												<card-body>
													<a href="#" class="card-link">Card link</a>
													<a href="#" class="card-link">Another link</a>
												</card-body>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code1" />
							</card>
						</div>
						<!-- END #basicUsage -->
						
						<!-- BEGIN #fullscreen -->
						<div id="fullscreen" class="mb-5">
							<h4>Fullscreen (extended feature)</h4>
							<p>
								This is an extended feature from Bootstrap card. Add a component named
								<code>&lt;card-expand-toggler /&gt;</code> for maximize or minimize the card element
							</p>
							<card>
								<div class="row">
									<div class="col-lg-8">
										<card-body>
											<card>
												<card-header class="fw-bold small d-flex">
													<span class="flex-grow-1">CARD HEADER HERE</span>
													<card-expand-toggler />
												</card-header>
												<card-body>
													<h5 class="card-title">Card title</h5>
													<h6 class="card-subtitle mb-3 text-inverse text-opacity-50">Card subtitle</h6>
													<p class="card-text mb-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
													<a href="#" class="card-link">Card link</a>
													<a href="#" class="card-link">Another link</a>
												</card-body>
											</card>
										</card-body>
									</div>
								</div>
								<highlightjs :code="code2" />
							</card>
						</div>
						<!-- END #fullscreen -->
						
						<!-- BEGIN #sizing -->
						<div id="sizing" class="mb-5">
							<h4>Sizing</h4>
							<p>
								Cards assume no specific <code>width</code> to start, so they’ll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.
							</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-sm-8">
											<card>
												<card-body>
													<h5 class="card-title">Special title treatment</h5>
													<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
													<a href="#" class="btn btn-outline-theme">Go somewhere</a>
												</card-body>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code3" />
							</card>
						</div>
						<!-- END #sizing -->
						
						<!-- BEGIN #navigation -->
						<div id="navigation" class="mb-5">
							<h4>Navigation</h4>
							<p>
								Add some navigation to a card’s header (or block) with Bootstrap’s nav components.
							</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-6">
											<div class="small text-inverse text-opacity-50 mb-3"><b>NAV TABS</b></div>
											<card class="mb-3">
												<card-header>
													<ul class="nav nav-tabs card-header-tabs">
														<li class="nav-item">
															<a class="nav-link active" href="#">Active</a>
														</li>
														<li class="nav-item">
															<a class="nav-link" href="#">Link</a>
														</li>
														<li class="nav-item">
															<a class="nav-link disabled" href="#">Disabled</a>
														</li>
													</ul>
												</card-header>
												<card-body>
													<h5 class="card-title">Special title treatment</h5>
													<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
													<a href="#" class="btn btn-outline-theme">Go somewhere</a>
												</card-body>
											</card>
										</div>
										<div class="col-xl-6">
											<div class="small text-inverse text-opacity-50 mb-3"><b>NAV PILLS</b></div>
											<card class="mb-3">
												<card-header>
													<ul class="nav nav-pills card-header-pills">
														<li class="nav-item">
															<a class="nav-link active" href="#">Active</a>
														</li>
														<li class="nav-item">
															<a class="nav-link" href="#">Link</a>
														</li>
														<li class="nav-item">
															<a class="nav-link disabled" href="#">Disabled</a>
														</li>
													</ul>
												</card-header>
												<card-body>
													<h5 class="card-title">Special title treatment</h5>
													<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
													<a href="#" class="btn btn-outline-theme">Go somewhere</a>
												</card-body>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code4" />
							</card>
						</div>
						<!-- END #navigation -->
						
						<!-- BEGIN #images -->
						<div id="images" class="mb-5">
							<h4>Images</h4>
							<p>
								Cards include a few options for working with images. Choose from appending “image caps” at either end of a card, overlaying images with card content, or simply embedding the image in a card.
							</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-6">
											<div class="small text-inverse text-opacity-50 mb-3"><b>IMAGE CAPS</b></div>
											<card class="mb-3">
												<card-body class="pb-0">
													<img src="https://placehold.co/600x400/c9d2e3/212837" alt="" class="card-img-top" />
												</card-body>
												<card-body>
													<h5 class="card-title">Card title</h5>
													<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
													<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
												</card-body>
											</card>
										</div>
										<div class="col-xl-6">
											<div class="small text-inverse text-opacity-50 mb-3"><b>IMAGE OVERLAY</b></div>
											<card class="p-3 mb-3">
												<img src="https://placehold.co/600x750/000000/ffffff" alt="" class="card-img" />
												<card-img-overlay class="m-3">
													<h5 class="card-title">Card title</h5>
													<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
													<p class="card-text">Last updated 3 mins ago</p>
												</card-img-overlay>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code5" />
							</card>
						</div>
						<!-- END #images -->
						
						<!-- BEGIN #horizontal -->
						<div id="horizontal" class="mb-5">
							<h4>Horizontal</h4>
							<p>
								Using a combination of grid and utility classes, cards can be made horizontal in a mobile-friendly and responsive way.
							</p>
							<card>
								<card-body>
									<card class="mb-3">
										<card-body>
											<div class="row gx-0 align-items-center">
												<div class="col-md-4">
													<img src="https://placehold.co/480x360/c9d2e3/212837" alt="" class="card-img rounded-0" />
												</div>
												<div class="col-md-8">
													<card-body>
														<h5 class="card-title">Card title</h5>
														<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
														<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
													</card-body>
												</div>
											</div>
										</card-body>
									</card>
								</card-body>
								<highlightjs :code="code6" />
							</card>
						</div>
						<!-- END #horizontal -->
						
						<!-- BEGIN #cardStyles -->
						<div id="cardStyles" class="mb-5">
							<h4>Card Styles</h4>
							<p>
								Cards include various options for customizing their backgrounds, borders, and color.
							</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-6">
											<div class="small text-inverse text-opacity-50 mb-3"><b>BACKGROUND AND BORDER</b></div>
											<card class="border-theme bg-theme bg-opacity-25 mb-3">
												<card-header class="border-theme fw-bold small text-inverse">HEADER</card-header>
												<card-body>
													<h5 class="card-title">Primary card title</h5>
													<p class="card-text text-inverse text-opacity-75">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
												</card-body>
											</card>
										</div>
										<div class="col-xl-6">
											<div class="small text-inverse text-opacity-50 mb-3"><b>BORDER AND COLOR</b></div>
											<card class="border-theme mb-3">
												<card-header class="border-theme text-theme fw-bold small">HEADER</card-header>
												<card-body>
													<h5 class="card-title text-theme">Primary card title</h5>
													<p class="card-text text-theme text-opacity-75">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
												</card-body>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code7" />
							</card>
						</div>
						<!-- END #cardStyles -->
						
						<!-- BEGIN #cardGroups -->
						<div id="cardGroups" class="mb-5">
							<h4>Card groups</h4>
							<p>
								Use card groups to render cards as a single, attached element with equal width and height columns. Card groups use <code>display: flex;</code> to achieve their uniform sizing.
							</p>
							<card>
								<card-body>
									<card-group>
										<card class="m-1">
											<card-body>
												<h5 class="card-title">Card title</h5>
												<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
												<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
											</card-body>
										</card>
										<card class="m-1">
											<card-body>
												<h5 class="card-title">Card title</h5>
												<p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
												<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
											</card-body>
										</card>
										<card class="m-1">
											<card-body>
												<h5 class="card-title">Card title</h5>
												<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
												<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
											</card-body>
										</card>
									</card-group>
								</card-body>
								<highlightjs :code="code8" />
							</card>
						</div>
						<!-- END #cardGroups -->
						
						<!-- BEGIN #gridCards -->
						<div id="gridCards" class="mb-5">
							<h4>Grid cards</h4>
							<p>
								Use the Bootstrap grid system and its <a href="/docs/5.1/layout/grid/#row-columns"><code>.row-cols</code> classes</a> to control how many grid columns (wrapped around your cards) you show per row. For example, here’s <code>.row-cols-1</code> laying out the cards on one column, and <code>.row-cols-md-2</code> splitting four cards to equal width across multiple rows, from the medium breakpoint up.
							</p>
							<card>
								<card-body>
									<div class="row row-cols-1 row-cols-md-2 g-3">
										<div class="col">
											<card class="h-100">
												<card-body>
													<h5 class="card-title">Card title</h5>
													<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
													<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
												</card-body>
											</card>
										</div>
										<div class="col">
											<card class="h-100">
												<card-body>
													<h5 class="card-title">Card title</h5>
													<p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
													<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
												</card-body>
											</card>
										</div>
										<div class="col">
											<card class="h-100">
												<card-body>
													<h5 class="card-title">Card title</h5>
													<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
													<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
												</card-body>
											</card>
										</div>
										<div class="col">
											<card class="h-100">
												<card-body>
													<h5 class="card-title">Card title</h5>
													<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
													<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
												</card-body>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code9" />
							</card>
						</div>
						<!-- END #cardGroups -->
						
						<!-- BEGIN #cardColumns -->
						<div id="cardColumns" class="mb-5">
							<h4>Card columns</h4>
							<p>
								In <code>v5</code>, cards can be organized into Masonry-like columns with masonry javascript included.
							</p>
							<card>
								<card-body>
									<div class="row" data-masonry='{"percentPosition": true }'>
										<div class="col-sm-6 col-lg-4 mb-4">
											<card>
												<card-body>
													<h5 class="card-title">Card title that wraps to a new line</h5>
													<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
												</card-body>
											</card>
										</div>
										<div class="col-sm-6 col-lg-4 mb-4">
											<card class="p-3">
												<blockquote class="blockquote mb-0 card-body">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
													<footer class="blockquote-footer">
														<small class="text-muted">
															Someone famous in <cite title="Source Title">Source Title</cite>
														</small>
													</footer>
												</blockquote>
											</card>
										</div>
										<div class="col-sm-6 col-lg-4 mb-4">
											<card>
												<card-body>
													<h5 class="card-title">Card title</h5>
													<p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
													<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
												</card-body>
											</card>
										</div>
										<div class="col-sm-6 col-lg-4 mb-4">
											<card class="text-center">
												<blockquote class="blockquote mb-0 card-body">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
													<footer class="blockquote-footer text-inverse">
														<small>
															Someone famous in <cite title="Source Title">Source Title</cite>
														</small>
													</footer>
												</blockquote>
											</card>
										</div>
										<div class="col-sm-6 col-lg-4 mb-4">
											<card class="text-center">
												<card-body>
													<h5 class="card-title">Card title</h5>
													<p class="card-text">This card has a regular title and short paragraphy of text below it.</p>
													<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
												</card-body>
											</card>
										</div>
										<div class="col-sm-6 col-lg-4 mb-4">
											<card class="p-3 text-end">
												<blockquote class="blockquote mb-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
													<footer class="blockquote-footer">
														<small class="text-muted">
															Someone famous in <cite title="Source Title">Source Title</cite>
														</small>
													</footer>
												</blockquote>
											</card>
										</div>
										<div class="col-sm-6 col-lg-4 mb-4">
											<card>
												<card-body>
													<h5 class="card-title">Card title</h5>
													<p class="card-text">This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</p>
													<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
												</card-body>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code10" />
							</card>
						</div>
						<!-- END #cardColumns -->
					</div>
					<!-- END col-9-->
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebar-bootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav">
								<nav-scroll-to target="#basicUsage" data-toggle="scroll-to">Basic usage</nav-scroll-to>
								<nav-scroll-to target="#fullscreen" data-toggle="scroll-to">Fullscreen (extended feature)</nav-scroll-to>
								<nav-scroll-to target="#sizing" data-toggle="scroll-to">Sizing</nav-scroll-to>
								<nav-scroll-to target="#navigation" data-toggle="scroll-to">Navigation</nav-scroll-to>
								<nav-scroll-to target="#images" data-toggle="scroll-to">Images</nav-scroll-to>
								<nav-scroll-to target="#horizontal" data-toggle="scroll-to">Horizontal</nav-scroll-to>
								<nav-scroll-to target="#cardStyles" data-toggle="scroll-to">Card styles</nav-scroll-to>
								<nav-scroll-to target="#cardGroups" data-toggle="scroll-to">Card groups</nav-scroll-to>
								<nav-scroll-to target="#gridCards" data-toggle="scroll-to">Grid cards</nav-scroll-to>
								<nav-scroll-to target="#cardColumns" data-toggle="scroll-to">Card columns</nav-scroll-to>
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
