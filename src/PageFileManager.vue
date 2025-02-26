<script>
import { useAppOptionStore } from '@/stores/app-option';
import { Icon } from '@iconify/vue';

const appOption = useAppOptionStore();

export default {
	data() {
		return {
			mobileSidebarToggled: false
		}
	},
	components: {
		Icon: Icon
	},
	methods: {
		toggleMobileSidebar: function() {
			this.mobileSidebarToggled = !this.mobileSidebarToggled;
		}
	},
	mounted() {
		appOption.appContentFullHeight = true;
		appOption.appContentClass = 'd-flex flex-column';
		
		var fileHasSubNodes = document.querySelectorAll(".file-node.has-sub");

		fileHasSubNodes.forEach(node => {
			var fileArrow = node.querySelector(".file-link > .file-arrow");
		
			fileArrow.addEventListener("click", function (event) {
				event.preventDefault();
				node.classList.toggle("expand");
			});
		});
	
		var fileInfoNodes = document.querySelectorAll(".file-node");

		fileInfoNodes.forEach(node => {
			var fileInfo = node.querySelector(".file-link > .file-info");
		
			fileInfo.addEventListener("click", function (event) {
				event.preventDefault();
				fileInfoNodes.forEach(otherNode => {
					if (otherNode !== node) {
						otherNode.classList.remove("selected");
					}
				});
				node.classList.add("expand");
				node.classList.add("selected");
			});
		});
  },
  unmounted() {
  },
	beforeUnmount() {
		appOption.appContentFullHeight = false;
		appOption.appContentClass = '';
	}
}
</script>
<template>
	<h1 class="page-header">File Manager <small>header small text goes here...</small></h1>
	
	<card class="flex-1 m-0 d-flex flex-column overflow-hidden rounded-0">
		<card-header class="fw-bold small d-flex">
			<span class="flex-grow-1">File Manager</span>
			<card-expand-toggler></card-expand-toggler>
		</card-header>
		<card-body class="p-0 flex-1 overflow-hidden">
			<div class="file-manager h-100" v-bind:class="{ 'file-manager-sidebar-mobile-toggled': mobileSidebarToggled }">
				<div class="file-manager-toolbar">
					 <button type="button" class="btn border-0"><i class="bi bi-plus-lg me-1"></i> File</button>
					 <button type="button" class="btn border-0"><i class="bi bi-plus-lg me-1"></i> Folder</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-copy"></i> Copy</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-arrows-move"></i> Move</button>
					 <button type="button" class="btn border-0"><i class="bi me-1 bi-upload"></i> Upload</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-download"></i> Download</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-trash"></i> Delete</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-arrow-clockwise"></i> Restore</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-file-earmark-text"></i> Rename</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-pen"></i> Edit</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-pencil-square"></i> HTML Editor</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-key"></i> Permissions</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-eye"></i> View</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-unlock"></i> Extract</button>
					 <button type="button" class="btn border-0" disabled><i class="bi me-1 bi-file-earmark-zip"></i> Compress</button>
				</div>
				<div class="file-manager-container">
					<div class="file-manager-sidebar">
						<div class="file-manager-sidebar-mobile-toggler">
							<button type="button" class="btn"  v-on:click="toggleMobileSidebar()"><i class="far fa-lg fa-folder"></i></button>
						</div>
						<div class="file-manager-sidebar-content">
							<perfect-scrollbar class="h-100 p-3">
								<input type="text" class="form-control form-control-sm mb-3" placeholder="Seach file..." />
								<div class="file-tree mb-3">
									<div class="file-node has-sub expand selected">
										<a href="javascript:;" class="file-link">
											<span class="file-arrow"></span>
											<span class="file-info">
												<span class="file-icon"><i class="fa fa-folder fa-lg text-warning"></i></span>
												<span class="file-text">public_html</span>
											</span>
										</a>
										<div class="file-tree">
											<div class="file-node has-sub">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="fa fa-folder fa-lg text-warning"></i></span>
														<span class="file-text">services</span>
													</span>
												</a>
												<div class="file-tree">
													<div class="file-node has-sub">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="fa fa-folder fa-lg text-warning"></i></span>
																<span class="file-text">app_development</span>
															</span>
														</a>
														<div class="file-tree">
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">index.html</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">android_app.html</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">ios_app.html</span>
																	</span>
																</a>
															</div>
														</div>
													</div>
													<div class="file-node has-sub">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="fa fa-folder fa-lg text-warning"></i></span>
																<span class="file-text">digital_marketing</span>
															</span>
														</a>
														<div class="file-tree">
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">index.html</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">social_media.html</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">seo.html</span>
																	</span>
																</a>
															</div>
														</div>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">index.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">web_design.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">seo_services.html</span>
															</span>
														</a>
													</div>
												</div>
											</div>
											<div class="file-node has-sub">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="fa fa-folder fa-lg text-warning"></i></span>
														<span class="file-text">portfolio</span>
													</span>
												</a>
												<div class="file-tree">
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">index.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">project_1.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">project_2.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">project_3.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">project_4.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">project_5.html</span>
															</span>
														</a>
													</div>
												</div>
											</div>
											<div class="file-node has-sub">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="fa fa-folder fa-lg text-warning"></i></span>
														<span class="file-text">blog</span>
													</span>
												</a>
												<div class="file-tree">
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">index.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">post_1.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">post_2.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">post_3.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">post_4.html</span>
															</span>
														</a>
													</div>
													<div class="file-node">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
																<span class="file-text">post_5.html</span>
															</span>
														</a>
													</div>
												</div>
											</div>
											<div class="file-node has-sub">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="fa fa-folder fa-lg text-warning"></i></span>
														<span class="file-text">assets</span>
													</span>
												</a>
												<div class="file-tree">
													<div class="file-node has-sub">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="fa fa-folder fa-lg text-warning"></i></span>
																<span class="file-text">css</span>
															</span>
														</a>
														<div class="file-tree">
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">styles.css</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">main.css</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">responsive.css</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">typography.css</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">colors.css</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">layout.css</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">animations.css</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">forms.css</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">buttons.css</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">grids.css</span>
																	</span>
																</a>
															</div>
														</div>
													</div>
													<div class="file-node has-sub">
														<a href="javascript:;" class="file-link">
															<span class="file-arrow"></span>
															<span class="file-info">
																<span class="file-icon"><i class="fa fa-folder fa-lg text-warning"></i></span>
																<span class="file-text">js</span>
															</span>
														</a>
														<div class="file-tree">
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">main.js</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">script.js</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">sliders.js</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">gallery.js</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">form-validation.js</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">animations.js</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">navigation.js</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">modal.js</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">tabs.js</span>
																	</span>
																</a>
															</div>
															<div class="file-node">
																<a href="javascript:;" class="file-link">
																	<span class="file-arrow"></span>
																	<span class="file-info">
																		<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
																		<span class="file-text">accordion.js</span>
																	</span>
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
														<span class="file-text">index.html</span>
													</span>
												</a>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
														<span class="file-text">home.html</span>
													</span>
												</a>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
														<span class="file-text">about.html</span>
													</span>
												</a>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
														<span class="file-text">contact.html</span>
													</span>
												</a>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
														<span class="file-text">testimonials.html</span>
													</span>
												</a>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
														<span class="file-text">faq.html</span>
													</span>
												</a>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
														<span class="file-text">pricing.html</span>
													</span>
												</a>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="far fa-file-code fa-lg text-body text-opacity-50"></i></span>
														<span class="file-text">404.shtml</span>
													</span>
												</a>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="fa fa-file-text fa-lg text-body text-opacity-50"></i></span>
														<span class="file-text">.htaccess</span>
													</span>
												</a>
											</div>
											<div class="file-node">
												<a href="javascript:;" class="file-link">
													<span class="file-arrow"></span>
													<span class="file-info">
														<span class="file-icon"><i class="far fa-file-image fa-lg text-success"></i></span>
														<span class="file-text">favicon.ico</span>
													</span>
												</a>
											</div>
										</div>
									</div>
								</div>
							</perfect-scrollbar>
						</div>
						<div class="file-manager-sidebar-footer">
							<div class="d-flex align-items-center">
								<div class="mx-n1">
									<Icon class="iconify fa-2x text-theme" icon="solar:ssd-square-bold-duotone" />
								</div>
								<div class="flex-1 ps-3 small">
									<div class="fw-bold small">SSD Storage:</div>
									<div class="progress h-5px my-1">
										<div class="progress-bar progress-bar-striped bg-theme" style="width: 80%"></div>
									</div>
									<div class="fw-bold text-body text-opacity-50 small">
										<b class="text-body">127.7GB</b> free of <b class="text-body">256GB</b>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="file-manager-content d-flex flex-column">
						<div class="mb-0 d-flex flex-wrap text-nowrap px-10px pt-10px pb-0 border-bottom">
							<button type="button" class="btn btn-sm btn-default me-2 mb-10px px-2"><i class="fa fa-fw fa-home"></i></button>
							<button type="button" class="btn btn-sm btn-default me-2 mb-10px" disabled><i class="fa fa-fw fa-arrow-turn-up ms-n1"></i>  Up One Level</button>
					
							<div class="btn-group me-2 mb-10px">
								<button type="button" class="btn btn-sm btn-default" disabled><i class="fa me-1 fa-arrow-left"></i> Back</button>
								<button type="button" class="btn btn-sm btn-default" disabled><i class="fa me-1 fa-arrow-right"></i> Forward</button>
							</div>
							<button type="button" class="btn btn-sm btn-default me-2 mb-10px px-2"><i class="fa fa-fw fa-arrows-rotate"></i></button>
					
							<div class="btn-group me-2 mb-10px">
								<button type="button" class="btn btn-sm btn-default"><i class="fa fa-fw fa-check ms-n1"></i> Select All</button>
								<button type="button" class="btn btn-sm btn-default"><i class="far fa-fw fa-square ms-n1"></i> Unselect All</button>
							</div>
						</div>
						<div class="flex-1 overflow-hidden">
							<perfect-scrollbar class="h-100 p-0">
								<table class="table table-striped table-borderless table-sm m-0 text-nowrap small">
									<thead>
										<tr class="border-bottom">
											<th class="w-10px ps-10px"></th>
											<th class="px-10px">Name</th>
											<th class="px-10px w-100px">Size</th>
											<th class="px-10px w-200px">Last Modified</th>
											<th class="px-10px w-200px">Type</th>
											<th class="px-10px w-100px">Permission</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">services</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:35PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">portfolio</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:36PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">blog</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:04PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">assets</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:14PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">php</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:36PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">docs</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:36PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">archives</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:36PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">video</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:36PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">audio</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:36PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-folder text-warning fa-lg"></i></td>
											<td class="px-10px border-0">docs</td>
											<td class="px-10px">4 KB</td>
											<td class="px-10px">Jun 11, 2024, 10:36PM</td>
											<td class="px-10px">http:/unix-directory</td>
											<td class="px-10px border-0">0755</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="far fa-file-code text-body text-opacity-50 fa-lg"></i></td>
											<td class="px-10px border-0">index.html</td>
											<td class="px-10px">39.5 KB</td>
											<td class="px-10px">July 05, 2024, 10:35PM</td>
											<td class="px-10px">text/html</td>
											<td class="px-10px border-0">0644</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="far fa-file-code text-body text-opacity-50 fa-lg"></i></td>
											<td class="px-10px border-0">home.html</td>
											<td class="px-10px">129.1 KB</td>
											<td class="px-10px">July 06, 2024, 1:00PM</td>
											<td class="px-10px">text/html</td>
											<td class="px-10px border-0">0644</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="far fa-file-code text-body text-opacity-50 fa-lg"></i></td>
											<td class="px-10px border-0">about.html</td>
											<td class="px-10px">24 KB</td>
											<td class="px-10px">July 01, 2024, 6:59AM</td>
											<td class="px-10px">text/html</td>
											<td class="px-10px border-0">0644</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="far fa-file-code text-body text-opacity-50 fa-lg"></i></td>
											<td class="px-10px border-0">contact.html</td>
											<td class="px-10px">39.5 KB</td>
											<td class="px-10px">July 05, 2024, 10:35PM</td>
											<td class="px-10px">text/html</td>
											<td class="px-10px border-0">0644</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="far fa-file-code text-body text-opacity-50 fa-lg"></i></td>
											<td class="px-10px border-0">testimonials.html</td>
											<td class="px-10px">11 KB</td>
											<td class="px-10px">July 05, 2024, 10:35PM</td>
											<td class="px-10px">text/html</td>
											<td class="px-10px border-0">0644</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="far fa-file-code text-body text-opacity-50 fa-lg"></i></td>
											<td class="px-10px border-0">faq.html</td>
											<td class="px-10px">12 KB</td>
											<td class="px-10px">July 05, 2024, 1.59PM</td>
											<td class="px-10px">text/html</td>
											<td class="px-10px border-0">0644</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="far fa-file-code text-body text-opacity-50 fa-lg"></i></td>
											<td class="px-10px border-0">pricing.html</td>
											<td class="px-10px">128 KB</td>
											<td class="px-10px">July 05, 2024, 12.49PM</td>
											<td class="px-10px">text/html</td>
											<td class="px-10px border-0">0644</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="far fa-file-code text-body text-opacity-50 fa-lg"></i></td>
											<td class="px-10px border-0">404.shtml</td>
											<td class="px-10px">251 bytes</td>
											<td class="px-10px">July 10, 2024, 10.35AM</td>
											<td class="px-10px">text/html</td>
											<td class="px-10px border-0">0644</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="fa fa-file-text text-body text-opacity-50 fa-lg"></i></td>
											<td class="px-10px border-0">.htaccess</td>
											<td class="px-10px">128 KB</td>
											<td class="px-10px">August 05, 2024, 12.49PM</td>
											<td class="px-10px">text/html</td>
											<td class="px-10px border-0">0644</td>
										</tr>
										<tr>
											<td class="ps-10px border-0 text-center"><i class="far fa-file-image text-teal fa-lg"></i></td>
											<td class="px-10px border-0">favicon.ico</td>
											<td class="px-10px">2 KB</td>
											<td class="px-10px">July 05, 2024, 7.39AM</td>
											<td class="px-10px">image/x-generic</td>
											<td class="px-10px border-0">0644</td>
										</tr>
									</tbody>
								</table>
							</perfect-scrollbar>
						</div>
					</div>
				</div>
			</div>
		</card-body>
	</card>
</template>