<template>
	<div class="d-flex align-items-center mb-3">
		<div>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:;">PAGES</a></li>
				<li class="breadcrumb-item active">ORDER DETAILS</li>
			</ol>
			<h1 class="page-header mb-0">Order Details</h1>
		</div>
	</div>
	
	<div class="mb-3 d-md-flex fw-bold">
		<div class="mt-md-0 mt-2"><a href="#" class="text-decoration-none text-inverse"><i class="bi bi-printer fa-fw me-1 text-inverse text-opacity-50"></i> Print</a></div>
		<div class="ms-md-4 mt-md-0 mt-2"><a href="#" class="text-decoration-none text-inverse"><i class="bi bi-boxes fa-fw me-1 text-inverse text-opacity-50"></i> Restock items</a></div>
		<div class="ms-md-4 mt-md-0 mt-2"><a href="#" class="text-decoration-none text-inverse"><i class="bi bi-pen fa-fw me-1 text-inverse text-opacity-50"></i> Edit</a></div>
		<div class="ms-md-4 mt-md-0 mt-2 dropdown-toggle">
			<a href="#" data-bs-toggle="dropdown" class="text-decoration-none text-inverse"><i class="bi bi-gear fa-fw me-1 text-inverse text-opacity-50"></i> More Actions</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
				<div role="separator" class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">Separated link</a>
			</div>
		</div>
	</div>
	<div class="row gx-4">
		<div class="col-lg-8">
			<card class="mb-4">
				<card-header class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
					Products (3)
					<a href="#" class="ms-auto text-decoration-none text-inverse text-opacity-50"><i class="bi bi-truck fa-lg me-1"></i> Add Tracking Link</a>
				</card-header>
				<card-body class="text-inverse">
					<div class="row align-items-center">
						<div class="col-lg-8 d-flex align-items-center">
							<div class="h-65px w-65px d-flex align-items-center justify-content-center position-relative bg-white p-1">
								<img src="/assets/img/product/product-1.jpg" alt="" class="mw-100 mh-100">
								<span class="w-20px h-20px p-0 d-flex align-items-center justify-content-center badge bg-theme text-theme-color position-absolute end-0 top-0 fw-bold fs-12px rounded-pill mt-n2 me-n2">1</span>
							</div>
							<div class="ps-3 flex-1">
								<div><a href="#" class="text-decoration-none text-inverse">iPhone 13 Pro Max</a></div>
								<div class="text-inverse text-opacity-50 small">
									SKU: IP13PROMAX-512
								</div>
							</div>
						</div>
						<div class="col-lg-2 m-0 ps-lg-3">
							$999 x 1
						</div>
						<div class="col-lg-2 m-0 text-end">
							$999
						</div>
					</div>
					<hr class="my-4">
					<div class="row">
						<div class="col-lg-8 d-flex align-items-center">
							<div class="h-65px w-65px d-flex align-items-center justify-content-center position-relative bg-white p-1">
								<img src="/assets/img/product/product-2.jpg" alt="" class="mw-100 mh-100">
								<span class="w-20px h-20px p-0 d-flex align-items-center justify-content-center badge bg-theme text-theme-color position-absolute end-0 top-0 fw-bold fs-12px rounded-pill mt-n2 me-n2">1</span>
							</div>
							<div class="ps-3 flex-1">
								<div class=""><a href="#" class="text-decoration-none text-inverse">Macbook Pro 2024</a></div>
								<div class="text-inverse text-opacity-50 small">
									SKU: MACBOOKPRO-1TB
								</div>
							</div>
						</div>
						<div class="col-lg-2 m-0 ps-lg-3">
							$1,999 x 1
						</div>
						<div class="col-lg-2 m-0 text-end">
							$1,999
						</div>
					</div>
					<hr class="my-4">
					<div class="row">
						<div class="col-lg-8 d-flex align-items-center">
							<div class="h-65px w-65px d-flex align-items-center justify-content-center position-relative bg-white p-1">
								<img src="/assets/img/product/product-3.jpg" alt="" class="mw-100 mh-100">
								<span class="w-20px h-20px p-0 d-flex align-items-center justify-content-center badge bg-theme text-theme-color position-absolute end-0 top-0 fw-bold fs-12px rounded-pill mt-n2 me-n2">1</span>
							</div>
							<div class="ps-3 flex-1">
								<div class=""><a href="#" class="text-decoration-none text-inverse">Apple Watch 5</a></div>
								<div class="text-inverse text-opacity-50 small">
									SKU: APPLEWATCHBLACK
								</div>
							</div>
						</div>
						<div class="col-lg-2 m-0 ps-lg-3">
							$599 x 1
						</div>
						<div class="col-lg-2 text-inverse m-0 text-end">
							$599
						</div>
					</div>
				</card-body>
				<card-footer class="bg-none d-flex p-3">
					<a href="#" class="btn btn-outline-default ms-auto dropdown-toggle">More</a>
					<a href="#" class="btn btn-outline-theme ms-2">Add Tracking</a>
				</card-footer>
			</card>
			<card>
				<card-header class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
					Payment Records
					<a href="#" class="ms-auto text-decoration-none text-inverse text-opacity-50"><i class="bi bi-paypal me-1 fa-lg"></i> View paypal records</a>
				</card-header>
				<card-body>
					<table class="table table-borderless table-sm m-0">
						<tbody>
							<tr>
								<td class="w-150px">Subtotal</td>
								<td>3 items</td>
								<td class="text-end">$3,496.00</td>
							</tr>
							<tr>
								<td>Tax</td>
								<td>GST 5%</td>
								<td class="text-end">$174.80</td>
							</tr>
							<tr>
								<td>Shipping Fee</td>
								<td>promo code: <u class="text-success fw-bold small">FREESHIPPING</u> <small>(<span class="text-decoration-line-through">$120.00</span>)</small></td>
								<td class="text-end">$0.00</td>
							</tr>
							<tr>
								<td class="pb-2" colspan="2"><b>Total</b></td>
								<td class="text-end pb-2 text-decoration-underline"><b>$3670.80</b></td>
							</tr>
							<tr>
								<td colspan="3">
									<hr class="m-0">
								</td>
							</tr>
							<tr>
								<td class="pt-2 pb-2 text-nowrap">
									Paid by customer
								</td>
								<td class="pt-2 pb-2">
									via <a href="#" class="text-decoration-none">Paypal</a> (#IRU9589320)
								</td>
								<td class="pt-2 pb-2 text-end">$3670.80</td>
							</tr>
						</tbody>
					</table>
				</card-body>
				<card-footer class="bg-none d-flex p-3">
					<a href="#" class="btn btn-outline-theme ms-auto">Mark as paid</a>
				</card-footer>
			</card>
		</div>
		<div class="col-lg-4">
			<card class="mb-4">
				<card-header class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
					Notes
					<a href="#" class="ms-auto text-decoration-none text-inverse text-opacity-50">Edit</a>
				</card-header>
				<card-body>
					No notes from customer
				</card-body>
			</card>
			<card class="mb-4">
				<card-header class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
					Customer
					<a href="#" class="ms-auto text-decoration-none text-inverse text-opacity-50">Edit</a>
				</card-header>
				<card-body class="fw-bold">
					<div class="d-flex align-items-center">
						<a href="#" class="d-block"><img src="/assets/img/user/user-1.jpg" alt="" width="45" class="rounded-pill" /></a>
						<div class="flex-1 ps-3">
							<a href="#" class="d-block text-decoration-none">John Smith</a>
							johnsmith@gmail.com
						</div>
					</div>
				</card-body>
			</card>
			<card class="mb-4">
				<card-header class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
					Shipping Information
					<a href="#" class="ms-auto text-decoration-none text-inverse text-opacity-50">Edit</a>
				</card-header>
				<card-body class="fw-bold">
					<i class="bi bi-telephone-fill fa-fw"></i> +916-663-4289<br /><br />
					867 Highland View Drive<br />
					Newcastle, CA<br />
					California<br />
					95658<br />
					<br />
					<a href="#" class="text-decoration-none"><i class="bi bi-geo-alt-fill fa-fw"></i> View map</a>
				</card-body>
			</card>
			<card class="mb-4">
				<card-header class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400">
					Billing Information
					<a href="#" class="ms-auto text-decoration-none text-inverse text-opacity-50">Edit</a>
				</card-header>
				<card-body class="fw-bold">
					867 Highland View Drive<br />
					Newcastle, CA<br />
					California<br />
					95658<br />
				</card-body>
			</card>
		</div>
	</div>
</template>