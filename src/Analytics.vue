<script>
import { useAppVariableStore } from '@/stores/app-variable';
import chartjs from '@/components/plugins/Chartjs.vue';
import datepicker from 'vue3-datepicker';
import Masonry from 'masonry-layout';
import moment from 'moment';

let appVariable = useAppVariableStore();

export default {
	components: {
		chartjs: chartjs,
		datepicker: datepicker
	},
	methods: {
		getPrevDay() {
			return this.prevDay;
		},
		updateDate(newDate) {
			this.prevDay = moment(newDate).add(-1, 'd').format('YYYY-MM-DD');
			this.selectedDay = moment(newDate).format('YYYY-MM-DD');
		},
		getSelectedDay() {
			return this.selectedDay;
		},
		getChart1Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.theme,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 601.5, 220]
				},{
					color: appVariable.color.gray300,
					backgroundColor: 'rgba('+ appVariable.color.gray300Rgb + ', .2)',
					borderColor: appVariable.color.gray300,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.gray300,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 500, 120, 0, 0, 0]
				}]
			};
		},
		getChart2Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.theme,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 20, 50, 100, 120]
				},{
					color: appVariable.color.gray300,
					backgroundColor: 'rgba('+ appVariable.color.gray300Rgb + ', .2)',
					borderColor: appVariable.color.gray300,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.gray300,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 30, 44, 130, 34, 15, 43, 22]
				}]
			};
		},
		getChart3Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.indigo,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.indigo,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.indigo,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 5, 18, 9]
				},{
					color: appVariable.color.theme,
					backgroundColor: 'rgba('+ appVariable.color.theme +', .2)',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 10, 26, 13]
				}]
			};
		},
		getChart4Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.theme,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 24, 39]
				},{
					color: appVariable.color.gray300,
					backgroundColor: 'rgba('+ appVariable.color.gray300Rgb + ', .2)',
					borderColor: appVariable.color.gray300,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.gray300,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 28, 35, 23, 0, 0]
				}]
			};
		},
		getChart5Data() {
			return {
				labels: ['', '4am', '8am', '12pm', '4pm', '8pm', this.nextDay],
				datasets: [{
					color: appVariable.color.theme,
					backgroundColor: 'transparent',
					borderColor: appVariable.color.theme,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 12, 5]
				},{
					color: appVariable.color.gray300,
					backgroundColor: 'rgba('+ appVariable.color.gray300Rgb + ', .2)',
					borderColor: appVariable.color.gray300,
					borderWidth: 2,
					pointBackgroundColor: appVariable.color.bodyBg,
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.bodyBg,
					pointHoverBorderColor: appVariable.color.gray300,
					pointHoverRadius: 6,
					pointHoverBorderWidth: 2,
					data: [0, 0, 0, 10, 4, 2, 0, 0]
				}]
			};
		}
	},
	data() {
		return {
			renderComponent: true,
			picked: new Date(),
			nextDay: moment().format('D MMM'),
			selectedDay: moment().format('YYYY-MM-DD'),
			prevDay: moment().add(-1, 'd').format('YYYY-MM-DD'),
			chart1: {
				type: 'line',
				data: this.getChart1Data()
			},
			chart2: {
				type: 'line',
				data: this.getChart2Data()
			},
			chart3: {
				type: 'line',
				data: this.getChart3Data()
			},
			chart4: {
				type: 'line',
				data: this.getChart4Data()
			},
			chart5: {
				type: 'line',
				data: this.getChart5Data()
			}
		}
	},
	mounted() {
		const msnry = new Masonry('[data-masonry]');
	},
	created() {
		this.emitter.on('theme-reload', (evt) => {
			this.renderComponent = false;
			
			this.$nextTick(() => {
				this.chart1.data = this.getChart1Data();
				this.chart2.data = this.getChart2Data();
				this.chart3.data = this.getChart3Data();
				this.chart4.data = this.getChart4Data();
				this.chart5.data = this.getChart5Data();
				this.renderComponent = true;
				setTimeout(() => {
					const msnry = new Masonry('[data-masonry]');
				}, 50);
			});
    })
	}
}
</script>
<template>
	<!-- BEGIN page-header -->
	<h1 class="page-header">
		Analytics <small>stats, overview & performance</small>
	</h1>
	<!-- END page-header -->
	
	<!-- BEGIN daterangepicker -->
	<div class="d-flex align-items-center mb-3">
		<div class="btn btn-outline-theme d-flex align-items-center">
			<label for="datepicker" class="">
				<i class="fa fa-fw fa-calendar"></i>
			</label>
			<datepicker id="datepicker" class="bg-none text-reset shadow-none border-0 ps-2 w-100px p-0 outline-none" @update:modelValue="updateDate" v-model="picked" />
			<label for="datepicker" class="">
				<i class="fa fa-fw fa-caret-down me-n1"></i>
			</label>
		</div>
		<span class="ms-3">compared to {{ getPrevDay() }}</span>
	</div>
	<!-- END daterangepicker -->

	<!-- BEGIN row -->
	<div class="row" data-masonry='{"percentPosition": true }' v-if="renderComponent">
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-2">
						<div class="flex-fill fw-bold fs-16px">Total sales</div>
						<a href="#" class="text-decoration-none text-inverse text-opacity-50">View report</a>
					</div>
		
					<!-- stats -->
					<div class="d-flex align-items-center h4 mb-3">
						<div>$821.50</div>
						<small class="fw-400 ms-auto text-theme">+5%</small>
					</div>
					
					<!-- chart -->
					<div>
						<div class="fs-12px fw-bold mb-2 text-inverse text-opacity-50">SALES OVER TIME</div>
						<div class="chart mb-2" style="height: 190px">
							<chartjs :type="chart1.type" :data="chart1.data" class="w-100" height="190" />
						</div>
						<div class="d-flex align-items-center justify-content-center fw-bold text-inverse text-opacity-50">
							<i class="fa fa-square text-gray-300 me-2"></i> 
							<span class="fs-12px me-4">{{ getPrevDay() }}</span>
							<i class="fa fa-square text-theme me-2"></i> 
							<span class="fs-12px">{{ getSelectedDay() }}</span>
						</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-2">
						<div class="flex-fill fw-bold fs-16px">Online store sessions</div>
						<a href="#" class="text-decoration-none text-inverse text-opacity-50">View report</a>
					</div>
		
					<!-- stats -->
					<div class="d-flex align-items-center h3 mb-3">
						<div>39</div>
						<small class="fw-400 ms-auto text-danger">-2.5%</small>
					</div>
					
					<hr class="opacity-3 my-2 mx-n3" />
					
					<!-- stats small -->
					<div class="row">
						<div class="col-6">Visitors</div>
						<div class="col-3 text-center">2</div>
						<div class="col-3 text-end">
							<span class="text-danger">-</span> 50%
						</div>
					</div>
					
					<hr class="opacity-3 my-2 mx-n3" />
					
					<!-- chart -->
					<div class="mt-3">
						<div class="fs-12px fw-bold mb-2 text-inverse text-opacity-50">SESSIONS OVER TIME</div>
						<div class="chart mb-2" style="height: 190px">
							<chartjs :type="chart2.type" :data="chart2.data" class="w-100" height="190" />
						</div>
						<div class="d-flex align-items-center justify-content-center text-inverse text-opacity-50 fw-bold">
							<i class="fa fa-square text-gray-300 me-2"></i> 
							<span class="fs-12px me-4">{{ getPrevDay() }}</span>
							<i class="fa fa-square text-theme me-2"></i> 
							<span class="fs-12px">{{ getSelectedDay() }}</span>
						</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-3">
						<div class="flex-fill fw-bold fs-16px">Top product by units sold</div>
					</div>
		
					<!-- list -->
					<div>
						<div class="row mb-2">
							<div class="col-6">iPhone 11 Pro Max</div>
							<div class="col-3 text-center">329</div>
							<div class="col-3 text-center"><span class="text-theme">+</span> 25%</div>
						</div>
						<div class="row mb-2">
							<div class="col-6">iPad Pro</div>
							<div class="col-3 text-center">219</div>
							<div class="col-3 text-center"><span class="text-danger">-</span> 5.2%</div>
						</div>
						<div class="row mb-2">
							<div class="col-6">Macbook Pro</div>
							<div class="col-3 text-center">125</div>
							<div class="col-3 text-center"><span class="text-theme">+</span> 2.3%</div>
						</div>
						<div class="row mb-2">
							<div class="col-6">iPhone SE 2</div>
							<div class="col-3 text-center">92</div>
							<div class="col-3 text-center"><span class="text-theme">+</span> 4.9%</div>
						</div>
						<div class="row">
							<div class="col-6">Apple pencil</div>
							<div class="col-3 text-center">52</div>
							<div class="col-3 text-center"><span class="text-theme">+</span> 25%</div>
						</div>
					</div>
				</card-body>
			</card>
		</div>
		<!-- END col-4 -->
		
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-2">
						<div class="flex-fill fs-16px fw-bold">Returning customer rate</div>
					</div>
		
					<!-- stats -->
					<div class="d-flex align-items-center h3 mb-3">
						<div>52.85%</div>
						<small class="fw-400 ms-auto text-danger">-7%</small>
					</div>
					
					<!-- chart -->
					<div>
						<div class="fs-12px fw-bold mb-2 text-inverse text-opacity-50">CUSTOMERS</div>
						<div class="chart mb-2" style="height: 190px">
							<chartjs :type="chart3.type" :data="chart3.data" class="w-100" height="190" />
						</div>
						<div class="d-flex align-items-center justify-content-center text-inverse text-opacity-50 fw-bold">
							<i class="fa fa-square text-indigo me-2"></i> 
							<span class="fs-12px me-4">First-time</span>
							<i class="fa fa-square text-theme me-2"></i> 
							<span class="fs-12px">Returning</span>
						</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-2">
						<div class="flex-fill fw-bold fs-16px">Conversion rate</div>
						<a href="#" class="text-decoration-none text-inverse text-opacity-50">View report</a>
					</div>
		
					<!-- stats -->
					<div class="d-flex align-items-center h3 mb-3">
						<div>5.29%</div>
						<small class="fw-400 ms-auto text-theme">+83%</small>
					</div>
					
					<!-- list -->
					<div>
						<div class="fs-12px fw-bold mb-2 text-inverse text-opacity-50">CONVERSION FUNNEL</div>
						<div class="row mb-2">
							<div class="col-6">
								<div>Added to cart</div>
								<div class="small text-inverse text-opacity-50">55 session</div>
							</div>
							<div class="col-3 text-center">25.28%</div>
							<div class="col-3 text-center"><span class="text-danger">-</span> 5%</div>
						</div>
						<div class="row mb-2">
							<div class="col-6">
								<div>Reached checkout</div>
								<div class="small text-inverse text-opacity-50">25 session</div>
							</div>
							<div class="col-3 text-center">15.28%</div>
							<div class="col-3 text-center"><span class="text-theme">+</span> 82%</div>
						</div>
						<div class="row">
							<div class="col-6">
								<div>Sessions converted</div>
								<div class="small text-inverse text-opacity-50">5 session</div>
							</div>
							<div class="col-3 text-center">5.28%</div>
							<div class="col-3 text-center"><span class="text-theme">+</span> 82%</div>
						</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-2">
						<div class="flex-fill fw-bold fs-16px">Average order value</div>
					</div>
		
					<!-- stats -->
					<div class="d-flex align-items-center h3 mb-3">
						<div>$35.12</div>
						<small class="fw-400 ms-auto text-danger">-3.2%</small>
					</div>
					
					<!-- chart -->
					<div>
						<div class="fs-12px fw-bold mb-2 text-inverse text-opacity-50">ORDERS BY TIME</div>
						<div class="chart mb-2" style="height: 190px">
							<chartjs :type="chart4.type" :data="chart4.data" class="w-100" height="190" />
						</div>
						<div class="d-flex align-items-center justify-content-center fw-bold text-inverse text-opacity-50">
							<i class="fa fa-square text-gray-300 me-2"></i> 
							<span class="fs-12px me-4">{{ getPrevDay() }}</span>
							<i class="fa fa-square text-theme me-2"></i> 
							<span class="fs-12px">{{ getSelectedDay() }}</span>
						</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-2">
						<div class="flex-fill fw-bold fs-16px">Total orders</div>
					</div>
		
					<!-- stats -->
					<div class="d-flex align-items-center h3 mb-3">
						<div>12</div>
						<small class="fw-400 ms-auto text-theme">+57%</small>
					</div>
					
					<!-- chart -->
					<div>
						<div class="fs-12px fw-bold mb-2 text-inverse text-opacity-50">ORDERS OVER TIME</div>
						<div class="chart mb-2">
							<chartjs :type="chart5.type" :data="chart5.data" class="w-100" height="190" />
						</div>
						<div class="d-flex align-items-center justify-content-center fw-bold text-inverse text-opacity-50">
							<i class="fa fa-square text-gray-300 me-2"></i> 
							<span class="fs-12px me-4">{{ getPrevDay() }}</span>
							<i class="fa fa-square text-theme me-2"></i> 
							<span class="fs-12px">{{ getSelectedDay() }}</span>
						</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-3">
						<div class="flex-fill fw-bold fs-16px">Top pages by sessions</div>
					</div>
		
					<!-- list -->
					<div class="row mb-2">
						<div class="col-6"><div><a href="#" class="text-decoration-none text-inverse text-opacity-50">/phone/apple-11-pro-max</a></div></div>
						<div class="col-3 text-center">15</div>
						<div class="col-3 text-center"><span class="text-theme">+</span> 15%</div>
					</div>
					<div class="row mb-2">
						<div class="col-6"><div><a href="#" class="text-decoration-none text-inverse text-opacity-50">/tablet/apple-ipad-pro-128gb</a></div></div>
						<div class="col-3 text-center">12</div>
						<div class="col-3 text-center"><span class="text-theme">+</span> 8%</div>
					</div>
					<div class="row">
						<div class="col-6"><div><a href="#" class="text-decoration-none text-inverse text-opacity-50">/desktop/apple-mac-pro</a></div></div>
						<div class="col-3 text-center">4</div>
						<div class="col-3 text-center"><span class="text-danger">-</span> 3%</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-3">
						<div class="flex-fill fw-bold fs-16px">Sessions by device type</div>
						<a href="#" class="text-decoration-none text-inverse text-opacity-50">View report</a>
					</div>
		
					<!-- list -->
					<div class="row mb-2">
						<div class="col-6">
							<div>Desktop</div>
						</div>
						<div class="col-3 text-center">247</div>
						<div class="col-3 text-center"><span class="text-theme">+</span> 4.2%</div>
					</div>
					<div class="row mb-2">
						<div class="col-6">
							<div>Mobile</div>
						</div>
						<div class="col-3 text-center">198</div>
						<div class="col-3 text-center"><span class="text-danger">-</span> 2.2%</div>
					</div>
					<div class="row">
						<div class="col-6">
							<div>Tablet</div>
						</div>
						<div class="col-3 text-center">35</div>
						<div class="col-3 text-center"><span class="text-theme">+</span> 8.9%</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
		
		<!-- BEGIN col-4 -->
		<div class="col-lg-6 col-xl-4 mb-4">
			<!-- BEGIN card -->
			<card>
				<card-body>
					<!-- title -->
					<div class="d-flex align-items-center mb-3">
						<div class="flex-fill fw-600 fs-16px">Visits from social sources</div>
						<a href="#" class="text-decoration-none text-inverse text-opacity-50">View report</a>
					</div>
		
					<!-- list -->
					<div class="row mb-2">
						<div class="col-6">
							<div>Facebook</div>
						</div>
						<div class="col-3 text-center">247</div>
						<div class="col-3 text-center"><span class="text-theme">+</span> 4.2%</div>
					</div>
					<div class="row mb-2">
						<div class="col-6">
							<div>Twitter</div>
						</div>
						<div class="col-3 text-center">153</div>
						<div class="col-3 text-center"><span class="text-theme">+</span> 8.2%</div>
					</div>
					<div class="row mb-2">
						<div class="col-6">
							<div>Instagram</div>
						</div>
						<div class="col-3 text-center">98</div>
						<div class="col-3 text-center"><span class="text-danger">-</span> 3.4%</div>
					</div>
					<div class="row mb-2">
						<div class="col-6">
							<div>Pinterest</div>
						</div>
						<div class="col-3 text-center">75</div>
						<div class="col-3 text-center"><span class="text-theme">+</span> 1.9%</div>
					</div>
					<div class="row">
						<div class="col-6">
							<div>Dribbble</div>
						</div>
						<div class="col-3 text-center">22</div>
						<div class="col-3 text-center"><span class="text-theme">+</span> 2.1%</div>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END col-4 -->
	</div>
	<!-- END row -->
</template>