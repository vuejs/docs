<script>
import 'lity';
import 'lity/dist/lity.min.css';

export default {

}
</script>
<template>
	<card>
		<card-body class="p-0">
			<!-- BEGIN profile -->
			<div class="profile">
				<!-- BEGIN profile-container -->
				<div class="profile-container">
					<!-- BEGIN profile-sidebar -->
					<div class="profile-sidebar">
						<div class="desktop-sticky-top">
							<div class="profile-img">
								<img src="/assets/img/user/profile.jpg" alt="">
							</div>
							<!-- profile info -->
							<h4>John Smith</h4>
							<div class="mb-3 text-inverse text-opacity-50 fw-bold mt-n2">@johnsmith</div>
							<p>
								Principal UXUI Design & Brand Architecture for HUD. Creator of SeanTheme.
								Bringing the world closer together. Studied Computer Science and Psychology at Harvard University.
							</p>
							<div class="mb-1">
								<i class="fa fa-map-marker-alt fa-fw text-inverse text-opacity-50"></i> New York, NY
							</div>
							<div class="mb-3">
								<i class="fa fa-link fa-fw text-inverse text-opacity-50"></i> seantheme.com/hud
							</div>
					
							<hr class="mt-4 mb-4">
					
							<!-- people-to-follow -->
							<div class="fw-bold mb-3 fs-16px">People to follow</div>
							<div class="d-flex align-items-center mb-3">
								<img src="/assets/img/user/user-1.jpg" alt="" width="30" class="rounded-circle">
								<div class="flex-fill px-3">
									<div class="fw-bold text-truncate w-100px">Noor Rowe</div>
									<div class="fs-12px text-inverse text-opacity-50">3.1m followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-theme fs-11px">Follow</a>
							</div>
							<div class="d-flex align-items-center mb-3">
								<img src="/assets/img/user/user-2.jpg" alt="" width="30" class="rounded-circle">
								<div class="flex-fill px-3">
									<div class="fw-bold text-truncate w-100px">Abbey Parker</div>
									<div class="fs-12px text-inverse text-opacity-50">302k followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-theme fs-11px">Follow</a>
							</div>
							<div class="d-flex align-items-center mb-3">
								<img src="/assets/img/user/user-3.jpg" alt="" width="30" class="rounded-circle">
								<div class="flex-fill px-3">
									<div class="fw-bold text-truncate w-100px">Savannah Nicholson</div>
									<div class="fs-12px text-inverse text-opacity-50">720k followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-theme fs-11px">Follow</a>
							</div>
							<div class="d-flex align-items-center mb-3">
								<img src="/assets/img/user/user-4.jpg" alt="" width="30" class="rounded-circle">
								<div class="flex-fill px-3">
									<div class="fw-bold text-truncate w-100px">Kenny Bright</div>
									<div class="fs-12px text-inverse text-opacity-50">1.4m followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-theme fs-11px">Follow</a>
							</div>
							<div class="d-flex align-items-center">
								<img src="/assets/img/user/user-5.jpg" alt="" width="30" class="rounded-circle">
								<div class="flex-fill px-3">
									<div class="fw-bold text-truncate w-100px">Cara Poole</div>
									<div class="fs-12px text-inverse text-opacity-50">989k followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-theme fs-11px">Follow</a>
							</div>
						</div>
					</div>
					<!-- END profile-sidebar -->
			
					<!-- BEGIN profile-content -->
					<div class="profile-content">
						<ul class="profile-tab nav nav-tabs nav-tabs-v2">
							<li class="nav-item">
								<a href="#profile-post" class="nav-link active" data-bs-toggle="tab">
									<div class="nav-field">Posts</div>
									<div class="nav-value">382</div>
								</a>
							</li>
							<li class="nav-item">
								<a href="#profile-followers" class="nav-link" data-bs-toggle="tab">
									<div class="nav-field">Followers</div>
									<div class="nav-value">1.3m</div>
								</a>
							</li>
							<li class="nav-item">
								<a href="#profile-media" class="nav-link" data-bs-toggle="tab">
									<div class="nav-field">Photos</div>
									<div class="nav-value">1,397</div>
								</a>
							</li>
							<li class="nav-item">
								<a href="#profile-video" class="nav-link" data-bs-toggle="tab">
									<div class="nav-field">Videos</div>
									<div class="nav-value">120</div>
								</a>
							</li>
							<li class="nav-item">
								<a href="#profile-followers" class="nav-link" data-bs-toggle="tab">
									<div class="nav-field">Following</div>
									<div class="nav-value">2,592</div>
								</a>
							</li>
						</ul>
						<div class="profile-content-container">
							<div class="row gx-4">
								<div class="col-xl-8">
									<div class="tab-content p-0">
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade show active" id="profile-post">
											<card class="mb-3">
												<card-body>
													<!-- post header -->
													<div class="d-flex align-items-center mb-3">
														<a href="#"><img src="/assets/img/user/profile.jpg" alt="" width="50" class="rounded-circle"></a>
														<div class="flex-fill ps-2">
															<div class="fw-bold"><a href="#" class="text-decoration-none">Clyde Stanley</a> at <a href="#" class="text-decoration-none">South Lake Tahoe, California</a></div>
															<div class="small text-inverse text-opacity-50">March 16</div>
														</div>
													</div>
						
													<!-- post content -->
													<p>Best vacation of 2024</p>
													<div class="profile-img-list">
														<div class="profile-img-list-item main"><a href="/assets/img/gallery/gallery-1.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-1.jpg)"></span></a></div>
														<div class="profile-img-list-item"><a href="/assets/img/gallery/gallery-2.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-2.jpg)"></span></a></div>
														<div class="profile-img-list-item"><a href="/assets/img/gallery/gallery-3.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-3.jpg)"></span></a></div>
														<div class="profile-img-list-item"><a href="/assets/img/gallery/gallery-4.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-4.jpg)"></span></a></div>
														<div class="profile-img-list-item with-number">
															<a href="/assets/img/gallery/gallery-5.jpg" data-lity class="profile-img-list-link">
																<span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-5.jpg)"></span>
																<div class="profile-img-number">+12</div>
															</a>
														</div>
													</div>
													<hr class="mb-1">
								
													<!-- post action -->
													<div class="row text-center fw-bold">
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="far fa-thumbs-up me-1 d-block d-sm-inline"></i> Likes
															</a>
														</div>
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="far fa-comment me-1 d-block d-sm-inline"></i> Comment
															</a>
														</div>
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="fa fa-share me-1 d-block d-sm-inline"></i> Share
															</a>
														</div>
													</div>
													
													<hr class="mb-3 mt-1">
													<div class="d-flex align-items-center">
														<img src="/assets/img/user/user.jpg" alt="" width="35" class="rounded-circle">
														<div class="flex-fill ps-2">
															<div class="position-relative d-flex align-items-center">
																<input type="text" class="form-control rounded-pill bg-white bg-opacity-15" style="padding-right: 120px;" placeholder="Write a comment...">
																<div class="position-absolute end-0 text-center">
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-smile"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-camera"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-video"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-3"><i class="fa fa-paw"></i></a>
																</div>
															</div>
														</div>
													</div>
												</card-body>
											</card>
											<card class="mb-3">
												<card-body>
													<!-- post header -->
													<div class="d-flex align-items-center mb-3">
														<a href="#"><img src="/assets/img/user/profile.jpg" alt="" width="50" class="rounded-circle"></a>
														<div class="flex-fill ps-2">
															<div class="fw-bold"><a href="#" class="text-decoration-none">Clyde Stanley</a> is watching <a href="#" class="text-decoration-none">PATAGONIA 8k</a></div>
															<div class="small text-inverse text-opacity-50">March 12</div>
														</div>
													</div>
					
													<!-- post content -->
													<p>Nice PATAGONIA footage in 8K</p>
													<div class="ratio ratio-16x9">
														<iframe src="https://www.youtube.com/embed/ChOhcHD8fBA?showinfo=0"></iframe>
													</div>
													<hr class="mb-1">
								
													<!-- post action -->
													<div class="row text-center fw-bold">
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="far fa-thumbs-up me-1 d-block d-sm-inline"></i> Likes
															</a>
														</div>
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="far fa-comment me-1 d-block d-sm-inline"></i> Comment
															</a>
														</div>
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="fa fa-share me-1 d-block d-sm-inline"></i> Share
															</a>
														</div>
													</div>
													<hr class="mb-3 mt-1">
													
													<div class="d-flex align-items-center">
														<img src="/assets/img/user/user.jpg" alt="" width="35" class="rounded-circle">
														<div class="flex-fill ps-2">
															<div class="position-relative d-flex align-items-center">
																<input type="text" class="form-control rounded-pill bg-white bg-opacity-15" style="padding-right: 120px;" placeholder="Write a comment...">
																<div class="position-absolute end-0 text-center">
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-smile"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-camera"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-video"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-3"><i class="fa fa-paw"></i></a>
																</div>
															</div>
														</div>
													</div>
												</card-body>
											</card>
											<card class="mb-3">
												<card-body>
													<!-- post header -->
													<div class="d-flex align-items-center mb-3">
														<a href="#" class="text-decoration-none"><img src="/assets/img/user/profile.jpg" alt="" width="50" class="rounded-circle"></a>
														<div class="flex-fill ps-2">
															<div class="fw-bold"><a href="#" class="text-decoration-none">Clyde Stanley</a></div>
															<div class="small text-inverse text-opacity-50">March 4</div>
														</div>
													</div>
					
													<!-- post content -->
													<p>
														Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Quisque sodales urna justo, ac ultrices magna consectetur id.<br><br>
														Donec tempor ligula sit amet nunc porta, sed aliquam leo sagittis.<br>
														Ut auctor congue efficitur. Praesent aliquam pulvinar neque, placerat semper massa elementum et.
													</p>
													<hr class="mb-1">
								
													<!-- post action -->
													<div class="row text-center fw-bold">
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="far fa-thumbs-up me-1 d-block d-sm-inline"></i> Likes
															</a>
														</div>
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="far fa-comment me-1 d-block d-sm-inline"></i> Comment
															</a>
														</div>
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="fa fa-share me-1 d-block d-sm-inline"></i> Share
															</a>
														</div>
													</div>
													<hr class="mb-3 mt-1">
													
													<div class="d-flex align-items-center">
														<img src="/assets/img/user/user.jpg" alt="" width="35" class="rounded-circle">
														<div class="flex-fill ps-2">
															<div class="position-relative d-flex align-items-center">
																<input type="text" class="form-control rounded-pill bg-white bg-opacity-15" style="padding-right: 120px;" placeholder="Write a comment...">
																<div class="position-absolute end-0 text-center">
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-smile"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-camera"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-video"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-3"><i class="fa fa-paw"></i></a>
																</div>
															</div>
														</div>
													</div>
												</card-body>
											</card>
											<card class="mb-3">
												<card-body>
													<!-- post header -->
													<div class="d-flex align-items-center mb-3">
														<a href="#"><img src="/assets/img/user/profile.jpg" alt="" width="50" class="rounded-circle"></a>
														<div class="flex-fill ps-2">
															<div class="fw-bold"><a href="#" class="text-decoration-none">Clyde Stanley</a> at <a href="#" class="text-decoration-none">United States</a></div>
															<div class="small text-inverse text-opacity-50">May 5</div>
														</div>
													</div>
						
													<!-- post content -->
													<p>Business Trip</p>
													<div class="profile-img-list">
														<div class="profile-img-list-item main"><a href="/assets/img/gallery/gallery-5.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-5.jpg)"></span></a></div>
														<div class="profile-img-list-item main"><a href="/assets/img/gallery/gallery-6.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-6.jpg)"></span></a></div>
														<div class="profile-img-list-item"><a href="/assets/img/gallery/gallery-7.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-7.jpg)"></span></a></div>
														<div class="profile-img-list-item"><a href="/assets/img/gallery/gallery-8.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-8.jpg)"></span></a></div>
														<div class="profile-img-list-item"><a href="/assets/img/gallery/gallery-9.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-9.jpg)"></span></a></div>
														<div class="profile-img-list-item"><a href="/assets/img/gallery/gallery-10.jpg" data-lity class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-10.jpg)"></span></a></div>
													</div>
													<hr class="mb-1">
								
													<!-- post action -->
													<div class="row text-center fw-bold">
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="far fa-thumbs-up me-1 d-block d-sm-inline"></i> Likes
															</a>
														</div>
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="far fa-comment me-1 d-block d-sm-inline"></i> Comment
															</a>
														</div>
														<div class="col">
															<a href="#" class="text-inverse text-opacity-50 text-decoration-none d-block p-2">
																<i class="fa fa-share me-1 d-block d-sm-inline"></i> Share
															</a>
														</div>
													</div>
													<hr class="mt-1">
													
													<div class="d-flex align-items-center">
														<img src="/assets/img/user/user.jpg" alt="" width="35" class="rounded-circle">
														<div class="flex-fill ps-2">
															<div class="position-relative d-flex align-items-center">
																<input type="text" class="form-control rounded-pill bg-white bg-opacity-15" style="padding-right: 120px;" placeholder="Write a comment...">
																<div class="position-absolute end-0 text-center">
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-smile"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-camera"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-2"><i class="fa fa-video"></i></a>
																	<a href="#" class="text-inverse text-opacity-50 me-3"><i class="fa fa-paw"></i></a>
																</div>
															</div>
														</div>
													</div>
												</card-body>
											</card>
										</div>
										<!-- END tab-pane -->
							
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade" id="profile-followers">
											<div class="list-group">
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-1.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">Ethel Wilkes</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">North Raundspic</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-2.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">Shanaya Hansen</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">North Raundspic</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-3.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">James Allman</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">North Raundspic</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-4.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">Marie Welsh</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">Crencheporford</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-5.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">Lamar Kirkland</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">Prince Ewoodswan</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-6.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">Bentley Osborne</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">Red Suvern</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-7.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">Ollie Goulding</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">Doa</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-8.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">Hiba Calvert</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">Stemunds</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-9.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">Rivka Redfern</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">Fallnee</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
												<div class="list-group-item d-flex align-items-center">
													<img src="/assets/img/user/user-10.jpg" alt="" width="50" class="rounded-sm ms-n2">
													<div class="flex-fill px-3">
														<div><a href="#" class="text-inverse fw-bold text-decoration-none">Roshni Fernandez</a></div>
														<div class="text-inverse text-opacity-50 fs-13px">Mount Lerdo</div>
													</div>
													<a href="#" class="btn btn-outline-theme">Follow</a>
												</div>
											</div>
											<div class="text-center p-3"><a href="#" class="text-inverse text-decoration-none">Show more <b class="caret"></b></a></div>
										</div>
										<!-- END tab-pane -->
							
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade" id="profile-media">
											<card class="mb-3">
												<card-header class="fw-bold bg-transparent">May 20</card-header>
												<card-body>
													<div class="widget-img-list">
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-1.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-1.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-2.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-2.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-3.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-3.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-4.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-4.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-5.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-5.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-6.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-6.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-7.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-7.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-8.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-8.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-9.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-9.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-10.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-10.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-11.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-11.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-12.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-12.jpg)"></span></a></div>
													</div>
												</card-body>
											</card>
											<card>
												<card-header class="fw-bold bg-transparent">May 16</card-header>
												<card-body>
													<div class="widget-img-list">
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-13.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-13.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-14.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-14.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-15.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-15.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-16.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-16.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-17.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-17.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-18.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-18.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-19.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-19.jpg)"></span></a></div>
														<div class="widget-img-list-item"><a href="/assets/img/gallery/gallery-20.jpg" data-lity><span class="img" style="background-image: url(/assets/img/gallery/gallery-20.jpg)"></span></a></div>
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
													</div>
												</card-body>
											</card>
											<div class="text-center p-3"><a href="#" class="text-inverse text-decoration-none">Show more <b class="caret"></b></a></div>
										</div>
										<!-- END tab-pane -->
							
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade" id="profile-video">
											<card class="mb-3">
												<card-header class="fw-bold bg-transparent">Collections #1</card-header>
												<card-body>
													<div class="row gx-1">
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=RQ5ljyGg-ig" data-lity="">
																<img src="https://img.youtube.com/vi/RQ5ljyGg-ig/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=5lWkZ-JaEOc" data-lity="">
																<img src="https://img.youtube.com/vi/5lWkZ-JaEOc/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=9ZfN87gSjvI" data-lity="">
																<img src="https://img.youtube.com/vi/9ZfN87gSjvI/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=w2H07DRv2_M" data-lity="">
																<img src="https://img.youtube.com/vi/w2H07DRv2_M/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=PntG8KEVjR8" data-lity="">
																<img src="https://img.youtube.com/vi/PntG8KEVjR8/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=q8kxKvSQ7MI" data-lity="">
																<img src="https://img.youtube.com/vi/q8kxKvSQ7MI/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=cutu3Bw4ep4" data-lity="">
																<img src="https://img.youtube.com/vi/cutu3Bw4ep4/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=gCspUXGrraM" data-lity="">
																<img src="https://img.youtube.com/vi/gCspUXGrraM/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
													</div>
												</card-body>
											</card>
											<card class="mb-3">
												<card-header class="fw-bold bg-transparent">Collections #2</card-header>
												<card-body>
													<div class="row gx-1">
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=COtpTM1MpAA" data-lity="">
																<img src="https://img.youtube.com/vi/COtpTM1MpAA/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=8NVkGHVOazc" data-lity="">
																<img src="https://img.youtube.com/vi/8NVkGHVOazc/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=ZtT3jaTcCsY" data-lity="">
																<img src="https://img.youtube.com/vi/ZtT3jaTcCsY/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=Dmw0ucCv8aQ" data-lity="">
																<img src="https://img.youtube.com/vi/Dmw0ucCv8aQ/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=r1d7ST2TG2U" data-lity="">
																<img src="https://img.youtube.com/vi/r1d7ST2TG2U/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=WUR-XWBcHvs" data-lity="">
																<img src="https://img.youtube.com/vi/WUR-XWBcHvs/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=A7sQ8RWj0Cw" data-lity="">
																<img src="https://img.youtube.com/vi/A7sQ8RWj0Cw/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
														<div class="col-md-4 col-sm-6 mb-1">
															<a href="https://www.youtube.com/watch?v=IMN2VfiXls4" data-lity="">
																<img src="https://img.youtube.com/vi/IMN2VfiXls4/mqdefault.jpg" alt="" class="d-block w-100">
															</a>
														</div>
													</div>
												</card-body>
											</card>
										</div>
										<!-- END tab-pane -->
									</div>
								</div>
								<div class="col-xl-4">
									<div class="desktop-sticky-top d-none d-lg-block">
										<card class="mb-3">
											<div class="list-group list-group-flush">
												<div class="list-group-item fw-bold px-3 d-flex">
													<span class="flex-fill">Trends for you</span> 
													<a href="#" class="text-inverse text-opacity-50"><i class="fa fa-cog"></i></a>
												</div>
												<div class="list-group-item px-3">
													<div class="text-inverse text-opacity-50"><small><strong>Trending Worldwide</strong></small></div>
													<div class="fw-bold mb-2">#BreakingNews</div>
													<a href="#" class="card text-inverse text-decoration-none mb-1">
														<div class="card-body">
															<div class="row no-gutters">
																<div class="col-md-8">
																	<div class="small text-inverse text-opacity-50 mb-1 mt-n1">Space</div>
																	<div class="h-40px fs-13px overflow-hidden mb-n1">Distant star explosion is brightest ever seen, study finds</div>
																</div>
																<div class="col-md-4 d-flex">
																	<div class="h-100 w-100" style="background: url(/assets/img/gallery/news-1.jpg) center; background-size: cover;"></div>
																</div>
															</div>
														</div>
														<div class="card-arrow">
															<div class="card-arrow-top-left"></div>
															<div class="card-arrow-top-right"></div>
															<div class="card-arrow-bottom-left"></div>
															<div class="card-arrow-bottom-right"></div>
														</div>
													</a>
													<div><small class="text-inverse text-opacity-50">1.89m share</small></div>
												</div>
												<div class="list-group-item px-3">
													<div class="fw-bold mb-2">#TrollingForGood</div>
													<div class="fs-13px mb-1">Be a good Troll and spread some positivity on HUD today.</div>
													<div><small class="text-inverse text-opacity-50"><i class="fa fa-external-link-square-alt"></i> Promoted by HUD Trolls</small></div>
												</div>
												<div class="list-group-item px-3">
													<div class="text-inverse text-opacity-50"><small><strong>Trending Worldwide</strong></small></div>
													<div class="fw-bold mb-2">#CronaOutbreak</div>
													<div class="fs-13px mb-1">The coronavirus is affecting 210 countries around the world and 2 ...</div>
													<div><small class="text-inverse text-opacity-50">49.3m share</small></div>
												</div>
												<div class="list-group-item px-3">
													<div class="text-inverse text-opacity-50"><small><strong>Trending in New York</strong></small></div>
													<div class="fw-bold mb-2">#CoronavirusPandemic</div>
													<a href="#" class="card mb-1 text-inverse text-decoration-none">
														<div class="card-body">
															<div class="row no-gutters">
																<div class="col-md-8">
																	<div class="fs-12px text-inverse text-opacity-50 mt-n1">Coronavirus</div>
																	<div class="h-40px fs-13px overflow-hidden mb-n1">Coronavirus: US suspends travel from Europe</div>
																</div>
																<div class="col-md-4 d-flex">
																	<div class="h-100 w-100" style="background: url(/assets/img/gallery/news-2.jpg) center; background-size: cover;"></div>
																</div>
															</div>
														</div>
														<div class="card-arrow">
															<div class="card-arrow-top-left"></div>
															<div class="card-arrow-top-right"></div>
															<div class="card-arrow-bottom-left"></div>
															<div class="card-arrow-bottom-right"></div>
														</div>
													</a>
													<div><small class="text-inverse text-opacity-50">821k share</small></div>
												</div>
												<a href="#" class="list-group-item list-group-action text-center">
													Show more
												</a>
											</div>
										</card>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END profile-content -->
				</div>
				<!-- END profile-container -->
			</div>
			<!-- END profile -->
		</card-body>
	</card>
</template>