import { defineStore } from "pinia";

export const useAppTopNavMenuStore = defineStore({
  id: "appTopNavMenu",
  state: () => {
    return [{
      'url': '/',
      'icon': 'bi bi-cpu',
      'text': 'Dashboard'
    }, {
      'url': '/analytics',
      'icon': 'bi bi-bar-chart',
      'text': 'Analytics'
    }, {
      'icon': 'bi bi-envelope',
      'text': 'Email',
      'children': [{
				'url': '/email/inbox',
				'action': 'Inbox',
				'text': 'Inbox'
			}, {
				'url': '/email/compose',
				'action': 'Compose',
				'text': 'Compose'
			}, {
				'url': '/email/detail',
				'action': 'Detail',
				'text': 'Detail'
			}]
    }, {
      'url': '/widgets',
      'icon': 'bi bi-columns-gap',
      'text': 'Widgets'
    }, {
      'icon': 'bi bi-bag-check',
      'text': 'POS System',
      'children': [{
				'url': '/pos/customer-order',
				'text': 'Customer Order'
			}, {
				'url': '/pos/kitchen-order',
				'text': 'Kitchen Order'
			}, {
				'url': '/pos/counter-checkout',
				'text': 'Counter Checkout'
			}, {
				'url': '/pos/table-booking',
				'text': 'Table Booking'
			}, {
				'url': '/pos/menu-stock',
				'text': 'Menu Stock'
			}]
    }, {
      'icon': 'fa fa-heart',
      'text': 'UI Kits',
      'children': [{
				'url': '/ui/bootstrap',
				'text': 'Bootstrap'
			}, {
				'url': '/ui/buttons',
				'text': 'Buttons'
			}, {
				'url': '/ui/card',
				'text': 'Card'
			}, {
				'url': '/ui/icons',
				'text': 'Icons'
			}, {
				'url': '/ui/modal-notifications',
				'text': 'Modal & Notifications'
			}, {
				'url': '/ui/typography',
				'text': 'Typography'
			}, {
				'url': '/ui/tabs-accordions',
				'text': 'Tabs & Accordions'
			}]
    }, {
      'icon': 'bi bi-pen',
      'text': 'Forms',
      'children': [{
				'url': '/form/elements',
				'text': 'Form Elements'
			}, {
				'url': '/form/plugins',
				'text': 'Form Plugins'
			}, {
				'url': '/form/wizards',
				'text': 'Wizards'
			}]
    }, {
      'icon': 'bi bi-grid-3x3',
      'text': 'Tables',
      'children': [{
				'url': '/table/elements',
				'text': 'Table Elements'
			},
			{
				'url': '/table/plugins',
				'text': 'Table Plugins'
			}]
    }, {
      'icon': 'bi bi-pie-chart',
      'text': 'Charts',
      'children': [{
				'url': '/chart/chart-js',
				'text': 'Chart.js'
			},{
				'url': '/chart/chart-apex',
				'text': 'Apexcharts.js'
			}]
    }, {
      'url': '/map',
      'icon': 'bi bi-compass',
      'text': 'Map'
    }, {
      'url': 'Layout',
      'icon': 'bi bi-layout-sidebar',
      'text': 'Layout',
      'children': [{
				'url': '/layout/starter-page',
				'text': 'Starter Page'
			}, {
				'url': '/layout/fixed-footer',
				'text': 'Fixed Footer'
			}, {
				'url': '/layout/full-height',
				'text': 'Full Height'
			}, {
				'url': '/layout/full-width',
				'text': 'Full Width'
			}, {
				'url': '/layout/boxed-layout',
				'text': 'Boxed Layout'
			}, {
				'url': '/layout/collapsed-sidebar',
				'text': 'Collapsed Sidebar'
			}, {
				'url': '/layout/top-nav',
				'text': 'Top Nav'
			}, {
				'url': '/layout/mixed-nav',
				'text': 'Mixed Nav'
			}, {
				'url': '/layout/mixed-nav-boxed-layout',
				'text': 'Mixed Nav Boxed Layout'
			}]
    }, {
      'icon': 'bi bi-collection',
      'text': 'Pages',
      'children': [{
				'url': '/page/scrum-board',
				'text': 'Scrum Board'
			}, {
				'url': '/page/product',
				'text': 'Products'
			}, {
				'url': '/page/product-details',
				'text': 'Product Details'
			}, {
				'url': '/page/order',
				'text': 'Orders'
			}, {
				'url': '/page/order-details',
				'text': 'Order Details'
			}, {
				'url': '/page/gallery',
				'text': 'Gallery'
			}, {
				'url': '/page/search-results',
				'text': 'Search Results'
			}, {
				'url': '/page/coming-soon',
				'text': 'Coming Soon Page'
			}, {
				'url': '/page/error',
				'text': 'Error Page'
			}, {
				'url': '/page/login',
				'text': 'Login'
			}, {
				'url': '/page/register',
				'text': 'Register'
			}, {
				'url': '/page/messenger',
				'text': 'Messenger'
			}, {
				'url': '/page/data-management',
				'text': 'Data Management'
			}, {
				'url': '/page/file-manager',
				'text': 'File Manager'
			}, {
				'url': '/page/pricing',
				'text': 'Pricing Page'
			}]
    }, {
      'url': '/landing',
      'icon': 'bi bi-diagram-3',
      'text': 'Landing Page'
    }, {
      'url': '/profile',
      'icon': 'bi bi-people',
      'text': 'Profile'
    }, {
      'url': '/calendar',
      'icon': 'bi bi-calendar4',
      'text': 'Calendar'
    }, {
      'url': '/settings',
      'icon': 'bi bi-gear',
      'text': 'Settings'
    }, {
      'url': '/helper',
      'icon': 'bi bi-gem',
      'text': 'Helper'
    }]
	}
});
