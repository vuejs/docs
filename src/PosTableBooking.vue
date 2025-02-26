<script>
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink } from 'vue-router';
import { Modal } from 'bootstrap';
import axios from 'axios';
import datepicker from '@/components/plugins/Datepicker.vue';

const appOption = useAppOptionStore();

export default {
	data() {
		return {
			tables: '',
			currentHour: '',
			modal: '',
			modalData: ''
		}
	},
	components: {
    datepicker: datepicker
  },
	mounted() {
		appOption.appSidebarHide = true;
		appOption.appHeaderHide = true;
		appOption.appContentClass = 'p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3';
		appOption.appContentFullHeight = true;
		
		axios.get('/assets/data/pos/table-booking.json').then((response) => {
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
		getAvailableTable() {
			var count = 0;
			var today = new Date();
			var h = today.getHours();
			var a;
			a = (h > 11) ? 'pm' : 'am';
			h = (h > 12) ? h - 12 : h;
			
			this.currentHour = this.checkTime(h) + ":00" + a;
			
			for (var i = 0; i < this.tables.length; i++) {
				for (var x = 0; x < this.tables[i].reservation.length; x++) {
					if (this.tables[i].reservation[x].time == this.currentHour && !this.tables[i].reservation[x].text) {
						count++;
					}
				}
			}
			return count;
		},
		getStatus(time, text) {
			var time = time.split(':');
			var clock = time[1].split('00');
			var ampm = clock[1];
			var hour = parseInt(time[0]);
			var fullHour = (ampm == 'pm' && hour < 12) ? hour + 12 : hour;
			var today = new Date();
			var currentFullHour = today.getHours();
			var currentHour = (currentFullHour > 12) ? currentFullHour - 12 : currentFullHour;
			
			if (fullHour == currentFullHour && text) {
				return 'in-progress';
			} else if (currentFullHour > fullHour && text) {
				return 'completed';
			} else if (currentFullHour < fullHour && text) {
				return 'upcoming';
			}
			return '';
		},
		checkSameHour(time) {
			var today = new Date();
			var currentFullHour = today.getHours();
			var currentAmPm = (currentFullHour > 12) ? 'pm' : 'am';
			var currentHour = (currentFullHour > 12) ? currentFullHour - 12 : currentFullHour;
			var currentHour = (currentHour < 10) ? '0' + currentHour : currentHour;
			var currentTime = currentHour + ':00' + currentAmPm;
			
			if (currentTime == time) {
				return true;
			}
			return false;
		},
		checkAvailable(reservation) {
			for (var x = 0; x < reservation.length; x++) {
				var time = reservation[x].time.split(':');
				var hour = parseInt(time[0]);
				var today = new Date();
				var currentHour = today.getHours();
						currentHour = (currentHour > 12) ? currentHour - 12 : currentHour;
			
				if (currentHour == hour && reservation.text) {
					return true;
				}
			}
			return false;
		},
		showBookingModal(event, table) {
			event.preventDefault();
			
			this.modalData = table;
			this.modal = new Modal(this.$refs.modalPosBooking);
			this.modal.show();
		},
		submitBooking() {
			for (var i = 0; i < this.tables.length; i++) {
				if (this.tables[i].id == this.modalData.id) {
					this.tables[i] = this.modalData;
				}
			}
			this.modal.hide();
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
				<div class="pos-content-container h-100 p-4" data-scrollbar="true" data-height="100%">
					<div class="d-md-flex align-items-center mb-4">
						<div class="flex-1">
							<div class="fs-24px mb-1">Available Table ({{ getAvailableTable() }}/{{ tables.length }})</div>
							<div class="mb-2 mb-md-0 d-flex">
								<div class="d-flex align-items-center me-3">
									<i class="fa fa-circle fa-fw text-inverse text-opacity-25 fs-9px me-1"></i> Completed
								</div>
								<div class="d-flex align-items-center me-3">
									<i class="fa fa-circle fa-fw text-warning fs-9px me-1"></i> Upcoming
								</div>
								<div class="d-flex align-items-center me-3">
									<i class="fa fa-circle fa-fw text-success fs-9px me-1"></i> In-progress
								</div>
							</div>
						</div>
						<div class="w-250px">
							<datepicker />
						</div>
					</div>
					<div class="row gx-4">
						<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6" v-if="tables" v-for="table in tables">
							<card class="pos-table-booking">
								<card-body class="p-1">
									<div class="pos-table-booking-container">
										<div class="pos-table-booking-header">
											<div class="d-flex align-items-center">
												<div class="flex-1">
													<div class="title">TABLE</div>
													<div class="no">{{ table.name }}</div>
													<div class="desc">max {{ table.pax}} pax</div>
												</div>
												<div class="pe-1 text-success" v-if="checkAvailable(table.reservation)">
													<i class="bi bi-check2-circle fa-3x"></i>
												</div>
												<div class="text-inverse text-opacity-25" v-else>
													<i class="bi bi-dash-circle fa-3x"></i>
												</div>
											</div>
										</div>
										<div class="pos-table-booking-body">
											<div class="booking" v-for="reservation in table.reservation" v-bind:class="{'highlight': checkSameHour(reservation.time) }">
												<div class="time">{{ reservation.time }}</div>
												<div class="info">{{ (reservation.text) ? reservation.text : '-' }}</div>
												<div class="status" v-bind:class="getStatus(reservation.time, reservation.text)"><i class="fa fa-circle" v-if="reservation.text"></i></div>
											</div>
										</div>
									</div>
									<a href="#" class="stretched-link" v-on:click="(event) => showBookingModal(event, table)"></a>
								</card-body>
							</card>
						</div>
						<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6" v-else>
							No records found
						</div>
					</div>
				</div>
			</div>
			<!-- END pos-content -->
		</card-body>
		<!-- END pos-container -->
	</card>
	<!-- END pos -->
	
	
	<!-- BEGIN #modalPosBooking -->
	<div class="modal modal-pos fade" ref="modalPosBooking">
		<!-- BEGIN modal-dialog -->
		<div class="modal-dialog modal-lg">
			<!-- BEGIN modal-content -->
			<div class="modal-content border-0">
				<!-- BEGIN card -->
				<card v-if="modalData">
					<form v-on:submit.prevent="submitBooking">
						<!-- BEGIN card-body -->
						<card-body class="p-0">
							<!-- BEGIN modal-header -->
							<div class="modal-header align-items-center">
								<h5 class="modal-title d-flex align-items-end">
									<img src="/assets/img/pos/icon-table-black.svg" alt="" height="25" class="invert-dark me-2 opacity-5" /> 
									Table {{ modalData.name }} 
									<small class="fs-14px ms-2 text-inverse text-opacity-50">max {{ modalData.pax }} pax</small>
								</h5>
								<a href="#" data-bs-dismiss="modal" class="ms-auto btn-close"></a>
							</div>
							<!-- END modal-header -->
							<!-- BEGIN modal-body -->
							<div class="modal-body">
								<div class="row">
									<div class="col-lg-6">
										<template v-for="(reservation, index) in modalData.reservation"> 
											<div class="form-group mb-2" v-if="index <= 7">
												<div class="input-group">
													<div class="input-group-text fw-bold w-90px fs-13px">{{ reservation.time }}</div>
													<input type="text" class="form-control" placeholder="" v-model="reservation.text" />
												</div>
											</div>
										</template>
									</div>
									<div class="col-lg-6">
										<template v-for="(reservation, index) in modalData.reservation"> 
											<div class="form-group mb-2" v-if="index > 7">
												<div class="input-group">
													<div class="input-group-text fw-bold w-90px fs-13px">{{ reservation.time }}</div>
													<input type="text" class="form-control" placeholder="" v-model="reservation.text" />
												</div>
											</div>
										</template>
									</div>
								</div>
							</div>
							<!-- END modal-body -->
							<!-- BEGIN modal-footer -->
							<div class="modal-footer">
								<a href="#" class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</a>
								<button type="submit" class="btn btn-success w-100px">Book</button>
							</div>
							<!-- END modal-footer -->
						</card-body>
						<!-- END card-body -->
					</form>
				</card>
				<!-- END card -->
			</div>
			<!-- END modal-content -->
		</div>
		<!-- END modal-dialog -->
	</div>
	<!-- END #modalPosBooking -->
</template>
