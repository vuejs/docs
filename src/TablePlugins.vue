<script>
import { defineComponent, reactive, computed, ref } from 'vue';
import highlightjs from '@/components/plugins/Highlightjs.vue';
import vueTable from '@/components/plugins/VueTable.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import { useAppVariableStore } from '@/stores/app-variable';
import { ScrollSpy } from 'bootstrap';

const appVariable = useAppVariableStore();
const searchTerm = ref('');

export default {
	data () {
		const data = reactive([]);
		
    for (let i = 0; i < 126; i++) {
      data.push({
        id: i,
        name: "TEST" + i,
        email: "test" + i + "@example.com",
      });
    }
    
    // Table config
    const table = reactive({
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
      ],
      rows: computed(() => {
        return data.filter(
          (x) =>
            x.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      }),
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
    
		return {
			code1: '',
			table,
			searchTerm
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto,
		vueTable: vueTable
	},
	mounted() {
		axios.get('/assets/data/table/plugin-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		
		new ScrollSpy(document.body, {
			target: '#sidebar-bootstrap',
			offset: 200
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
						<ul class="breadcrumb">
							<li class="breadcrumb-item"><a href="#">TABLES</a></li>
							<li class="breadcrumb-item active">TABLE PLUGINS</li>
						</ul>
					
						<h1 class="page-header">
							Table Plugins <small>page header description goes here...</small>
						</h1>
					
						<hr class="mb-4" />
					
						<!-- BEGIN #vue3TableLite -->
						<div id="vue3TableLite" class="mb-5">
							<h4>Vue3 Table Lite</h4>
							<p>Vue3 Table Lite is a simple and lightweight data table component for Vue.js 3. Features sorting, paging, row check, dynamic data rendering, supported TypeScript, and more. Please read the <a href="https://github.com/linmasahiro/vue3-table-lite" target="_blank">official documentation</a> for the full list of options.</p>
							<card>
								<card-body>
									<div class="mb-3 d-flex align-items-center">
										<label class="pe-3">Search:</label>
										<input v-model="searchTerm" class="form-control w-200px" placeholder="Keywords..." />
									</div>
									<vue-table class="vue-table"
										:is-static-mode="true"
										:columns="table.columns"
										:rows="table.rows"
										:total="table.totalRecordCount"
										:sortable="table.sortable" />
								</card-body>
								<highlightjs :code="code1" />
							</card>
						</div>
						<!-- END #vue3TableLite -->
					</div>
					<!-- END col-9-->
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebar-bootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav">
								<nav-scroll-to class="nav-link" target="#vue3TableLite" data-toggle="scroll-to">Vue3 Table Lite</nav-scroll-to>
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
