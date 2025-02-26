<script>
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink } from 'vue-router';
import { Modal } from 'bootstrap';
import axios from 'axios';

const appOption = useAppOptionStore();

export default {
	data() {
		return {
			order: ''
		}
	},
	mounted() {
		appOption.appSidebarHide = true;
		appOption.appHeaderHide = true;
		appOption.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
		appOption.appContentFullHeight = true;
		
		axios.get('/assets/data/pos/kitchen-order.json').then((response) => {
			this.order = response.data.order;
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
		getTotalCompletedItems(items) {
			var count = 0;
			for (var i = 0; i < items.length; i++) {
				if (items[i].status == 'Completed') {
					count++;
				}
			}
			return count;
		},
		setItemStatus(event, item, status) {
			event.preventDefault();
			
			if (confirm('Confirm set this order to ' + status + '?') === true) {
				item.status = status;
			}
		}
	}
}
</script>
<template>
	<!-- BEGIN pos -->
	<card class="pos pos-vertical" id="pos">
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
				<perfect-scrollbar class="pos-content-container h-100 p-0">
					<div class="pos-task" v-if="order" v-for="order in order">
						<div class="pos-task-info">
							<div class="h3 mb-1">Table {{ order.tableNo }}</div>
							<div class="mb-3">Order No: #{{ order.orderNo }}</div>
							<div class="mb-2">
								<span class="badge fs-14px" v-bind:class="{ 'bg-theme text-black': order.orderStatus != 'Completed', 'bg-gray-500 text-white': order.orderStatus == 'Completed'}">{{ order.orderType }}</span>
							</div>
							<div v-if="order.orderTime"><span v-bind:class="{ 'text-danger fw-bold': order.urgent }">{{ order.orderTime }}</span> time</div>
							<div v-if="order.totalOrderTime">
								All dish served<br />{{ order.totalOrderTime }} total time
							</div>
						</div>
						<div class="pos-task-body">
							<div class="fs-16px mb-3">
								Completed: ({{ getTotalCompletedItems(order.items) }}/{{ order.items.length }})
							</div>
							<div class="row gx-4">
								<div class="col-lg-3 pb-4" v-for="item in order.items">
									<div class="pos-task-product" v-bind:class="{ 'completed': item.status == 'Completed' || item.status == 'Cancelled' }">
										<div class="pos-task-product-img">
											<div class="cover" v-bind:style="{ backgroundImage: 'url('+ item.image +')' }"></div>
											
											<div class="caption" v-if="item.status == 'Completed'">
												<div>Completed</div>
											</div>
											<div class="caption" v-if="item.status == 'Cancelled'">
												<div>Cancelled</div>
											</div>
										</div>
										<div class="pos-task-product-info">
											<div class="flex-1">
												<div class="d-flex mb-2">
													<div class="h5 mb-0 flex-1">{{ item.title }}</div>
													<div class="h5 mb-0">x{{ item.quantity }}</div>
												</div>
												<div v-for="note in item.note">- {{ note }}</div>
											</div>
										</div>
										<div class="pos-task-product-action">
											<a href="#" class="btn btn-theme" 
												v-on:click="(event) => setItemStatus(event, item, 'Completed')"
												v-bind:class="{ 'disabled': item.status == 'Completed' || item.status == 'Cancelled' }">
												Complete
											</a>
											<a href="#" class="btn btn-outline-default" 
												v-on:click="(event) => setItemStatus(event, item, 'Cancelled')"
												v-bind:class="{ 'disabled': item.status == 'Completed' || item.status == 'Cancelled' }">
												Cancel
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="px-3 py-5 text-center" v-else>
						No order found
					</div>
				</perfect-scrollbar>
			</div>
			<!-- END pos-content -->
		</card-body>
		<!-- END pos-container -->
	</card>
	<!-- END pos -->
</template>
