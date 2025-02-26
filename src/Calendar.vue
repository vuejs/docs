<script>
import { useAppOptionStore } from '@/stores/app-option';
import { useAppVariableStore } from '@/stores/app-variable';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

const appOption = useAppOptionStore();
const appVariable = useAppVariableStore();

export default {
	components: {
    FullCalendar
	},
  data() {
  	var d = new Date();
		var month = d.getMonth() + 1;
				month = (month < 10) ? '0' + month : month;
		var year = d.getFullYear();
		var day = d.getDate();
		
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrapPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: {
					left: 'dayGridMonth,timeGridWeek,timeGridDay',
					center: 'title',
					right: 'prev,next today'
				},
				buttonText: {
					today:    'Today',
					month:    'Month',
					week:     'Week',
					day:      'Day'
				},
				initialView: 'dayGridMonth',
				editable: true,
				droppable: true,
				themeSystem: 'bootstrap',
				views: {
					timeGrid: {
						eventLimit: 6
					}
				},
				events: [{
					title: 'Trip to London',
					start: year + '-'+ month +'-01',
					end: year + '-'+ month +'-05',
					color: appVariable.color.theme
				},{
					title: 'Meet with Sean Ngu',
					start: year + '-'+ month +'-02T06:00:00',
					color: appVariable.color.blue
				},{
					title: 'Mobile Apps Brainstorming',
					start: year + '-'+ month +'-10',
					end: year + '-'+ month +'-12',
					color: appVariable.color.pink
				},{
					title: 'Stonehenge, Windsor Castle, Oxford',
					start: year + '-'+ month +'-05T08:45:00',
					end: year + '-'+ month +'-06T18:00',
					color: appVariable.color.indigo
				},{
					title: 'Paris Trip',
					start: year + '-'+ month +'-12',
					end: year + '-'+ month +'-16'
				},{
					title: 'Domain name due',
					start: year + '-'+ month +'-15',
					end: year + '-'+ month +'-15',
					color: appVariable.color.blue
				},{
					title: 'Cambridge Trip',
					start: year + '-'+ month +'-19',
					end: year + '-'+ month +'-19'
				},{
					title: 'Visit Apple Company',
					start: year + '-'+ month +'-22T05:00:00',
					color: appVariable.color.green
				},{
					title: 'Exercise Class',
					start: year + '-'+ month +'-22T07:30:00',
					color: appVariable.color.orange
				},{
					title: 'Live Recording',
					start: year + '-'+ month +'-22T03:00:00',
					color: appVariable.color.blue
				},{
					title: 'Announcement',
					start: year + '-'+ month +'-22T15:00:00',
					color: appVariable.color.red
				},{
					title: 'Dinner',
					start: year + '-'+ month +'-22T18:00:00'
				},{
					title: 'New Android App Discussion',
					start: year + '-'+ month +'-25T08:00:00',
					end: year + '-'+ month +'-25T10:00:00',
					color: appVariable.color.red
				},{
					title: 'Marketing Plan Presentation',
					start: year + '-'+ month +'-25T12:00:00',
					end: year + '-'+ month +'-25T14:00:00',
					color: appVariable.color.blue
				},{
					title: 'Chase due',
					start: year + '-'+ month +'-26T12:00:00',
					color: appVariable.color.orange
				},{
					title: 'Heartguard',
					start: year + '-'+ month +'-26T08:00:00',
					color: appVariable.color.orange
				},{
					title: 'Lunch with Richard',
					start: year + '-'+ month +'-28T14:00:00',
					color: appVariable.color.blue
				},{
					title: 'Web Hosting due',
					start: year + '-'+ month +'-30',
					color: appVariable.color.blue
				}]
      }
    }
  },
	mounted() {
		appOption.appContentFullHeight = true;
		appOption.appContentClass = 'p-0';
		
		var containerEl = document.getElementById('external-events');
		new Draggable(containerEl, {
			itemSelector: '.fc-event-link',
			eventData: function(eventEl) {
				return {
					title: eventEl.innerText,
					color: eventEl.getAttribute('data-color')
				};
			}
		});
		
		window.dispatchEvent(new Event('resize'));
	},
	beforeUnmount() {
		appOption.appContentFullHeight = false;
		appOption.appContentClass = '';
	}
}
</script>
<template>
	<div class="calendar">
		<!-- BEGIN calendar-body -->
		<div class="calendar-body">
			<perfect-scrollbar class="h-100">
				<FullCalendar :options="calendarOptions" />
			</perfect-scrollbar>
		</div>
		<!-- ENG calendar-body -->
		<!-- BEGIN calendar-sidebar -->
		<div class="calendar-sidebar">
			<div class="desktop-sticky-top flex-fill h-100">
				<div class="calendar-sidebar-title">Draggable Events:</div>
				<div class="fc-event-list" id="external-events">
					<div class="fc-event-item"><div class="fc-event-link" data-color="#ff2d55"><i class="fa fa-circle fs-8px me-2 text-pink"></i> Meeting</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#ff3b30"><i class="fa fa-circle fs-8px me-2 text-danger"></i> Group Discussion</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#FF9500"><i class="fa fa-circle fs-8px me-2 text-warning"></i> Brainstorming</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#FFCC00"><i class="fa fa-circle fs-8px me-2 text-yellow"></i> Presentation</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#1ABD36"><i class="fa fa-circle fs-8px me-2 text-success"></i> Holiday</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#0cd096"><i class="fa fa-circle fs-8px me-2 text-theme"></i> Sick Leave</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#30beff"><i class="fa fa-circle fs-8px me-2 text-info"></i> Overtime</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#1f6bff"><i class="fa fa-circle fs-8px me-2 text-blue"></i> Work from Home</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#640DF3"><i class="fa fa-circle fs-8px me-2 text-indigo"></i> Business Travel</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#5b2e91"><i class="fa fa-circle fs-8px me-2 text-purple"></i> Breakfast</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#869ac0"><i class="fa fa-circle fs-8px me-2 text-muted"></i> Lunch</div></div>
					<div class="fc-event-item"><div class="fc-event-link" data-color="#869ac0"><i class="fa fa-circle fs-8px me-2 text-muted"></i> Dinner</div></div>
				</div>
			</div>
		</div>
		<!-- ENG calendar-sidebar -->
	</div>
</template>