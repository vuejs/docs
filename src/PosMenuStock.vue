<script>
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink } from 'vue-router';
import { Modal } from 'bootstrap';
import axios from 'axios';

const appOption = useAppOptionStore();

export default {
	data() {
		return {
			menu: ''
		}
	},
	mounted() {
		appOption.appSidebarHide = true;
		appOption.appHeaderHide = true;
		appOption.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
		appOption.appContentFullHeight = true;
		
		axios.get('/assets/data/pos/menu-stock.json').then((response) => {
			this.menu = response.data.menu;
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
				<perfect-scrollbar class="pos-content-container h-100 p-3">
					<div class="row gx-3">
						<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 pb-3" v-if="menu" v-for="(menu, index) in menu">
							<card class="h-100">
								<card-body class="h-100 p-1">
									<div class="pos-product">
										<div class="img" v-bind:style="{ backgroundImage: 'url('+ menu.image +')' }"></div>
										<div class="info">
											<div class="title text-truncate">{{ menu.title }}</div>
											<div class="desc text-truncate">{{ menu.description }}</div>
											<div class="d-flex align-items-center mb-3">
												<div class="w-100px">Stock:</div>
												<div class="flex-1">
													<input type="text" class="form-control" v-bind:value="menu.stock" />
												</div>
											</div>
											<div class="d-flex align-items-center mb-3">
												<div class="w-100px">Availability:</div>
												<div class="flex-1">
													<div class="form-check form-switch">
														<input class="form-check-input" type="checkbox" name="qty" v-bind:id="'product' + index" v-bind:checked="menu.available" value="1" />
														<label class="form-check-label" v-bind:for="'product' + index"></label>
													</div>
												</div>
											</div>
											<div>
												<a href="#" class="btn btn-theme d-block mb-2"><i class="fa fa-check fa-fw"></i> Update</a>
												<a href="#" class="btn btn-default d-block"><i class="fa fa-times fa-fw"></i> Cancel</a>
											</div>
										</div>
									</div>
								</card-body>
							</card>
						</div>
					</div>
				</perfect-scrollbar>
			</div>
			<!-- END pos-content -->
		</card-body>
		<!-- END pos-container -->
	</card>
	<!-- END pos -->
</template>
