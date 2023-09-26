# Câu hỏi thường gặp {#cau-hoi-thuong-gap}

## Ai đang duy trì Vue? {#ai-dang-duy-tri-vue}

Vue là một dự án độc lập, được phát triển theo hướng cộng đồng. Nó được tạo ra bởi [Evan You](https://twitter.com/youyuxi) vào năm 2014 như một dự án cá nhân. Hiện nay, Vue được duy trì tích cực bởi [một nhóm bao gồm các thành viên toàn thời gian và tình nguyện viên từ khắp nơi trên thế giới](/about/team), trong đó Evan là người điều hành dự án. Bạn có thể tìm hiểu thêm về câu chuyện của Vue trong [phim tài liệu](https://www.youtube.com/watch?v=OrxmtDw4pVI).

Vue được phát triển chủ yếu thông qua các tài trợ và chúng tôi đã có khả năng tài chính bền vững kể từ năm 2016. Nếu bạn hoặc doanh nghiệp của bạn có lợi từ Vue, hãy xem xét [tài trợ cho chúng tôi](/sponsor/) để hỗ trợ cho sự phát triển của Vue!

## Sự khác biệt giữa Vue 2 và Vue 3 là gì? {#su-khac-biet-giua-vue-2-va-vue-3-la-gi}

Vue 3 là phiên bản chính thức hiện tại của Vue. Nó bao gồm các tính năng mới, vốn không có trong Vue 2, chẳng hạn như Teleport, Suspense và multiple root elements trong một template. Nó cũng chứa các thay đổi đột phá, khiến cho Vue 3 không tương thích với Vue 2. Chi tiết đầy đủ được ghi lại trong [Hướng dẫn Vue 3 Migration](https://v3-migration.vuejs.org/).

Mặc dù có sự khác biệt, hầu hết các API của Vue được chia sẻ giữa hai phiên bản chính, vì vậy hầu hết kiến thức Vue 2 của bạn vẫn có thể sử dụng trong Vue 3. Đáng chú ý, Composition API ban đầu là một tính năng chỉ có trong Vue 3, nhưng hiện đã được thêm vào Vue 2 và có sẵn trong [Vue 2.7](https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01).

Nhìn chung, Vue 3 cung cấp kích thước bundle nhỏ hơn, hiệu suất tốt hơn, khả năng mở rộng tốt hơn và hỗ trợ TypeScript / IDE tốt hơn. Nếu bạn bắt đầu một dự án mới trong hiện tại, Vue 3 là lựa chọn được khuyến nghị. Chỉ có một số lý do để bạn xem xét Vue 2 nếu như:

- Bạn cần hỗ trợ cho IE11. Vue 3 sử dụng các tính năng JavaScript hiện đại và không hỗ trợ IE11.

Nếu như bạn đang xây dựng một ứng dụng Vue 2 và muốn chuyển sang Vue 3, hãy tham khảo [hướng dẫn migration](https://v3-migration.vuejs.org/).

## Vue 2 có còn được hỗ trợ không? {#vue-2-co-con-duoc-ho-tro-khong}

Vue 2.7, được phát hành vào tháng 7 năm 2022, là phiên bản phụ cuối cùng của dải phiên bản Vue 2. Vue 2 hiện đã bước vào chế độ bảo trì: nó sẽ không còn cập nhật thêm các tính năng mới nữa, nhưng vẫn tiếp tục nhận các bản sửa lỗi và cập nhật bảo mật quan trọng trong vòng 18 tháng kể từ ngày phát hành 2.7. Điều này có nghĩa là **Vue 2 sẽ Kết thúc Vòng đời vào ngày 31 tháng 12 năm 2023**.

Chúng tôi tin rằng điều này sẽ cung cấp đủ thời gian cho hầu hết các hệ sinh thái để chuyển sang Vue 3. Tuy nhiên, chúng tôi cũng hiểu rằng có thể có các nhóm hoặc dự án không thể nâng cấp trước thời hạn này trong khi vẫn cần đáp ứng các yêu cầu về bảo mật và tuân thủ. Chúng tôi đang hợp tác với các chuyên gia trong ngành để cung cấp hỗ trợ kéo dài cho Vue 2 cho các nhóm có nhu cầu như vậy - nếu nhóm của bạn dự kiến sẽ sử dụng Vue 2 vượt quá cuối năm 2023, hãy đảm bảo lên kế hoạch trước và tìm hiểu thêm về [Vue 2 Extended LTS](https://v2.vuejs.org/lts/).

## Vue đang sử dụng loại giấy phép nào? {#vue-dang-su-dung-loai-giay-phep-nao}

Vue là một dự án open source miễn phí được phát hành theo [Giấy phép MIT](https://opensource.org/licenses/MIT).


## Vue hỗ trợ những trình duyệt nào? {#vue-ho-tro-nhung-trinh-duyet-nao}

Phiên bản mới nhất của Vue (3.x) chỉ hỗ trợ những [trình duyệt có hỗ trợ ES2015](https://caniuse.com/es6), trong đó không bao gồm IE11. Vue 3.x sử dụng các tính năng ES2015 mà không thể polyfill được trong các trình duyệt cũ, vì vậy nếu bạn cần hỗ trợ các trình duyệt cũ, bạn sẽ cần sử dụng Vue 2.x.

## Vue có đáng tin cậy không? {#vue-co-dang-tin-cay-khong}

Vue là một framework đã và đang được phát triển, trải nghiệm qua thực tế. Nó là một trong những framework JavaScript được sử dụng rộng rãi nhất trong thực tế ngày nay, với hơn 1,5 triệu người dùng trên toàn thế giới với gần 10 triệu lượt tải mỗi tháng trên npm.

Vue được sử dụng trong production bởi các tổ chức nổi tiếng trong nhiều lĩnh vực trên toàn thế giới, bao gồm Wikimedia Foundation, NASA, Apple, Google, Microsoft, GitLab, Zoom, Tencent, Weibo, Bilibili, Kuaishou và nhiều hơn nữa.

Vue is used in production by renowned organizations in varying capacities all around the world, including Wikimedia Foundation, NASA, Apple, Google, Microsoft, GitLab, Zoom, Tencent, Weibo, Bilibili, Kuaishou, and many more.

## Vue có nhanh không? {#vue-co-nhanh-khong}/

Vue 3 là một trong những framework frontend phổ biến nhất hiện nay, và xử lý hầu hết các trường hợp sử dụng ứng dụng web một cách dễ dàng, mà không cần tối ưu hóa thủ công.

Đối với stress-testing, Vue vượt trội hơn React và Angular một khoảng cách đáng kể trong [js-framework-benchmark](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html). Nó cũng cạnh tranh sát nút với một số framework non-Virtual-DOM nhanh nhất trong benchmark.

Vui lòng lưu ý rằng các benchmark tổng quát như trên tập trung vào hiệu suất render thô được tối ưu hóa riêng biệt và có thể không phản ánh đầy đủ kết quả hiệu suất thực tế. Nếu bạn quan tâm hơn đến hiệu suất tải trang, bạn có thể kiểm tra bằng công cụ [WebPageTest](https://www.webpagetest.org/lighthouse) hoặc [PageSpeed Insights](https://pagespeed.web.dev/). Trang web này được tạo ra bằng Vue, với SSG pre-rendering, full page hydration và SPA client-side navigation. Nó đạt 100  điểm hiệu suất trong giả lập Moto G4 với 4x CPU throttling trên mạng 4G chậm.

Bạn có thể tìm hiểu thêm về cách Vue tự động tối ưu hiệu suất runtime tại [Cơ chế render](/guide/extras/rendering-mechanism), và cách tối ưu hóa một ứng dụng Vue trong các trường hợp đặc biệt tại [Hướng dẫn tối ưu hiệu suất](/guide/best-practices/performance).

## Vue có nhẹ không? {#vue-co-nhe-khong}

Khi bạn sử dụng một công cụ build, nhiều API của Vue có thể ["tree-shakable"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). Ví dụ, nếu bạn không sử dụng built-in component `<Transition>`, nó sẽ không được build trong production bundle cuối cùng.

Một ứng dụng hello world Vue, chỉ sử dụng các API tối thiểu, với minification và brotli compression, có kích thước chỉ khoảng **16kb**. Kích thước thực tế của ứng dụng sẽ phụ thuộc vào số lượng tính năng mà bạn sử dụng từ framework. Trong trường hợp ứng dụng sử dụng tất cả các tính năng của Vue (điều hiếm khi xảy ra), tổng kích thước runtime sẽ rơi vào khoảng **27kb**.

Khi sử dụng Vue mà không có build tool, chúng ta không chỉ không có tree-shaking, mà còn phải gửi trình biên dịch template đến trình duyệt. Điều này làm tăng kích thước lên khoảng **41kb**. Do đó, nếu bạn sử dụng Vue chủ yếu cho Progressive Enhancement mà không có bước build, hãy xem xét việc sử dụng [petite-vue](https://github.com/vuejs/petite-vue) (only **6kb**).

Một số frameworks, ví dụ như Svelte, sử dụng một chiến lược biên dịch tạo ra đầu ra cực kỳ nhẹ trong các trườn hợp single-component. Tuy nhiên, [nghiên cứu của chúng tôi](https://github.com/yyx990803/vue-svelte-size-analysis) cho thấy sự khác biệt về kích thước phụ thuộc rất nhiều vào số lượng component trong ứng dụng. Trong khi Vue có kích thước cơ sở nặng hơn, nó tạo ra ít mã hơn cho mỗi component. Trong các trường hợp thực tế, một ứng dụng Vue có thể rất nhẹ.

## Vue có scale hay không? {#vue-co-scale-hay-khong}

Có. Mặc dù có một quan niệm sai lầm rằng Vue chỉ phù hợp với các trường hợp sử dụng đơn giản, Vue hoàn toàn có thể xử lý các ứng dụng quy mô lớn:

- [Single-File Components](/guide/scaling-up/sfc) cung cấp một 'mô hình phát triển module hoá' cho phép các phần khác nhau của một ứng dụng được phát triển độc lập.

- [Composition API](/guide/reusability/composables) tích hợp TypeScript tân tiến nhất và cho phép sử dụng clean parttern trong việc tổ chức, trích xuất và tái sử dụng logic phức tạp.

- [Comprehensive tooling support](/guide/scaling-up/tooling) đảm bảo một trải nghiệm phát triển mượt mà khi ứng dụng trở nên lớn hơn.

- Hạ thấp rào cản về độ phức tạp của các tính năng cốt lõi của framework, giúp cho việc tìm hiểu và bảo trì dễ dàng hơn.

## Làm sao để tôi có đóng góp cho Vue? {#lam-sao-de-toi-co-the-dong-gop-cho-vue}

Chúng tôi rất hoan nghênh mọi đóng góp vào Vue. Hãy xem [Hướng dẫn cộng đồng](/about/community-guide) để biết thêm chi tiết.

## Tôi nên sử dụng Options API hay Composition API? {#toi-nen-su-dung-options-api-hay-composition-api}

Nếu như bạn mới bắt đầu sử dụng Vue, chúng tôi có một bản so sánh chi tiết giữa hai lựa chọn [tại đây](/guide/introduction#which-to-choose).

Nếu như bạn đã sử dụng Options API trước đây và hiện đang đánh giá Composition API, hãy xem [FAQ](/guide/extras/composition-api-faq) này.

## Tôi nên sử dụng JavaScript hay TypeScript với Vue? {#toi-nen-su-dung-javascript-hay-typescript-voi-vue}

Mặc dù Vue được viết bằng TypeScript và có hỗ trợ TypeScript, bạn không bắt buộc phải sử dụng TypeScript với Vue.

Việc hỗ trợ TypeScript là một yếu tố quan trọng khi các tính năng mới được thêm vào Vue. Các API được thiết kế với TypeScript trong tâm trí thường dễ hiểu hơn cho các IDE và linter, ngay cả khi bạn không sử dụng TypeScript. Mọi người đều có lợi. Các API Vue cũng được thiết kế một cách tối ưu hết mức có thể để hoạt động theo cùng một cách trong cả JavaScript và TypeScript.

Việc sử dụng TypeScript với Vue là sự trao đổi giữa độ phức tạp trong quá trình phát triển và sự dễ dàng trong quá trình bảo trì. Sự trao đổi này có thể thay đổi tùy thuộc vào kích thước của dự án và kinh nghiệm của đội ngũ phát triển. Còn Vue không hề ảnh hưởng đến quyết định này.

## Vue như thế nào so với Web Components? {#vue-nhu-the-nao-so-voi-web-components}

Vue được tạo ra trước khi Web Components được hỗ trợ built-in, và một số khía cạnh của thiết kế của Vue (ví dụ: slots) được lấy cảm hứng từ mô hình Web Components.

Các khía cạnh của Web Components khá là low-level, vì chúng chỉ định nghĩa các custom elements. Trong khi đó, Vue, như một framework, định nghĩa các khía cạnh cao hơn như hiệu suất DOM rendering, reactive state management, tooling, client-side routing, và server-side rendering.

Vue cũng hỗ trợ đầy đủ việc sử dụng Web Components hoặc xuất ra các native custom elements - xem [Hướng dẫn Vue và Web Components](/guide/extras/web-components) để biết thêm chi tiết.

<!-- ## TODO How does Vue compare to React? -->

<!-- ## TODO How does Vue compare to Angular? -->
