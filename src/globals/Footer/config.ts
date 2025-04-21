import type { GlobalConfig } from 'payload'

import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { MEDIA_SLUG } from '@/collections/Media'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: admin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'image',
          label: 'Image',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: MEDIA_SLUG,
              label: 'Image',
            },
          ],
        },
        {
          name: 'contactUs',
          label: 'Contact Us',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              defaultValue: 'Đăng kí để nhận thông tin khuyến mãi sớm nhất từ BioLAK',
              required: true,
            },
            {
              name: 'emailInputLabel',
              type: 'text',
              label: 'Email Input Label',
              defaultValue: 'Nhập địa chỉ Email',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Description',
              defaultValue:
                'Đăng kí để nhận thông tin liên lạc về các sản phẩm, dịch vụ, cửa hàng, sự kiện và các vấn đề đáng quan tâm của BioLAK.',
              required: true,
            },
          ],
        },
        {
          name: 'legal',
          label: 'Legal',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              defaultValue: 'Website thuộc quyền của công ty trách nhiệm hữu hạn ELAK',
            },
            {
              name: 'content',
              type: 'textarea',
              label: 'Content',
              required: true,
              defaultValue: `GCNDKKD 0107874681 | Sở kế hoạch và đầu tư TP. Hà Nội
cấp ngày 05/06/2017,
đăng ký thay đổi lần 2 ngày 12/01/2024
Địa chỉ: Xóm 5 thôn Long Phú, xã Hòa Thạch, huyện Quốc Oai,
TP Hà Nội, Việt Nam.
Điện thoại: 0983335596 - Email: info@biolak.vn`,
            },
            {
              name: 'stamp',
              type: 'upload',
              relationTo: MEDIA_SLUG,
              label: 'Stamp',
              required: true,
            },
            {
              name: 'copyright',
              type: 'text',
              label: 'Copyright',
              required: true,
              defaultValue: '© 2025 BioLAK Vietnam. All rights reserved.',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
