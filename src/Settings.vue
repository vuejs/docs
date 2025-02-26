<script>
import navscrollto from '@/components/app/NavScrollTo.vue';
import { ScrollSpy } from 'bootstrap';

export default {
	components: {
		navScrollTo: navscrollto
	},
	mounted() {
		new ScrollSpy(document.body, {
			target: '#sidebar-bootstrap',
			offset: 200
		})
	}
}
</script>
<template>
	<!-- BEGIN row -->
	<div class="row justify-content-center">
		<!-- BEGIN col-10 -->
		<div class="col-xl-10">
			<!-- BEGIN row -->
			<div class="row">
				<!-- BEGIN col-9 -->
				<div class="col-xl-9">
					<!-- BEGIN #general -->
					<div id="general" class="mb-5">
						<h4><i class="far fa-user fa-fw text-theme"></i> General</h4>
						<p>View and update your general account information and settings.</p>
						<card>
							<div class="list-group list-group-flush">
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Name</div>
										<div class="text-inverse text-opacity-50">Sean Ngu</div>
									</div>
									<div class="w-100px">
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Username</div>
										<div class="text-inverse text-opacity-50">@seantheme</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Phone</div>
										<div class="text-inverse text-opacity-50">+1-202-555-0183</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Email address</div>
										<div class="text-inverse text-opacity-50">support@seantheme.com</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Password</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
							</div>
						</card>
					</div>
					<!-- END #general -->
					
					<!-- BEGIN #notifications -->
					<div id="notifications" class="mb-5">
						<h4><i class="far fa-bell fa-fw text-theme"></i> Notifications</h4>
						<p>Enable or disable what notifications you want to receive.</p>
						<card>
							<div class="list-group list-group-flush">
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Comments</div>
										<div class="text-inverse text-opacity-50 d-flex align-items-center">
											<i class="fa fa-circle fs-8px fa-fw text-success me-1"></i> Enabled (Push, SMS)
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Tags</div>
										<div class="text-inverse text-opacity-50 d-flex align-items-center">
											<i class="fa fa-circle fs-8px fa-fw me-1"></i> Disabled
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Reminders</div>
										<div class="text-inverse text-opacity-50 d-flex align-items-center">
											<i class="fa fa-circle fs-8px fa-fw text-success me-1"></i> Enabled (Push, Email, SMS)
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>New orders</div>
										<div class="text-inverse text-opacity-50 d-flex align-items-center">
											<i class="fa fa-circle fs-8px fa-fw text-success me-1"></i> Enabled (Push, Email, SMS)
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
							</div>
							</card>
					</div>
					<!-- END #notifications -->
					
					<!-- BEGIN #privacyAndSecurity -->
					<div id="privacyAndSecurity" class="mb-5">
						<h4><i class="far fa-copyright fa-fw text-theme"></i> Privacy and security</h4>
						<p>Limit the account visibility and the security settings for your website.</p>
						<card>
							<div class="list-group list-group-flush">
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Who can see your future posts?</div>
										<div class="text-inverse text-opacity-50 d-flex align-items-center">
											Friends only
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Photo tagging</div>
										<div class="text-inverse text-opacity-50 d-flex align-items-center">
											<i class="fa fa-circle fs-8px fa-fw text-success me-1"></i> Enabled
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Location information</div>
										<div class="text-inverse text-opacity-50 d-flex align-items-center">
											<i class="fa fa-circle fs-8px fa-fw text-muted me-1"></i> Disabled
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Firewall</div>
										<div class="text-inverse text-opacity-50 d-block d-xl-flex align-items-center">
											<div class="d-flex align-items-center"><i class="fa fa-circle fs-8px fa-fw text-muted me-1"></i> Disabled</div>
											<span class="bg-warning-transparent-1 text-warning ms-xl-3 mt-1 d-inline-block mt-xl-0 px-1 rounded-sm">
												<i class="fa fa-exclamation-circle text-warning fs-12px me-1"></i> 
												<span class="text-warning">Please enable the firewall for your website</span>
											</span>
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
							</div>
							</card>
					</div>
					<!-- END #privacyAndSecurity -->
					
					<!-- BEGIN #payment -->
					<div id="payment" class="mb-5">
						<h4><i class="far fa-credit-card fa-fw text-theme"></i> Payment</h4>
						<p>Manage your website payment provider</p>
						<card>
							<div class="list-group list-group-flush">
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Allowed payment method</div>
										<div class="text-inverse text-opacity-50">
											Paypal, Credit Card, Apple Pay, Amazon Pay, Google Wallet, Alipay, Wechatpay
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
							</div>
							</card>
					</div>
					<!-- END #payment -->
					
					<!-- BEGIN #shipping -->
					<div id="shipping" class="mb-5">
						<h4><i class="far fa-paper-plane fa-fw text-theme"></i> Shipping</h4>
						<p>Allowed shipping area and zone setting</p>
						<card>
							<div class="list-group list-group-flush">
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Allowed shipping method</div>
										<div class="text-inverse text-opacity-50">
											Local, Domestic
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
							</div>
							</card>
					</div>
					<!-- END #shipping -->
					
					<!-- BEGIN #mediaAndFiles -->
					<div id="mediaAndFiles" class="mb-5">
						<h4><i class="far fa-images fa-fw text-theme"></i> Media and Files</h4>
						<p>Allowed files and media format upload setting</p>
						<card>
							<div class="list-group list-group-flush">
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Allowed files and media format</div>
										<div class="text-inverse text-opacity-50">
											.png, .jpg, .gif, .mp4
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Media and files cdn</div>
										<div class="text-inverse text-opacity-50 d-flex align-items-center">
											<i class="fa fa-circle fs-8px fa-fw text-muted me-1"></i> Disabled
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
							</div>
							</card>
					</div>
					<!-- END #mediaAndFiles -->
					
					<!-- BEGIN #languages -->
					<div id="languages" class="mb-5">
						<h4><i class="fa fa-language fa-fw text-theme"></i> Languages</h4>
						<p>Language font support and auto translation enabled</p>
						<card>
							<div class="list-group list-group-flush">
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Language enabled</div>
										<div class="text-inverse text-opacity-50">
											English (default), Chinese, France, Portuguese, Japense
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Auto translation</div>
										<div class="text-inverse text-opacity-50 d-flex align-items-center">
											<i class="fa fa-circle fs-8px fa-fw text-success me-1"></i> Enabled
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Edit</a>
									</div>
								</div>
							</div>
							</card>
					</div>
					<!-- END #languages -->
					
					<!-- BEGIN #system -->
					<div id="system" class="mb-5">
						<h4><i class="far fa-hdd fa-fw text-theme"></i> System</h4>
						<p>System storage, bandwidth and database setting</p>
						<card>
							<div class="list-group list-group-flush">
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Web storage</div>
										<div class="text-inverse text-opacity-50">
											40.8gb / 100gb
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px">Manage</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Monthly bandwidth</div>
										<div class="text-inverse text-opacity-50">
											Unlimited
										</div>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Database</div>
										<div class="text-inverse text-opacity-50">
											MySQL version 8.0.19
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-default w-100px disabled">Update</a>
									</div>
								</div>
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Platform</div>
										<div class="text-inverse text-opacity-50">
											PHP 7.4.4, NGINX 1.17.0
										</div>
									</div>
									<div>
										<a href="#modalEdit" data-bs-toggle="modal" class="btn btn-outline-success w-100px">Update</a>
									</div>
								</div>
							</div>
							</card>
					</div>
					<!-- END #system -->
					
					<!-- BEGIN #resetSettings -->
					<div id="resetSettings" class="mb-5">
						<h4><i class="fa fa-redo fa-fw text-theme"></i> Reset settings</h4>
						<p>Reset all website setting to factory default setting.</p>
						<card>
							<div class="list-group list-group-flush">
								<div class="list-group-item d-flex align-items-center">
									<div class="flex-1 text-break">
										<div>Reset Settings</div>
										<div class="text-inverse text-opacity-50">
											This action will clear and reset all the current website setting.
										</div>
									</div>
									<div>
										<a href="#" class="btn btn-outline-default w-100px">Reset</a>
									</div>
								</div>
							</div>
							</card>
					</div>
					<!-- END #resetSettings -->
				</div>
				<!-- END col-9-->
				<!-- BEGIN col-3 -->
				<div class="col-xl-3">
					<!-- BEGIN #sidebar-bootstrap -->
					<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
						<nav class="nav">
							<nav-scroll-to target="#general" data-toggle="scroll-to">General</nav-scroll-to>
							<nav-scroll-to target="#notifications" data-toggle="scroll-to">Notifications</nav-scroll-to>
							<nav-scroll-to target="#privacyAndSecurity" data-toggle="scroll-to">Privacy and security</nav-scroll-to>
							<nav-scroll-to target="#payment" data-toggle="scroll-to">Payment</nav-scroll-to>
							<nav-scroll-to target="#shipping" data-toggle="scroll-to">Shipping</nav-scroll-to>
							<nav-scroll-to target="#mediaAndFiles" data-toggle="scroll-to">Media and Files</nav-scroll-to>
							<nav-scroll-to target="#languages" data-toggle="scroll-to">Languages</nav-scroll-to>
							<nav-scroll-to target="#system" data-toggle="scroll-to">System</nav-scroll-to>
							<nav-scroll-to target="#resetSettings" data-toggle="scroll-to">Reset settings</nav-scroll-to>
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
	
	<!-- BEGIN #modalEdit -->
	<div class="modal fade" id="modalEdit">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Edit name</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>
				<div class="modal-body">
					<div class="mb-3">
						<label class="form-label">Name</label>
						<div class="row row-space-10">
							<div class="col-4">
								<input class="form-control" placeholder="First" value="Sean" />
							</div>
							<div class="col-4">
								<input class="form-control" placeholder="Middle" value="" />
							</div>
							<div class="col-4">
								<input class="form-control" placeholder="Last" value="Ngu" />
							</div>
						</div>
					</div>
					<div class="alert bg-inverse bg-opacity-10 border-0">
						<b>Please note:</b> 
						If you change your name, you can't change it again for 60 days. 
						Don't add any unusual capitalization, punctuation, characters or random words. 
						<a href="#" class="alert-link">Learn more.</a>
					</div>
					<div class="mb-3">
						<label class="form-label">Other Names</label>
						<div>
							<a href="#" class="btn btn-outline-default"><i class="fa fa-plus fa-fw"></i> Add other names</a>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-default" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-outline-theme">Save changes</button>
				</div>
			</div>
		</div>
	</div>
	<!-- END #modalEdit -->
</template>