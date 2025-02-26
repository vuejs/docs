<script>
import { useAppOptionStore } from '@/stores/app-option';
import { useRouter, RouterLink } from 'vue-router';
import VueCountdown from '@chenfengyuan/vue-countdown';

const appOption = useAppOptionStore();

export default {
	data() {
		return {
			year: (new Date()).getFullYear()
		}
	},
	components: {
		VueCountdown: VueCountdown
	},
	mounted() {
		appOption.appSidebarHide = true;
		appOption.appHeaderHide = true;
		appOption.appContentClass = 'p-0';
	},
	beforeUnmount() {
		appOption.appSidebarHide = false;
		appOption.appHeaderHide = false;
		appOption.appContentClass = '';
	},
	methods: {
		submitForm: function() {
			this.$router.push('/');
		}
	}
}
</script>
<template>
	<!-- BEGIN coming-soon -->
	<div class="coming-soon">
		<div class="flex-1">
			<div class="coming-soon-timer">
				<div class="is-countdown text-center">
					<vue-countdown class="countdown-row countdown-show4" :time="2 * 24 * 60 * 60 * 1000" :transform="transformSlotProps" v-slot="{ days, hours, minutes, seconds }">
						<span class="countdown-section">
							<span class="countdown-amount d-block">{{ days }}</span>
							<span class="countdown-period d-block">Days</span>
						</span>
						<span class="countdown-section">
							<span class="countdown-amount d-block">{{ hours }}</span>
							<span class="countdown-period d-block">Hours</span>
						</span>
						<span class="countdown-section">
							<span class="countdown-amount d-block">{{ minutes }}</span>
							<span class="countdown-period d-block">Minutes</span>
						</span>
						<span class="countdown-section">
							<span class="countdown-amount d-block">{{ seconds }}</span>
							<span class="countdown-period d-block">Seconds</span>
						</span>
					</vue-countdown>
				</div>
			</div>
			<!-- BEGIN coming-soon-content -->
			<div class="coming-soon-content d-flex flex-column">
				<div class="flex-1 mb-3">
					<h2 class="mb-3">We're coming soon!</h2>
					<p class="mb-4">We are working very hard on the new version of our site.<br /> It will bring a lot of new features. Stay tuned!</p>
					<form v-on:submit.prevent="submitForm()">
						<div class="input-group mb-2">
							<input type="text" class="form-control" placeholder="Email Address" />
							<button type="submit" class="btn btn-outline-theme">SUBSCRIBE</button>
						</div>
					</form>
					<div class="mb-1 small text-inverse text-opacity-50">* Subscribe and get notified for latest news</div>
				</div>
				<div class="text-center small text-inverse text-opacity-50">
					&copy; {{ year }} SeanTheme Right Reserved
				</div>
			</div>
			<!-- END coming-soon-content -->
		</div>
	</div>
	<!-- END coming-soon -->
</template>