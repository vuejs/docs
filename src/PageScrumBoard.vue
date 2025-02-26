<script>
import tagsInput from '@/components/plugins/TagsInput.vue';

export default {
  data () {
    return {
      tag: '',
      tags: [{
      	text: 'enhancement'
      }],
      tagsAutocomplete: []
    }
  },
  components: {
    tagsInput: tagsInput
  }
}
</script>

<template>
	<div class="d-flex align-items-center mb-md-3 mb-2">
		<div class="flex-fill">
			<ul class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">PAGES</a></li>
				<li class="breadcrumb-item active">SCRUM BOARD</li>
			</ul>
	
			<h1 class="page-header mb-0">
				Scrum Board
			</h1>
		</div>
		<div class="ms-auto">
			<a href="#modalAddTask" data-bs-toggle="modal" class="btn btn-outline-theme"><i class="fa fa-plus-circle me-1"></i> Add Task</a>
		</div>
	</div>
	
	<div class="mb-md-4 mb-3 d-md-flex">
		<div class="dropdown-toggle">
			<a href="#" data-bs-toggle="dropdown" class="text-inverse text-opacity-75 text-decoration-none"><i class="far fa-folder fa-fw fa-lg text-theme me-1"></i> project/hud</a>
			<div class="dropdown-menu">
				<a href="#" class="dropdown-item"><i class="far fa-folder fa-fw fa-lg text-theme me-1"></i> project/mobile-app-dev</a>
				<a href="#" class="dropdown-item"><i class="far fa-folder fa-fw fa-lg text-theme me-1"></i> project/bootstrap-5</a>
				<a href="#" class="dropdown-item"><i class="far fa-folder fa-fw fa-lg text-theme me-1"></i> project/mvc-version</a>
				<a href="#" class="dropdown-item"><i class="far fa-folder fa-fw fa-lg text-theme me-1"></i> project/ruby-version</a>
			</div>
		</div>
		<div class="ms-md-4 mt-md-0 mt-2"><i class="fa fa-code-branch fa-fw fa-lg me-1 text-theme"></i> 1,392 pull request</div>
		<div class="ms-md-4 mt-md-0 mt-2"><i class="fa fa-users-cog fa-fw fa-lg me-1 text-theme"></i> 52 participant</div>
		<div class="ms-md-4 mt-md-0 mt-2"><i class="far fa-clock fa-fw fa-lg me-1 text-theme"></i> 14 day(s)</div>
	</div>
	
	<!-- BEGIN row -->
	<div class="row">
		<!-- BEGIN col-4 -->
		<div class="col-xl-4 col-lg-6">
			<!-- BEGIN card -->
			<card class="mb-3">
				<!-- BEGIN card-header -->
				<card-header class="d-flex align-items-center bg-inverse bg-opacity-10">
					<span class="flex-grow-1 fw-400">To Do (5)</span>
					<a href="#" class="text-inverse text-opacity-50 text-decoration-none me-3"><i class="fa fa-fw fa-redo"></i></a>
					<a href="#" class="text-inverse text-opacity-50 text-decoration-none"><i class="fa fa-fw fa-trash"></i></a>
				</card-header>
				<!-- END card-header -->
				<!-- BEGIN list-group -->
				<div class="list-group list-group-flush">
					<!-- BEGIN list-group-item -->
					<div class="list-group-item d-flex px-3">
						<div class="me-3 pt-1">
							<i class="far fa-question-circle text-inverse text-opacity-50 fa-fw fa-lg"></i> 
						</div>
						<div class="flex-fill">
							<div class="fw-400">Enable open search</div>
							<div class="small text-inverse text-opacity-50 mb-2">#29949 opened yesterday by Terry</div>
							<div>
								<span class="badge border border-gray-300 text-inverse text-opacity-50 me-1">docs</span>
								<span class="badge border border-theme text-theme">feature</span>
							</div>
							<hr class="my-3">
							<div class="d-flex align-items-center mb-2">
								<div class="fw-400 me-2">
									Task (2/3)
								</div>
								<div>
									<a href="#" class="text-inverse text-opacity-50" data-bs-toggle="collapse" data-bs-target="#todoBoard">
										<i class="fa fa-plus-circle"></i>
									</a>
								</div>
								<div class="progress progress-xs w-100px me-2 ms-auto" style="height: 6px;">
									<div class="progress-bar progress-bar-striped bg-theme" style="width: 66%;"></div>
								</div>
								<div class="fs-12px">66%</div>
							</div>
							<div class="form-group mb-0 small">
								<div class="collapse show" id="todoBoard">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="customCheck1" checked>
										<label class="form-check-label" for="customCheck1">create ui for autocomplete</label>
									</div>
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="customCheck2" checked>
										<label class="form-check-label" for="customCheck2">integrate jquery autocomplete with ui</label>
									</div>
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="customCheck3">
										<label class="form-check-label" for="customCheck3">backend search return as json data</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END list-group-item -->
					<!-- BEGIN list-group-item -->
					<a href="#" class="list-group-item list-group-item-action d-flex ps-3">
						<div class="me-3 pt-1">
							<i class="far fa-question-circle text-inverse text-opacity-50 fa-fw fa-lg"></i> 
						</div>
						<div class="flex-fill">
							<div class="fw-400">Investigate adding markdownlint</div>
							<div class="small text-inverse text-opacity-50 mb-2">#29919 opened 9 days ago by xMediaKron</div>
							<div class="mb-1">
								<span class="badge border border-gray-300 text-inverse text-opacity-50 me-1">build</span>
								<span class="badge border border-indigo text-indigo">v5</span>
							</div>
						</div>
					</a>
					<!-- END list-group-item -->
					<!-- BEGIN list-group-item -->
					<a href="#" class="list-group-item list-group-item-action d-flex ps-3">
						<div class="me-3 pt-1">
							<i class="far fa-question-circle text-inverse text-opacity-50 fa-fw fa-lg"></i> 
						</div>
						<div class="flex-fill">
							<div class="fw-400">Add a "Submit a Resource" form</div>
							<div class="small text-inverse text-opacity-50 mb-2">#29916 opened 9 days ago by Wasbbok</div>
							<div class="mb-1 d-flex align-items-center">
								<div class="me-2"><span class="badge border border-theme text-theme">enhancement</span></div>
								<div class="widget-user-list">
									<div class="widget-user-list-item w-30px h-30px"><div class="widget-user-list-link w-30px h-30px"><img src="/assets/img/user/user-1.jpg" alt=""></div></div>
									<div class="widget-user-list-item w-30px h-30px ms-n2"><div class="widget-user-list-link w-30px h-30px"><img src="/assets/img/user/user-2.jpg" alt=""></div></div>
									<div class="widget-user-list-item w-30px h-30px ms-n2"><div class="widget-user-list-link w-30px h-30px"><img src="/assets/img/user/user-3.jpg" alt=""></div></div>
									<div class="widget-user-list-item w-30px h-30px ms-n2"><div class="widget-user-list-link w-30px h-30px"><img src="/assets/img/user/user-4.jpg" alt=""></div></div>
									<div class="widget-user-list-item w-30px h-30px ms-n2"><div class="widget-user-list-link w-30px h-30px"><img src="/assets/img/user/user-5.jpg" alt=""></div></div>
									<div class="widget-user-list-item w-30px h-30px ms-n2"><div class="widget-user-list-link w-30px h-30px bg-gray-200 text-gray-500 fs-12px fw-400">+2</div></div>
								</div>
							</div>
						</div>
					</a>
					<!-- END list-group-item -->
					<!-- BEGIN list-group-item -->
					<a href="#" class="list-group-item list-group-item-action d-flex ps-3">
						<div class="me-3 pt-1">
							<i class="far fa-question-circle text-inverse text-opacity-50 fa-fw fa-lg"></i> 
						</div>
						<div class="flex-fill">
							<div class="fw-400">Custom control border color missing on focus</div>
							<div class="small text-inverse text-opacity-50 mb-2">#29796 opened 29 days ago by mdo</div>
							<div class="mb-1">
								<span class="badge border border-pink text-pink">docs</span>
							</div>
						</div>
					</a>
					<!-- END list-group-item -->
					<!-- BEGIN list-group-item -->
					<a href="#" class="list-group-item list-group-item-action d-flex ps-3">
						<div class="me-3 pt-1">
							<i class="far fa-question-circle text-inverse text-opacity-50 fa-fw fa-lg"></i> 
						</div>
						<div class="flex-fill">
							<div class="fw-400">New design for corporate page</div>
							<div class="mb-2 small text-inverse text-opacity-50">#29919 opened 19 days ago by sean</div>
							<div class="mb-1">
								<span class="badge border border-gray-300 text-inverse text-opacity-50 me-1">design</span>
								<span class="badge border border-theme text-theme">v5</span>
							</div>
						</div>
					</a>
					<!-- END list-group-item -->
				</div>
				<!-- END list-group -->
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		<!-- BEGIN col-4 -->
		<div class="col-xl-4 col-lg-6">
			<!-- BEGIN card -->
			<card class="mb-3">
				<!-- BEGIN card-header -->
				<card-header class="d-flex align-items-center bg-inverse bg-opacity-10">
					<span class="flex-grow-1 fw-400">In Progress (2)</span>
					<a href="#" class="text-inverse text-opacity-50 text-decoration-none me-3"><i class="fa fa-fw fa-redo"></i></a>
					<a href="#" class="text-inverse text-opacity-50 text-decoration-none"><i class="fa fa-fw fa-trash"></i></a>
				</card-header>
				<!-- END card-header -->
				<!-- BEGIN list-group -->
				<div class="list-group list-group-flush">
					<!-- BEGIN list-group-item -->
					<div class="list-group-item d-flex px-3">
						<div class="me-3 pt-1">
							<i class="fa fa-tools text-inverse text-opacity-50 fa-fw fa-lg"></i> 
						</div>
						<div class="flex-fill">
							<div class="fw-400 lh-20">HTML5 flexbox old browser compatibility</div>
							<div class="small text-inverse text-opacity-50 mb-2">#29982 handled by Sean</div>
							<div class="mb-1">
								<span class="badge border border-indigo text-indigo">enhancement</span>
							</div>
							<hr class="mt-15px mb-15px">
							<div class="d-flex align-items-center mb-2">
								<div class="fw-400 me-2">
									Task (1/2)
								</div>
								<div>
									<a href="#" class="text-inverse text-opacity-50" data-bs-toggle="collapse" data-bs-target="#inProgressBoard">
										<i class="fa fa-plus-circle"></i>
									</a>
								</div>
								<div class="progress progress-xs w-100px me-2 ms-auto" style="height: 6px;">
									<div class="progress-bar progress-bar-striped bg-warning" style="width: 50%;"></div>
								</div>
								<div class="fs-12px">50%</div>
							</div>
							<div class="form-group mb-1">
								<div class="collapse show" id="inProgressBoard">
									<div class="form-check mb-2px">
										<input type="checkbox" class="form-check-input" id="customCheck4" checked>
										<label class="form-check-label small" for="customCheck4">check all browser compatibility for HTML5 flexbox</label>
									</div>
									<div class="form-check mb-2px">
										<input type="checkbox" class="form-check-input" id="customCheck5">
										<label class="form-check-label small" for="customCheck5">fallback integration by using other display property</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END list-group-item -->
					<!-- BEGIN list-group-item -->
					<div class="list-group-item d-flex px-3">
						<div class="me-3 pt-1">
							<i class="fa fa-bug text-danger fa-fw fa-lg"></i> 
						</div>
						<div class="flex-fill">
							<div class="fw-400">Mobile app autoclose on iOS</div>
							<div class="text-inverse text-opacity-50 mb-2">#29953 handled by Ken</div>
							<div class="mb-1">
								<span class="badge border border-gray-300 text-inverse text-opacity-50 me-1">issue</span>
								<span class="badge border border-danger text-danger">bug</span>
							</div>
							<hr class="mt-15px mb-15px">
							<div class="d-flex align-items-center mb-2">
								<div class="fw-400 me-2">
									Task (0/1)
								</div>
								<div>
									<a href="#" class="text-inverse text-opacity-50" data-bs-toggle="collapse" data-bs-target="#inProgress2Board">
										<i class="fa fa-plus-circle"></i>
									</a>
								</div>
								<div class="progress progress-xs w-100px me-2 ms-auto" style="height: 6px;">
									<div class="progress-bar progress-bar-striped bg-danger" style="width: 5%;"></div>
								</div>
								<div class="fs-12px">0%</div>
							</div>
							<div class="form-group mb-1">
								<div class="collapse show" id="inProgress2Board">
									<div class="form-check mb-2px">
										<input type="checkbox" class="form-check-input" id="customCheck6">
										<label class="form-check-label small" for="customCheck6">debug and fix mobile auto close while using GPS issue</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END list-group-item -->
				</div>
				<!-- END list-group -->
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		<!-- BEGIN col-4 -->
		<div class="col-xl-4 col-lg-6">
			<!-- BEGIN card -->
			<card class="mb-3">
				<!-- BEGIN card-header -->
				<card-header class="d-flex align-items-center bg-inverse bg-opacity-10">
					<span class="flex-grow-1 fw-400">Done (1)</span>
					<a href="#" class="text-inverse text-opacity-50 text-decoration-none me-3"><i class="fa fa-fw fa-redo"></i></a>
					<a href="#" class="text-inverse text-opacity-50 text-decoration-none"><i class="fa fa-fw fa-trash"></i></a>
				</card-header>
				<!-- END card-header -->
				<!-- BEGIN list-group -->
				<div class="list-group list-group-flush">
					<!-- BEGIN list-group-item -->
					<div class="list-group-item d-flex px-3">
						<div class="me-3 pt-1">
							<i class="far fa-check-circle text-success fa-fw fa-lg"></i> 
						</div>
						<div class="flex-fill">
							<div class="fw-400">React version missing daterangepicker</div>
							<div class="small text-inverse text-opacity-50 mb-2">#29930 closed yesterday by Sean</div>
							<div class="mb-1">
								<span class="badge border border-gray-300 text-gray-300 me-1">build</span>
								<span class="badge border border-success text-success">feature</span>
							</div>
							
							<hr class="my-3">
							<div class="d-flex align-items-center mb-2">
								<div class="fw-400 me-2">
									Task (3/3)
								</div>
								<div>
									<a href="#" class="text-inverse text-opacity-50" data-bs-toggle="collapse" data-bs-target="#completedBoard">
										<i class="fa fa-plus-circle"></i>
									</a>
								</div>
								<div class="progress progress-xs w-100px me-2 ms-auto" style="height: 6px;">
									<div class="progress-bar progress-bar-striped bg-success" style="width: 100%;"></div>
								</div>
								<div class="fs-12px">100%</div>
							</div>
							<div class="form-group mb-1">
								<div class="collapse show" id="completedBoard">
									<div class="form-check mb-2px">
										<input type="checkbox" class="form-check-input" id="customCheck7" checked>
										<label class="form-check-label small" for="customCheck7">install react-daterangepicker</label>
									</div>
									<div class="form-check mb-2px">
										<input type="checkbox" class="form-check-input" id="customCheck8" checked>
										<label class="form-check-label small" for="customCheck8">customize ui with scss</label>
									</div>
									<div class="form-check mb-2px">
										<input type="checkbox" class="form-check-input" id="customCheck9" checked>
										<label class="form-check-label small" for="customCheck9">backend integration for data filter with daterange input</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END list-group-item -->
				</div>
				<!-- END list-group -->
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		<!-- BEGIN col-4 -->
	</div>
	<!-- END row -->
	
	<!-- BEGIN modal -->
	<div class="modal fade" id="modalAddTask">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Add Task</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>
				<div class="modal-body">
					<div class="mb-3">
						<label class="form-label">Title</label>
						<input type="text" class="form-control" placeholder="e.g Feature enhancement" />
					</div>
					<div class="mb-3">
						<label class="form-label">Status</label>
						<select class="form-select">
							<option value="">To Do</option>
							<option value="">In Progress</option>
							<option value="">Done</option>
						</select>
					</div>
					<div class="mb-3">
						<label class="form-label">Tags</label>
						<tags-input v-model="tag" :tags="tags" :autocomplete-items="tagsAutocomplete"/>
					</div>
					<div class="form-group">
						<label>Description</label>
						<textarea class="form-control" rows="10"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<a href="#" class="btn btn-outline-default" data-bs-dismiss="modal">Cancel</a>
					<button type="button" class="btn btn-outline-theme">Create</button>
				</div>
			</div>
		</div>
	</div>
	<!-- END modal -->
</template>