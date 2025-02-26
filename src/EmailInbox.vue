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
				unread: true
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
				<div class="mailbox-sidebar">
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
				<div class="mailbox-content d-none d-lg-block">
					<perfect-scrollbar class="h-100">
						<div class="mailbox-empty-message">
							<div class="mailbox-empty-message-icon"><i class="bi bi-inbox text-theme text-opacity-50"></i></div>
							<div class="mailbox-empty-message-title">No message selected</div>
						</div>
					</perfect-scrollbar>
				</div>
				<!-- END mailbox-content -->
			</div>
			<!-- END mailbox-body -->
		</div>
		<!-- END mailbox -->
	</card>
	<!-- END card -->
</template>