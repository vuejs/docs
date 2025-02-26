<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ul class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">PAGES</a></li>
				<li class="breadcrumb-item active">PRODUCTS</li>
			</ul>
			<h1 class="page-header mb-0">Products</h1>
		</div>
		
		<div class="ms-auto">
			<a href="#" class="btn btn-outline-theme"><i class="fa fa-plus-circle fa-fw me-1"></i> Add Product</a>
		</div>
	</div>
	
	<div class="mb-sm-4 mb-3 d-sm-flex">
		<div class="mt-sm-0 mt-2"><a href="#" class="text-inverse text-opacity-75 text-decoration-none"><i class="fa fa-download fa-fw me-1 text-theme"></i> Export</a></div>
		<div class="ms-sm-4 mt-sm-0 mt-2"><a href="#" class="text-inverse text-opacity-75 text-decoration-none"><i class="fa fa-upload fa-fw me-1 text-theme"></i> Import</a></div>
		<div class="ms-sm-4 mt-sm-0 mt-2 dropdown-toggle">
			<a href="#" data-bs-toggle="dropdown" class="text-inverse text-opacity-75 text-decoration-none">More Actions</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
				<div role="separator" class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">Separated link</a>
			</div>
		</div>
	</div>
	
	<card>
		<ul class="nav nav-tabs nav-tabs-v2 px-4">
			<li class="nav-item me-3"><a href="#allTab" class="nav-link active px-2" data-bs-toggle="tab">All</a></li>
			<li class="nav-item me-3"><a href="#publishedTab" class="nav-link px-2" data-bs-toggle="tab">Published</a></li>
			<li class="nav-item me-3"><a href="#expiredTab" class="nav-link px-2" data-bs-toggle="tab">Expired</a></li>
			<li class="nav-item me-3"><a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab">Deleted</a></li>
		</ul>
		<div class="tab-content p-4">
			<div class="tab-pane fade show active" id="allTab">
				<!-- BEGIN input-group -->
				<div class="input-group mb-4">
					<button class="btn btn-outline-default dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter products &nbsp;</button>
					<div class="dropdown-menu">
						<a class="dropdown-item" href="#">Action</a>
						<a class="dropdown-item" href="#">Another action</a>
						<a class="dropdown-item" href="#">Something else here</a>
						<div role="separator" class="dropdown-divider"></div>
						<a class="dropdown-item" href="#">Separated link</a>
					</div>
					<div class="flex-fill position-relative">
						<div class="input-group">
							<div class="input-group-text position-absolute top-0 bottom-0 bg-none border-0 pe-0" style="z-index: 1020;">
								<i class="fa fa-search opacity-5"></i>
							</div>
							<input type="text" class="form-control ps-35px" placeholder="Search products" />
						</div>
					</div>
				</div>
				<!-- END input-group -->
				
				<!-- BEGIN table -->
				<div class="table-responsive">
					<table class="table table-hover text-nowrap">
						<thead>
							<tr>
								<th class="pt-0 pb-2"></th>
								<th class="pt-0 pb-2">Product</th>
								<th class="pt-0 pb-2">Inventory</th>
								<th class="pt-0 pb-2">Type</th>
								<th class="pt-0 pb-2">Vendor</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product1">
										<label class="form-check-label" for="product1"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-6.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Force Majeure White T Shirt</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">83 in stock for 3 variants</td>
								<td class="align-middle">Cotton</td>
								<td class="align-middle">Force Majeure</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product2">
										<label class="form-check-label" for="product2"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-7.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Eco-friendly fashion, organic cotton, slow fashion polo shirts</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">79 in stock for 3 variants</td>
								<td class="align-middle">Cotton</td>
								<td class="align-middle">Polo</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product3">
										<label class="form-check-label" for="product3"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-8.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Nike Shoes (Red Color)</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">19 in stock for 1 variants</td>
								<td class="align-middle">Sports</td>
								<td class="align-middle">Nike</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product4">
										<label class="form-check-label" for="product4"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-9.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Nike Air Max (Blue Color)</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">19 in stock for 1 variants</td>
								<td class="align-middle">Sports</td>
								<td class="align-middle">Nike</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product5">
										<label class="form-check-label" for="product5"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-10.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Skate Sneaker (Orange Color)</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">19 in stock for 1 variants</td>
								<td class="align-middle">Sports</td>
								<td class="align-middle">Skate</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product6">
										<label class="form-check-label" for="product6"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-11.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Teen Fashion T-shirt (Black)</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">30 in stock for 4 variants</td>
								<td class="align-middle">T-Shirt</td>
								<td class="align-middle">Tulsa</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product7">
										<label class="form-check-label" for="product7"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-12.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Levis Blue Jeans</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">49 in stock for 8 variants</td>
								<td class="align-middle">Jeans</td>
								<td class="align-middle">Levis</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product8">
										<label class="form-check-label" for="product8"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-13.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Boots (White Color)</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">19 in stock for 1 variants</td>
								<td class="align-middle">Sports</td>
								<td class="align-middle">Nike</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product9">
										<label class="form-check-label" for="product9"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-14.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Hiking Boots</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">94 in stock for 1 variants</td>
								<td class="align-middle">Sports</td>
								<td class="align-middle">Skate</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product10">
										<label class="form-check-label" for="product10"></label>
									</div>
								</td>
								<td>
									<div class="d-flex align-items-center">
										<div class="w-50px h-50px bg-white bg-opacity-25 d-flex align-items-center justify-content-center">
											<img alt="" class="mw-100 mh-100" src="/assets/img/product/product-15.jpg" />
										</div>
										<div class="ms-3">
											<RouterLink to="/page/product-details" class="text-inverse text-opacity-75 text-decoration-none">Dress (Pink)</RouterLink>
										</div>
									</div>
								</td>
								<td class="align-middle">23 in stock for 5 variants</td>
								<td class="align-middle">Dress</td>
								<td class="align-middle">Sktoe</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- END table -->
				
				<div class="d-md-flex align-items-center">
					<div class="me-md-auto text-md-left text-center mb-2 mb-md-0">
						Showing 1 to 10 of 57 entries
					</div>
					<ul class="pagination mb-0 justify-content-center">
						<li class="page-item disabled"><a class="page-link">Previous</a></li>
						<li class="page-item"><a class="page-link" href="#">1</a></li>
						<li class="page-item active"><a class="page-link" href="#">2</a></li>
						<li class="page-item"><a class="page-link" href="#">3</a></li>
						<li class="page-item"><a class="page-link" href="#">4</a></li>
						<li class="page-item"><a class="page-link" href="#">5</a></li>
						<li class="page-item"><a class="page-link" href="#">6</a></li>
						<li class="page-item"><a class="page-link" href="#">Next</a></li>
					</ul>
				</div>
			</div>
		</div>
	</card>
</template>