<script>
import { useAppVariableStore } from '@/stores/app-variable';
import highlightjs from '@/components/plugins/Highlightjs.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import jsVectorMap from 'jsvectormap';
import { GoogleMap, Marker } from 'vue3-google-map';
import 'jsvectormap/dist/maps/world.js';
import 'jsvectormap/dist/jsvectormap.min.css';
import { ScrollSpy } from 'bootstrap';

const appVariable = useAppVariableStore();

export default {
	data() {
		return {
			code1: '',
			code2: '',
			center: { lat: 40.689247, lng: -74.044502 }
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto,
		googleMap: GoogleMap,
		googleMapMarker: Marker
	},
	methods: {
		renderMap() {
			document.getElementById('map-container').innerHTML = '<div id="map" style="height: 300px;"></div>';
			var markers = [
				{ name: "Egypt", coords: [26.8206, 30.8025] },
				{ name: "Russia", coords: [61.524, 105.3188] },
				{ name: "Canada", coords: [56.1304, -106.3468] },
				{ name: "Greenland", coords: [71.7069, -42.6043] },
				{ name: "Brazil", coords: [-14.235, -51.9253] }
			];
			var map = new jsVectorMap({
				selector: '#map',
				map: 'world',
				zoomButtons: true,
				normalizeFunction: 'polynomial',
				hoverOpacity: 0.5,
				hoverColor: false,
				zoomOnScroll: false,
				series: {
					regions: [{
						normalizeFunction: 'polynomial'
					}]
				},
				labels: {
					markers: {
						render: (marker) => marker.name
					}
				},
				focusOn: {
					x: 0.5,
					y: 0.5,
					scale: 1
				},
				markers: markers,
				markerStyle: {
					initial: {
						fill: appVariable.color.theme,
						stroke: 'none',
						r: 5,
					},
					hover: {
						fill: appVariable.color.theme
					}
				},
				markerLabelStyle: {
					initial: {
						fontFamily: appVariable.font.bodyFontFamily,
						fontSize: '12px',
						fill: 'rgba('+ appVariable.color.inverseRgb + ', .75)'
					},
				},
				regionStyle: {
					initial: {
						fill: appVariable.color.inverse,
						fillOpacity: 0.25,
						stroke: 'none',
						strokeWidth: 0.4,
						strokeOpacity: 1
					},
					hover: {
						fillOpacity: 0.5
					}
				},
				backgroundColor: 'transparent',
			});
		}
	},
	mounted() {
		this.renderMap();
		
		axios.get('/assets/data/map/code-1.json').then((response) => {
			this.code1 = response.data;
		});
		
		axios.get('/assets/data/map/code-2.json').then((response) => {
			this.code2 = response.data;
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
	<!-- BEGIN container -->
	<div class="container">
		<!-- BEGIN row -->
		<div class="row justify-content-center">
			<!-- BEGIN col-10 -->
			<div class="col-xl-10">
				<!-- BEGIN row -->
				<div class="row">
					<!-- BEGIN col-9 -->
					<div class="col-xl-9">
						<h1 class="page-header">
							Map <small>page header description goes here...</small>
						</h1>
						
						<hr class="mb-4">
						
						<!-- BEGIN #jsvectormap -->
						<div id="jsvectormap" class="mb-5">
							<h4>Jsvectormap</h4>
							<p>Jsvectormap is a lightweight javascript library for creating interactive maps and pretty data visualization. Please read the <a href="https://github.com/themustafaomar/jsvectormap" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body>
									<div id="map-container"></div>
								</card-body>
								<highlightjs :code="code1"></highlightjs>
							</card>
						</div>
						<!-- END #jsvectormap -->
						
						<!-- BEGIN #vue3GoogleMap -->
						<div id="vue3GoogleMap" class="mb-5">
							<h4>Vue3 Google Map</h4>
							<p>Vue3 Google Map offers a set of composable components for easy use of Google Maps in your Vue 3 projects. Please read the <a href="https://vue3-google-map.netlify.app/" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body>
									<google-map api-key="" class="h-300px w-100" :center="center" :zoom="15">
										<google-map-marker :options="{ position: center }"></google-map-marker>
									</google-map>
								</card-body>
								<highlightjs :code="code2"></highlightjs>
							</card>
						</div>
						<!-- END #vue3GoogleMap -->
					</div>
					<!-- END col-9-->
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebar-bootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav">
								<nav-scroll-to class="nav-link" target="#jsvectormap" data-toggle="scroll-to">Jsvectormap</nav-scroll-to>
								<nav-scroll-to class="nav-link" target="#vue3GoogleMap" data-toggle="scroll-to">Vue3 Google Map</nav-scroll-to>
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