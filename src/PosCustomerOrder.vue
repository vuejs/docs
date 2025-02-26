<script>
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink } from 'vue-router';
import { Modal } from 'bootstrap';
import axios from 'axios';

const appOption = useAppOptionStore();

export default {
	data() {
		return {
			menu: '',
			order: '',
			orderHistory: '',
			orderNo: '#0000',
			tableNo: '0',
			modal: '',
			modalData: '',
			modalQuantity: '',
			modalSelectedSize: '',
			modalSelectedAddon: [],
			mobileSidebarToggled: false
		}
	},
	mounted() {
		appOption.appSidebarHide = true;
		appOption.appHeaderHide = true;
		appOption.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
		appOption.appContentFullHeight = true;
		
		axios.get('/assets/data/pos/customer-order.json').then((response) => {
			this.menu = response.data;
			this.order = response.data.order;
			this.orderNo = response.data.orderNo;
			this.orderHistory = response.data.orderHistory;
			this.tableNo = response.data.tableNo;
		});
	},
	beforeUnmount() {
		appOption.appSidebarHide = false;
		appOption.appHeaderHide = false;
		appOption.appContentClass = '';
		appOption.appContentFullHeight = false;
	},
	methods: {
		toggleMobileSidebar: function() {
			this.mobileSidebarToggled = !this.mobileSidebarToggled;
		},
		getOrderTotal: function() {
			return (this.order) ? this.order.length : 0;
		},
		getOrderHistoryTotal: function() {
			return (this.orderHistory) ? this.orderHistory.length : 0;
		},
		getSubTotalPrice: function() {
			var value = 0;
			for (var i = 0; i < this.order.length; i++) {
				value += parseFloat(this.order[i].price) * parseInt(this.order[i].quantity);
			}
			return value.toFixed(2);
		},
		getTaxesPrice: function() {
			var value = 0;
			for (var i = 0; i < this.order.length; i++) {
				value += parseFloat(this.order[i].price) * parseInt(this.order[i].quantity) * .06;
			}
			return value.toFixed(2);
		},
		getTotalPrice: function() {
			var value = 0;
			for (var i = 0; i < this.order.length; i++) {
				value += parseFloat(this.order[i].price) * parseInt(this.order[i].quantity);
				value += parseFloat(this.order[i].price) * parseInt(this.order[i].quantity) * .06;
			}
			return value.toFixed(2);
		},
		deductQty: function(event, id) {
			event.preventDefault();
			for (var i = 0; i < this.order.length; i++) {
				if (this.order[i].id == id) {
					var newQty = parseInt(this.order[i].quantity) - 1;
					
					if (newQty < 1) {
						newQty = 1;
					}
					this.order[i].quantity = newQty;
				}
			}
		},
		addQty: function(event, id) {
			event.preventDefault();
			
			for (var i = 0; i < this.order.length; i++) {
				if (this.order[i].id == id) {
					var newQty = parseInt(this.order[i].quantity) + 1;
					
					this.order[i].quantity = newQty;
				}
			}
		},
		showType: function(event, type) {
			event.preventDefault();
			
			for (var i = 0; i < this.menu.category.length; i++) {
				if (this.menu.category[i].type == type) {
					this.menu.category[i].active = true;
				} else {
					this.menu.category[i].active = false;
				}
			}
			for (var i = 0; i < this.menu.food.length; i++) {
				if (this.menu.food[i].type == type || type == 'all') {
					this.menu.food[i].hide = false;
				} else {
					this.menu.food[i].hide = true;
				}
			}
		},
		showFoodModal: function(event, id) {
			event.preventDefault();
			
			for (var i = 0; i < this.menu.food.length; i++) {
				if (this.menu.food[i].id == id) {
					this.modalData = this.menu.food[i];
				}
			}
			if (this.modalData.options && this.modalData.options.size) {
				this.modalSelectedSize = this.modalData.options.size[0].text;
			}
			this.modalQuantity = 1;
			this.modalSelectedAddon = [];
			this.modal = new Modal(this.$refs.modalPosItem);
			this.modal.show();
		},
		addModalQty: function(event) {
			event.preventDefault();
			
			this.modalQuantity = this.modalQuantity + 1;
		},
		deductModalQty: function(event) {
			event.preventDefault();
			
			var newQty = parseInt(this.modalQuantity) - 1;
		
			if (newQty < 1) {
				newQty = 1;
			}
			this.modalQuantity = newQty;
		},
		addToCart: function(event) {
			event.preventDefault();
			
			this.modal.hide();
			
			var options = [];
			var extraPrice = 0;
			if (this.modalSelectedSize) {
				var option = {
					"key": "size",
					"value": this.modalSelectedSize
				};
				options.push(option);
			}
			if (this.modalSelectedAddon) {
				for (var i = 0; i < this.modalSelectedAddon.length; i++) {
					var option = {
						"key": "addon",
						"value": this.modalSelectedAddon[i]
					};
					options.push(option);
				}
			}
			
			this.order.push({
				"id": (this.order.length + 1),
				"image": this.modalData.image,
				"title": this.modalData.title,
				"price": this.modalData.price,
				"quantity": this.modalQuantity,
				"options": options
			});
			
			setTimeout(() => {
				this.$refs.posSidebarBody.$el.scrollTop = 9999;
				this.$refs.posSidebarBody.ps.update();
			}, 500);
		},
		toggleConfirmation: function(event, id, value) {
			event.preventDefault();
			
			for (var i = 0; i < this.order.length; i++) {
				if (this.order[i].id == id) {
					this.order[i].confirmation = value;
				}
			}
		},
		removeOrder: function(event, id) {
			event.preventDefault();
			
			for (var i = 0; i < this.order.length; i++) {
				if (this.order[i].id == id) {
					this.order.splice(i, 1);
				}
			}
		}
	}
}
</script>
<template>
	<!-- BEGIN pos -->
	<card class="pos" v-bind:class="{ 'pos-mobile-sidebar-toggled': mobileSidebarToggled }">
		<card-body class="pos-container">
			<!-- BEGIN pos-menu -->
			<div class="pos-menu">
				<!-- BEGIN logo -->
				<div class="logo">
					<RouterLink to="/">
						<div class="logo-img"><i class="bi bi-x-diamond" style="font-size: 2.1rem;"></i></div>
						<div class="logo-text">Pine & Dine</div>
					</RouterLink>
				</div>
				<!-- END logo -->
				<!-- BEGIN nav-container -->
				<div class="nav-container">
					<perfect-scrollbar class="h-100">
						<ul class="nav nav-tabs">
							<li class="nav-item" v-for="category in menu.category">
								<a class="nav-link" v-bind:class="{'active': category.active }" href="#" v-on:click="(event) => showType(event, category.type)">
									<card>
										<card-body>
											<i v-bind:class="category.icon"></i> {{ category.text }}
										</card-body>
									</card>
								</a>
							</li>
						</ul>
					</perfect-scrollbar>
				</div>
				<!-- END nav-container -->
			</div>
			<!-- END pos-menu -->
		
			<!-- BEGIN pos-content -->
			<div class="pos-content">
				<perfect-scrollbar class="pos-content-container h-100 p-4">
					<div class="row gx-4">
						<template v-for="food in menu.food">
							<div class="col-xxl-3 col-xl-4 col-lg-6 col-md-4 col-sm-6 pb-4" v-if="!food.hide">
								<!-- BEGIN card -->
								<card class="h-100">
									<card-body class="h-100 p-1">
										<a href="#" class="pos-product" v-bind:class="{ 'not-available': !food.available }" v-on:click="(event) => showFoodModal(event, food.id)">
											<div class="img" v-bind:style="{ backgroundImage: 'url('+ food.image +')' }"></div>
											<div class="info">
												<div class="title">{{ food.title }}</div>
												<div class="desc">{{ food.description }}</div>
												<div class="price">${{ food.price }}</div>
											</div>
											<div class="not-available-text" v-if="!food.available">
												<div>Not Available</div>
											</div>
										</a>
									</card-body>
								</card>
								<!-- END card -->
							</div>
						</template>
					</div>
				</perfect-scrollbar>
			</div>
			<!-- END pos-content -->
		
			<!-- BEGIN pos-sidebar -->
			<div class="pos-sidebar">
				<div class="h-100 d-flex flex-column p-0">
					<!-- BEGIN pos-sidebar-header -->
					<div class="pos-sidebar-header">
						<div class="back-btn">
							<button type="button" v-on:click="toggleMobileSidebar()" class="btn">
								<i class="bi bi-chevron-left"></i>
							</button>
						</div>
						<div class="icon"><img src="/assets/img/pos/icon-table-black.svg" class="invert-dark" alt="" /></div>
						<div class="title">Table {{ tableNo }}</div>
						<div class="order">Order: <b>{{ orderNo }}</b></div>
					</div>
					<!-- END pos-sidebar-header -->
				
					<!-- BEGIN pos-sidebar-nav -->
					<div class="pos-sidebar-nav">
						<ul class="nav nav-tabs nav-fill">
							<li class="nav-item">
								<a class="nav-link active" href="#" data-bs-toggle="tab" data-bs-target="#newOrderTab">New Order ({{ getOrderTotal() }})</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#orderHistoryTab">Order History ({{ getOrderHistoryTotal() }})</a>
							</li>
						</ul>
					</div>
					<!-- END pos-sidebar-nav -->
				
					<!-- BEGIN pos-sidebar-body -->
					<perfect-scrollbar ref="posSidebarBody" class="pos-sidebar-body tab-content">
						<!-- BEGIN #newOrderTab -->
						<div class="tab-pane fade h-100 show active" id="newOrderTab">
							<!-- BEGIN pos-order -->
							<div class="pos-order" v-if="order.length > 0" v-for="order in order">
								<div class="pos-order-product">
									<div class="img" v-bind:style="{ backgroundImage: 'url('+ order.image +')' }"></div>
									<div class="flex-1">
										<div class="h6 mb-1">{{ order.title }}</div>
										<div class="small">${{ order.price }}</div>
										<div class="small mb-2">
											<div v-for="option in order.options">- {{ option.key }}: {{ option.value }}</div>
										</div>
										<div class="d-flex">
											<a href="#" class="btn btn-outline-theme btn-sm" v-on:click="(event) => deductQty(event, order.id)"><i class="fa fa-minus"></i></a>
											<input type="text" v-model="order.quantity" class="form-control w-50px form-control-sm mx-2 bg-white bg-opacity-25 text-center" />
											<a href="#" class="btn btn-outline-theme btn-sm" v-on:click="(event) => addQty(event, order.id)"><i class="fa fa-plus"></i></a>
										</div>
									</div>
								</div>
								<div class="pos-order-price d-flex flex-column">
									<div>${{ (order.price * order.quantity).toFixed(2) }}</div>
									<div class="text-end mt-auto"><a href="#" v-on:click="(event) => toggleConfirmation(event, order.id, true)" class="btn btn-sm btn-outline-gray-500"><i class="fa fa-trash"></i></a></div>
								</div>
								
								<div class="pos-order-confirmation text-center d-flex flex-column justify-content-center" v-if="order.confirmation">
									<div class="mb-1">
										<i class="bi bi-trash fs-36px lh-1"></i>
									</div>
									<div class="mb-2">Remove this item?</div>
									<div>
										<a href="#" v-on:click="(event) => toggleConfirmation(event, order.id, false)" class="btn btn-outline-white btn-sm ms-auto me-2 width-100px">No</a>
										<a href="#" v-on:click="(event) => removeOrder(event, order.id)" class="btn btn-outline-theme btn-sm width-100px">Yes</a>
									</div>
								</div>
							</div>
							<!-- END pos-order -->
							<div v-else class="h-100 d-flex align-items-center justify-content-center text-center p-20">
								<div>
									<div class="mb-3 mt-n5">
										<i class="bi bi-bag text-inverse text-opacity-50" style="font-size: 6em"></i>
									</div>
									<h5>No order found</h5>
								</div>
							</div>
						</div>
						<!-- END #orderHistoryTab -->
					
						<!-- BEGIN #orderHistoryTab -->
						<div class="tab-pane fade h-100" id="orderHistoryTab">
							<div class="h-100 d-flex align-items-center justify-content-center text-center p-20">
								<div>
									<div class="mb-3 mt-n5">
										<i class="bi bi-bag text-inverse text-opacity-50" style="font-size: 6em"></i>
									</div>
									<h5>No order history found</h5>
								</div>
							</div>
						</div>
						<!-- END #orderHistoryTab -->
					</perfect-scrollbar>
					<!-- END pos-sidebar-body -->
				
					<!-- BEGIN pos-sidebar-footer -->
					<div class="pos-sidebar-footer">
						<div class="d-flex align-items-center mb-2">
							<div>Subtotal</div>
							<div class="flex-1 text-end h6 mb-0">${{ getSubTotalPrice() }}</div>
						</div>
						<div class="d-flex align-items-center">
							<div>Taxes (6%)</div>
							<div class="flex-1 text-end h6 mb-0">${{ getTaxesPrice() }}</div>
						</div>
						<hr />
						<div class="d-flex align-items-center mb-2">
							<div>Total</div>
							<div class="flex-1 text-end h4 mb-0">${{ getTotalPrice() }}</div>
						</div>
						<div class="mt-3">
							<div class="btn-group d-flex">
								<a href="#" class="btn btn-outline-default rounded-0 w-80px">
									<i class="bi bi-bell fa-lg"></i><br />
									<span class="small">Service</span>
								</a>
								<a href="#" class="btn btn-outline-default rounded-0 w-80px">
									<i class="bi bi-receipt fa-fw fa-lg"></i><br />
									<span class="small">Bill</span>
								</a>
								<a href="#" class="btn btn-outline-theme rounded-0 w-150px">
									<i class="bi bi-send-check fa-lg"></i><br />
									<span class="small">Submit Order</span>
								</a>
							</div>
						</div>
					</div>
					<!-- END pos-sidebar-footer -->
				</div>
			</div>
			<!-- END pos-sidebar -->
		</card-body>
	</card>
	<!-- END pos -->
	
	<!-- BEGIN pos-mobile-sidebar-toggler -->
	<a href="#" class="pos-mobile-sidebar-toggler" v-on:click="toggleMobileSidebar()">
		<i class="bi bi-bag"></i>
		<span class="badge">{{ getOrderTotal() }}</span>
	</a>
	<!-- END pos-mobile-sidebar-toggler -->
	
	<div class="modal modal-pos fade" ref="modalPosItem">
		<div class="modal-dialog modal-lg">
			<div class="modal-content border-0">
				<form v-on:submit.prevent="addToCart">
					<card v-if="modalData">
						<card-body class="p-0">
							<a href="#" data-bs-dismiss="modal" class="btn-close position-absolute top-0 end-0 m-4"></a>
							<div class="modal-pos-product">
								<div class="modal-pos-product-img">
									<div class="img" v-bind:style="{ backgroundImage: 'url('+ modalData.image +')' }"></div>
								</div>
								<div class="modal-pos-product-info d-flex flex-column">
									<div class="h4 mb-2">{{ modalData.title }}</div>
									<div class="text-inverse text-opacity-50 mb-2">
										{{ modalData.description }}
									</div>
									<div class="h4 mb-3">${{ modalData.price }}</div>
									<div class="d-flex mb-3">
										<a href="#" class="btn btn-outline-theme" v-on:click="(event) => deductModalQty(event)"><i class="fa fa-minus"></i></a>
										<input type="text" class="form-control w-50px fw-bold mx-2 bg-inverse bg-opacity-15 border-0 text-center" name="qty" v-bind:value="modalQuantity" />
										<a href="#" class="btn btn-outline-theme" v-on:click="(event) => addModalQty(event)"><i class="fa fa-plus"></i></a>
									</div>
									<template v-if="modalData.options">
										<hr class="mx-n4" />
										<div class="mb-2" v-if="modalData.options.size">
											<div class="fw-bold">Size:</div>
											<div class="option-list">
												<div class="option" v-for="(size, index) in modalData.options.size">
													<input type="radio" v-bind:id="'size['+ index +']'" name="size" class="option-input" v-model="modalSelectedSize" v-bind:value="size.text" />
													<label class="option-label" v-bind:for="'size['+ index +']'">
														<span class="option-text">{{ size.text }}</span>
														<span class="option-price">+{{ size.price }}</span>
													</label>
												</div>
											</div>
										</div>
										<div class="mb-2" v-if="modalData.options.addon">
											<div class="fw-bold">Add On:</div>
											<div class="option-list">
												<div class="option" v-for="(addon, index) in modalData.options.addon">
													<input type="checkbox" v-bind:name="'addon['+ index +']'" v-bind:value="addon.text" v-model="modalSelectedAddon" class="option-input" v-bind:id="'addon['+ index +']'" />
													<label class="option-label" v-bind:for="'addon['+ index +']'">
														<span class="option-text">{{ addon.text }}</span>
														<span class="option-price">+{{ addon.price }}</span>
													</label>
												</div>
											</div>
										</div>
									</template>
									<hr class="mx-n4 mt-auto" />
									<div class="row">
										<div class="col-4">
											<a href="#" class="btn btn-default fw-500 h4 mb-0 d-block rounded-0 py-3" data-bs-dismiss="modal">Cancel</a>
										</div>
										<div class="col-8">
											<button type="submit" class="btn btn-success w-100 fw-500 d-flex justify-content-center align-items-center rounded-0 py-3 h4 m-0">Add to cart <i class="bi bi-plus fa-2x ms-2 my-n3"></i></button>
										</div>
									</div>
								</div>
							</div>
						</card-body>
					</card>
				</form>
			</div>
		</div>
	</div>
</template>
