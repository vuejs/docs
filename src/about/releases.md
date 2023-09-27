---
outline: deep
---

<script setup>
import { ref, onMounted } from 'vue'

const version = ref()

onMounted(async () => {
  const res = await fetch('https://api.github.com/repos/vuejs/core/releases/latest')
  version.value = (await res.json()).name
})
</script>

# Lịch phát hành {#releases}

<p v-if="version">
Phiên bản ổn định mới nhất của Vue là <strong>{{ version }}</strong>.
</p>
<p v-else>
Đang kiểm tra phiên bản ổn định mới nhất...
</p>

Lịch sử các bản phát hành của Vue có sẵn trên [GitHub](https://github.com/vuejs/core/blob/main/CHANGELOG.md).

## Vòng đời phát hành {#release-cycle}

Vue không có chu kỳ phát hành cố định.

- Các bản vá được phát hành khi cần thiết.

- Các bản phát hành nhỏ luôn chứa các tính năng mới, với một khung thời gian điển hình là 3 ~ 6 tháng giữa các bản phát hành. Các bản phát hành nhỏ luôn phải trải qua một giai đoạn phát hành beta.

- Các bản phát hành lớn sẽ được thông báo trước, và sẽ trải qua một giai đoạn thảo luận sớm và các giai đoạn phát hành trước alpha / beta.

## Các trường hợp đặc biệt của Semantic Versioning {#semantic-versioning-edge-cases}

Vue phát hành theo [Semantic Versioning](https://semver.org/) với một số trường hợp đặc biệt.

### Định nghĩa TypeScript {#typescript-definitions}

Chúng tôi có thể phát hành các thay đổi không tương thích với các định nghĩa TypeScript giữa các phiên bản **nhỏ**. Điều này xảy ra bởi vì:

1. Đôi khi TypeScript tự phát hành các thay đổi không tương thích giữa các phiên bản nhỏ, và chúng tôi có thể phải điều chỉnh các loại để hỗ trợ các phiên bản TypeScript mới hơn.

2. Đôi khi chúng tôi cần áp dụng các tính năng chỉ có sẵn trong phiên bản TypeScript mới hơn, nâng phiên bản TypeScript yêu cầu tối thiểu.

Nếu bạn đang sử dụng TypeScript, bạn có thể sử dụng semver range để khóa các phiên bản nhỏ hiện tại và nâng cấp thủ công khi một phiên bản nhỏ mới của Vue được phát hành.

### Khả năng tương thích của mã biên dịch với phiên bản runtime cũ hơn {#compiled-code-compatibility-with-older-runtime}

Phiên bản **nhỏ** mới hơn của trình biên dịch Vue có thể tạo mã không tương thích với runtime Vue từ phiên bản nhỏ cũ hơn. Ví dụ, mã được tạo ra bởi trình biên dịch Vue 3.2 có thể không hoàn toàn tương thích nếu được tiêu thụ bởi runtime từ Vue 3.1.

Việc này chỉ là vấn đề đối với các tác giả thư viện, vì trong các ứng dụng, phiên bản trình biên dịch và phiên bản runtime luôn giống nhau. Việc 'trật khớp' phiên bản chỉ có thể xảy ra nếu bạn giao Vue Component chưa-biên-dịch dưới dạng package, và người dùng sử dụng nó trong một dự án sử dụng phiên bản cũ hơn của Vue. Điều này dẫn đến việc package của bạn có thể cần khai báo một phiên bản nhỏ tối thiểu của Vue.

## Phát hành sớm {#pre-releases}

Các bản phát hành nhỏ thường trải qua một số lượng phát hành beta không cố định. Các bản phát hành lớn sẽ trải qua một giai đoạn alpha và một giai đoạn beta.

Phát hành sớm được dành cho việc tích hợp / kiểm tra tính ổn định, và cho các người dùng sớm cung cấp phản hồi cho các tính năng không ổn định. Vui lòng không sử dụng các bản phát hành sớm trong môi trường production. Tất cả các bản phát hành sớm được coi là không ổn định và có thể chứa các thay đổi không tương thích giữa các phiên bản, vì vậy hãy luôn chỉ định chính xác các phiên bản khi sử dụng các bản phát hành sớm.

## Tính năng bị loại bỏ {#deprecations}

Chúng tôi có thể định kỳ loại bỏ các tính năng có các phiên bản thay thế mới, tốt hơn trong các bản phát hành nhỏ. Các tính năng bị loại bỏ sẽ tiếp tục hoạt động, và sẽ bị xóa trong bản phát hành lớn tiếp theo sau khi nó được chuyển sang trạng thái đã bị loại bỏ.

## RFCs {#rfcs}

Những tính năng mới với API lớn và các thay đổi lớn đối với Vue sẽ phải thông qua quá trình **Request for Comments** (RFC). Quá trình RFC được thiết kế để cung cấp một định hướng nhất quán và kiểm soát cho các tính năng mới để nhập vào framework, và cho người dùng có cơ hội tham gia và đóng góp ý kiến trong quá trình thiết kế.

Quá trình RFC được tiến hành trong repo [vuejs/rfcs](https://github.com/vuejs/rfcs) trên GitHub.

## Tính năng thử nghiệm {#experimental-features}

Một số tính năng được thêm vào và tài liệu hóa trong một phiên bản ổn định của Vue, nhưng được đánh dấu là thử nghiệm. Các tính năng thử nghiệm thường là các tính năng đang có một cuộc thảo luận RFC liên quan với hầu hết các vấn đề thiết kế được giải quyết trên giấy, nhưng vẫn thiếu phản hồi từ việc sử dụng trong thực tế.

Mục đích của các tính năng thử nghiệm là cho phép người dùng cung cấp phản hồi bằng cách thử nghiệm chúng trong một môi trường production, mà không cần sử dụng một phiên bản không ổn định của Vue. Các tính năng thử nghiệm được coi là không ổn định, và chỉ nên được sử dụng một cách kiểm soát, với kỳ vọng rằng tính năng có thể thay đổi giữa bất kỳ loại bản phát hành nào.
