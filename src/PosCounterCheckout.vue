<script>
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink } from 'vue-router';
import { Modal } from 'bootstrap';
import axios from 'axios';

const appOption = useAppOptionStore();

export default {
	data() {
		return {
			tables: '',
			selectedTable: '',
			mobileSidebarToggled: false
		}
	},
	mounted() {
		appOption.appSidebarHide = true;
		appOption.appHeaderHide = true;
		appOption.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
		appOption.appContentFullHeight = true;
		
		axios.get('/assets/data/pos/counter-checkout.json').then((response) => {
			this.tables = response.data.tables;
		});
	},
	beforeUnmount() {
		appOption.appSidebarHide = false;
		appOption.appHeaderHide = false;
		appOption.appContentClass = '';
		appOption.appContentFullHeight = false;
	},
	methods: {
		checkTime(i) {
			if (i < 10) {i = "0" + i};
			return i;
		},
		getTime() {
			var today = new Date();
			var h = today.getHours();
			var m = today.getMinutes();
			var s = today.getSeconds();
			var a;
			m = this.checkTime(m);
			s = this.checkTime(s);
			a = (h > 11) ? 'pm' : 'am';
			h = (h > 12) ? h - 12 : h;
			
			setTimeout(this.getTime, 500);
			
			return h + ":" + m + a;
		},
		getTotalPrice(orders) {
			var total = 0;
			for (var i = 0; i < orders.length; i++) {
				total += parseFloat(orders[i].price);
			}
			return total.toFixed(2);
		},
		toggleTable(event, table) {
			event.preventDefault();
			
			this.toggleMobileSidebar();
			
			if (table.selected) {
				this.selectedTable = '';
				
				for (var i = 0; i < this.tables.length; i++) {
					this.tables[i].selected = false;
				}
			} else {
				this.selectedTable = table;
				
				for (var i = 0; i < this.tables.length; i++) {
					this.tables[i].selected = (this.tables[i].id == table.id) ? true : false;
				}
			}
		},
		getPrice(orders, type) {
			var price = 0;
			
			if (orders) {
				for (var i = 0; i < orders.length; i++) {
					if (type == 'subtotal') {
						price += parseFloat(orders[i].price);
					} else if (type == 'taxes') {
						price += parseFloat(orders[i].price) * 0.06;
					} else if (type == 'total') {
						price += parseFloat(orders[i].price);
						price += parseFloat(orders[i].price) * 0.06
					}
				}
			}
			
			return price.toFixed(2);
		},
		toggleMobileSidebar() {
			this.mobileSidebarToggled = !this.mobileSidebarToggled;
			
			if (!this.mobileSidebarToggled) {
				this.selectedTable = '';
				
				for (var i = 0; i < this.tables.length; i++) {
					this.tables[i].selected = false;
				}
			}
		}
	}
}
</script>
<template>
	<!-- BEGIN pos -->
	<card class="pos pos-vertical" v-bind:class="{ 'pos-mobile-sidebar-toggled': mobileSidebarToggled }">
		<!-- BEGIN pos-container -->
		<card-body class="pos-container">
			<!-- BEGIN pos-header -->
			<div class="pos-header">
				<div class="logo">
					<RouterLink to="/pos/counter-checkout">
						<div class="logo-img"><i class="bi bi-x-diamond" style="font-size: 1.5rem;"></i></div>
						<div class="logo-text">Pine & Dine</div>
					</RouterLink>
				</div>
				<div class="time" id="time">{{ getTime() }}</div>
				<div class="nav">
					<div class="nav-item">
						<RouterLink to="/pos/kitchen-order" class="nav-link">
							<i class="bi bi-bootstrap-reboot nav-icon"></i>
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink to="/pos/table-booking" class="nav-link">
							<i class="bi bi-calendar-date nav-icon"></i>
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink to="/pos/menu-stock" class="nav-link">
							<i class="bi bi-pie-chart nav-icon"></i>
						</RouterLink>
					</div>
				</div>
			</div>
			<!-- END pos-header -->
			
			<!-- BEGIN pos-content -->
			<div class="pos-content">
				<div class="pos">
					<div class="pos-container">
						<!-- BEGIN pos-counter-content -->
						<div class="pos-content h-100">
							<perfect-scrollbar class="pos-content-container p-3 h-100">
								<div class="row gx-3">
									<template v-if="tables">
										<div class="col-xl-3 col-lg-4 col-md-6 pb-3" v-for="table in tables">
											<card class="pos-checkout-table" v-bind:class="{
												'selected': table.selected,
												'available': !table.orders && table.status != 'Reserved', 
												'in-use': table.orders, 
												'disabled': table.status == 'Reserved' 
											}">
												<a href="#" class="pos-checkout-table-container" v-on:click="(event) => toggleTable(event, table)">
													<div class="pos-checkout-table-header">
														<div class="status"><i class="bi bi-circle-fill"></i></div>
														<div class="fw-bold">Table</div>
														<div class="fw-bold display-6">{{ table.tableNo }}</div>
														<div class="text-inverse text-opacity-50">
															<span v-if="table.orders">{{ table.orders.length }} order</span>
															<span v-if="table.status == 'Reserved'">Reserved for {{ table.reserveName }}</span>
															<span v-if="!table.orders && table.status != 'Reserved'">max {{ table.totalPax }} pax</span>
														</div>
													</div>
													<div class="pos-checkout-table-info small">
														<div class="row">
															<div class="col-6 d-flex justify-content-center">
																<div class="w-20px"><i class="bi bi-people text-inverse text-opacity-50"></i></div>
																<div class="w-60px">{{ table.pax }} / {{ table.totalPax }}</div>
															</div>
															<div class="col-6 d-flex justify-content-center">
																<div class="w-20px"><i class="bi bi-clock text-inverse text-opacity-50"></i></div>
																<div class="w-60px">{{ (table.totalTime) ? table.totalTime : '-' }}</div>
															</div>
														</div>
														<div class="row">
															<div class="col-6 d-flex justify-content-center">
																<div class="w-20px"><i class="bi bi-receipt text-inverse text-opacity-50"></i></div>
																<div class="w-60px">
																	<span v-if="table.orders">${{ getTotalPrice(table.orders) }}</span>
																	<span v-else>-</span>
																</div>
															</div>
															<div class="col-6 d-flex justify-content-center">
																<div class="w-20px"><i class="bi bi-currency-dollar text-inverse text-opacity-50"></i></div>
																<div class="w-60px" v-bind:class="{ 'text-success' : table.status == 'Paid'}">{{ (table.status != 'Reserved') ? table.status : '-' }}</div>
															</div>
														</div>
													</div>
												</a>
											</card>
										</div>
									</template>
									<template v-else>
										<div class="col-12 pb-3">
											No records found
										</div>
									</template>
								</div>
							</perfect-scrollbar>
						</div>
						<!-- END pos-counter-content -->
		
						<!-- BEGIN pos-sidebar -->
						<div class="pos-sidebar" id="pos-sidebar">
							<!-- BEGIN pos-sidebar-header -->
							<div class="pos-sidebar-header">
								<div class="back-btn">
									<button type="button" v-on:click="toggleMobileSidebar()" class="btn">
										<i class="bi bi-chevron-left"></i>
									</button>
								</div>
								<div class="icon my-n1"><img src="/assets/img/pos/icon-table-black.svg" class="invert-dark" alt="" /></div>
								<div class="title">Table {{ (selectedTable && selectedTable.tableNo) ? selectedTable.tableNo : '-' }}</div>
								<div class="order">Order: <b class="text-theme">#{{ (selectedTable && selectedTable.orderNo) ? selectedTable.orderNo : '-' }}</b></div>
							</div>
							<!-- END pos-sidebar-header -->
							<hr class="m-0 opacity-3 text-inverse" />
							<!-- BEGIN pos-sidebar-body -->
							<perfect-scrollbar class="pos-sidebar-body h-100">
								<template v-if="selectedTable && selectedTable.orders">
									<div class="pos-order py-3" v-for="order in selectedTable.orders">
										<div class="pos-order-product">
											<div class="img w-40px h-40px" v-bind:style="{ backgroundImage: 'url('+ order.image +')' }"></div>
											<div class="flex-1">
												<div class="row">
													<div class="col-7">
														<div class="h6 mb-1">{{ order.title }}</div>
														<div class="small">${{ order.price }}</div>
														<div class="small"><div v-for="option in order.options"> - {{ option }}</div></div>
													</div>
													<div class="col-2">x{{ order.quantity }}</div>
													<div class="col-3 text-inverse fw-bold text-end">${{ (parseFloat(order.price) * order.quantity).toFixed(2) }}</div>
												</div>
											</div>
										</div>
									</div>
								</template>
								<template v-else>
									<div class="p-4">No records found</div>
								</template>
								<!-- END pos-order -->
							</perfect-scrollbar>
							<!-- END pos-sidebar-body -->
							<!-- BEGIN pos-sidebar-footer -->
							<div class="pos-sidebar-footer">
								<div class="d-flex align-items-center mb-2">
									<div>Subtotal</div>
									<div class="flex-1 text-end h6 mb-0">${{ getPrice(selectedTable.orders, 'subtotal') }}</div>
								</div>
								<div class="d-flex align-items-center">
									<div>Taxes (6%)</div>
									<div class="flex-1 text-end h6 mb-0">${{ getPrice(selectedTable.orders, 'taxes') }}</div>
								</div>
								<hr />
								<div class="d-flex align-items-center mb-2">
									<div>Total</div>
									<div class="flex-1 text-end h4 mb-0">${{ getPrice(selectedTable.orders, 'total') }}</div>
								</div>
								<div class="mt-3">
									<div class="btn-group d-flex">
										<a href="#" class="btn btn-outline-default rounded-0 w-80px">
											<i class="bi bi-paypal fa-lg"></i><br />
											<span class="small">E-Wallet</span>
										</a>
										<a href="#" class="btn btn-outline-default rounded-0 w-80px">
											<i class="bi bi-credit-card fa-fw fa-lg"></i><br />
											<span class="small">Card</span>
										</a>
										<a href="#" class="btn btn-outline-theme rounded-0 w-150px">
											<i class="bi bi-wallet2 fa-lg"></i><br />
											<span class="small">Cash</span>
										</a>
									</div>
								</div>
							</div>
							<!-- END pos-sidebar-footer -->
						</div>
						<!-- END pos-sidebar -->
					</div>
				</div>
			</div>
			<!-- END pos-content -->
		</card-body>
		<!-- END pos-container -->
	</card>
	<!-- END pos -->
</template>
