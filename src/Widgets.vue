<script>
import 'lity';
import 'lity/dist/lity.min.css';
import highlightjs from '@/components/plugins/Highlightjs.vue';
import chartjs from '@/components/plugins/Chartjs.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import Chart from 'chart.js/auto';
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
			code11: '',
			chart: {
				type: 'bar',
				data: {
					labels: ['S','M','T','W','T','F','S'],
					datasets: [{
						label: 'Total Visitors',
						data: [37,31,36,34,43,31,50],
						backgroundColor: appVariable.color.theme,
						borderColor: 'transparent'
					}, {
						label: 'Returning Visitors',
						data: [27,21,16,14,23,11,30],
						backgroundColor: 'rgba('+ appVariable.color.inverseRgb +', .5)',
						borderColor: 'transparent'
					}]
				}
			}
		}
	},
	components: {
		highlightjs: highlightjs,
		chartjs: chartjs,
		navScrollTo: navscrollto
	},
	mounted() {
		axios.get('/assets/data/widgets/widget-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-2.json').then((response) => {
			this.code2 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-3.json').then((response) => {
			this.code3 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-4.json').then((response) => {
			this.code4 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-5.json').then((response) => {
			this.code5 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-6.json').then((response) => {
			this.code6 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-7.json').then((response) => {
			this.code7 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-8.json').then((response) => {
			this.code8 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-9.json').then((response) => {
			this.code9 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-10.json').then((response) => {
			this.code10 = response.data;
		});
		axios.get('/assets/data/widgets/widget-code-11.json').then((response) => {
			this.code11 = response.data;
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
						<h1 class="page-header">
							Widgets <small>page header description goes here...</small>
						</h1>
						<hr class="mb-4">
						
						<!-- BEGIN #cardWidget -->
						<div id="cardWidget" class="mb-5">
							<h4>Card widget</h4>
							<p>Card widget is created by using existing Bootstrap <code>.card</code> component with <code>.card-img</code>, <code>.card-img-overlay</code> and <code>.d-flex</code> utilities.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-8">
											<card class="p-5px">
												<div style="max-height: 250px" class="overflow-hidden z-1">
													<img src="/assets/img/gallery/widget-cover-1.jpg" alt="" class="card-img">
												</div>
												<card-img-overlay class="d-flex flex-column bg-gray-700 bg-opacity-75 m-5px z-2" data-bs-theme="dark">
													<div class="flex-fill">
														<div class="d-flex align-items-center">
															<h6>Youtube</h6>
															<div class="dropdown dropdown-icon ms-auto">
																<a href="#" class="text-white" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
																<div class="dropdown-menu dropdown-menu-end" data-bs-theme="light">
																	<a href="//www.youtube.com/watch?v=_AS5nu4u1ss" class="dropdown-item">View</a>
																</div>
															</div>
														</div>
													</div>
													<div>
														<a href="//www.youtube.com/watch?v=_AS5nu4u1ss" data-lity class="text-white text-decoration-none d-flex align-items-center">
															<div class="bg-gradient-blue-cyan w-50px h-50px rounded-3 d-flex align-items-center justify-content-center">
																<i class="fa fa-play fa-lg"></i>
															</div>
															<div class="ms-3 flex-1">
																<div class="fw-bold">New Videos - Behind The Forest Tours</div>
																<div class="fs-13px text-inverse text-opacity-75">
																	<i class="far fa-eye"></i> 892 views 
																	<i class="far fa-clock ms-3"></i> 39min ago
																</div>
															</div>
														</a>
													</div>
												</card-img-overlay>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code1"></highlightjs>
							</card>
						</div>
						<!-- END #cardWidget -->
						
						<!-- BEGIN #listWidget -->
						<div id="listWidget" class="mb-5">
							<h4>List widget</h4>
							<p>List widget is created by using existing Bootstrap <code>.list-group</code> component with <code>.d-flex</code> and hud utilities css classes.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-6">
											<div class="text-inverse text-opacity-50 small mb-2"><b>WITH ICON</b></div>
											<div class="list-group mb-3">
												<div class="list-group-item d-flex align-items-center">
													<div class="w-40px h-40px d-flex align-items-center justify-content-center bg-gradient-blue-cyan text-white rounded-2 ms-n1">
														<i class="fab fa-apple fa-lg"></i>
													</div>
													<div class="flex-fill px-3">
														<div class="fw-bold">Apps Store</div>
														<div class="small text-inverse text-opacity-50">102 new download</div>
													</div>
													<div class="dropdown">
														<a href="#" data-bs-toggle="dropdown" class="text-inverse text-opacity-50"><i class="fa fa-ellipsis-h"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a href="#" class="dropdown-item">View</a>
															<a href="#" class="dropdown-item">Analytics</a>
															<a href="#" class="dropdown-item">Report</a>
														</div>
													</div>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<div class="w-40px h-40px d-flex align-items-center justify-content-center bg-gradient-orange text-white rounded ms-n1">
														<i class="fa fa-book fa-lg"></i>
													</div>
													<div class="flex-fill px-3">
														<div class="fw-bold">iBooks App</div>
														<div class="small text-inverse text-opacity-50">32 new download</div>
													</div>
													<div class="dropdown">
														<a href="#" data-bs-toggle="dropdown" class="text-inverse text-opacity-50"><i class="fa fa-ellipsis-h"></i></a>
														<div class="dropdown-menu dropdown-menu-end">
															<a href="#" class="dropdown-item">View</a>
															<a href="#" class="dropdown-item">Analytics</a>
															<a href="#" class="dropdown-item">Report</a>
														</div>
													</div>
												</div>
											</div>
											<div class="text-inverse text-opacity-50 small mb-2"><b>WITH IMAGE</b></div>
											<div class="list-group mb-3">
												<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-inverse">
													<div class="w-40px h-40px d-flex align-items-center justify-content-center ms-n1">
														<img src="/assets/img/user/user.jpg" alt="" class="ms-100 mh-100 rounded-circle">
													</div>
													<div class="flex-fill ps-3 d-flex align-items-center">
														<div class="fw-bold flex-fill">
															Isaiah Hughes
														</div>
														<i class="fa fa-circle text-success fs-7px ms-auto"></i>
													</div>
												</a>
												<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-inverse">
													<div class="w-40px h-40px d-flex align-items-center justify-content-center ms-n1">
														<img src="/assets/img/user/user-2.jpg" alt="" class="ms-100 mh-100 rounded-circle">
													</div>
													<div class="flex-fill ps-3 d-flex align-items-center">
														<div class="fw-bold flex-fill">
															Ryan Turner
														</div>
														<i class="fa fa-circle text-inverse text-opacity-50 fs-7px ms-auto"></i>
													</div>
												</a>
											</div>
										</div>
										<div class="col-xl-6">
											<div class="text-inverse text-opacity-50 small mb-2"><b>WITH SETTINGS</b></div>
											<div class="list-group">
												<div class="list-group-item d-flex align-items-center">
													<div class="flex-fill">
														<div class="fw-bold">Server auto backup</div>
														<div class="small text-inverse text-opacity-50">last backup since yesterday</div>
													</div>
													<div>
														<div class="form-check me-n1">
															<input type="checkbox" class="form-check-input" id="customSwitch1" checked>
															<label class="form-check-label" for="customSwitch1"></label>
														</div>
													</div>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<div class="flex-fill">
														<div class="fw-bold">Analytics enabled</div>
														<div class="small text-inverse text-opacity-50">3,392 data collected</div>
													</div>
													<div>
														<div class="form-switch me-n1">
															<input type="checkbox" class="form-check-input" id="customSwitch2" >
															<label class="form-check-label" for="customSwitch2"></label>
														</div>
													</div>
												</div>
												<a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
													<div class="flex-fill">
														<div class="fw-bold">Link with arrow</div>
													</div>
													<div>
														<i class="fa fa-chevron-right"></i>
													</div>
												</a>
												<a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
													<div class="flex-fill">
														<div class="fw-bold">Link with arrow</div>
													</div>
													<div>
														<i class="fa fa-chevron-right"></i>
													</div>
												</a>
											</div>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code2"></highlightjs>
							</card>
						</div>
						<!-- END #listWidget -->
						
						<!-- BEGIN #statsWidget -->
						<div id="statsWidget" class="mb-5">
							<h4>Stats widget</h4>
							<p>States widget is created by using Bootstrap <code>.card</code> component with <code>.d-flex</code> and <code>background-color</code> utilities.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-8">
											<card>
												<card-body class="d-flex align-items-center text-inverse m-5px bg-inverse bg-opacity-10">
													<div class="flex-fill">
														<div class="mb-1">Total Visitors + Page Views</div>
														<h2>22,930</h2>
														<div>Today, 11:25AM</div>
													</div>
													<div class="opacity-5">
														<i class="fa fa-shopping-bag fa-4x"></i>
													</div>
												</card-body>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code3"></highlightjs>
							</card>
						</div>
						<!-- END #statsWidget -->
						
						<!-- BEGIN #chartWidget -->
						<div id="chartWidget" class="mb-5">
							<h4>Chart widget</h4>
							<p>Chart widget created by using Bootstrap <code>.card</code> and <code>.list-group</code> component combined with Chart.js plugins.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-8">
											<card>
												<card-body class="text-inverse text-center">
													<div class="fs-16px fw-bold">Weekly Web Analytics</div>
													<div class="fs-13px mb-3 text-inverse text-opacity-50">Week 11 May - 17 May</div>
													<chartjs :type="chart.type" :data="chart.data" :options="chart.options"></chartjs>
												</card-body>
												<hr class="m-0">
												<div class="list-group list-group-flush">
													<div class="list-group-item border-top-0 rounded-top-0 d-flex align-items-center p-3">
														<div class="w-40px h-40px bg-inverse bg-opacity-15 d-flex align-items-center justify-content-center">
															<i class="fa fa-user fa-lg"></i>
														</div>
														<div class="flex-fill px-3">
															<div class="fw-bold">Total Visitors</div>
															<div class="small text-inverse text-opacity-50">11 May - 17 May</div>
														</div>
														<div>
															<h2 class="mb-0">1.3m</h2>
														</div>
													</div>
												</div>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code4"></highlightjs>
							</card>
						</div>
						<!-- END #chartWidget -->
						
						<!-- BEGIN #userListWidget -->
						<div id="userListWidget" class="mb-5">
							<h4>User list widget</h4>
							<p>User list widget used to display people who participate in a project or a group.</p>
							<card>
								<card-body>
									<div class="widget-user-list">
										<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-1.jpg" alt=""></a></div>
										<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-2.jpg" alt=""></a></div>
										<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-3.jpg" alt=""></a></div>
										<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-4.jpg" alt=""></a></div>
										<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-5.jpg" alt=""></a></div>
										<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-6.jpg" alt=""></a></div>
										<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-7.jpg" alt=""></a></div>
										<div class="widget-user-list-item"><a href="#" class="widget-user-list-link bg-gray-200 text-gray-500 fs-12px fw-bold">+26</a></div>
									</div>
								</card-body>
								<highlightjs :code="code5"></highlightjs>
							</card>
						</div>
						<!-- END #userListWidget -->
						
						<!-- BEGIN #mapWidget -->
						<div id="mapWidget" class="mb-5">
							<h4>Map widget</h4>
							<p>Map widget created with Bootstrap <code>.card</code> and <code>.list-group</code> component twitted with helper css classes.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-8">
											<card>
												<div class="m-1 bg-inverse bg-opacity-10">
													<div class="card-header fw-bold">Google Map</div>
													<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d960.5886473867613!2d-122.41743634015282!3d37.776451983493104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2s!4v1495935122933" style="border:0; width: 100%; height: 10rem;" allowfullscreen></iframe>
													<div class="list-group list-group-flush">
														<div class="list-group-item d-flex">
															<div class="w-30px h-40px d-flex align-items-center justify-content-center">
																<i class="fa fa-car fa-2x text-inverse text-opacity-75"></i>
															</div>
															<div class="flex-fill px-3">
																<div class="fw-bold">via Road I-88E</div>
																<div class="small">Fastest route, the usual traffic</div>
															</div>
															<div class="text-nowrap">
																<div class="text-success fw-bold">3h 54min</div>
																<div class="small">393km</div>
															</div>
														</div>
													</div>
												</div>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code6"></highlightjs>
							</card>
						</div>
						<!-- END #mapWidget -->
						
						<!-- BEGIN #chatWidget -->
						<div id="chatWidget" class="mb-5">
							<h4>Chat widget</h4>
							<p>Chat widget created by using Bootstrap <code>.card</code> component with custom created bubble chat ui.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-8">
											<card>
												<card-header class="bg-none fw-bold d-flex align-items-center">Discussion group <card-expand-toggler></card-expand-toggler></card-header>
												<perfect-scrollbar class="h-200px">
													<card-body class="bg-inverse bg-opacity-10">
														<div class="widget-chat">
															<div class="widget-chat-item">
																<div class="widget-chat-media"><img src="/assets/img/user/user-2.jpg" alt=""></div>
																<div class="widget-chat-content">
																	<div class="widget-chat-name">Roberto Lambert</div>
																	<div class="widget-chat-message last">
																		Hey, I'm testing out group messaging.
																	</div>
																</div>
															</div>
															<div class="widget-chat-item reply">
																<div class="widget-chat-content">
																	<div class="widget-chat-message last">
																		Cool
																	</div>
																	<div class="widget-chat-status"><b>Read</b> 16:26</div>
																</div>
															</div>
															<div class="widget-chat-date">Today 14:21</div>
															<div class="widget-chat-item">
																<div class="widget-chat-media"><img src="/assets/img/user/user-3.jpg" alt=""></div>
																<div class="widget-chat-content">
																	<div class="widget-chat-name">Rick Powell</div>
																	<div class="widget-chat-message last">
																		Awesome! What's new?
																	</div>
																</div>
															</div>
															<div class="widget-chat-item">
																<div class="widget-chat-media"><img src="/assets/img/user/user-2.jpg" alt=""></div>
																<div class="widget-chat-content">
																	<div class="widget-chat-name">Roberto Lambert</div>
																	<div class="widget-chat-message">
																		Not much, It's got a new look, contact pics show up in group messaging, some other small stuff.
																	</div>
																	<div class="widget-chat-message last">
																		How's crusty old iOS 6 treating you?
																	</div>
																</div>
															</div>
															<div class="widget-chat-item reply">
																<div class="widget-chat-content">
																	<div class="widget-chat-message last">
																		Sucks
																	</div>
																	<div class="widget-chat-status"><b>Read</b> 16:30</div>
																</div>
															</div>
														</div>
													</card-body>
												</perfect-scrollbar>
												<card-footer class="bg-none">
													<div class="input-group">
														<input type="text" class="form-control" placeholder="Search for...">
														<button class="btn btn-outline-default" type="button"><i class="fa fa-paper-plane text-muted"></i></button>
													</div>
												</card-footer>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code7"></highlightjs>
							</card>
						</div>
						<!-- END #chatWidget -->
						
						<!-- BEGIN #profileWidget -->
						<div id="profileWidget" class="mb-5">
							<h4>Profile widget</h4>
							<p>Profile widget created by using Bootstrap <code>.card</code> component with Bootstrap grid.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-8">
											<card>
												<div class="m-1 bg-inverse bg-opacity-10">
													<div class="position-relative overflow-hidden" style="height: 165px">
														<img src="/assets/img/gallery/widget-cover-1.jpg" class="card-img rounded-0" alt="">
														<card-img-overlay class="text-white text-center bg-gray-600 bg-opacity-75">
															<div class="my-2">
																<img src="/assets/img/user/user-5.jpg" alt="" width="80" class="rounded-circle">
															</div>
															<div>
																<div class="fw-bold">Maurice Patterson</div>
																<div class="small">Never give up</div>
															</div>
														</card-img-overlay>
													</div>
													<card-body class="py-2 px-3 fs-6">
														<div class="row text-center">
															<div class="col-4">
																<div class="fw-bold">415</div>
																<div class="small lh-1">posts</div>
															</div>
															<div class="col-4">
																<div class="fw-bold">140k</div>
																<div class="small lh-1">followers</div>
															</div>
															<div class="col-4">
																<div class="fw-bold">697</div>
																<div class="small lh-1">following</div>
															</div>
														</div>
													</card-body>
												</div>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code8"></highlightjs>
							</card>
						</div>
						<!-- END #profileWidget -->
						
						<!-- BEGIN #productWidget -->
						<div id="productWidget" class="mb-5">
							<h4>Product widget</h4>
							<p>Product widget created by using Bootstrap <code>.list-group</code> component with <code>.d-flex</code> utilities.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-8">
											<div class="list-group">
												<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-inverse">
													<div class="w-60px h-60px d-flex align-items-center justify-content-center ms-n1 bg-white p-1">
														<img src="/assets/img/product/product-1.jpg" alt="" class="mw-100 mh-100">
													</div>
													<div class="flex-fill px-3">
														<div class="fw-bold">iPhone 11 Pro Max</div>
														<div class="small text-inverse text-opacity-50">Apple</div>
														<div class="d-flex align-items-center fs-11px">
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-gray-300 me-1"></i>
															(128)
														</div>
													</div>
													<div>
														<span class="badge bg-transparent border border-theme text-theme fs-12px fw-500 rounded-sm">
															$999.00
														</span>
													</div>
												</a>
												<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-inverse">
													<div class="w-60px h-60px d-flex align-items-center justify-content-center ms-n1 bg-white p-1">
														<img src="/assets/img/product/product-2.jpg" alt="" class="mw-100 mh-100">
													</div>
													<div class="flex-fill px-3">
														<div class="fw-bold">Macbook Pro</div>
														<div class="small text-inverse text-opacity-50">Apple</div>
														<div class="d-flex align-items-center fs-11px">
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-gray-300 me-1"></i>
															(93)
														</div>
													</div>
													<div>
														<span class="badge bg-transparent border border-theme text-theme fs-12px fw-500 rounded-sm">
															$599.00
														</span>
													</div>
												</a>
												<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-inverse">
													<div class="w-60px h-60px d-flex align-items-center justify-content-center ms-n1 bg-white p-1">
														<img src="/assets/img/product/product-3.jpg" alt="" class="mw-100 mh-100">
													</div>
													<div class="flex-fill px-3">
														<div class="fw-bold">Apple Watch Series 5</div>
														<div class="small text-inverse text-opacity-50">Apple</div>
														<div class="d-flex align-items-center fs-11px">
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-warning"></i>
															<i class="fa fa-star text-gray-300 me-1"></i>
															(41)
														</div>
													</div>
													<div>
														<span class="badge bg-transparent border border-theme text-theme fs-12px fw-500 rounded-sm">
															$399.00
														</span>
													</div>
												</a>
											</div>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code9"></highlightjs>
							</card>
						</div>
						<!-- END #productWidget -->
						
						<!-- BEGIN #reminderWidget -->
						<div id="reminderWidget" class="mb-5">
							<h4>Reminder widget</h4>
							<p>Reminder widget used to create a simple calendar to notify the user upcoming events or task.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-8">
											<card>
												<card-header class="fw-bold">Today, Nov 4</card-header>
												<div class="widget-reminder">
													<div class="widget-reminder-item">
														<div class="widget-reminder-time">09:00<br>12:00</div>
														<div class="widget-reminder-divider bg-success"></div>
														<div class="widget-reminder-content">
															<div class="fw-bold">Meeting with HR</div>
															<div class="fs-13px"> - Conference Room</div>
														</div>
													</div>
													<div class="widget-reminder-item">
														<div class="widget-reminder-time">20:00<br>23:00</div>
														<div class="widget-reminder-divider bg-primary"></div>
														<div class="widget-reminder-content">
															<div class="fw-bold">Dinner with Richard</div>
															<div class="fs-13px"> - Tom's Too Restaurant</div>
															<div class="d-flex align-items-center fs-13px mt-2">
																<div class="flex-fill d-flex align-items-center">
																	<img src="/assets/img/user/user-3.jpg" alt="" width="16" class="rounded-circle me-2"> Richard Leong
																</div>
																<a href="#" class="ms-auto">Contact</a>
															</div>
														</div>
													</div>
												</div>
												<card-header class="fw-bold">Tomorrow, Nov 5</card-header>
												<div class="widget-reminder">
													<div class="widget-reminder-item">
														<div class="widget-reminder-time">All day</div>
														<div class="widget-reminder-divider bg-gray-300"></div>
														<div class="widget-reminder-content">
															<div class="fw-bold">Terry Birthday</div>
														</div>
													</div>
													<div class="widget-reminder-item">
														<div class="widget-reminder-time">08:00</div>
														<div class="widget-reminder-divider bg-gray-300"></div>
														<div class="widget-reminder-content">
															<div class="fw-bold">Meeting</div>
														</div>
													</div>
													<div class="widget-reminder-item">
														<div class="widget-reminder-time">00:00<br>00:30</div>
														<div class="widget-reminder-divider bg-gray-300"></div>
														<div class="widget-reminder-content">
															<div class="fw-bold">Server Maintenance</div>
															<div class="fs-13px"> - Data Centre</div>
														</div>
													</div>
												</div>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code10"></highlightjs>
							</card>
						</div>
						<!-- END #reminderWidget -->
						
						<!-- BEGIN #imageListWidget -->
						<div id="imageListWidget" class="mb-5">
							<h4>Image list widget</h4>
							<p>Image list widget created by using Bootstrap <code>.card</code> and <code>.list-group</code> component with <code>.d-flex</code> utilities.</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-8">
											<card>
												<div class="list-group list-group-flush">
													<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-inverse">
														<div class="flex-fill pe-3">
															<div class="fw-bold">Library (20)</div>
															<div class="small text-inverse text-opacity-50">3,192 Image Found</div>
														</div>
														<div>
															<i class="fa fa-chevron-right fa-lg text-inverse text-opacity-50"></i>
														</div>
													</a>
												</div>
												<hr class="m-0">
												<card-body>
													<div class="widget-img-list">
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-1.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-1.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-2.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-2.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-3.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-3.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-4.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-4.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-5.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-5.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-21.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-21.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-22.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-22.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-23.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-23.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-24.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-24.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-25.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-25.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-26.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-26.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-27.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-27.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-28.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-28.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-29.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-29.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-30.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-30.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-31.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-31.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-32.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-32.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-33.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-33.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-34.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-34.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-35.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-35.jpg)"></span></a></div>
													</div>
												</card-body>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code11"></highlightjs>
							</card>
						</div>
						<!-- END #imageListWidget -->
					</div>
					<!-- END col-9 -->
					
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebarBootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav">
								<nav-scroll-to target="#cardWidget">Card widget</nav-scroll-to>
								<nav-scroll-to target="#listWidget">List widget</nav-scroll-to>
								<nav-scroll-to target="#statsWidget">Stats widget</nav-scroll-to>
								<nav-scroll-to target="#chartWidget">Chart widget</nav-scroll-to>
								<nav-scroll-to target="#userListWidget">User list widget</nav-scroll-to>
								<nav-scroll-to target="#mapWidget">Map widget</nav-scroll-to>
								<nav-scroll-to target="#chatWidget">Chat widget</nav-scroll-to>
								<nav-scroll-to target="#profileWidget">Profile widget</nav-scroll-to>
								<nav-scroll-to target="#productWidget">Product widget</nav-scroll-to>
								<nav-scroll-to target="#reminderWidget">Reminder widget</nav-scroll-to>
								<nav-scroll-to target="#imageListWidget">Image list widget</nav-scroll-to>
							</nav>
						</nav>
						<!-- END #sidebarBootstrap -->
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