<script>
import { useAppOptionStore } from '@/stores/app-option';
import { useRouter, RouterLink } from 'vue-router';
import { createPopup } from '@picmo/popup-picker';

const appOption = useAppOptionStore();

export default {
	mounted() {
		appOption.appContentFullHeight = true;
		appOption.appContentClass = 'p-3';
		
		setTimeout(() => {
			const container = document.querySelector('.messenger-content-body .h-100');
			container.scrollTop = container.scrollHeight;
		}, 0);
		
		const selectionContainer = document.querySelector('#selection-outer');
		const emoji = document.querySelector('#selection-emoji');
		const name = document.querySelector('#selection-name');
		const trigger = document.querySelector('#trigger');

		const picker = createPopup({}, {
			referenceElement: trigger,
			triggerElement: trigger,
			position: 'right-end'
		});

		trigger.addEventListener('click', () => {
			picker.toggle();
		});

		picker.addEventListener('emoji:select', (selection) => {
			document.getElementById('input').value = document.getElementById('input').value + selection.emoji;
			selectionContainer.classList.remove('empty');
		});
  },
  unmounted() {
  },
	beforeUnmount() {
		appOption.appContentFullHeight = false;
	}
}
</script>
<template>
	<card class="h-100">
		<div class="messenger">
			<div class="messenger-sidebar">
				<div class="messenger-sidebar-header">
					<h3 class="mb-10px">Chats</h3>
					<div class="position-relative">
						<button type="submit" class="btn position-absolute top-0 text-inverse"><i class="bi bi-search"></i></button>
						<input type="text" class="form-control rounded-pill ps-35px" placeholder="Search Messenger" />
					</div>
				</div>
				<div class="messenger-sidebar-body">
					<perfect-scrollbar class="h-100">
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link active">
								<div class="messenger-media bg-theme text-black text-opacity-75 rounded-pill fs-24px fw-bold">
									<i class="bi bi-android2"></i>
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Mobile App Development Group 10</div>
									<div class="messenger-text">Roberto says Hey Gabe, can you forward me the meeting notes?</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">13:02</div>
									<div class="messenger-badge">2</div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-2.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Roberto</div>
									<div class="messenger-text">Say hello to Alice</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">14:59</div>
									<div class="messenger-badge">1</div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-3.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Graduation Party</div>
									<div class="messenger-text"><b>Dan:</b> Wow, almost 2,500 members!</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">14:42</div>
									<div class="messenger-badge empty"></div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-4.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Karen Stanford</div>
									<div class="messenger-text">Table for four, 2 PM. Be there.</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">14:40</div>
									<div class="messenger-badge empty"></div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-5.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Wave Hunters</div>
									<div class="messenger-text"><b>Monika Parker:</b> Poll</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">12:45</div>
									<div class="messenger-badge empty"></div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-6.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Little Sister</div>
									<div class="messenger-text">I got a job at NASA!</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">12:45</div>
									<div class="messenger-badge empty"></div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-7.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Monika Parker</div>
									<div class="messenger-text">I don't remember anything.</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time"><i class="bi bi-check2-all"></i> 10:00</div>
									<div class="messenger-badge empty"></div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-8.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Cat Videos</div>
									<div class="messenger-text"><i class="bi bi-play-circle-fill"></i> Video</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">09:00</div>
									<div class="messenger-badge empty"></div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-9.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Garrick Banks</div>
									<div class="messenger-text">What are we doing for Jen's birthday on Friday?</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">09:41</div>
									<div class="messenger-badge empty"></div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-10.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Michelle</div>
									<div class="messenger-text">Let's get lunch tomorrow</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">08:45</div>
									<div class="messenger-badge">1</div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-2.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">Dana Klein</div>
									<div class="messenger-text">Next Friday works for me</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">08:30</div>
									<div class="messenger-badge">1</div>
								</div>
							</a>
						</div>
						<div class="messenger-item">
							<a href="#" data-toggle="messenger-content" class="messenger-link">
								<div class="messenger-media">
									<img src="/assets/img/user/user-1.jpg" class="mw-100 mh-100 rounded-pill" />
								</div>
								<div class="messenger-info">
									<div class="messenger-name">April</div>
									<div class="messenger-text">Yes or yes? ;)</div>
								</div>
								<div class="messenger-time-badge">
									<div class="messenger-time">08:22</div>
									<div class="messenger-badge empty"></div>
								</div>
							</a>
						</div>
					</perfect-scrollbar>
				</div>
			</div>
			<div class="messenger-content">
				<div class="messenger-content-header">
					<div class="messenger-content-header-mobile-toggler">
						<a href="#" data-toggle="messenger-content" class="me-2">
							<i class="bi bi-chevron-left"></i>
						</a>
					</div>
					<div class="messenger-content-header-media">
						<div class="media bg-theme text-black text-opacity-75 rounded-pill fs-24px fw-bold">
							<i class="bi bi-android2"></i>
						</div>
					</div>
					<div class="messenger-content-header-info">
						Mobile App Development Group
						<small>10 members</small>
					</div>
					<div class="messenger-content-header-btn">
						<a href="#" class="btn btn-link"><i class="bi bi-search"></i></a>
						<div class="dropdown">
							<a href="#" class="btn btn-link" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
							<div class="dropdown-menu fs-12px fw-bold">
								<a href="#" class="dropdown-item d-flex align-items-center"><i class="bi bi-pencil-square fs-14px my-n1 me-2"></i> EDIT</a>
								<a href="#" class="dropdown-item d-flex align-items-center"><i class="bi bi-info-circle fs-14px my-n1 me-2"></i> INFO</a>
								<a href="#" class="dropdown-item d-flex align-items-center"><i class="bi bi-bell-slash fs-14px my-n1 me-2"></i> MUTE</a>
								<a href="#" class="dropdown-item d-flex align-items-center"><i class="bi bi-x-circle fs-14px my-n1 me-2"></i> CLEAR CHAT HISTORY</a>
								<div class="dropdown-divider"></div>
								<a href="#" class="dropdown-item d-flex align-items-center text-danger"><i class="bi bi-trash fs-14px my-n1 me-2"></i> DELETE AND LEAVE</a>
							</div>
						</div>
					</div>
				</div>
				<div class="messenger-content-body">
					<perfect-scrollbar class="h-100">
						<div class="widget-chat">
							<div class="widget-chat-date">YESTERDAY</div>
							<div class="widget-chat-item">
								<div class="widget-chat-media"><img src="/assets/img/user/user-5.jpg" alt="" /></div>
								<div class="widget-chat-content">
									<div class="widget-chat-name">Ann Gray</div>
									<div class="widget-chat-message">
										Hey folks, please check your emails. I have shared you the slide.
									</div>
									<div class="widget-chat-status">Yesterday 3:25PM</div>
								</div>
							</div>
							<div class="widget-chat-item">
								<div class="widget-chat-media"><img src="/assets/img/user/user-6.jpg" alt="" /></div>
								<div class="widget-chat-content">
									<div class="widget-chat-name">Jeffrey Clark</div>
									<div class="widget-chat-message">
										Hey folks, please check your emails. I have shared you the slide.
									</div>
									<div class="widget-chat-status">Yesterday 3:27PM</div>
								</div>
							</div>
							<div class="widget-chat-item">
								<div class="widget-chat-media"><img src="/assets/img/user/user-7.jpg" alt="" /></div>
								<div class="widget-chat-content">
									<div class="widget-chat-name">Adam Lee</div>
									<div class="widget-chat-message">
										Yes, we are going to use this slide. But we will have only 5 minutes to present it.
									</div>
									<div class="widget-chat-status">Yesterday 3:30PM</div>
								</div>
							</div>
							<div class="widget-chat-date">TODAY</div>
							<div class="widget-chat-item">
								<div class="widget-chat-media"><img src="/assets/img/user/user-1.jpg" alt="" /></div>
								<div class="widget-chat-content">
									<div class="widget-chat-name">Roberto Lambert</div>
									<div class="widget-chat-message">
										Hi, will be a little late to the production meeting.
									</div>
									<div class="widget-chat-status">2:21PM</div>
								</div>
							</div>
							<div class="widget-chat-item reply">
								<div class="widget-chat-content">
									<div class="widget-chat-message last">
										No problem. I will be sure to take notes.
									</div>
									<div class="widget-chat-status">2:22PM</div>
								</div>
							</div>
							<div class="widget-chat-item">
								<div class="widget-chat-media"><img src="/assets/img/user/user-2.jpg" alt="" /></div>
								<div class="widget-chat-content">
									<div class="widget-chat-name">Roberto Lambert</div>
									<div class="widget-chat-message">
										Thank you! I should be there by 9:10.
									</div>
									<div class="widget-chat-status">2:25PM</div>
								</div>
							</div>
							<div class="widget-chat-item reply">
								<div class="widget-chat-content">
									<div class="widget-chat-message last">
										Don't rush. I've got it covered.
									</div>
									<div class="widget-chat-status">2:27PM</div>
								</div>
							</div>
							<div class="widget-chat-item">
								<div class="widget-chat-media"><img src="/assets/img/user/user-1.jpg" alt="" /></div>
								<div class="widget-chat-content">
									<div class="widget-chat-name">Roberto Lambert</div>
									<div class="widget-chat-message">
										Hey Gabe, can you forward me the meeting notes?
									</div>
									<div class="widget-chat-status">4:30PM</div>
								</div>
							</div>
						</div>
					</perfect-scrollbar>
				</div>
				<div class="messenger-content-footer">
					<div class="input-group input-group-lg position-relative">
						<button class="btn position-absolute start-0 text-inverse" id="trigger"><i class="far fa-face-smile"></i></button>
						<input type="text" class="form-control rounded-start ps-45px" id="input" placeholder="Write a message..." />
						<button class="btn btn-outline-default" type="button"><i class="fa fa-paper-plane text-muted"></i></button>
					</div>
				</div>
			</div>
		</div>
	</card>
</template>