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
			code10: ''
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto
	},
	mounted() {
		axios.get('/assets/data/table/element-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		axios.get('/assets/data/table/element-code-2.json').then((response) => {
			this.code2 = response.data;
		});
		axios.get('/assets/data/table/element-code-3.json').then((response) => {
			this.code3 = response.data;
		});
		axios.get('/assets/data/table/element-code-4.json').then((response) => {
			this.code4 = response.data;
		});
		axios.get('/assets/data/table/element-code-5.json').then((response) => {
			this.code5 = response.data;
		});
		axios.get('/assets/data/table/element-code-6.json').then((response) => {
			this.code6 = response.data;
		});
		axios.get('/assets/data/table/element-code-7.json').then((response) => {
			this.code7 = response.data;
		});
		axios.get('/assets/data/table/element-code-8.json').then((response) => {
			this.code8 = response.data;
		});
		axios.get('/assets/data/table/element-code-9.json').then((response) => {
			this.code9 = response.data;
		});
		axios.get('/assets/data/table/element-code-10.json').then((response) => {
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
						<li class="breadcrumb-item"><a href="#">TABLES</a></li>
						<li class="breadcrumb-item active">TABLE ELEMENTS</li>
					</ul>
					
					<h1 class="page-header">
						Table Elements <small>page header description goes here...</small>
					</h1>
					
					<hr class="mb-4">
					
					<!-- BEGIN #basicTable -->
					<div id="basicTable" class="mb-5">
						<h4>Basic Table</h4>
						<p>Using the most basic table markup, here’s how .table-based tables look in Bootstrap. You can also invert the colors—with light text on dark backgrounds—with <code>.table-dark</code>.</p>
						<card>
							<card-body>
								<div class="row mb-n3">
									<div class="col-xl-6">
										<div class="small text-inverse text-opacity-50 mb-3"><b>DEFAULT TABLE</b></div>
										<table class="table">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">First</th>
													<th scope="col">Last</th>
													<th scope="col">Handle</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th scope="row">1</th>
													<td>Mark</td>
													<td>Otto</td>
													<td>@mdo</td>
												</tr>
												<tr>
													<th scope="row">2</th>
													<td>Jacob</td>
													<td>Thornton</td>
													<td>@fat</td>
												</tr>
												<tr>
													<th scope="row">3</th>
													<td>Larry</td>
													<td>the Bird</td>
													<td>@twitter</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="col-xl-6">
										<div class="small text-inverse text-opacity-50 mb-3"><b>DARK TABLE</b></div>
										<table class="table table-dark">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">First</th>
													<th scope="col">Last</th>
													<th scope="col">Handle</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th scope="row">1</th>
													<td>Mark</td>
													<td>Otto</td>
													<td>@mdo</td>
												</tr>
												<tr>
													<th scope="row">2</th>
													<td>Jacob</td>
													<td>Thornton</td>
													<td>@fat</td>
												</tr>
												<tr>
													<th scope="row">3</th>
													<td>Larry</td>
													<td>the Bird</td>
													<td>@twitter</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</card-body>
							<highlightjs :code="code1"></highlightjs>
						</card>
					</div>
					<!-- END #basicTable -->
					
					<!-- BEGIN #tableHeadOptions -->
					<div id="tableHeadOptions" class="mb-5">
						<h4>Table head options</h4>
						<p>Similar to tables and dark tables, use the modifier classes <code>.thead-light</code> or <code>.thead-dark</code> to make <code>&lt;thead&gt;</code>s appear light or dark gray.</p>
						<card>
							<card-body>
								<div class="row mb-n3">
									<div class="col-xl-6">
										<div class="small text-inverse text-opacity-50 mb-3"><b>DARK HEADER</b></div>
										<table class="table">
											<thead class="table-dark">
												<tr>
													<th scope="col">#</th>
													<th scope="col">First</th>
													<th scope="col">Last</th>
													<th scope="col">Handle</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th scope="row">1</th>
													<td>Mark</td>
													<td>Otto</td>
													<td>@mdo</td>
												</tr>
												<tr>
													<th scope="row">2</th>
													<td>Jacob</td>
													<td>Thornton</td>
													<td>@fat</td>
												</tr>
												<tr>
													<th scope="row">3</th>
													<td>Larry</td>
													<td>the Bird</td>
													<td>@twitter</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="col-xl-6">
										<div class="small text-inverse text-opacity-50 mb-3"><b>LIGHT HEADER</b></div>
										<table class="table">
											<thead class="table-light">
												<tr>
													<th scope="col">#</th>
													<th scope="col">First</th>
													<th scope="col">Last</th>
													<th scope="col">Handle</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th scope="row">1</th>
													<td>Mark</td>
													<td>Otto</td>
													<td>@mdo</td>
												</tr>
												<tr>
													<th scope="row">2</th>
													<td>Jacob</td>
													<td>Thornton</td>
													<td>@fat</td>
												</tr>
												<tr>
													<th scope="row">3</th>
													<td>Larry</td>
													<td>the Bird</td>
													<td>@twitter</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</card-body>
							<highlightjs :code="code2"></highlightjs>
						</card>
					</div>
					<!-- END #tableHeadOptions -->
					
					<!-- BEGIN #stripedRows -->
					<div id="stripedRows" class="mb-5">
						<h4>Striped rows</h4>
						<p>Use <code>.table-striped</code> to add zebra-striping to any table row within the <code>&lt;tbody&gt;</code>.</p>
						<card>
							<card-body>
								<table class="table table-striped mb-0">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">First</th>
											<th scope="col">Last</th>
											<th scope="col">Handle</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">1</th>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<th scope="row">2</th>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<th scope="row">3</th>
											<td>Larry</td>
											<td>the Bird</td>
											<td>@twitter</td>
										</tr>
									</tbody>
								</table>
							</card-body>
							<highlightjs :code="code3"></highlightjs>
						</card>
					</div>
					<!-- END #stripedRows -->
					
					<!-- BEGIN #borderedTable -->
					<div id="borderedTable" class="mb-5">
						<h4>Bordered table</h4>
						<p>Add <code>.table-bordered</code> for borders on all sides of the table and cells.</p>
						<card>
							<card-body>
								<table class="table table-bordered mb-0">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">First</th>
											<th scope="col">Last</th>
											<th scope="col">Handle</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">1</th>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<th scope="row">2</th>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<th scope="row">3</th>
											<td colspan="2">Larry the Bird</td>
											<td>@twitter</td>
										</tr>
									</tbody>
								</table>
							</card-body>
							<highlightjs :code="code4"></highlightjs>
						</card>
					</div>
					<!-- END #borderedTable -->
					
					<!-- BEGIN #borderlessTable -->
					<div id="borderlessTable" class="mb-5">
						<h4>Borderless table</h4>
						<p></p>
						<card>
							<card-body>
								<table class="table table-borderless mb-0">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">First</th>
											<th scope="col">Last</th>
											<th scope="col">Handle</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">1</th>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<th scope="row">2</th>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<th scope="row">3</th>
											<td colspan="2">Larry the Bird</td>
											<td>@twitter</td>
										</tr>
									</tbody>
								</table>
							</card-body>
							<highlightjs :code="code5"></highlightjs>
						</card>
					</div>
					<!-- END #borderlessTable -->
					
					<!-- BEGIN #hoverableRows -->
					<div id="hoverableRows" class="mb-5">
						<h4>Hoverable rows</h4>
						<p>Add <code>.table-hover</code> to enable a hover state on table rows within a <code>&lt;tbody&gt;</code>.</p>
						<card>
							<card-body>
								<table class="table table-hover mb-0">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">First</th>
											<th scope="col">Last</th>
											<th scope="col">Handle</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">1</th>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<th scope="row">2</th>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<th scope="row">3</th>
											<td colspan="2">Larry the Bird</td>
											<td>@twitter</td>
										</tr>
									</tbody>
								</table>
							</card-body>
							<highlightjs :code="code6"></highlightjs>
						</card>
					</div>
					<!-- END #hoverableRows -->
					
					<!-- BEGIN #smallTable -->
					<div id="smallTable" class="mb-5">
						<h4>Small table</h4>
						<p>Add <code>.table-sm</code> to make tables more compact by cutting cell padding in half.</p>
						<card>
							<card-body>
								<table class="table table-sm mb-0">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">First</th>
											<th scope="col">Last</th>
											<th scope="col">Handle</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<td >2</td>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<td>3</td>
											<td colspan="2">Larry the Bird</td>
											<td>@twitter</td>
										</tr>
									</tbody>
								</table>
							</card-body>
							<highlightjs :code="code7"></highlightjs>
						</card>
					</div>
					<!-- END #smallTable -->
					
					<!-- BEGIN #contextualClasses -->
					<div id="contextualClasses" class="mb-5">
						<h4>Contextual classes</h4>
						<p>Use contextual classes to color table rows or individual cells.</p>
						<card>
							<card-body>
								<table class="table mb-0">
									<thead>
										<tr>
											<th scope="col">Class</th>
											<th scope="col">Heading</th>
											<th scope="col">Heading</th>
										</tr>
									</thead>
									<tbody>
										<tr class="table-active">
											<th scope="row">Active</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr>
											<th scope="row">Default</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="table-primary">
											<th scope="row">Primary</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="table-secondary">
											<th scope="row">Secondary</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="table-success">
											<th scope="row">Success</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="table-danger">
											<th scope="row">Danger</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="table-warning">
											<th scope="row">Warning</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="table-info">
											<th scope="row">Info</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="table-light">
											<th scope="row">Light</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="table-dark">
											<th scope="row">Dark</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="bg-primary text-white">
											<th scope="row">Warning</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="bg-success text-white">
											<th scope="row">Info</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="bg-warning text-white">
											<th scope="row">Light</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="bg-danger text-white">
											<th scope="row">Dark</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr class="bg-info text-white">
											<th scope="row">Dark</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
									</tbody>
								</table>
							</card-body>
							<highlightjs :code="code8"></highlightjs>
						</card>
					</div>
					<!-- END #contextualClasses -->
					
					<!-- BEGIN #captions -->
					<div id="captions" class="mb-5">
						<h4>Captions</h4>
						<p>A <code>&lt;caption&gt;</code> functions like a heading for a table. It helps users with screen readers to find a table and understand what it’s about and decide if they want to read it.</p>
						<card>
							<card-body>
								<table class="table mb-0">
									<caption>List of users</caption>
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">First</th>
											<th scope="col">Last</th>
											<th scope="col">Handle</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">1</th>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<th scope="row">2</th>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<th scope="row">3</th>
											<td>Larry</td>
											<td>the Bird</td>
											<td>@twitter</td>
										</tr>
									</tbody>
								</table>
							</card-body>
							<highlightjs :code="code9"></highlightjs>
						</card>
					</div>
					<!-- END #captions -->
					
					<!-- BEGIN #responsiveTables -->
					<div id="responsiveTables" class="mb-5">
						<h4>Responsive tables</h4>
						<p>Responsive tables allow tables to be scrolled horizontally with ease. Make any table responsive across all viewports by wrapping a <code>.table</code> with <code>.table-responsive</code>. Or, pick a maximum breakpoint with which to have a responsive table up to by using <code>.table-responsive{-sm|-md|-lg|-xl}</code>.</p>
						<card>
							<card-body>
								<div class="table-responsive">
									<table class="table mb-0">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Heading</th>
												<th scope="col">Heading</th>
												<th scope="col">Heading</th>
												<th scope="col">Heading</th>
												<th scope="col">Heading</th>
												<th scope="col">Heading</th>
												<th scope="col">Heading</th>
												<th scope="col">Heading</th>
												<th scope="col">Heading</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="row">1</th>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
											</tr>
											<tr>
												<th scope="row">2</th>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
											</tr>
											<tr>
												<th scope="row">3</th>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
											</tr>
										</tbody>
									</table>
								</div>
							</card-body>
							<highlightjs :code="code10"></highlightjs>
						</card>
					</div>
					<!-- END #responsiveTables -->
				</div>
				<!-- END col-9-->
				<!-- BEGIN col-3 -->
				<div class="col-xl-3">
					<!-- BEGIN #sidebar-bootstrap -->
					<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
						<nav class="nav">
							<nav-scroll-to class="nav-link" target="#basicTable" data-toggle="scroll-to">Basic table</nav-scroll-to>
							<nav-scroll-to class="nav-link" target="#tableHeadOptions" data-toggle="scroll-to">Table head options</nav-scroll-to>
							<nav-scroll-to class="nav-link" target="#stripedRows" data-toggle="scroll-to">Striped rows</nav-scroll-to>
							<nav-scroll-to class="nav-link" target="#borderedTable" data-toggle="scroll-to">Bordered table</nav-scroll-to>
							<nav-scroll-to class="nav-link" target="#borderlessTable" data-toggle="scroll-to">Borderless table</nav-scroll-to>
							<nav-scroll-to class="nav-link" target="#hoverableRows" data-toggle="scroll-to">Hoverable rows</nav-scroll-to>
							<nav-scroll-to class="nav-link" target="#smallTable" data-toggle="scroll-to">Small table</nav-scroll-to>
							<nav-scroll-to class="nav-link" target="#contextualClasses" data-toggle="scroll-to">Contextual classes</nav-scroll-to>
							<nav-scroll-to class="nav-link" target="#captions" data-toggle="scroll-to">Captions</nav-scroll-to>
							<nav-scroll-to class="nav-link" target="#responsiveTables" data-toggle="scroll-to">Responsive tables</nav-scroll-to>
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
