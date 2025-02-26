<script>
import highlightjs from '@/components/plugins/Highlightjs.vue';
import chartjs from '@/components/plugins/Chartjs.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import { useAppVariableStore } from '@/stores/app-variable';
import { ScrollSpy } from 'bootstrap';

const appVariable = useAppVariableStore();

export default {
	methods: {
		getChart1Data() {
			return {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				datasets: [{
					color: appVariable.color.theme,
					backgroundColor: 'rgba('+ appVariable.color.themeRgb +', .2)',
					borderColor: appVariable.color.theme,
					borderWidth: 1.5,
					pointBackgroundColor: appVariable.color.theme,
					pointBorderWidth: 1.5,
					pointRadius: 4,
					pointHoverBackgroundColor: appVariable.color.theme,
					pointHoverBorderColor: appVariable.color.theme,
					pointHoverRadius: 7,
					label: 'Total Sales',
					data: [12, 19, 4, 5, 2, 3]
				}]
			};
		},
		getChart2Data() {
			return {
				labels: ['Jan','Feb','Mar','Apr','May','Jun'],
				datasets: [{
					label: 'Total Visitors',
					data: [37,31,36,34,43,31],
					backgroundColor: 'rgba('+ appVariable.color.themeRgb +', .5)',
					borderColor: appVariable.color.theme,
					borderWidth: 1.5
				},{
					label: 'New Visitors',
					data: [12,16,20,14,23,21],
					backgroundColor: 'rgba('+ appVariable.color.inverseRgb +', .2)' +', .5)',
					borderColor: 'rgba('+ appVariable.color.inverseRgb +', .65)',
					borderWidth: 1.5
				}]
			};
		},
		getChart3Data() {
			return {
				labels: ['United States', 'Canada', 'Australia', 'Netherlands', 'Germany', 'New Zealand', 'Singapore'],
				datasets: [
					{
						label: 'Mobile',
						backgroundColor: 'rgba('+ appVariable.color.themeRgb +', .2)',
						borderColor: appVariable.color.theme,
						pointBackgroundColor: appVariable.color.theme,
						pointBorderColor: appVariable.color.theme,
						pointHoverBackgroundColor: appVariable.color.theme,
						pointHoverBorderColor: appVariable.color.theme,
						data: [65, 59, 90, 81, 56, 55, 40],
						borderWidth: 1.5
					},
					{
						label: 'Desktop',
						backgroundColor: 'rgba('+ appVariable.color.gray500Rgb +', .2)',
						borderColor: appVariable.color.gray500,
						pointBackgroundColor: appVariable.color.gray500,
						pointBorderColor: appVariable.color.gray500,
						pointHoverBackgroundColor: appVariable.color.gray500,
						pointHoverBorderColor: appVariable.color.gray500,
						data: [28, 48, 40, 19, 96, 27, 100],
						borderWidth: 1.5
					}
				]
			};
		},
		getChart4Data() {
			return {
				datasets: [{
					data: [11, 16, 7, 3, 14],
					backgroundColor: ['rgba('+ appVariable.color.themeRgb +', .5)', 'rgba('+ appVariable.color.inverseRgb +', .2)' +', .5)', 'rgba('+ appVariable.color.gray300Rgb +', .5)', 'rgba('+ appVariable.color.gray500Rgb +', .5)', 'rgba('+ appVariable.color.gray800Rgb +', .5)'],
					borderWidth: 0
				}],
				labels: ['IE', 'Safari', 'Chrome', 'Firefox', 'Opera']
			};
		},
		getChart5Data() {
			return {
				labels: ['Total Visitor', 'New Visitor', 'Returning Visitor'],
				datasets: [{
					data: [300, 50, 100],
					backgroundColor: ['rgba('+ appVariable.color.themeRgb +', .5)', 'rgba('+ appVariable.color.inverseRgb +', .2)' +', .5)', 'rgba('+ appVariable.color.themeRgb +', .5)'],
					hoverBackgroundColor: ['rgba('+ appVariable.color.themeRgb +', 1)', 'rgba('+ appVariable.color.inverseRgb +', 1)', 'rgba('+ appVariable.color.gray900Rgb +', 1)'],
					borderWidth: 0
				}]
			};
		},
		getChart6Data() {
			return {
				labels: ['Total Visitor', 'New Visitor', 'Returning Visitor'],
				datasets: [{
					data: [300, 50, 100],
					backgroundColor: ['rgba('+ appVariable.color.themeRgb +', .5)', 'rgba('+ appVariable.color.inverseRgb +', .2)' +', .5)', 'rgba('+ appVariable.color.themeRgb +', .5)'],
					hoverBackgroundColor: [appVariable.color.theme, appVariable.color.inverse, appVariable.color.gray900],
					borderWidth: 0
				}]
			};
		}
	},
	data () {
		return {
			renderComponent: true,
			code1: '',
			code2: '',
			code3: '',
			code4: '',
			code5: '',
			code6: '',
			chart1: {
				type: 'line',
				data: this.getChart1Data()
			},
			chart2: {
				type: 'bar',
				data: this.getChart2Data()
			},
			chart3: {
				type: 'radar',
				data: this.getChart3Data()
			},
			chart4: {
				type: 'polarArea',
				data: this.getChart4Data()
			},
			chart5: {
				type: 'pie',
				data: this.getChart5Data()
			},
			chart6: {
				type: 'doughnut',
				data: this.getChart6Data()
			}
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto,
		chartjs: chartjs
	},
	mounted() {
		axios.get('/assets/data/chart/chartjs-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		axios.get('/assets/data/chart/chartjs-code-2.json').then((response) => {
			this.code2 = response.data;
		});
		axios.get('/assets/data/chart/chartjs-code-3.json').then((response) => {
			this.code3 = response.data;
		});
		axios.get('/assets/data/chart/chartjs-code-4.json').then((response) => {
			this.code4 = response.data;
		});
		axios.get('/assets/data/chart/chartjs-code-5.json').then((response) => {
			this.code5 = response.data;
		});
		axios.get('/assets/data/chart/chartjs-code-6.json').then((response) => {
			this.code6 = response.data;
		});
		
		new ScrollSpy(document.body, {
			target: '#sidebar-bootstrap',
			offset: 200
		})
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
				this.chart6.data = this.getChart5Data();
				this.renderComponent = true;
			});
    })
	}
}
</script>

