<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ul class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">PAGES</a></li>
				<li class="breadcrumb-item active">ORDERS</li>
			</ul>
			<h1 class="page-header mb-0">Orders</h1>
		</div>
		
		<div class="ms-auto">
			<a href="#" class="btn btn-outline-theme"><i class="fa fa-plus-circle fa-fw me-1"></i> Create Orders</a>
		</div>
	</div>
	
	<div class="mb-md-4 mb-3 d-md-flex">
		<div class="mt-md-0 mt-2"><a href="#" class="text-inverse text-opacity-75 text-decoration-none"><i class="fa fa-download fa-fw me-1 text-theme"></i> Export</a></div>
		<div class="ms-md-4 mt-md-0 mt-2 dropdown-toggle">
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
			<li class="nav-item me-3"><a href="#publishedTab" class="nav-link px-2" data-bs-toggle="tab">Unfulfilled</a></li>
			<li class="nav-item me-3"><a href="#expiredTab" class="nav-link px-2" data-bs-toggle="tab">Unpaid</a></li>
			<li class="nav-item me-3"><a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab">Open</a></li>
			<li class="nav-item me-3"><a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab">Closed</a></li>
			<li class="nav-item me-3"><a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab">Local delivery</a></li>
		</ul>
		<div class="tab-content p-4">
			<div class="tab-pane fade show active" id="allTab">
				<!-- BEGIN input-group -->
				<div class="input-group mb-4">
					<div class="flex-fill position-relative">
						<div class="input-group">
							<input type="text" class="form-control px-35px" placeholder="Filter orders" />
							<div class="input-group-text position-absolute top-0 bottom-0 bg-none border-0 start-0" style="z-index: 1020;">
								<i class="fa fa-search opacity-5"></i>
							</div>
						</div>
					</div>
					<button class="btn btn-outline-default dropdown-toggle rounded-0" type="button" data-bs-toggle="dropdown"><span class="d-none d-md-inline">Payment Status</span><span class="d-inline d-md-none"><i class="fa fa-credit-card"></i></span> &nbsp;</button>
					<div class="dropdown-menu">
						<a class="dropdown-item" href="#">Action</a>
						<a class="dropdown-item" href="#">Another action</a>
						<a class="dropdown-item" href="#">Something else here</a>
						<div role="separator" class="dropdown-divider"></div>
						<a class="dropdown-item" href="#">Separated link</a>
					</div>
					<button class="btn btn-outline-default dropdown-toggle" type="button" data-bs-toggle="dropdown"><span class="d-none d-md-inline">Fulfillment status</span><span class="d-inline d-md-none"><i class="fa fa-check"></i></span> &nbsp;</button>
					<div class="dropdown-menu dropdown-menu-end">
						<a class="dropdown-item" href="#">Action</a>
						<a class="dropdown-item" href="#">Another action</a>
						<a class="dropdown-item" href="#">Something else here</a>
						<div role="separator" class="dropdown-divider"></div>
						<a class="dropdown-item" href="#">Separated link</a>
					</div>
				</div>
				<!-- END input-group -->
				
				<!-- BEGIN table -->
				<div class="table-responsive">
					<table class="table table-hover text-nowrap">
						<thead>
							<tr>
								<th class="border-top-0 pt-0 pb-2"></th>
								<th class="border-top-0 pt-0 pb-2">Order</th>
								<th class="border-top-0 pt-0 pb-2">Date</th>
								<th class="border-top-0 pt-0 pb-2">Customer</th>
								<th class="border-top-0 pt-0 pb-2">Total</th>
								<th class="border-top-0 pt-0 pb-2">Payment status</th>
								<th class="border-top-0 pt-0 pb-2">Fulfillment status</th>
								<th class="border-top-0 pt-0 pb-2">Items</th>
								<th class="border-top-0 pt-0 pb-2">Delivery method</th>
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
								<td class="align-middle"><RouterLink to="/page/order-details">#1950</RouterLink></td>
								<td class="align-middle">Thu 26 Nov, 12:23pm</td>
								<td class="align-middle">Amanda Lee</td>
								<td>$398.00</td>
								<td class="py-1 align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Paid</span></td>
								<td class="align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Fulfilled</span></td>
								<td class="align-middle">3 items</td>
								<td class="align-middle">Free shipping</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product2">
										<label class="form-check-label" for="product2"></label>
									</div>
								</td>
								<td class="align-middle"><RouterLink to="/page/order-details">#1949</RouterLink></td>
								<td class="align-middle">Thu 26 Nov, 11:54am</td>
								<td class="align-middle">Leonard Oii</td>
								<td>$496.00</td>
								<td class="py-1 align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Paid</span></td>
								<td class="align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Fulfilled</span></td>
								<td class="align-middle">1 item</td>
								<td class="align-middle">Local pickup</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product3">
										<label class="form-check-label" for="product3"></label>
									</div>
								</td>
								<td class="align-middle"><RouterLink to="/page/order-details">#1948</RouterLink></td>
								<td class="align-middle">Thu 25 Nov, 11:54pm</td>
								<td class="align-middle">John Doe</td>
								<td>$195.00</td>
								<td class="py-1 align-middle"><span class="badge border border-warning text-warning px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Pending</span></td>
								<td class="align-middle"><span class="badge border border-warning text-warning px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Unfulfilled</span></td>
								<td class="align-middle">2 items</td>
								<td class="align-middle">Express</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product4">
										<label class="form-check-label" for="product4"></label>
									</div>
								</td>
								<td class="align-middle"><RouterLink to="/page/order-details">#1947</RouterLink></td>
								<td class="align-middle">Thu 25 Nov, 11:53pm</td>
								<td class="align-middle">Terry Ng</td>
								<td>$195.00</td>
								<td class="py-1 align-middle"><span class="badge border border-warning text-warning px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Pending</span></td>
								<td class="align-middle"><span class="badge border border-warning text-warning px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Unfulfilled</span></td>
								<td class="align-middle">2 items</td>
								<td class="align-middle">Express</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product5">
										<label class="form-check-label" for="product5"></label>
									</div>
								</td>
								<td class="align-middle"><RouterLink to="/page/order-details">#1946</RouterLink></td>
								<td class="align-middle">Thu 25 Nov, 11:52pm</td>
								<td class="align-middle">Terry Ng</td>
								<td>$195.00</td>
								<td class="py-1 align-middle"><span class="badge border border-warning text-warning px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Pending</span></td>
								<td class="align-middle"><span class="badge border border-yellow text-warning px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Unfulfilled</span></td>
								<td class="align-middle">2 items</td>
								<td class="align-middle">Express</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product6">
										<label class="form-check-label" for="product6"></label>
									</div>
								</td>
								<td class="align-middle"><RouterLink to="/page/order-details">#1945</RouterLink></td>
								<td class="align-middle">Thu 24 Nov, 2:43pm</td>
								<td class="align-middle">Lelouch Wong</td>
								<td>$900.00</td>
								<td class="py-1 align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Paid</span></td>
								<td class="align-middle"><span class="badge border border-primary text-primary px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Ready for pickup</span></td>
								<td class="align-middle">2 items</td>
								<td class="align-middle">Local pickup</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product7">
										<label class="form-check-label" for="product7"></label>
									</div>
								</td>
								<td class="align-middle"><RouterLink to="/page/order-details">#1944</RouterLink></td>
								<td class="align-middle">Thu 23 Nov, 2:43pm</td>
								<td class="align-middle">Cynthia Ting</td>
								<td>$625.00</td>
								<td class="py-1 align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Paid</span></td>
								<td class="align-middle"><span class="badge border border-primary text-primary px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Ready for delivery</span></td>
								<td class="align-middle">1 item</td>
								<td class="align-middle">Local pickup</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product8">
										<label class="form-check-label" for="product8"></label>
									</div>
								</td>
								<td class="align-middle"><RouterLink to="/page/order-details">#1943</RouterLink></td>
								<td class="align-middle">Thu 23 Nov, 11:59am</td>
								<td class="align-middle">Richard Leong</td>
								<td>$195.00</td>
								<td class="py-1 align-middle"><span class="badge border border-gray-300 text-gray-300 px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Partially refunded</span></td>
								<td class="align-middle"><span class="badge border border-danger text-danger px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Partially fulfilled</span></td>
								<td class="align-middle">2 items</td>
								<td class="align-middle">Express</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product9">
										<label class="form-check-label" for="product9"></label>
									</div>
								</td>
								<td class="align-middle"><RouterLink to="/page/order-details">#1942</RouterLink></td>
								<td class="align-middle">Thu 22 Nov, 8:12am</td>
								<td class="align-middle">Clement Tang</td>
								<td>$195.00</td>
								<td class="py-1 align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Paid</span></td>
								<td class="align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Fulfilled</span></td>
								<td class="align-middle">1 item</td>
								<td class="align-middle">Express</td>
							</tr>
							<tr>
								<td class="w-10px align-middle">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="product10">
										<label class="form-check-label" for="product10"></label>
									</div>
								</td>
								<td class="align-middle"><RouterLink to="/page/order-details">#1941</RouterLink></td>
								<td class="align-middle">Thu 22 Nov, 7:42am</td>
								<td class="align-middle">Richard Leong</td>
								<td>$195.00</td>
								<td class="py-1 align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Paid</span></td>
								<td class="align-middle"><span class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i class="fa fa-circle fs-9px fa-fw me-5px"></i> Fulfilled</span></td>
								<td class="align-middle">1 item</td>
								<td class="align-middle">Express</td>
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