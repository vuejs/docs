<script>
import { useAppOptionStore } from '@/stores/app-option';
import { useRouter, RouterLink } from 'vue-router';

const appOption = useAppOptionStore();

export default {
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
	<!-- BEGIN register -->
	<div class="register">
		<!-- BEGIN register-content -->
		<div class="register-content">
			<form v-on:submit.prevent="submitForm()" method="POST" name="register_form">
				<h1 class="text-center">Sign Up</h1>
				<p class="text-inverse text-opacity-50 text-center">One Admin ID is all you need to access all the Admin services.</p>
				<div class="mb-3">
					<label class="form-label">Name <span class="text-danger">*</span></label>
					<input type="text" class="form-control form-control-lg bg-white bg-opacity-5" placeholder="e.g John Smith" value="" />
				</div>
				<div class="mb-3">
					<label class="form-label">Email Address <span class="text-danger">*</span></label>
					<input type="text" class="form-control form-control-lg bg-white bg-opacity-5" placeholder="username@address.com" value="" />
				</div>
				<div class="mb-3">
					<label class="form-label">Password <span class="text-danger">*</span></label>
					<input type="password" class="form-control form-control-lg bg-white bg-opacity-5" value="" />
				</div>
				<div class="mb-3">
					<label class="form-label">Confirm Password <span class="text-danger">*</span></label>
					<input type="password" class="form-control form-control-lg bg-white bg-opacity-5" value="" />
				</div>
				<div class="mb-3">
					<label class="form-label">Country <span class="text-danger">*</span></label>
					<select class="form-select form-select-lg bg-white bg-opacity-5">
						<option>United States</option>
					</select>
				</div>
				<div class="mb-3">
					<label class="form-label">Gender <span class="text-danger">*</span></label>
					<select class="form-select form-select-lg bg-white bg-opacity-5">
						<option>Female</option>
						<option>Male</option>
					</select>
				</div>
				<div class="mb-3">
					<label class="form-label">Date of Birth <span class="text-danger">*</span></label>
					<div class="row gx-2">
						<div class="col-6">
							<select class="form-select form-select-lg bg-white bg-opacity-5">
								<option>Month</option>
								<option v-for="month in 12">
									{{ month }}
								</option>
							</select>
						</div>
						<div class="col-3">
							<select class="form-select form-select-lg bg-white bg-opacity-5">
								<option>Day</option>
								<option v-for="day in 30">
									{{ day }}
								</option>
							</select>
						</div>
						<div class="col-3">
							<select class="form-select form-select-lg bg-white bg-opacity-5">
								<option>Year</option>
								<template v-for="year in 2024">
									<option v-if="year > 1950">
										{{year }}
									</option>
								</template>
							</select>
						</div>
					</div>
				</div>
				<div class="mb-3">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" value="" id="customCheck1" />
						<label class="form-check-label" for="customCheck1">I have read and agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</label>
					</div>
				</div>
				<div class="mb-3">
					<button type="submit" class="btn btn-outline-theme btn-lg d-block w-100">Sign Up</button>
				</div>
				<div class="text-inverse text-opacity-50 text-center">
					Already have an Admin ID? <RouterLink to="/page/login">Sign In</RouterLink>
				</div>
			</form>
		</div>
		<!-- END register-content -->
	</div>
	<!-- END register -->
</template>