<script>
import highlightjs from '@/components/plugins/Highlightjs.vue';
import navscrollto from '@/components/app/NavScrollTo.vue';
import axios from 'axios';
import { useAppVariableStore } from '@/stores/app-variable';
import { ScrollSpy } from 'bootstrap';

const appVariable = useAppVariableStore();

export default {
	data () {
		return {
			code1: '',
			code2: '',
			code3: '',
			code4: '',
			code5: ''
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto
	},
	mounted() {
		axios.get('/assets/data/ui/tabs-accordions-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		axios.get('/assets/data/ui/tabs-accordions-code-2.json').then((response) => {
			this.code2 = response.data;
		});
		axios.get('/assets/data/ui/tabs-accordions-code-3.json').then((response) => {
			this.code3 = response.data;
		});
		axios.get('/assets/data/ui/tabs-accordions-code-4.json').then((response) => {
			this.code4 = response.data;
		});
		axios.get('/assets/data/ui/tabs-accordions-code-5.json').then((response) => {
			this.code5 = response.data;
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
							<li class="breadcrumb-item"><a href="#">UI KITS</a></li>
							<li class="breadcrumb-item active">TABS & ACCORDIONS</li>
						</ul>
						
						<h1 class="page-header">
							Tabs & Accordions <small>page header description goes here...</small>
						</h1>
						
						<hr class="mb-4">
						
						<!-- BEGIN #tabs -->
						<div id="tabs" class="mb-5">
							<h4>Tabs</h4>
							<p>
								Takes the basic nav from above and adds the .nav-tabs class to generate a tabbed interface. Use them to create tabbable regions with bootstrap tab JavaScript plugin.
								Please read the <a href="https://getbootstrap.com/docs/5.3/components/navs/#tabs" target="_blank">official Bootstrap documentation</a> for the full list of options.
							</p>
							<card>
								<card-body>
									<!-- BEGIN nav-tabs -->
									<ul class="nav nav-tabs">
										<li class="nav-item me-1"><a href="#home" class="nav-link active" data-bs-toggle="tab">Home</a></li>
										<li class="nav-item me-1"><a href="#profile" class="nav-link" data-bs-toggle="tab">Profile</a></li>
										<li class="nav-item me-1 dropdown">
											<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
												Dropdown
											</a>
											<div class="dropdown-menu">
												<a href="#dropdown1" class="dropdown-item" data-bs-toggle="tab">@fat</a>
												<a href="#dropdown2" class="dropdown-item" data-bs-toggle="tab">@mdo</a>
											</div> 
										</li>
									</ul>
									<!-- END nav-tabs -->
									<!-- BEGIN tab-content -->
									<div class="tab-content pt-3">
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade show active" id="home">
											<p>
												Raw denim you probably haven't heard of them jean shorts Austin. 
												Nesciunt tofu stumptown aliqua, retro synth master cleanse. 
												Mustache cliche tempor, williamsburg carles vegan helvetica. 
												Reprehenderit butcher retro keffiyeh dreamcatcher synth. 
												Cosby sweater eu banh mi, qui irure terry richardson ex squid. 
												Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, 
												butcher voluptate nisi qui.
											</p>
										</div>
										<!-- END tab-pane -->
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade" id="profile">
											<p>
												Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. 
												Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan 
												four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft 
												beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda 
												labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit 
												sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean 
												shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, 
												tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
											</p>
										</div>
										<!-- END tab-pane -->
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade" id="dropdown1">
											<p>
												Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic 
												lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed 
												craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth 
												PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever 
												gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you 
												probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu 
												synth chambray yr.
											</p>
										</div>
										<!-- END tab-pane -->
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade" id="dropdown2">
											<p>
												Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out 
												master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY,
												art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, 
												banh mi before they sold out farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral, 
												mustache readymade thundercats keffiyeh craft beer marfa ethical. Wolf salvia freegan, sartorial 
												keffiyeh echo park vegan.
											</p>
										</div>
										<!-- END tab-pane -->
									</div>
									<!-- END tab-content -->
								</card-body>
								<highlightjs :code="code1"></highlightjs>
							</card>
						</div>
						<!-- END #tabs -->
						
						<!-- BEGIN #tabsV2 -->
						<div id="tabsV2" class="mb-5">
							<h4>Tabs v2</h4>
							<p>
								This is an extended ui layout from default Bootstrap navigation tabs. Add <code>.nav-tabs-v2</code> to the navigation element in order to activate the v2 layout.
							</p>
							<card>
								<card-body class="pt-1">
									<!-- BEGIN nav-tabs -->
									<ul class="nav nav-tabs nav-tabs-v2">
										<li class="nav-item me-3"><a href="#homev2" class="nav-link active" data-bs-toggle="tab">Home</a></li>
										<li class="nav-item me-3"><a href="#profilev2" class="nav-link" data-bs-toggle="tab">Profile</a></li>
										<li class="nav-item me-3 dropdown">
											<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
												Dropdown
											</a>
											<div class="dropdown-menu">
												<a href="#dropdown1v2" class="dropdown-item" data-bs-toggle="tab">@fat</a>
												<a href="#dropdown2v2" class="dropdown-item" data-bs-toggle="tab">@mdo</a>
											</div> 
										</li>
									</ul>
									<!-- END nav-tabs -->
									<!-- BEGIN tab-content -->
									<div class="tab-content pt-3">
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade show active" id="homev2">
											<p>
												Raw denim you probably haven't heard of them jean shorts Austin. 
												Nesciunt tofu stumptown aliqua, retro synth master cleanse. 
												Mustache cliche tempor, williamsburg carles vegan helvetica. 
												Reprehenderit butcher retro keffiyeh dreamcatcher synth. 
												Cosby sweater eu banh mi, qui irure terry richardson ex squid. 
												Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, 
												butcher voluptate nisi qui.
											</p>
										</div>
										<!-- END tab-pane -->
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade" id="profilev2">
											<p>
												Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. 
												Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan 
												four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft 
												beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda 
												labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit 
												sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean 
												shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, 
												tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
											</p>
										</div>
										<!-- END tab-pane -->
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade" id="dropdown1v2">
											<p>
												Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic 
												lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed 
												craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth 
												PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever 
												gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you 
												probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu 
												synth chambray yr.
											</p>
										</div>
										<!-- END tab-pane -->
										<!-- BEGIN tab-pane -->
										<div class="tab-pane fade" id="dropdown2v2">
											<p>
												Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out 
												master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY,
												art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, 
												banh mi before they sold out farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral, 
												mustache readymade thundercats keffiyeh craft beer marfa ethical. Wolf salvia freegan, sartorial 
												keffiyeh echo park vegan.
											</p>
										</div>
										<!-- END tab-pane -->
									</div>
									<!-- END tab-content -->
								</card-body>
								<highlightjs :code="code2"></highlightjs>
							</card>
						</div>
						<!-- END #tabsV2 -->
						
						<!-- BEGIN #tabsWithCard -->
						<div id="tabsWithCard" class="mb-5">
							<h4>Tabs with card</h4>
							<p>
								This is an extended ui layout from default Bootstrap navigation tabs. Add <code>.nav-tabs-v2</code> to the navigation element in order to activate the v2 layout.
							</p>
							<card>
								<card-body>
									<div class="row">
										<div class="col-xl-6">
											<card>
												<ul class="nav nav-tabs pt-3 px-3">
													<li class="nav-item me-1"><a href="#homeWithCard" class="nav-link active" data-bs-toggle="tab">Home</a></li>
													<li class="nav-item me-1"><a href="#profileWithCard" class="nav-link" data-bs-toggle="tab">Profile</a></li>
												</ul>
												<div class="tab-content p-4">
													<!-- BEGIN tab-pane -->
													<div class="tab-pane fade show active" id="homeWithCard">
														<p>
															Raw denim you probably haven't heard of them jean shorts Austin. 
															Nesciunt tofu stumptown aliqua, retro synth master cleanse. 
															Mustache cliche tempor, williamsburg carles vegan helvetica. 
															Reprehenderit butcher retro keffiyeh dreamcatcher synth. 
															Cosby sweater eu banh mi, qui irure terry richardson ex squid. 
															Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, 
															butcher voluptate nisi qui.
														</p>
													</div>
													<!-- END tab-pane -->
													<!-- BEGIN tab-pane -->
													<div class="tab-pane fade" id="profileWithCard">
														<p>
															Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. 
															Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan 
															four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft 
															beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda 
															labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit 
															sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean 
															shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, 
															tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
														</p>
													</div>
													<!-- END tab-pane -->
												</div>
											</card>
										</div>
										<div class="col-xl-6">
											<card>
												<ul class="nav nav-tabs nav-tabs-v2 ps-4 pe-4">
													<li class="nav-item me-3"><a href="#homev2WithCard" class="nav-link active" data-bs-toggle="tab">Home</a></li>
													<li class="nav-item me-3"><a href="#profilev2WithCard" class="nav-link" data-bs-toggle="tab">Profile</a></li>
												</ul>
												<div class="tab-content p-4">
													<!-- BEGIN tab-pane -->
													<div class="tab-pane fade show active" id="homev2WithCard">
														<p>
															Raw denim you probably haven't heard of them jean shorts Austin. 
															Nesciunt tofu stumptown aliqua, retro synth master cleanse. 
															Mustache cliche tempor, williamsburg carles vegan helvetica. 
															Reprehenderit butcher retro keffiyeh dreamcatcher synth. 
															Cosby sweater eu banh mi, qui irure terry richardson ex squid. 
															Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, 
															butcher voluptate nisi qui.
														</p>
													</div>
													<!-- END tab-pane -->
													<!-- BEGIN tab-pane -->
													<div class="tab-pane fade" id="profilev2WithCard">
														<p>
															Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. 
															Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan 
															four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft 
															beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda 
															labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit 
															sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean 
															shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, 
															tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
														</p>
													</div>
													<!-- END tab-pane -->
												</div>
											</card>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code3"></highlightjs>
							</card>
						</div>
						<!-- END #tabsWithCard -->
						
						<!-- BEGIN #pills -->
						<div id="pills" class="mb-5">
							<h4>Pills</h4>
							<p>
								Take that same HTML, but use <code>.nav-pills</code> instead:
							</p>
							<card>
								<card-body>
									<ul class="nav nav-pills mb-3" id="pills-tab">
										<li class="nav-item">
											<a class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" href="#pills-home">Home</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" href="#pills-profile">Profile</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" href="#pills-contact">Contact</a>
										</li>
									</ul>
									<div class="tab-content" id="pills-tabContent">
										<div class="tab-pane fade show active" id="pills-home">
											Consequat occaecat ullamco amet non eiusmod nostrud dolore irure incididunt est duis anim sunt officia. Fugiat velit proident aliquip nisi incididunt nostrud exercitation proident est nisi. Irure magna elit commodo anim ex veniam culpa eiusmod id nostrud sit cupidatat in veniam ad. Eiusmod consequat eu adipisicing minim anim aliquip cupidatat culpa excepteur quis. Occaecat sit eu exercitation irure Lorem incididunt nostrud.
										</div>
										<div class="tab-pane fade" id="pills-profile">
											Ad pariatur nostrud pariatur exercitation ipsum ipsum culpa mollit commodo mollit ex. Aute sunt incididunt amet commodo est sint nisi deserunt pariatur do. Aliquip ex eiusmod voluptate exercitation cillum id incididunt elit sunt. Qui minim sit magna Lorem id et dolore velit Lorem amet exercitation duis deserunt. Anim id labore elit adipisicing ut in id occaecat pariatur ut ullamco ea tempor duis.
										</div>
										<div class="tab-pane fade" id="pills-contact">
											Est quis nulla laborum officia ad nisi ex nostrud culpa Lorem excepteur aliquip dolor aliqua irure ex. Nulla ut duis ipsum nisi elit fugiat commodo sunt reprehenderit laborum veniam eu veniam. Eiusmod minim exercitation fugiat irure ex labore incididunt do fugiat commodo aliquip sit id deserunt reprehenderit aliquip nostrud. Amet ex cupidatat excepteur aute veniam incididunt mollit cupidatat esse irure officia elit do ipsum ullamco Lorem. Ullamco ut ad minim do mollit labore ipsum laboris ipsum commodo sunt tempor enim incididunt. Commodo quis sunt dolore aliquip aute tempor irure magna enim minim reprehenderit. Ullamco consectetur culpa veniam sint cillum aliqua incididunt velit ullamco sunt ullamco quis quis commodo voluptate. Mollit nulla nostrud adipisicing aliqua cupidatat aliqua pariatur mollit voluptate voluptate consequat non.
										</div>
									</div>
								</card-body>
								<highlightjs :code="code4"></highlightjs>
							</card>
						</div>
						<!-- END #pills -->
						
						<!-- BEGIN #accordion -->
						<div id="accordion" class="mb-5">
							<h4>Accordion</h4>
							<p>
								Build vertically collapsing accordions in combination with Bootstrap Collapse JavaScript plugin. Please read the <a href="https://getbootstrap.com/docs/5.3/components/accordion/" target="_blank">official Bootstrap documentation</a> for the full list of options.
							</p>
							<card>
								<card-body>
									<div class="accordion" id="accordionExample">
										<div class="accordion-item">
											<h2 class="accordion-header" id="headingOne">
												<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
													Accordion Item #1
												</button>
											</h2>
											<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
												<div class="accordion-body">
													<strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
												</div>
											</div>
										</div>
										<div class="accordion-item">
											<h2 class="accordion-header" id="headingTwo">
												<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
													Accordion Item #2
												</button>
											</h2>
											<div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
												<div class="accordion-body">
													<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
												</div>
											</div>
										</div>
										<div class="accordion-item">
											<h2 class="accordion-header" id="headingThree">
												<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
													Accordion Item #3
												</button>
											</h2>
											<div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
												<div class="accordion-body">
													<strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
												</div>
											</div>
										</div>
									</div>
								</card-body>
								<highlightjs :code="code5"></highlightjs>
							</card>
						</div>
						<!-- END #accordion -->
					</div>
					<!-- END col-9 -->
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebar-bootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav">
								<nav-scroll-to target="#tabs" data-toggle="scroll-to">Tabs</nav-scroll-to>
								<nav-scroll-to target="#tabsV2" data-toggle="scroll-to">Tabs v2</nav-scroll-to>
								<nav-scroll-to target="#tabsWithCard" data-toggle="scroll-to">Tabs with card</nav-scroll-to>
								<nav-scroll-to target="#pills" data-toggle="scroll-to">Pills</nav-scroll-to>
								<nav-scroll-to target="#accordion" data-toggle="scroll-to">Accordion</nav-scroll-to>
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