<template>
	<!-- BEGIN container -->
	<div class="container" v-if="renderComponent">
		<!-- BEGIN row -->
		<div class="row justify-content-center">
			<!-- BEGIN col-10 -->
			<div class="col-xl-10">
				<!-- BEGIN row -->
				<div class="row">
					<!-- BEGIN col-9 -->
					<div class="col-xl-9">
						<ul class="breadcrumb">
							<li class="breadcrumb-item"><a href="#">CHARTS</a></li>
							<li class="breadcrumb-item active">CHART.JS</li>
						</ul>
						
						<h1 class="page-header">
							Chart.js <small>page header description goes here...</small>
						</h1>
						
						<hr class="mb-4">
						
						<!-- BEGIN #chartJs -->
						<div id="chartJs">
							<h4>Basic Example</h4>
							<p>Chart.js is a simple yet flexible JavaScript charting for designers & developers. Please read the <a href="https://www.chartjs.org/" target="_blank">official documentation</a> for the full list of options.</p>
						</div>
						<!-- END #chartJs -->
						
						<!-- BEGIN #chartJsLineChart -->
						<div id="chartJsLineChart" class="mb-5">
							<card>
								<card-body>
									<h6>LINE CHART</h6>
									<chartjs :type="chart1.type" :data="chart1.data"></chartjs>
								</card-body>
								<highlightjs :code="code1"></highlightjs>
							</card>
						</div>
						<!-- END #chartJsLineChart -->
						
						<!-- BEGIN #chartJsBarChart -->
						<div id="chartJsBarChart" class="mb-5">
							<card>
								<card-body>
									<h6>BAR CHART</h6>
									<chartjs :type="chart2.type" :data="chart2.data"></chartjs>
								</card-body>
								<highlightjs :code="code2"></highlightjs>
							</card>
						</div>
						<!-- END #chartJsBarChart -->
						
						<!-- BEGIN #chartJsRadarChart -->
						<div id="chartJsRadarChart" class="mb-5">
							<card>
								<card-body>
									<h6>RADAR CHART</h6>
									<chartjs :type="chart3.type" :data="chart3.data"></chartjs>
								</card-body>
								<highlightjs :code="code3"></highlightjs>
							</card>
						</div>
						<!-- END #chartJsRadarChart -->
						
						<!-- BEGIN #chartJsPolarAreaChart -->
						<div id="chartJsPolarAreaChart" class="mb-5">
							<card>
								<card-body>
									<h6>POLAR AREA CHART</h6>
									<div class="h-300px w-300px mx-auto">
										<chartjs :type="chart4.type" :data="chart4.data"></chartjs>
									</div>
								</card-body>
								<highlightjs :code="code4"></highlightjs>
							</card>
						</div>
						<!-- END #chartJsPolarAreaChart -->
						
						<!-- BEGIN #chartJsPieChart -->
						<div id="chartJsPieChart" class="mb-5">
							<card>
								<card-body>
									<h6>PIE CHART</h6>
									<div class="h-300px w-300px mx-auto">
										<chartjs :type="chart5.type" :data="chart5.data"></chartjs>
									</div>
								</card-body>
								<highlightjs :code="code5"></highlightjs>
							</card>
						</div>
						<!-- END #chartJsPieChart -->
						
						<!-- BEGIN #chartJsDoughnutChart -->
						<div id="chartJsDoughnutChart" class="mb-5">
							<card>
								<card-body>
									<h6>DOUGHNUT CHART</h6>
									<div class="h-300px w-300px mx-auto">
										<chartjs :type="chart6.type" :data="chart6.data"></chartjs>
									</div>
								</card-body>
								<highlightjs :code="code6"></highlightjs>
							</card>
						</div>
						<!-- END #chartJsDoughnutChart -->
					</div>
					<!-- END col-9-->
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebar-bootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav">
								<nav-scroll-to class="nav-link" target="#chartJs" data-toggle="scroll-to">Chart.js</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#chartJsLineChart" data-toggle="scroll-to"> - line chart</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#chartJsBarChart" data-toggle="scroll-to"> - bar chart</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#chartJsRadarChart" data-toggle="scroll-to"> - radar chart</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#chartJsPolarAreaChart" data-toggle="scroll-to"> - polar area chart</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#chartJsPieChart" data-toggle="scroll-to"> - pie chart</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#chartJsDoughnutChart" data-toggle="scroll-to"> - doughnut chart</nav-scroll-to>
							</nav>
						</nav>
						<!-- END #sidebar-bootstrap -->
					</div>
					<!-- END col-3 -->
				</div>
				<!-- END row -->
			</div>
			<!-- END col-10 -->
		</div>
		<!-- END row -->
	</div>
	<!-- END container -->
</template>