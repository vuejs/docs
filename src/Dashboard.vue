<script>
import { useAppVariableStore } from '@/stores/app-variable';
import apexchart from '@/components/plugins/Apexcharts.vue';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';
import 'jsvectormap/dist/jsvectormap.min.css';

const appVariable = useAppVariableStore();

export default {
	components: {
		apexchart: apexchart
	},
	data() {
		return {
			renderComponent: true,
			markers: this.getMarkersData(),
			stats: this.getStatsData(),
			server: this.getServerData(),
			traffic: this.getTrafficData(),
			activityLog: this.getActivityLogData(),
			products: this.getProductsData()
		}
	},
	methods: {
		getMarkersData() {
			return [
				{ name: "Egypt", coords: [26.8206, 30.8025] },
				{ name: "Russia", coords: [61.524, 105.3188] },
				{ name: "Canada", coords: [56.1304, -106.3468] },
				{ name: "Greenland", coords: [71.7069, -42.6043] },
				{ name: "Brazil", coords: [-14.235, -51.9253] }
			];
		},
		getStatsData() {
			return [
				{ 
					title: 'SITE VISITORS', total: '4.2m', 
					info: [ { icon: 'fa fa-chevron-up fa-fw me-1', text: '33.3% more than last week' }, { icon: 'far fa-user fa-fw me-1', text: '45.5% new visitors' }, { icon: 'far fa-times-circle fa-fw me-1', text: '3.25% bounce rate'} ],
					chart: {
						height: 30,
						options: { chart: { type: 'bar', sparkline: { enabled: true } }, colors: [appVariable.color.theme], plotOptions: { bar: { horizontal: false, columnWidth: '65%',	endingShape: 'rounded' } } },
						series: [{ name: 'Visitors', data: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()] }]
					}
				},
				{ 
					title: 'STORE SALES', total: '$35.2K',
					info: [ { icon: 'fa fa-chevron-up fa-fw me-1', text: '20.4% more than last week' }, { icon: 'fa fa-shopping-bag fa-fw me-1', text: '33.5% new orders' }, { icon: 'fa fa-dollar-sign fa-fw me-1', text: '6.21% conversion rate'} ],
					chart: {
						height: 30,
						options: { chart: { type: 'line', sparkline: { enabled: true } }, colors: [appVariable.color.theme], stroke: { curve: 'straight', width: 2 } },
						series: [{ name: 'Visitors', data: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()] }]
					}
				},
				{ title: 'NEW MEMBERS', total: '4,490',
					info: [ { icon: 'fa fa-chevron-up fa-fw me-1', text: '59.5% more than last week' }, { icon: 'fab fa-facebook-f fa-fw me-1', text: '45.5% from facebook' }, { icon: 'fab fa-youtube fa-fw me-1', text: '15.25% from youtube'} ],
					chart: {
						height: 45,
						options: { chart: { type: 'pie', sparkline: { enabled: true } }, colors: ['rgba('+ appVariable.color.themeRgb + ', 1)', 'rgba('+ appVariable.color.themeRgb + ', .75)', 'rgba('+ appVariable.color.themeRgb + ', .5)'], stroke: { show: false } },
						series: [this.randomNo(), this.randomNo(), this.randomNo()]
					}
				},
				{
					title: 'BANDWIDTH', total: '4.5TB',
					info: [ { icon: 'fa fa-chevron-up fa-fw me-1', text: '5.3% more than last week' }, { icon: 'far fa-hdd fa-fw me-1', text: '10.5% from total usage' }, { icon: 'far fa-hand-point-up fa-fw me-1', text: '2MB per visit'} ],
					chart: {
						height: 45,
						options: { chart: { type: 'donut', sparkline: { enabled: true } }, colors: ['rgba('+ appVariable.color.themeRgb + ', .15)', 'rgba('+ appVariable.color.themeRgb + ', .35)', 'rgba('+ appVariable.color.themeRgb + ', .55)', 'rgba('+ appVariable.color.themeRgb + ', .75)', 'rgba('+ appVariable.color.themeRgb + ', .95)'], stroke: { show: false, curve: 'smooth', lineCap: 'butt', colors: 'rgba(' + appVariable.color.blackRgb + ', .25)', width: 2, dashArray: 0 }, plotOptions: { pie: { donut: { background: 'transparent' } } } },
						series: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()]
					}
				}
			];
		},
		getServerData() {
			Apex = {
				title: {
					style: {
						fontSize:  '14px',
						fontWeight:  'bold',
						fontFamily:  appVariable.font.bodyFontfamily,
						color:  appVariable.color.bodyColor
					},
				},
				legend: {
					fontFamily: appVariable.font.bodyFontfamily,
					labels: {
						colors: appVariable.color.bodyColor
					}
				},
				tooltip: {
					style: {
						fontSize: '12px',
						fontFamily: appVariable.font.bodyFontfamily
					}
				},
				grid: {
					borderColor: 'rgba('+ appVariable.color.bodyColorRgb + ', .25)',
				},
				dataLabels: {
					style: {
						fontSize: '12px',
						fontFamily: appVariable.font.bodyFontfamily,
						fontWeight: 'bold',
						colors: undefined
					}
				},
				xaxis: {
					axisBorder: {
						show: true,
						color: 'rgba('+ appVariable.color.bodyColorRgb + ', .25)',
						height: 1,
						width: '100%',
						offsetX: 0,
						offsetY: -1
					},
					axisTicks: {
						show: true,
						borderType: 'solid',
						color: 'rgba('+ appVariable.color.bodyColorRgb + ', .25)',
						height: 6,
						offsetX: 0,
						offsetY: 0
					},
					labels: {
						style: {
							colors: appVariable.color.bodyColor,
							fontSize: '12px',
							fontFamily: appVariable.font.bodyFontfamily,
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-label',
						}
					}
				},
				yaxis: {
					labels: {
						style: {
							colors: appVariable.color.bodyColor,
							fontSize: '12px',
							fontFamily: appVariable.font.bodyFontfamily,
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-label',
						}
					}
				}
			};
			return {
				chart: {
					series: [
						{ name: 'MEMORY USAGE', data: [ this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo() ] },
						{ name: 'CPU USAGE', data: [ this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo() ] }
					],
					options: {
						colors: ['rgba('+ appVariable.color.inverseRgb + ', .25)', appVariable.color.theme],
						xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { show: false } },
						fill: { opacity: .65 },
						tooltip: { y: { formatter: function (val) { return "$ " + val + " thousands" } } },
						chart: { height: '100%', type: 'bar', toolbar: { show: false } },
						plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
						dataLabels: { enabled: false },
						grid: { show: true, borderColor: 'rgba('+ appVariable.color.inverseRgb +', .15)' },
						stroke: { show: false }
					}
				},
				stats: [
					{
						name: 'DISK USAGE', total: '20.04 / 256 GB', progress: '20%', time: 'Last updated 1 min ago',
						info: [ { title: 'DISK C', value: '19.56GB', class: 'text-theme' }, { title: 'DISK D', value: '0.50GB', class: 'text-theme text-opacity-50' } ],
						chart: {
							height: 50,
							options: { chart: { type: 'donut', sparkline: { enabled: true } }, colors: ['rgba('+ appVariable.color.themeRgb + ', .15)', 'rgba('+ appVariable.color.themeRgb + ', .35)', 'rgba('+ appVariable.color.themeRgb + ', .55)', 'rgba('+ appVariable.color.themeRgb + ', .75)', 'rgba('+ appVariable.color.themeRgb + ', .95)'], stroke: { show: false, curve: 'smooth', lineCap: 'butt', colors: 'rgba(' + appVariable.color.blackRgb + ', .25)', width: 2, dashArray: 0 }, plotOptions: { pie: { donut: { background: 'transparent' } } } },
							series: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()]
						}
					},
					{
						name: 'BANDWIDTH', total: '83.76GB / 10TB', progress: '10%', time: 'Last updated 1 min ago',
						info: [ { title: 'HTTP', value: '35.47GB', class: 'text-theme' }, { title: 'FTP', value: '1.25GB', class: 'text-theme text-opacity-50' } ],
						chart: {
							height: 50,
							options: { chart: { type: 'donut', sparkline: { enabled: true } }, colors: ['rgba('+ appVariable.color.themeRgb + ', .15)', 'rgba('+ appVariable.color.themeRgb + ', .35)', 'rgba('+ appVariable.color.themeRgb + ', .55)', 'rgba('+ appVariable.color.themeRgb + ', .75)', 'rgba('+ appVariable.color.themeRgb + ', .95)'], stroke: { show: false, curve: 'smooth', lineCap: 'butt', colors: 'rgba(' + appVariable.color.blackRgb + ', .25)', width: 2, dashArray: 0 }, plotOptions: { pie: { donut: { background: 'transparent' } } } },
							series: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()]
						}
					}
				]
			};
		},
		getTrafficData() {
			return {
				country: [
					{ name: 'FRANCE',	visits: '13,849', pct: '40.79%', class: '' },
					{ name: 'SPAIN',	visits: '3,216', pct: '9.79%', class: '' },
					{ name: 'MEXICO',	visits: '1,398', pct: '4.26%', class: 'fw-bold text-theme' },
					{ name: 'UNITED STATES',	visits: '1,090', pct: '3.32%', class: '' },
					{ name: 'BELGIUM',	visits: '1,045', pct: '3.18%', class: ''}
				],
				source: [
					{ name: 'FEED', percentage: '25.70%', class: 'bg-theme bg-opacity-95' },
					{ name: 'ORGANIC', percentage: '24.30%', class: 'bg-theme bg-opacity-75' },
					{ name: 'REFERRAL', percentage: '23.05%', class: 'bg-theme bg-opacity-55' },
					{ name: 'DIRECT', percentage: '14.85%', class: 'bg-theme bg-opacity-35' },
					{ name: 'EMAIL', percentage: '7.35%', class: 'bg-theme bg-opacity-15' }
				],
				chart: {
					height: 70,
					options: { chart: { type: 'donut', sparkline: { enabled: true } }, colors: ['rgba('+ appVariable.color.themeRgb + ', .15)', 'rgba('+ appVariable.color.themeRgb + ', .35)', 'rgba('+ appVariable.color.themeRgb + ', .55)', 'rgba('+ appVariable.color.themeRgb + ', .75)', 'rgba('+ appVariable.color.themeRgb + ', .95)'], stroke: { show: false, curve: 'smooth', lineCap: 'butt', colors: 'rgba(' + appVariable.color.blackRgb + ', .25)', width: 2, dashArray: 0 }, plotOptions: { pie: { donut: { background: 'transparent' } } } },
					series: [this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo(), this.randomNo()]
				}
			};
		},
		getActivityLogData() {
			return [
				{ title: 'You have sold an item - $1,299', time: 'just now', badge: 'PRODUCT', highlight: true},
				{ title: 'Firewall upgrade', time: '1 min ago', badge: 'SERVER', highlight: false},
				{ title: 'Push notification v2.0 installation', time: '1 mins ago', badge: 'ANDROID', highlight: false},
				{ title: 'New Subscription - 1yr Plan', time: '1 min ago', badge: 'SALES', highlight: true},
				{ title: '2 Unread enquiry', time: '2 mins ago', badge: 'ENQUIRY', highlight: false},
				{ title: '$30,402 received from Paypal', time: '2 mins ago', badge: 'PAYMENT', highlight: true},
				{ title: '3 payment received', time: '5 mins ago', badge: 'PAYMENT', highlight: true},
				{ title: '1 pull request from github', time: '5 mins ago', badge: 'GITHUB', highlight: false},
				{ title: '3 pending invoice to generate', time: '5 mins ago', badge: 'INVOICE', highlight: false},
				{ title: '2 new message from fb messenger', time: '7 mins ago', badge: 'INBOX', highlight: false}
			];
		},
		getProductsData() {
			return [
				{ img: '/assets/img/dashboard/product-1.jpeg', sku: 'SKU90400', title: 'Huawei Smart Watch', price: '$399.00', qty: '129', revenue: '$51,471', profit: '$15,441' }, 
				{ img: '/assets/img/dashboard/product-2.jpeg', sku: 'SKU85999', title: 'Nike Shoes Black Version', price: '$99.00', qty:	'108', revenue: '$10,692', profit:	'$5,346' }, 
				{ img: '/assets/img/dashboard/product-3.jpeg', sku: 'SKU20400', title: 'White Sony PS4', price: '$599', qty: '72', revenue: '$43,128', profit:	'$4,312' },
				{ img: '/assets/img/dashboard/product-4.jpeg', sku: 'SKU19299', title: 'Apple Watch Series 5', price: '$1,099', qty: '53', revenue: '$58,247', profit:	'$2,912' },
				{ img: '/assets/img/dashboard/product-5.jpeg', sku: 'SKU19299', title: 'Black Nikon DSLR', price: '1,899', qty: '50', revenue: '$90,950', profit:	'$2,848' }
			];
		},
		randomNo() {
			return Math.floor(Math.random() * 60) + 30
		},
		renderMap() {
			document.getElementById('map-container').innerHTML = '<div id="map"></div>';
			var map = new jsVectorMap({
				selector: '#map',
				map: 'world',
				zoomButtons: true,
				normalizeFunction: 'polynomial',
				hoverOpacity: 0.5,
				hoverColor: false,
				zoomOnScroll: false,
				series: { regions: [{ normalizeFunction: 'polynomial' }] },
				labels: { markers: { render: (marker) => marker.name } },
				focusOn: { x: 0.5, y: 0.5, scale: 1 },
				markers: this.markers,
				markerStyle: { initial: { fill: appVariable.color.theme, stroke: 'none', r: 5 }, hover: { fill: appVariable.color.theme } },
				markerLabelStyle: { initial: { fontFamily: appVariable.font.bodyFontFamily, fontSize: '12px', fill: 'rgba('+ appVariable.color.inverseRgb + ', .75)' } },
				regionStyle: { initial: { fill: appVariable.color.inverse, fillOpacity: 0.35, stroke: 'none', strokeWidth: 0.4, strokeOpacity: 1 }, hover: { fillOpacity: 0.5 } },
				backgroundColor: 'transparent',
			});
		}
	},
	mounted() {
		this.renderMap();
	},
	created() {
		this.emitter.on('theme-reload', (evt) => {
			this.renderComponent = false;
			
			this.$nextTick(() => {
				this.markers = this.getMarkersData();
				this.stats = this.getStatsData();
				this.server = this.getServerData();
				this.traffic = this.getTrafficData();
				this.activityLog = this.getActivityLogData();
				this.products = this.getProductsData();
				this.renderComponent = true;
				setTimeout(() => {
					this.renderMap();
				}, 50);
			});
    })
	}
}
</script>
<template>
	<!-- BEGIN row -->
	<div class="row" v-if="renderComponent">
		<!-- BEGIN stats -->
		<div class="col-xl-3 col-lg-6" v-for="stat in stats">
			<!-- BEGIN card -->
			<card class="mb-3">
				<card-body>
					<div class="d-flex fw-bold small mb-3">
						<span class="flex-grow-1">{{ stat.title }}</span>
						<card-expand-toggler />
					</div>
					<div class="row align-items-center mb-2">
						<div class="col-7">
							<h3 class="mb-0">{{ stat.total }}</h3>
						</div>
						<div class="col-5">
							<div class="mt-n3 mb-n2">
								<apexchart :height="stat.chart.height" :options="stat.chart.options" :series="stat.chart.series"></apexchart>
							</div>
						</div>
					</div>
					<div class="small text-inverse text-opacity-50 text-truncate">
						<template v-for="statInfo in stat.info">
							<div>
								<i v-bind:class="statInfo.icon"></i> {{ statInfo.text }}
							</div>
						</template>
					</div>
				</card-body>
			</card>
			<!-- END card -->
		</div>
		<!-- END stats -->
		
		<!-- BEGIN server-stats -->
		<div class="col-xl-6">
			<card class="mb-3">
				<card-body>
					<div class="d-flex fw-bold small mb-3">
						<span class="flex-grow-1">SERVER STATS</span>
						<card-expand-toggler />
					</div>
					<div class="ratio ratio-21x9 mb-3">
						<apexchart type="bar" width="100%" height="100%" :options="server.chart.options" :series="server.chart.series"></apexchart>
					</div>
					<div class="row">
						<div class="col-lg-6 mb-3 mb-lg-0" v-for="stat in server.stats">
							<div class="d-flex align-items-center">
								<div class="w-50px h-50px">
									<apexchart :height="stat.chart.height" :options="stat.chart.options" :series="stat.chart.series"></apexchart>
								</div>
								<div class="ps-3 flex-1">
									<div class="fs-10px fw-bold text-inverse text-opacity-50 mb-1">{{ stat.name }}</div>
									<div class="mb-2 fs-5 text-truncate">{{ stat.total }}</div>
									<div class="progress h-3px mb-1">
										<div class="progress-bar bg-theme" v-bind:style="{ width: stat.progress }"></div>
									</div>
									<div class="fs-11px text-inverse text-opacity-50 mb-2 text-truncate">
										{{ stat.time }}
									</div>
									<div class="d-flex align-items-center small" v-for="info in stat.info">
										<i class="bi bi-circle-fill fs-6px me-2" v-bind:class="info.class"></i> 
										<div class="flex-1">{{ info.title }}</div>
										<div>{{ info.value }}</div> 
									</div>
								</div>
							</div>
						</div>
					</div>
				</card-body>
			</card>
		</div>
		<!-- END server-stats -->
		
		<!-- BEGIN traffic-analytics -->
		<div class="col-xl-6">
			<card class="mb-3">
				<card-body>
					<div class="d-flex fw-bold small mb-3">
						<span class="flex-grow-1">TRAFFIC ANALYTICS</span>
						<card-expand-toggler />
					</div>
					<div class="ratio ratio-21x9 mb-3">
						<div class="jvm-without-padding" id="map-container">
							<div id="map"></div>
						</div>
					</div>
					
					<div class="row gx-4">
						<div class="col-lg-6 mb-3 mb-lg-0">
							<table class="w-100 small mb-0 text-truncate text-inverse text-opacity-60">
								<thead>
									<tr class="text-inverse text-opacity-75">
										<th class="w-50">COUNTRY</th>
										<th class="w-25 text-end">VISITS</th>
										<th class="w-25 text-end">PCT%</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="traffic.country" v-for="country in traffic.country" v-bind:class="country.class">
										<td>{{ country.name }}</td>
										<td class="text-end">{{ country.visits }}</td>
										<td class="text-end">{{ country.pct }}</td>
									</tr>
									<tr v-else>
										<td colspan="3">No records found</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="col-lg-6">
							<card>
								<card-body class="py-2">
									<div class="d-flex align-items-center">
										<div class="w-70px">
											<apexchart :height="traffic.chart.height" :options="traffic.chart.options" :series="traffic.chart.series"></apexchart>
										</div>
										<div class="flex-1 ps-2">
											<table class="w-100 small mb-0 text-inverse text-opacity-60">
												<tbody>
													<tr v-if="traffic.source" v-for="source in traffic.source">
														<td>
															<div class="d-flex align-items-center">
																<div class="w-6px h-6px rounded-pill me-2" v-bind:class="source.class"></div> 
																{{ source.name }}
															</div>
														</td>
														<td class="text-end">{{ source.percentage }}</td>
													</tr>
													<tr v-else>
														<td colspan="2">No records found</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</card-body>
							</card>
						</div>
					</div>
				</card-body>
			</card>
		</div>
		<!-- END traffic-analytics -->
		
		<!-- BEGIN top-products -->
		<div class="col-xl-6">
			<card class="mb-3">
				<card-body>
					<div class="d-flex fw-bold small mb-3">
						<span class="flex-grow-1">TOP PRODUCTS</span>
						<card-expand-toggler />
					</div>
					<div class="table-responsive">
						<table class="w-100 mb-0 small align-middle text-nowrap">
							<tbody>
								<tr v-if="products" v-for="(product, index) in products">
									<td>
										<div class="d-flex">
											<div class="position-relative mb-2">
												<div class="bg-position-center bg-size-cover w-80px h-60px" v-bind:style="{ backgroundImage: 'url('+ product.img +')' }"></div>
												<div class="position-absolute top-0 start-0">
													<span class="badge bg-theme text-theme-900 rounded-0 d-flex align-items-center justify-content-center w-20px h-20px">{{ index }}</span>
												</div>
											</div>
											<div class="flex-1 ps-3">
												<div class="mb-1"><small class="fs-9px fw-500 lh-1 d-inline-block rounded-0 badge bg-inverse bg-opacity-25 text-inverse text-opacity-75 pt-5px">{{ product.sku }}</small></div>
												<div class="fw-500 text-inverse">{{ product.title }}</div>
												{{ product.price }}
											</div>
										</div>
									</td>
									<td>
										<table class="mb-2">
											<tbody>
												<tr>
													<td class="pe-3">QTY:</td>
													<td class="text-inverse text-opacity-75 fw-500">{{ product.qty }}</td>
												</tr>
												<tr>
													<td class="pe-3">REVENUE:</td>
													<td class="text-inverse text-opacity-75 fw-500">{{ product.revenue }}</td>
												</tr>
												<tr>
													<td class="pe-3 text-nowrap">PROFIT:</td>
													<td class="text-inverse text-opacity-75 fw-500">{{ product.profit }}</td>
												</tr>
											</tbody>
										</table>
									</td>
									<td><a href="#" class="text-decoration-none text-inverse"><i class="bi bi-search"></i></a></td>
								</tr>
								<tr v-else >
									<td colspan="3">
										No records found
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</card-body>
			</card>
		</div>
		<!-- END top-products -->
		
		<!-- BEGIN activity-log -->
		<div class="col-xl-6">
			<card class="mb-3">
				<card-body>
					<div class="d-flex fw-bold small mb-3">
						<span class="flex-grow-1">ACTIVITY LOG</span>
						<card-expand-toggler />
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-borderless mb-2px small text-nowrap">
							<tbody>
								<tr v-if="activityLog" v-for="log in activityLog">
									<td>
										<span class="d-flex align-items-center">
											<i class="bi bi-circle-fill fs-6px me-2" v-bind:class="{ 'text-theme': log.highlight }"></i>
											{{ log.title }}
										</span>
									</td>
									<td><small>{{ log.time }}</small></td>
									<td>
										<span class="badge d-block rounded-0 pt-5px w-70px" v-bind:class="{ 'bg-theme text-theme-900': log.highlight, 'bg-inverse bg-opacity-25': !log.highlight}" style="min-height: 18px">{{ log.badge }}</span>
									</td>
									<td><a href="#" class="text-decoration-none text-inverse"><i class="bi bi-search"></i></a></td>
								</tr>
								<tr v-else >
									<td colspan="4">
										No records found
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</card-body>
			</card>
		</div>
		<!-- END activity-log -->
	</div>
	<!-- END row -->
</template>