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
			code5: '',
			code6: '',
			code7: '',
			code8: '',
			code9: ''
		}
	},
	components: {
		highlightjs: highlightjs,
		navScrollTo: navscrollto
	},
	mounted() {
		axios.get('/assets/data/ui/typography-code-1.json').then((response) => {
			this.code1 = response.data;
		});
		axios.get('/assets/data/ui/typography-code-2.json').then((response) => {
			this.code2 = response.data;
		});
		axios.get('/assets/data/ui/typography-code-3.json').then((response) => {
			this.code3 = response.data;
		});
		axios.get('/assets/data/ui/typography-code-4.json').then((response) => {
			this.code4 = response.data;
		});
		axios.get('/assets/data/ui/typography-code-5.json').then((response) => {
			this.code5 = response.data;
		});
		axios.get('/assets/data/ui/typography-code-6.json').then((response) => {
			this.code6 = response.data;
		});
		axios.get('/assets/data/ui/typography-code-7.json').then((response) => {
			this.code7 = response.data;
		});
		axios.get('/assets/data/ui/typography-code-8.json').then((response) => {
			this.code8 = response.data;
		});
		axios.get('/assets/data/ui/typography-code-9.json').then((response) => {
			this.code9 = response.data;
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
							<li class="breadcrumb-item active">TYPOGRAPHY</li>
						</ul>
						
						<h1 class="page-header">
							Typography <small>page header description goes here...</small>
						</h1>
						
						<hr class="mb-4">
						
						<!-- BEGIN #headings -->
						<div id="headings" class="mb-5">
							<h4>Headings</h4>
							<p>All HTML headings, <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>, are available. <code>.h1</code> through <code>.h6</code> classes are also available, for when you want to match the font styling of a heading but cannot use the associated HTML element. Please read the <a href="https://getbootstrap.com/docs/5.3/content/typography/" target="_blank">official Bootstrap documentation</a> for the full list of options.</p>
							<card>
								<card-body>
									<h1>h1. Bootstrap heading</h1>
									<h2>h2. Bootstrap heading</h2>
									<h3>h3. Bootstrap heading</h3>
									<h4>h4. Bootstrap heading</h4>
									<h5>h5. Bootstrap heading</h5>
									<h6>h6. Bootstrap heading</h6>
								</card-body>
								<highlightjs :code="code1"></highlightjs>
							</card>
						</div>
						<!-- END #headings -->
						
						<!-- BEGIN #displayHeadings -->
						<div id="displayHeadings" class="mb-5">
							<h4>Display headings</h4>
							<p>Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to stand out, consider using a display heading—a larger, slightly more opinionated heading style.</p>
							<card>
								<card-body>
									<h1 class="display-1">Display 1</h1>
									<h1 class="display-2">Display 2</h1>
									<h1 class="display-3">Display 3</h1>
									<h1 class="display-4">Display 4</h1>
								</card-body>
								<highlightjs :code="code2"></highlightjs>
							</card>
						</div>
						<!-- END #displayHeadings -->
						
						<!-- BEGIN #lead -->
						<div id="lead" class="mb-5">
							<h4>Lead</h4>
							<p>Make a paragraph stand out by adding <code>.lead</code>.</p>
							<card>
								<card-body>
									<p class="lead">
										Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
									</p>
								</card-body>
								<highlightjs :code="code3"></highlightjs>
							</card>
						</div>
						<!-- END #lead -->
						
						<!-- BEGIN #inlineTextElements -->
						<div id="inlineTextElements" class="mb-5">
							<h4>Headings</h4>
							<p>Styling for common inline HTML5 elements.</p>
							<card>
								<card-body>
									<p>You can use the mark tag to <mark>highlight</mark> text.</p>
									<p><del>This line of text is meant to be treated as deleted text.</del></p>
									<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
									<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
									<p><u>This line of text will render as underlined</u></p>
									<p><small>This line of text is meant to be treated as fine print.</small></p>
									<p><strong>This line rendered as bold text.</strong></p>
									<p><em>This line rendered as italicized text.</em></p>
								</card-body>
								<highlightjs :code="code4"></highlightjs>
							</card>
						</div>
						<!-- END #inlineTextElements -->
						
						<!-- BEGIN #abbreviations -->
						<div id="abbreviations" class="mb-5">
							<h4>Abbreviations</h4>
							<p>Stylized implementation of HTML’s <code>&lt;abbr&gt;</code> element for abbreviations and acronyms to show the expanded version on hover. Abbreviations have a default underline and gain a help cursor to provide additional context on hover and to users of assistive technologies. Add <code>.initialism</code> to an abbreviation for a slightly smaller font-size.</p>
							<card>
								<card-body>
									<p><abbr title="attribute">attr</abbr></p>
									<p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
								</card-body>
								<highlightjs :code="code5"></highlightjs>
							</card>
						</div>
						<!-- END #abbreviations -->
						
						<!-- BEGIN #blockquotes -->
						<div id="blockquotes" class="mb-5">
							<h4>Blockquotes</h4>
							<p>For quoting blocks of content from another source within your document. Wrap <code>&lt;blockquote class="blockquote"&gt;</code> around any HTML as the quote.</p>
							<card>
								<card-body>
									<figure class="mb-0">
										<blockquote class="blockquote">
											<p>A well-known quote, contained in a blockquote element.</p>
										</blockquote>
										<figcaption class="blockquote-footer mb-0">
											Someone famous in <cite title="Source Title">Source Title</cite>
										</figcaption>
									</figure>
								</card-body>
								<highlightjs :code="code6"></highlightjs>
							</card>
						</div>
						<!-- END #blockquotes -->
						
						<!-- BEGIN #unstyledList -->
						<div id="unstyledList" class="mb-5">
							<h4>Unstyled list</h4>
							<p>Remove the default <code>list-style</code> and left margin on list items (immediate children only). This only applies to immediate children list items, meaning you will need to add the class for any nested lists as well.</p>
							<card>
								<card-body>
									<ul class="list-unstyled">
										<li>Lorem ipsum dolor sit amet</li>
										<li>Consectetur adipiscing elit</li>
										<li>Nulla volutpat aliquam velit
											<ul>
												<li>Phasellus iaculis neque</li>
												<li>Purus sodales ultricies</li>
											</ul>
										</li>
										<li>Faucibus porta lacus fringilla vel</li>
										<li>Aenean sit amet erat nunc</li>
										<li>Eget porttitor lorem</li>
									</ul>
								</card-body>
								<highlightjs :code="code7"></highlightjs>
							</card>
						</div>
						<!-- END #unstyledList -->
						
						<!-- BEGIN #inlineList -->
						<div id="inlineList" class="mb-5">
							<h4>Inline list</h4>
							<p>Remove a list’s bullets and apply some light margin with a combination of two classes, <code>.list-inline</code> and <code>.list-inline-item</code>.</p>
							<card>
								<card-body>
									<ul class="list-inline">
										<li class="list-inline-item">Lorem ipsum</li>
										<li class="list-inline-item">Phasellus iaculis</li>
										<li class="list-inline-item">Nulla volutpat</li>
									</ul>
								</card-body>
								<highlightjs :code="code8"></highlightjs>
							</card>
						</div>
						<!-- END #inlineList -->
						
						<!-- BEGIN #descriptionList -->
						<div id="descriptionList" class="mb-5">
							<h4>Description list</h4>
							<p>Align terms and descriptions horizontally by using our grid system’s predefined classes (or semantic mixins). For longer terms, you can optionally add a .text-truncate class to truncate the text with an ellipsis.</p>
							<card>
								<card-body>
									<dl class="row">
										<dt class="col-sm-3">Description lists</dt>
										<dd class="col-sm-9">A description list is perfect for defining terms.</dd>
										<dt class="col-sm-3">Euismod</dt>
										<dd class="col-sm-9">
											<p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
											<p>Donec id elit non mi porta gravida at eget metus.</p>
										</dd>
										<dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
										<dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

										<dt class="col-sm-3">Nesting</dt>
										<dd class="col-sm-9">
											<dl class="row">
												<dt class="col-sm-4">Nested definition list</dt>
												<dd class="col-sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
											</dl>
										</dd>
									</dl>
								</card-body>
								<highlightjs :code="code9"></highlightjs>
							</card>
						</div>
						<!-- END #descriptionList -->
					</div>
					<!-- END col-9-->
					<!-- BEGIN col-3 -->
					<div class="col-xl-3">
						<!-- BEGIN #sidebar-bootstrap -->
						<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
							<nav class="nav">
								<nav-scroll-to target="#headings" data-toggle="scroll-to">Headings</nav-scroll-to>
								<nav-scroll-to target="#displayHeadings" data-toggle="scroll-to">Display headings</nav-scroll-to>
								<nav-scroll-to target="#lead" data-toggle="scroll-to">Lead</nav-scroll-to>
								<nav-scroll-to target="#inlineTextElements" data-toggle="scroll-to">Inline text elements</nav-scroll-to>
								<nav-scroll-to target="#abbreviations" data-toggle="scroll-to">Abbreviations</nav-scroll-to>
								<nav-scroll-to target="#blockquotes" data-toggle="scroll-to">Blockquotes</nav-scroll-to>
								<nav-scroll-to target="#unstyledList" data-toggle="scroll-to">Unstyled list</nav-scroll-to>
								<nav-scroll-to target="#inlineList" data-toggle="scroll-to">Inline list</nav-scroll-to>
								<nav-scroll-to target="#descriptionList" data-toggle="scroll-to">Description List</nav-scroll-to>
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
