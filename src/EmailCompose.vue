<script>
import { useAppOptionStore } from '@/stores/app-option';
import { onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router';
import quillEditor from '@/components/plugins/QuillEditor.vue';
import tagsInput from '@/components/plugins/TagsInput.vue';

const appOption = useAppOptionStore();

export default {
	data () {
    return {
      to: '',
      cc: '',
      bcc: '',
      toTags: [{ text: 'seantheme@support.com'}],
      ccTags: [],
      bccTags: [],
      tagsAutocomplete: [{ text: 'javascript'}, { text: 'css'}, { text: 'html'}]
    }
  },
	components: {
		tagsInput: tagsInput,
		quillEditor: quillEditor
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
				<div class="mailbox-toolbar-item"><span class="mailbox-toolbar-text">New Message</span></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/compose" class="mailbox-toolbar-link active">Send</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/compose" class="mailbox-toolbar-link">Attachment</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link">Discard</RouterLink></div>
				<div class="mailbox-toolbar-item dropdown">
					<a href="#" class="mailbox-toolbar-link" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
					<div class="dropdown-menu ms-n1 position-fixed">
						<a href="#" class="dropdown-item">Save draft</a>
						<a href="#" class="dropdown-item">Show From</a>
						<a href="#" class="dropdown-item">Check names</a>
						<a href="#" class="dropdown-item">Set importance</a>
						<a href="#" class="dropdown-item">Switch to plain text</a>
						<a href="#" class="dropdown-item">Check for accessibility issues</a>
					</div>
				</div>
				<div class="mailbox-toolbar-item ms-auto"><RouterLink to="/email/compose" class="mailbox-toolbar-link"><i class="fa fa-redo fa-fw fs-12px me-1"></i> Undo</RouterLink></div>
				<div class="mailbox-toolbar-item"><RouterLink to="/email/inbox" class="mailbox-toolbar-link"><i class="fa fa-times fa-fw"></i> Cancel</RouterLink></div>
			</div>
			<!-- END mailbox-toolbar -->
			<!-- BEGIN mailbox-body -->
			<div class="mailbox-body">
				<div class="mailbox-content">
					<form action="#" method="POST" name="email_form" class="h-100">
						<!-- BEGIN scrollbar -->
						<perfect-scrollbar class="h-100">
							<div class="mailbox-form d-flex flex-column h-100">
								<div class="mailbox-form-header">
									<div class="row mb-2">
										<label class="col-form-label w-100px px-2 fw-500 text-lg-end">To:</label>
										<div class="col-lg">
											<tags-input v-model="to" :tags="toTags" placeholder="" :autocomplete-items="tagsAutocomplete" />
										</div>
									</div>
									<div class="row mb-2">
										<label class="col-form-label w-100px px-2 fw-500 text-lg-end">Cc:</label>
										<div class="col-lg">
											<tags-input v-model="cc" :tags="ccTags" placeholder="" :autocomplete-items="tagsAutocomplete" />
										</div>
									</div>
									<div class="row mb-2">
										<label class="col-form-label w-100px px-2 fw-500 text-lg-end">Bcc:</label>
										<div class="col-lg">
											<tags-input v-model="bcc" :tags="bccTags" placeholder="" :autocomplete-items="tagsAutocomplete" />
										</div>
									</div>
									<div class="row mb-0">
										<label class="col-form-label w-100px px-2 fw-500 text-lg-end">Subject:</label>
										<div class="col-lg">
											<input type="text" class="form-control" placeholder="Email subject" />
										</div>
									</div>
								</div>
								<quill-editor theme="snow" />
							</div>
						</perfect-scrollbar>
						<!-- END scrollbar -->
					</form>
				</div>
			</div>
			<!-- END mailbox-body -->
		</div>
		<!-- END mailbox -->
	</card>
	<!-- END card -->
</template>