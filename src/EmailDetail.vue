<script>
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink } from 'vue-router';

const appOption = useAppOptionStore();

export default {
	data() {
		return {
			mailData: [{
				id: 1,
				sender: 'Apple',
				time: '1 hour ago',
				title: 'Your payment is received',
				desc: 'Praesent id pulvinar orci. Donec ac metus non ligula faucibus venenatis. Suspendisse tortor est, placerat eu dui sed...',
				hasAttachment: true,
				unread: true,
				active: true
			}, {
				id: 2,
				sender: 'Chance Graham',
				time: '5 hours ago',
				title: 'Trip to South America',
				desc: 'Quisque luctus sapien sodales pulvinar porta. In pretium accumsan elit, vitae blandit arcu suscipit eu. Ut tortor libero, gravida ut nisl tincidunt, efficitur laoreet mauris.',
				hasAttachment: true,
				unread: true
			}, {
				id: 3,
				sender: 'Paypal Inc',
				time: 'Aug 11',
				title: 'Important information about your order #019244',
				desc: 'Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim.',
				hasAttachment: true
			}, {
				id: 4,
				sender: 'Fitbit',
				time: 'Aug 09',
				title: 'Stylish accessories for your Charge 2',
				desc: 'How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled.'
			}, {
				id: 5,
				sender: 'Apple',
				time: 'Aug 09',
				title: 'Your invoice from Apple.',
				desc: 'Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls.'
			}, {
				id: 6,
				sender: 'Hotels.com',
				time: 'Aug 09',
				title: '[Ends tonight!] 48 Hour Sale - Save up to 50% + save an extra 10%',
				desc: 'Phasellus vulputate, ligula ac hendrerit euismod, nunc metus maximus tellus, aliquam finibus justo lorem a augue.'
			}, {
				id: 7,
				sender: 'Google Calendar',
				time: 'Aug 08',
				title: 'Daily schedule on Tuesday, May 9, 2024',
				desc: 'Suspendisse potenti. Praesent ac ullamcorper sem. Mauris luctus accumsan felis'
			}, {
				id: 8,
				sender: 'Facebook Blueprint',
				time: 'Aug 08',
				title: 'April 2024 – Blueprint Highlights',
				desc: 'Phasellus pretium viverra tortor, eu sagittis erat aliquam nec. Nunc et volutpat ligula. Duis viverra posuere enim, ac bibendum massa viverra id.'
			}, {
				id: 9,
				sender: 'Customer Care',
				time: 'Aug 08',
				title: 'Re: [Case #1567940] - Re: [Important] Exabytes',
				desc: 'Nam imperdiet molestie arcu, et gravida quam lacinia lobortis.'
			}, {
				id: 10,
				sender: 'Flight Status',
				time: 'Aug 07',
				title: '[Case#2017022137015743] *FLIGHT RETIMED* **MH2713/15JUL17**',
				desc: 'Etiam condimentum orci ut velit suscipit, ut accumsan elit aliquet. Nulla cursus mi at]'
			}]
		}
	},
	mounted() {
		appOption.appContentFullHeight = true;
		appOption.appContentClass = 'p-3';
	},
	beforeUnmount() {
		appOption.appContentFullHeight = false;
		appOption.appContentClass = '';
	}
}
</script>
<template>
	<!-- BEGIN card -->
	<card class="h-100">
		<!-- BEGIN mailbox -->
		<div class="mailbox">
			<!-- BEGIN mailbox-toolbar -->
			<div class="mailbox-toolbar">
				<div class="mailbox-toolbar-item"><span class="mailbox-toolbar-text">Mailboxes</span></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link active">Inbox</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link">Sent</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link">Drafts (1)</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link">Junk</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/compose" class="mailbox-toolbar-link text-inverse bg-inverse bg-opacity-15">New Message <i class="fa fa-pen fs-12px ms-1"></i></RouterLink></div>
			</div>
			<!-- END mailbox-toolbar -->
			<!-- BEGIN mailbox-body -->
			<div class="mailbox-body">
				<!-- BEGIN mailbox-sidebar -->
				<div class="mailbox-sidebar d-none d-lg-block">
					<perfect-scrollbar class="h-100">
						<div class="mailbox-list">
							<div class="mailbox-list-item" v-if="mailData" v-for="mail in mailData" v-bind:class="{ 'has-attachment': mail.hasAttachment, 'unread': mail.unread, 'active': mail.active}">
								<div class="mailbox-checkbox">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" value="" :id="'mailCheckbox' + mail.id" />
										<label class="form-check-label" :for="'mailCheckbox' + mail.id"></label>
									</div>
								</div>
								<div class="mailbox-message">
									<RouterLink to="/email/detail" class="mailbox-list-item-link">
										<div class="mailbox-sender">
											<span class="mailbox-sender-name">{{ mail.sender }}</span>
											<span class="mailbox-time">{{ mail.time }}</span>
										</div>
										<div class="mailbox-title">{{ mail.title }}</div>
										<div class="mailbox-desc">{{ mail.desc }}</div>
									</RouterLink>
								</div>
							</div>
							<div class="mailbox-list-item" v-else>
								No records found
							</div>
						</div>
					</perfect-scrollbar>
				</div>
				<!-- END mailbox-sidebar -->
				<!-- BEGIN mailbox-content -->
				<div class="mailbox-content">
					<!-- BEGIN scrollbar -->
					<perfect-scrollbar class="h-100">
						<!-- BEGIN mailbox-detail -->
						<div class="mailbox-detail">
							<!-- BEGIN mail-detail-header -->
							<div class="mailbox-detail-header">
								<div class="d-flex">
									<a href="#">
										<img src="/assets/img/user/user-1.jpg" alt="" width="40" class="rounded-circle" />
									</a>
									<div class="flex-fill ms-3">
										<div class="d-lg-flex align-items-center">
											<div class="flex-1">
												<div class="fw-600">John Smith &lt;support@seantheme.com&gt;</div>
												<div class="fs-13px">
													<span class="me-1">to</span> <a href="#" class="text-decoration-none">support@seantheme.com</a>, <a href="#" class="text-decoration-none">seantheme@admin.com</a>
												</div>
											</div>
											<div class="fs-12px text-white text-opacity-50 text-lg-end mt-lg-0 mt-3">Nov 27, 2024 <span class="d-none d-lg-inline"><br /></span>at 7.00pm</div>
										</div>
									</div>
								</div>
							</div>
							<!-- END mailbox-detail-header -->
							<!-- BEGIN mailbox-detail-content -->
							<div class="mailbox-detail-content">
								<h4 class="mb-3">Your payment is received</h4>
								<!-- BEGIN mailbox-detail-attachment -->
								<div class="mailbox-detail-attachment">
									<div class="mailbox-attachment">
										<a href="#">
											<div class="document-file">
												<i class="fa fa-file-archive"></i>
											</div>
											<div class="document-name">invoice.zip</div>
										</a>
									</div>
									<div class="mailbox-attachment">
										<a href="#">
											<div class="document-file">
												<i class="fa fa-file-video"></i>
											</div>
											<div class="document-name">video.mp4</div>
										</a>
									</div>
									<div class="mailbox-attachment">
										<a href="#">
											<div class="document-file">
												<img src="/assets/img/gallery/gallery-10.jpg" alt="">
											</div>
											<div class="document-name">image.jpg</div>
										</a>
									</div>
								</div>
								<div class="mb-3"><a href="#" class="btn btn-rounded px-3 btn-sm bg-theme bg-opacity-20 text-theme fw-600 rounded">Download</a></div>
								<!-- END mailbox-detail-attachment -->
								<!-- BEGIN mailbox-detail-body -->
								<div class="mailbox-detail-body">
									Hi Dear Customer,<br />
									<br />
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel auctor nisi, vel auctor orci. <br />
									Aenean in pretium odio, ut lacinia tellus. Nam sed sem ac enim porttitor vestibulum vitae at erat.<br />
									<br />
									Curabitur auctor non orci a molestie. Nunc non justo quis orci viverra pretium id ut est. <br />
									Nullam vitae dolor id enim consequat fermentum. Ut vel nibh tellus. <br />
									Duis finibus ante et augue fringilla, vitae scelerisque tortor pretium. <br />
									Phasellus quis eros erat. Nam sed justo libero.<br />
									<br />
									Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.<br />
									Sed tempus dapibus libero ac commodo.<br />
									<br />
									<br />
									Regards,<br />
									Twitter Inc,<br />
									795 Folsom Ave, Suite 600<br />
									San Francisco, CA 94107<br />
									P: (123) 456-7890<br />
								</div>
								<!-- END mailbox-detail-body -->
							</div>
							<!-- END mailbox-detail-content -->
						</div>
						<!-- END mailbox-detail -->
					</perfect-scrollbar>
					<!-- END scrollbar -->
				</div>
				<!-- END mailbox-content -->
			</div>
			<!-- END mailbox-body -->
		</div>
		<!-- END mailbox -->
	</card>
	<!-- END card -->
</template>